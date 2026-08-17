import { model, models, Schema } from "mongoose";

export type SiteSettingsDocument = {
  advancePaymentAmount: number;
  updatedAt: Date;
};

const SiteSettingsSchema = new Schema<SiteSettingsDocument>(
  {
    advancePaymentAmount: { type: Number, required: true, default: 1000, min: 1 },
  },
  { timestamps: true }
);

export const SiteSettings =
  models.SiteSettings || model<SiteSettingsDocument>("SiteSettings", SiteSettingsSchema);
