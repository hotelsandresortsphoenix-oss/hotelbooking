import { getAdvancePaymentAmount } from "@backend/settings";
import Razorpay from "razorpay";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

function jsonError(message: string, status = 400) {
  return Response.json({ error: message }, { status });
}

export async function POST() {
  const keyId = process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID;
  const keySecret = process.env.RAZORPAY_KEY_SECRET;

  if (!keyId || !keySecret) {
    return jsonError("Payment gateway is not configured yet.", 500);
  }

  const advancePaymentAmount = await getAdvancePaymentAmount();
  const razorpay = new Razorpay({ key_id: keyId, key_secret: keySecret });

  try {
    const order = await razorpay.orders.create({
      amount: advancePaymentAmount * 100,
      currency: "INR",
      receipt: `enquiry_${Date.now()}`,
    });

    return Response.json({
      orderId: order.id,
      amount: advancePaymentAmount,
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
