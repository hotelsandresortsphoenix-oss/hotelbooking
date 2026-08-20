import { AdminItem } from "@backend/AdminItem";
import { connectMongo } from "@backend/db";
import { createLocalItem, getLocalModeMessage } from "@backend/localStore";
import type { NextRequest } from "next/server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

function jsonError(message: string, status = 400) {
  return Response.json({ error: message }, { status });
}

function cleanString(value: unknown) {
  return typeof value === "string" ? value.trim() : "";
}

export async function POST(request: NextRequest) {
  const body = await request.json();
  const name = cleanString(body.name);
  const text = cleanString(body.text);
  const rating = Number(body.rating);

  if (!name) {
    return jsonError("Naam likhna zaroori hai.");
  }

  if (!text || text.length < 10) {
    return jsonError("Review kam se kam 10 characters ka hona chahiye.");
  }

  if (!Number.isInteger(rating) || rating < 1 || rating > 5) {
    return jsonError("1 se 5 ke beech rating select karo.");
  }

  const itemPayload = {
    category: "review" as const,
    title: name.slice(0, 80),
    text: text.slice(0, 600),
    img: "/images/destinations/hero-bg.jpg",
    alt: `${name} review`,
    rating,
    isActive: false,
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
