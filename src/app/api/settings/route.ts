import { getAdvancePaymentAmount } from "@backend/settings";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET() {
  const advancePaymentAmount = await getAdvancePaymentAmount();

  return Response.json({ advancePaymentAmount });
}
