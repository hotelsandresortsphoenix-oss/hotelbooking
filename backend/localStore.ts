import { randomBytes } from "crypto";
import { mkdir, readFile, writeFile } from "fs/promises";
import os from "os";
import path from "path";
import type { DefaultAdminItem } from "./defaultItems";
import type {
  AdminItemCategory,
  PublicAdminCategory,
  PublicAdminItem,
  PublicAdminProduct,
  PublicAdminSubCategory,
} from "./types";

type LocalDb = {
  items: PublicAdminItem[];
  categories: PublicAdminCategory[];
  subCategories: PublicAdminSubCategory[];
  products: PublicAdminProduct[];
  settings: { advancePaymentAmount: number };
};

const dbDir = path.join(os.tmpdir(), "hotelbooking-local-db");
const dbPath = path.join(dbDir, "admin.json");

function createEmptyDb(): LocalDb {
  return {
    items: [],
    categories: [],
    subCategories: [],
    products: [],
    settings: { advancePaymentAmount: 1000 },
  };
}

function newId() {
  return randomBytes(12).toString("hex");
}

function now() {
  return new Date().toISOString();
}

async function readDb(): Promise<LocalDb> {
  try {
    const file = await readFile(dbPath, "utf8");
    return { ...createEmptyDb(), ...JSON.parse(file) };
  } catch {
    return createEmptyDb();
  }
}

async function writeDb(db: LocalDb) {
  await mkdir(dbDir, { recursive: true });
  await writeFile(dbPath, JSON.stringify(db, null, 2));
}

export async function listLocalItems(category?: AdminItemCategory) {
  const db = await readDb();
  return category
    ? db.items.filter((item) => item.category === category)
    : db.items;
}

export async function listActiveLocalItems(category: AdminItemCategory) {
  const db = await readDb();
  return db.items.filter(
    (item) => item.category === category && item.isActive
  );
}

export async function getLocalItem(id: string) {
  const db = await readDb();
  return db.items.find((item) => item._id === id) ?? null;
}

export async function seedLocalItems(defaultItems: DefaultAdminItem[]) {
  if (!defaultItems.length) {
    return;
  }

  const db = await readDb();
  const categoriesWithItems = new Set(db.items.map((item) => item.category));
  const itemsToAdd = defaultItems.filter(
    (item) => !categoriesWithItems.has(item.category)
  );

  if (!itemsToAdd.length) {
    return;
  }

  const seededAt = now();
  db.items.push(
    ...itemsToAdd.map((item) => ({
      ...item,
      _id: newId(),
      createdAt: seededAt,
      updatedAt: seededAt,
    }))
  );

  await writeDb(db);
}

export async function createLocalItem(
  item: Omit<PublicAdminItem, "_id" | "createdAt" | "updatedAt">
) {
  const db = await readDb();
  const saved: PublicAdminItem = {
    ...item,
    _id: newId(),
    createdAt: now(),
    updatedAt: now(),
  };

  db.items.unshift(saved);
  await writeDb(db);
  return saved;
}

export async function updateLocalItem(
  id: string,
  update: Partial<PublicAdminItem>
) {
  const db = await readDb();
  const index = db.items.findIndex((item) => item._id === id);

  if (index === -1) {
    return null;
  }

  db.items[index] = {
    ...db.items[index],
    ...update,
    updatedAt: now(),
  };
  await writeDb(db);
  return db.items[index];
}

export async function deleteLocalItem(id: string) {
  const db = await readDb();
  const before = db.items.length;
  db.items = db.items.filter((item) => item._id !== id);
  await writeDb(db);
  return db.items.length !== before;
}

export async function listLocalCatalog() {
  return readDb();
}

export async function createLocalCategory(
  category: Omit<PublicAdminCategory, "_id" | "createdAt" | "updatedAt">
) {
  const db = await readDb();
  const saved: PublicAdminCategory = {
    ...category,
    _id: newId(),
    createdAt: now(),
    updatedAt: now(),
  };

  db.categories.unshift(saved);
  await writeDb(db);
  return saved;
}

export async function createLocalSubCategory(
  subCategory: Omit<PublicAdminSubCategory, "_id" | "createdAt" | "updatedAt">
) {
  const db = await readDb();
  const saved: PublicAdminSubCategory = {
    ...subCategory,
    _id: newId(),
    createdAt: now(),
    updatedAt: now(),
  };

  db.subCategories.unshift(saved);
  await writeDb(db);
  return saved;
}

export async function createLocalProduct(
  product: Omit<PublicAdminProduct, "_id" | "createdAt" | "updatedAt">
) {
  const db = await readDb();
  const saved: PublicAdminProduct = {
    ...product,
    _id: newId(),
    createdAt: now(),
    updatedAt: now(),
  };

  db.products.unshift(saved);
  await writeDb(db);
  return saved;
}

export async function updateLocalCatalog(
  type: "category" | "subcategory" | "product",
  id: string,
  update: { isActive?: boolean }
) {
  const db = await readDb();
  const key =
    type === "category"
      ? "categories"
      : type === "subcategory"
        ? "subCategories"
        : "products";
  const collection = db[key];
  const index = collection.findIndex((item) => item._id === id);

  if (index === -1) {
    return false;
  }

  collection[index] = {
    ...collection[index],
    ...update,
    updatedAt: now(),
  };
  await writeDb(db);
  return true;
}

export async function deleteLocalCatalog(
  type: "category" | "subcategory" | "product",
  id: string
) {
  const db = await readDb();

  if (type === "category") {
    db.categories = db.categories.filter((item) => item._id !== id);
    db.subCategories = db.subCategories.filter(
      (item) => item.categoryId !== id
    );
    db.products = db.products.filter((item) => item.categoryId !== id);
  }

  if (type === "subcategory") {
    db.subCategories = db.subCategories.filter((item) => item._id !== id);
    db.products = db.products.filter((item) => item.subCategoryId !== id);
  }

  if (type === "product") {
    db.products = db.products.filter((item) => item._id !== id);
  }

  await writeDb(db);
  return true;
}

export async function getLocalAdvancePaymentAmount() {
  const db = await readDb();
  return db.settings.advancePaymentAmount;
}

export async function setLocalAdvancePaymentAmount(amount: number) {
  const db = await readDb();
  db.settings.advancePaymentAmount = amount;
  await writeDb(db);
  return amount;
}

export function getLocalModeMessage(error?: unknown) {
  const details = error instanceof Error ? ` (${error.message})` : "";
  return `MongoDB connect nahi ho raha, isliye local file DB mode active hai. Aap abhi add kar sakte ho. MongoDB Atlas URI set karoge to data Mongo me save hoga.${details}`;
}
