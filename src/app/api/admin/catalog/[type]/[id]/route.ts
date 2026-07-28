import {
  AdminCategory,
  AdminProduct,
  AdminSubCategory,
} from "@backend/AdminCatalog";
import { assertAdmin, jsonError } from "@backend/adminHelpers";
import { connectMongo } from "@backend/db";
import {
  deleteLocalCatalog,
  getLocalModeMessage,
  updateLocalCatalog,
} from "@backend/localStore";
import type { NextRequest } from "next/server";
import { isValidObjectId } from "mongoose";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

function getModel(type: string) {
  if (type === "category") return AdminCategory;
  if (type === "subcategory") return AdminSubCategory;
  if (type === "product") return AdminProduct;
  return null;
}

function isCatalogType(type: string): type is "category" | "subcategory" | "product" {
  return type === "category" || type === "subcategory" || type === "product";
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ type: string; id: string }> }
) {
  if (!assertAdmin(request)) {
    return jsonError("Invalid admin key.", 401);
  }

  const { type, id } = await params;
  const model = getModel(type);

  if (!model || !isValidObjectId(id)) {
    return jsonError("Invalid catalog request.");
  }

  const body = await request.json();
  const update: Record<string, unknown> = {};

  if (typeof body.isActive === "boolean") {
    update.isActive = body.isActive;
  }

  try {
    await connectMongo();
    const item = await model.findByIdAndUpdate(id, update, { new: true });

    if (!item) {
      return jsonError("Record nahi mila.", 404);
    }

    return Response.json({ ok: true });
  } catch (error) {
    if (!isCatalogType(type)) {
      return jsonError("Invalid catalog request.");
    }

    const updated = await updateLocalCatalog(type, id, update);

    if (!updated) {
      return jsonError("Record nahi mila.", 404);
    }

    return Response.json({
      ok: true,
      database: {
        connected: false,
        localMode: true,
        message: getLocalModeMessage(error),
      },
    });
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ type: string; id: string }> }
) {
  if (!assertAdmin(request)) {
    return jsonError("Invalid admin key.", 401);
  }

  const { type, id } = await params;
  const model = getModel(type);

  if (!model || !isValidObjectId(id)) {
    return jsonError("Invalid catalog request.");
  }

  try {
    await connectMongo();

    if (type === "category") {
      await Promise.all([
        AdminProduct.deleteMany({ categoryId: id }),
        AdminSubCategory.deleteMany({ categoryId: id }),
      ]);
    }

    if (type === "subcategory") {
      await AdminProduct.deleteMany({ subCategoryId: id });
    }

    const item = await model.findByIdAndDelete(id);

    if (!item) {
      return jsonError("Record nahi mila.", 404);
    }

    return Response.json({ ok: true });
  } catch (error) {
    if (!isCatalogType(type)) {
      return jsonError("Invalid catalog request.");
    }

    await deleteLocalCatalog(type, id);

    return Response.json({
      ok: true,
      database: {
        connected: false,
        localMode: true,
        message: getLocalModeMessage(error),
      },
    });
  }
}
