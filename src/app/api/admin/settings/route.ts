import { getAdvancePaymentAmount, setAdvancePaymentAmount } from "@backend/settings";
import type { NextRequest } from "next/server";

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

export async function GET(request: NextRequest) {
  if (!assertAdmin(request)) {
    return jsonError("Invalid admin key.", 401);
  }

  const advancePaymentAmount = await getAdvancePaymentAmount();

  return Response.json({ advancePaymentAmount });
}

export async function PATCH(request: NextRequest) {
  if (!assertAdmin(request)) {
    return jsonError("Invalid admin key.", 401);
  }

  const body = await request.json();
  const amount = Number(body.advancePaymentAmount);

  if (!Number.isFinite(amount) || amount < 1) {
    return jsonError("Enter a valid advance payment amount.");
  }

  const advancePaymentAmount = await setAdvancePaymentAmount(Math.round(amount));

  return Response.json({ advancePaymentAmount });
}
