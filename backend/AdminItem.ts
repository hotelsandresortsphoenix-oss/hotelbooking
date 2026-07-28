import { model, models, Schema } from "mongoose";
import { adminItemCategories, type AdminItemCategory } from "./types";

export type AdminItemDocument = {
  category: AdminItemCategory;
  title: string;
  text: string;
  img: string;
  alt: string;
  badge?: string;
  label?: string;
  location?: string;
  tag?: string;
  cta?: string;
  price?: string;
  perks?: string[];
  featured?: boolean;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
};

const AdminItemSchema = new Schema<AdminItemDocument>(
  {
    category: {
      type: String,
      enum: adminItemCategories,
      required: true,
      index: true,
    },
    title: { type: String, required: true, trim: true },
    text: { type: String, required: true, trim: true },
    img: {
      type: String,
      default: "/images/destinations/hero-bg.jpg",
      trim: true,
    },
    alt: { type: String, default: "Phoenix Hotels and Resorts item", trim: true },
    badge: { type: String, trim: true },
    label: { type: String, trim: true },
    location: { type: String, trim: true },
    tag: { type: String, trim: true },
    cta: { type: String, trim: true },
    price: { type: String, trim: true },
    perks: [{ type: String, trim: true }],
    featured: { type: Boolean, default: false },
    isActive: { type: Boolean, default: true, index: true },
  },
  { timestamps: true }
);

const existingAdminItem = models.AdminItem;
const existingCategoryPath = existingAdminItem?.schema.path("category") as
  | { enumValues?: string[] }
  | undefined;
const hasCurrentCategoryEnum = adminItemCategories.every((category) =>
  existingCategoryPath?.enumValues?.includes(category)
);

if (existingAdminItem && !hasCurrentCategoryEnum) {
  delete models.AdminItem;
}

export const AdminItem =
  models.AdminItem || model<AdminItemDocument>("AdminItem", AdminItemSchema);
