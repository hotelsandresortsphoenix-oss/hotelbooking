import { AdminItem } from "@backend/AdminItem";
import { connectMongo } from "@backend/db";
import { getLocalItem } from "@backend/localStore";
import Razorpay from "razorpay";
import type { NextRequest } from "next/server";
import { isValidObjectId } from "mongoose";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

function jsonError(message: string, status = 400) {
  return Response.json({ error: message }, { status });
}

function parseAmountFromPrice(price?: string) {
  if (!price) return null;

  const match = price.replace(/,/g, "").match(/\d+(\.\d+)?/);
  if (!match) return null;

  const amount = Number(match[0]);
  return Number.isFinite(amount) && amount > 0 ? Math.round(amount) : null;
}

export async function POST(request: NextRequest) {
  const keyId = process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID;
  const keySecret = process.env.RAZORPAY_KEY_SECRET;

  if (!keyId || !keySecret) {
    return jsonError("Payment gateway is not configured yet.", 500);
  }

  const body = await request.json();
  const itemId = typeof body.itemId === "string" ? body.itemId : "";

  if (!itemId) {
    return jsonError("Select a membership plan.");
  }

  let planName = "";
  let priceText = "";

  try {
    await connectMongo();

    if (!isValidObjectId(itemId)) {
      return jsonError("Invalid plan.");
    }

    const item = await AdminItem.findOne({
      _id: itemId,
      category: "membership",
    }).lean<{ title: string; price?: string }>();

    if (!item) {
      return jsonError("Plan not found.", 404);
    }

    planName = item.title;
    priceText = item.price || "";
  } catch {
    const item = await getLocalItem(itemId);

    if (!item || item.category !== "membership") {
      return jsonError("Plan not found.", 404);
    }

    planName = item.title;
    priceText = item.price || "";
  }

  const amount = parseAmountFromPrice(priceText);

  if (!amount) {
    return jsonError("This plan cannot be paid for online.");
  }

  const razorpay = new Razorpay({ key_id: keyId, key_secret: keySecret });

  try {
    const order = await razorpay.orders.create({
      amount: amount * 100,
      currency: "INR",
      receipt: `membership_${Date.now()}`,
    });

    return Response.json({
      orderId: order.id,
      amount,
      currency: "INR",
      keyId,
      planName,
    });
  } catch (error) {
    return jsonError(
      error instanceof Error ? error.message : "Unable to create payment order.",
      500
    );
  }
}
