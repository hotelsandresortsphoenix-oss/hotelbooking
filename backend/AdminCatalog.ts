import { model, models, Schema, Types } from "mongoose";

export type AdminCategoryDocument = {
  name: string;
  slug: string;
  description?: string;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
};

export type AdminSubCategoryDocument = {
  categoryId: Types.ObjectId;
  name: string;
  slug: string;
  description?: string;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
};

export type AdminProductDocument = {
  categoryId: Types.ObjectId;
  subCategoryId: Types.ObjectId;
  title: string;
  description: string;
  price?: string;
  image?: string;
  alt?: string;
  badge?: string;
  location?: string;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
};

const AdminCategorySchema = new Schema<AdminCategoryDocument>(
  {
    name: { type: String, required: true, trim: true },
    slug: { type: String, required: true, trim: true, lowercase: true },
    description: { type: String, trim: true },
    isActive: { type: Boolean, default: true, index: true },
  },
  { timestamps: true }
);

const AdminSubCategorySchema = new Schema<AdminSubCategoryDocument>(
  {
    categoryId: {
      type: Schema.Types.ObjectId,
      ref: "AdminCategory",
      required: true,
      index: true,
    },
    name: { type: String, required: true, trim: true },
    slug: { type: String, required: true, trim: true, lowercase: true },
    description: { type: String, trim: true },
    isActive: { type: Boolean, default: true, index: true },
  },
  { timestamps: true }
);

const AdminProductSchema = new Schema<AdminProductDocument>(
  {
    categoryId: {
      type: Schema.Types.ObjectId,
      ref: "AdminCategory",
      required: true,
      index: true,
    },
    subCategoryId: {
      type: Schema.Types.ObjectId,
      ref: "AdminSubCategory",
      required: true,
      index: true,
    },
    title: { type: String, required: true, trim: true },
    description: { type: String, required: true, trim: true },
    price: { type: String, trim: true },
    image: { type: String, trim: true },
    alt: { type: String, trim: true },
    badge: { type: String, trim: true },
    location: { type: String, trim: true },
    isActive: { type: Boolean, default: true, index: true },
  },
  { timestamps: true }
);

AdminCategorySchema.index({ slug: 1 }, { unique: true });
AdminSubCategorySchema.index({ categoryId: 1, slug: 1 }, { unique: true });
AdminProductSchema.index({ subCategoryId: 1, title: 1 });

export const AdminCategory =
  models.AdminCategory ||
  model<AdminCategoryDocument>("AdminCategory", AdminCategorySchema);

export const AdminSubCategory =
  models.AdminSubCategory ||
  model<AdminSubCategoryDocument>("AdminSubCategory", AdminSubCategorySchema);

export const AdminProduct =
  models.AdminProduct ||
  model<AdminProductDocument>("AdminProduct", AdminProductSchema);
