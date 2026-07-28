import {
  AdminCategory,
  AdminProduct,
  AdminSubCategory,
} from "@backend/AdminCatalog";
import {
  assertAdmin,
  cleanString,
  jsonError,
  makeSlug,
} from "@backend/adminHelpers";
import { connectMongo } from "@backend/db";
import {
  createLocalCategory,
  createLocalProduct,
  createLocalSubCategory,
  getLocalModeMessage,
  listLocalCatalog,
} from "@backend/localStore";
import type { NextRequest } from "next/server";
import { isValidObjectId } from "mongoose";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

function serialize(item: {
  _id: unknown;
  createdAt?: Date;
  updatedAt?: Date;
  categoryId?: unknown;
  subCategoryId?: unknown;
}) {
  return {
    ...item,
    _id: String(item._id),
    categoryId: item.categoryId ? String(item.categoryId) : undefined,
    subCategoryId: item.subCategoryId ? String(item.subCategoryId) : undefined,
    createdAt: item.createdAt?.toISOString(),
    updatedAt: item.updatedAt?.toISOString(),
  };
}

export async function GET(request: NextRequest) {
  if (!assertAdmin(request)) {
    return jsonError("Invalid admin key.", 401);
  }

  try {
    await connectMongo();
    const [categories, subCategories, products] = await Promise.all([
      AdminCategory.find().sort({ createdAt: -1 }).lean(),
      AdminSubCategory.find().sort({ createdAt: -1 }).lean(),
      AdminProduct.find().sort({ createdAt: -1 }).lean(),
    ]);

    return Response.json({
      categories: categories.map(serialize),
      subCategories: subCategories.map(serialize),
      products: products.map(serialize),
    });
  } catch (error) {
    const db = await listLocalCatalog();

    return Response.json({
      categories: db.categories,
      subCategories: db.subCategories,
      products: db.products,
      database: {
        connected: false,
        localMode: true,
        message: getLocalModeMessage(error),
      },
    });
  }
}

export async function POST(request: NextRequest) {
  if (!assertAdmin(request)) {
    return jsonError("Invalid admin key.", 401);
  }

  const body = await request.json();
  const type = cleanString(body.type);

  try {
    await connectMongo();

    if (type === "category") {
      const name = cleanString(body.name);

      if (!name) {
        return jsonError("Category name required hai.");
      }

      const category = await AdminCategory.create({
        name,
        slug: cleanString(body.slug) || makeSlug(name),
        description: cleanString(body.description) || undefined,
        isActive: body.isActive !== false,
      });

      return Response.json({ category: serialize(category.toObject()) }, { status: 201 });
    }

    if (type === "subcategory") {
      const categoryId = cleanString(body.categoryId);
      const name = cleanString(body.name);

      if (!isValidObjectId(categoryId)) {
        return jsonError("Valid category select karo.");
      }

      if (!name) {
        return jsonError("Sub category name required hai.");
      }

      const category = await AdminCategory.exists({ _id: categoryId });

      if (!category) {
        return jsonError("Category nahi mili.", 404);
      }

      const subCategory = await AdminSubCategory.create({
        categoryId,
        name,
        slug: cleanString(body.slug) || makeSlug(name),
        description: cleanString(body.description) || undefined,
        isActive: body.isActive !== false,
      });

      return Response.json({ subCategory: serialize(subCategory.toObject()) }, { status: 201 });
    }

    if (type === "product") {
      const categoryId = cleanString(body.categoryId);
      const subCategoryId = cleanString(body.subCategoryId);
      const title = cleanString(body.title);
      const description = cleanString(body.description);

      if (!isValidObjectId(categoryId) || !isValidObjectId(subCategoryId)) {
        return jsonError("Valid category aur sub category select karo.");
      }

      if (!title || !description) {
        return jsonError("Product title aur description required hai.");
      }

      const subCategory = await AdminSubCategory.exists({
        _id: subCategoryId,
        categoryId,
      });

      if (!subCategory) {
        return jsonError("Sub category category ke andar nahi mili.", 404);
      }

      const product = await AdminProduct.create({
        categoryId,
        subCategoryId,
        title,
        description,
        price: cleanString(body.price) || undefined,
        image: cleanString(body.image) || undefined,
        alt: cleanString(body.alt) || title,
        badge: cleanString(body.badge) || undefined,
        location: cleanString(body.location) || undefined,
        isActive: body.isActive !== false,
      });

      return Response.json({ product: serialize(product.toObject()) }, { status: 201 });
    }

    return jsonError("Valid type bhejo: category, subcategory, product.");
  } catch (error) {
    if (type === "category") {
      const name = cleanString(body.name);

      if (!name) {
        return jsonError("Category name required hai.");
      }

      const category = await createLocalCategory({
        name,
        slug: cleanString(body.slug) || makeSlug(name),
        description: cleanString(body.description) || undefined,
        isActive: body.isActive !== false,
      });

      return Response.json(
        {
          category,
          database: {
            connected: false,
            localMode: true,
            message: getLocalModeMessage(error),
          },
        },
        { status: 201 }
      );
    }

    if (type === "subcategory") {
      const categoryId = cleanString(body.categoryId);
      const name = cleanString(body.name);
      const db = await listLocalCatalog();
      const category = db.categories.find((item) => item._id === categoryId);

      if (!category) {
        return jsonError("Category nahi mili.", 404);
      }

      if (!name) {
        return jsonError("Sub category name required hai.");
      }

      const subCategory = await createLocalSubCategory({
        categoryId,
        name,
        slug: cleanString(body.slug) || makeSlug(name),
        description: cleanString(body.description) || undefined,
        isActive: body.isActive !== false,
      });

      return Response.json(
        {
          subCategory,
          database: {
            connected: false,
            localMode: true,
            message: getLocalModeMessage(error),
          },
        },
        { status: 201 }
      );
    }

    if (type === "product") {
      const categoryId = cleanString(body.categoryId);
      const subCategoryId = cleanString(body.subCategoryId);
      const title = cleanString(body.title);
      const description = cleanString(body.description);
      const db = await listLocalCatalog();
      const subCategory = db.subCategories.find(
        (item) => item._id === subCategoryId && item.categoryId === categoryId
      );

      if (!subCategory) {
        return jsonError("Sub category category ke andar nahi mili.", 404);
      }

      if (!title || !description) {
        return jsonError("Product title aur description required hai.");
      }

      const product = await createLocalProduct({
        categoryId,
        subCategoryId,
        title,
        description,
        price: cleanString(body.price) || undefined,
        image: cleanString(body.image) || undefined,
        alt: cleanString(body.alt) || title,
        badge: cleanString(body.badge) || undefined,
        location: cleanString(body.location) || undefined,
        isActive: body.isActive !== false,
      });

      return Response.json(
        {
          product,
          database: {
            connected: false,
            localMode: true,
            message: getLocalModeMessage(error),
          },
        },
        { status: 201 }
      );
    }

    return jsonError("Valid type bhejo: category, subcategory, product.");
  }
}
