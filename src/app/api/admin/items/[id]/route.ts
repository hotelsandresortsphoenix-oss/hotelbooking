import { AdminItem } from "@backend/AdminItem";
import { connectMongo } from "@backend/db";
import {
  deleteLocalItem,
  getLocalItem,
  getLocalModeMessage,
  updateLocalItem,
} from "@backend/localStore";
import { adminItemCategories, type AdminItemCategory } from "@backend/types";
import type { NextRequest } from "next/server";
import { isValidObjectId } from "mongoose";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

function jsonError(message: string, status = 400) {
  return Response.json({ error: message }, { status });
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

function isCategory(value: unknown): value is AdminItemCategory {
  return (
    typeof value === "string" &&
    adminItemCategories.includes(value as AdminItemCategory)
  );
}

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  if (!assertAdmin(request)) {
    return jsonError("Invalid admin key.", 401);
  }

  const { id } = await params;

  if (!isValidObjectId(id)) {
    return jsonError("Invalid item id.");
  }

  try {
    await connectMongo();
    const item = await AdminItem.findById(id).lean();

    if (!item) {
      return jsonError("Item not found.", 404);
    }

    return Response.json({
      item: {
        ...item,
        _id: item._id.toString(),
      },
    });
  } catch (error) {
    const item = await getLocalItem(id);

    if (!item) {
      return jsonError("Item not found.", 404);
    }

    return Response.json({
      item,
      database: {
        connected: false,
        localMode: true,
        message: getLocalModeMessage(error),
      },
    });
  }
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  if (!assertAdmin(request)) {
    return jsonError("Invalid admin key.", 401);
  }

  const { id } = await params;

  if (!isValidObjectId(id)) {
    return jsonError("Invalid item id.");
  }

  const body = await request.json();
  const update: Record<string, unknown> = {};

  if (isCategory(body.category)) update.category = body.category;
  if (typeof body.title === "string") update.title = cleanString(body.title);
  if (typeof body.text === "string") update.text = cleanString(body.text);
  if (typeof body.img === "string") update.img = cleanString(body.img);
  if (typeof body.alt === "string") update.alt = cleanString(body.alt);
  if (typeof body.badge === "string") update.badge = cleanString(body.badge);
  if (typeof body.label === "string") update.label = cleanString(body.label);
  if (typeof body.location === "string")
    update.location = cleanString(body.location);
  if (typeof body.tag === "string") update.tag = cleanString(body.tag);
  if (typeof body.cta === "string") update.cta = cleanString(body.cta);
  if (typeof body.price === "string") update.price = cleanString(body.price);
  if (Array.isArray(body.perks) || typeof body.perks === "string") {
    update.perks = cleanStringArray(body.perks);
  }
  if (typeof body.featured === "boolean") update.featured = body.featured;
  if (typeof body.isActive === "boolean") update.isActive = body.isActive;

  try {
    await connectMongo();
    const item = await AdminItem.findByIdAndUpdate(id, update, {
      new: true,
      runValidators: true,
    });

    if (!item) {
      return jsonError("Item not found.", 404);
    }

    return Response.json({ item });
  } catch (error) {
    const item = await updateLocalItem(id, update);

    if (!item) {
      return jsonError("Item not found.", 404);
    }

    return Response.json({
      item,
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
  { params }: { params: Promise<{ id: string }> }
) {
  if (!assertAdmin(request)) {
    return jsonError("Invalid admin key.", 401);
  }

  const { id } = await params;

  if (!isValidObjectId(id)) {
    return jsonError("Invalid item id.");
  }

  try {
    await connectMongo();
    const item = await AdminItem.findByIdAndDelete(id);

    if (!item) {
      return jsonError("Item not found.", 404);
    }

    return Response.json({ ok: true });
  } catch (error) {
    const deleted = await deleteLocalItem(id);

    if (!deleted) {
      return jsonError("Item not found.", 404);
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
