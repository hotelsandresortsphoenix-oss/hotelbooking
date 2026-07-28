import { AdminItem } from "./AdminItem";
import { connectMongo } from "./db";
import { getDefaultAdminItems } from "./defaultItems";
import { listActiveLocalItems, seedLocalItems } from "./localStore";
import {
  adminItemCategories,
  type AdminItemCategory,
  type PublicAdminItem,
} from "./types";

function serializeItem(item: {
  _id: unknown;
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
  createdAt?: Date;
  updatedAt?: Date;
}): PublicAdminItem {
  return {
    _id: String(item._id),
    category: item.category,
    title: item.title,
    text: item.text,
    img: item.img,
    alt: item.alt,
    badge: item.badge,
    label: item.label,
    location: item.location,
    tag: item.tag,
    cta: item.cta,
    price: item.price,
    perks: item.perks,
    featured: item.featured,
    isActive: item.isActive,
    createdAt: item.createdAt?.toISOString(),
    updatedAt: item.updatedAt?.toISOString(),
  };
}

export async function seedMongoItems(category?: AdminItemCategory) {
  const defaultItems = getDefaultAdminItems(category);

  if (!defaultItems.length) {
    return;
  }

  const categoriesToSeed = category ? [category] : adminItemCategories;
  const itemsToAdd = (
    await Promise.all(
      categoriesToSeed.map(async (currentCategory) => {
        const existingCount = await AdminItem.countDocuments({
          category: currentCategory,
        });

        return existingCount === 0
          ? getDefaultAdminItems(currentCategory)
          : [];
      })
    )
  ).flat();

  if (itemsToAdd.length) {
    await AdminItem.insertMany(itemsToAdd, { ordered: false });
  }
}

function itemSignature(
  item: Pick<
    PublicAdminItem,
    | "category"
    | "img"
    | "text"
    | "badge"
    | "label"
    | "location"
    | "tag"
    | "cta"
    | "price"
    | "perks"
    | "featured"
  >
) {
  return [
    item.category,
    item.img,
    item.text,
    item.badge || "",
    item.label || "",
    item.location || "",
    item.tag || "",
    item.cta || "",
    item.price || "",
    item.perks?.join("~~") || "",
    item.featured ? "featured" : "",
  ].join("||");
}

function withoutReSeededCopies(
  category: AdminItemCategory,
  items: PublicAdminItem[]
) {
  const defaultBySignature = new Map(
    getDefaultAdminItems(category).map((item) => [itemSignature(item), item])
  );
  const customSignatures = new Set(
    items
      .filter((item) => {
        const defaultItem = defaultBySignature.get(itemSignature(item));
        return defaultItem && item.title !== defaultItem.title;
      })
      .map(itemSignature)
  );

  return items.filter((item) => {
    const signature = itemSignature(item);
    const defaultItem = defaultBySignature.get(signature);

    return !(
      defaultItem &&
      customSignatures.has(signature) &&
      item.title === defaultItem.title
    );
  });
}

export async function getPublicItems(
  category: AdminItemCategory
): Promise<PublicAdminItem[]> {
  if (!process.env.MONGODB_URI) {
    await seedLocalItems(getDefaultAdminItems());
    const items = await listActiveLocalItems(category);
    return withoutReSeededCopies(category, items);
  }

  try {
    await connectMongo();
    await seedMongoItems(category);
    const items = await AdminItem.find({ category, isActive: true })
      .sort({ createdAt: -1 })
      .lean();

    return withoutReSeededCopies(category, items.map(serializeItem));
  } catch (error) {
    console.error("Unable to load admin items", error);
    await seedLocalItems(getDefaultAdminItems());
    const items = await listActiveLocalItems(category);
    return withoutReSeededCopies(category, items);
  }
}
