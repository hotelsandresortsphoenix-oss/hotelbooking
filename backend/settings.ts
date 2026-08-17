import { connectMongo } from "./db";
import {
  getLocalAdvancePaymentAmount,
  setLocalAdvancePaymentAmount,
} from "./localStore";
import { SiteSettings } from "./SiteSettings";

const DEFAULT_ADVANCE_AMOUNT = 1000;

export async function getAdvancePaymentAmount(): Promise<number> {
  try {
    await connectMongo();
    const doc = await SiteSettings.findOne().lean<{ advancePaymentAmount: number }>();
    return doc?.advancePaymentAmount ?? DEFAULT_ADVANCE_AMOUNT;
  } catch {
    return getLocalAdvancePaymentAmount();
  }
}

export async function setAdvancePaymentAmount(amount: number): Promise<number> {
  try {
    await connectMongo();
    const doc = await SiteSettings.findOneAndUpdate(
      {},
      { advancePaymentAmount: amount },
      { upsert: true, new: true }
    ).lean<{ advancePaymentAmount: number }>();
    return doc?.advancePaymentAmount ?? amount;
  } catch {
    return setLocalAdvancePaymentAmount(amount);
  }
}
