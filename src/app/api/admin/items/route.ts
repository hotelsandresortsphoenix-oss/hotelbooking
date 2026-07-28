import { AdminItem } from "@backend/AdminItem";
import { seedMongoItems } from "@backend/content";
import { connectMongo } from "@backend/db";
import { getDefaultAdminItems } from "@backend/defaultItems";
import {
  createLocalItem,
  getLocalModeMessage,
  listLocalItems,
  seedLocalItems,
} from "@backend/localStore";
import { adminItemCategories, type AdminItemCategory } from "@backend/types";
import type { NextRequest } from "next/server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

function jsonError(message: string, status = 400) {
  return Response.json({ error: message }, { status });
}

function isCategory(value: unknown): value is AdminItemCategory {
  return (
    typeof value === "string" &&
    adminItemCategories.includes(value as AdminItemCategory)
  );
}

function assertAdmin(request: NextRequest) {
  const key = process.env.ADMIN_API_KEY?.trim();

  if (!key) {
    return true;
  }

  return request.headers.get("x-admin-key") === key;
}

function cleanString(value: unknown) {
  return typeof value === "string" ? value.trim() : "";
}

function cleanStringArray(value: unknown) {
  if (Array.isArray(value)) {
    return value
      .map((item) => cleanString(item))
      .filter(Boolean);
  }

  if (typeof value === "string") {
    return value
      .split(/\r?\n/)
      .map((item) => item.trim())
      .filter(Boolean);
  }

  return [];
}

export async function GET(request: NextRequest) {
  if (!assertAdmin(request)) {
    return jsonError("Invalid admin key.", 401);
  }

  try {
    await connectMongo();
    const category = request.nextUrl.searchParams.get("category");
    await seedMongoItems(isCategory(category) ? category : undefined);
    const query = isCategory(category) ? { category } : {};
    const items = await AdminItem.find(query).sort({ createdAt: -1 }).lean();

    return Response.json({
      items: items.map((item) => ({
        ...item,
        _id: item._id.toString(),
      })),
    });
  } catch (error) {
    const category = request.nextUrl.searchParams.get("category");
    const validCategory = isCategory(category) ? category : undefined;

    await seedLocalItems(getDefaultAdminItems(validCategory));
    const items = await listLocalItems(validCategory);

    return Response.json({
      items,
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
  const category = body.category;
  const title = cleanString(body.title);
  const text = cleanString(body.text);

  if (!isCategory(category)) {
    return jsonError("Select a valid category.");
  }

  if (!title || !text) {
    return jsonError("Title and description are required.");
  }

  const itemPayload = {
    category,
    title,
    text,
    img: cleanString(body.img) || "/images/destinations/hero-bg.jpg",
    alt: cleanString(body.alt) || title,
    badge: cleanString(body.badge) || undefined,
    label: cleanString(body.label) || undefined,
    location: cleanString(body.location) || undefined,
    tag: cleanString(body.tag) || undefined,
    cta: cleanString(body.cta) || undefined,
    price: cleanString(body.price) || undefined,
    perks: cleanStringArray(body.perks),
    featured: body.featured === true,
    isActive: body.isActive !== false,
  };

  try {
    await connectMongo();
    const item = await AdminItem.create(itemPayload);

    return Response.json({ item }, { status: 201 });
  } catch (error) {
    const item = await createLocalItem(itemPayload);

    return Response.json(
      {
        item,
        database: {
          connected: false,
          localMode: true,
          message: getLocalModeMessage(error),
        },
      },
      { status: 201 }
    );
  }
}
