import Razorpay from "razorpay";
import type { NextRequest } from "next/server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

function jsonError(message: string, status = 400) {
  return Response.json({ error: message }, { status });
}

export async function POST(request: NextRequest) {
  const keyId = process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID;
  const keySecret = process.env.RAZORPAY_KEY_SECRET;

  if (!keyId || !keySecret) {
    return jsonError("Payment gateway is not configured yet.", 500);
  }

  const body = await request.json();
  const amount = Math.round(Number(body.amount));

  if (!Number.isFinite(amount) || amount < 1 || amount > 1000000) {
    return jsonError("Enter a valid amount between ₹1 and ₹10,00,000.");
  }

  const razorpay = new Razorpay({ key_id: keyId, key_secret: keySecret });

  try {
    const order = await razorpay.orders.create({
      amount: amount * 100,
      currency: "INR",
      receipt: `custom_${Date.now()}`,
    });

    return Response.json({
      orderId: order.id,
      amount,
      currency: "INR",
      keyId,
    });
  } catch (error) {
    return jsonError(
      error instanceof Error ? error.message : "Unable to create payment order.",
      500
    );
  }
}
