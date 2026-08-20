export const adminItemCategories = [
  "domestic",
  "international",
  "hotel",
  "resort",
  "package",
  "membership",
  "review",
] as const;

export type AdminItemCategory = (typeof adminItemCategories)[number];

export type PublicAdminItem = {
  _id: string;
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
  rating?: number;
  isActive: boolean;
  createdAt?: string;
  updatedAt?: string;
};

export type PublicAdminCategory = {
  _id: string;
  name: string;
  slug: string;
  description?: string;
  isActive: boolean;
  createdAt?: string;
  updatedAt?: string;
};

export type PublicAdminSubCategory = {
  _id: string;
  categoryId: string;
  name: string;
  slug: string;
  description?: string;
  isActive: boolean;
  createdAt?: string;
  updatedAt?: string;
};

export type PublicAdminProduct = {
  _id: string;
  categoryId: string;
  subCategoryId: string;
  title: string;
  description: string;
  price?: string;
  image?: string;
  alt?: string;
  badge?: string;
  location?: string;
  isActive: boolean;
  createdAt?: string;
  updatedAt?: string;
};
