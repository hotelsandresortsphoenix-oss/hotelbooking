"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import {
  Building2,
  ChevronLeft,
  CreditCard,
  Crown,
  Eye,
  EyeOff,
  FolderTree,
  Gem,
  Globe2,
  Home,
  KeyRound,
  LayoutDashboard,
  LoaderCircle,
  MapPin,
  PackagePlus,
  Pencil,
  Plus,
  RefreshCw,
  Save,
  Trash2,
  Waves,
  X,
} from "lucide-react";
import {
  adminItemCategories,
  type AdminItemCategory,
  type PublicAdminCategory,
  type PublicAdminItem,
  type PublicAdminProduct,
  type PublicAdminSubCategory,
} from "@backend/types";
import ImageDropField from "./ImageDropField";

type AdminForm = typeof emptyForm;
type CategoryForm = typeof emptyCategoryForm;
type SubCategoryForm = typeof emptySubCategoryForm;
type ProductForm = typeof emptyProductForm;
type CatalogType = "category" | "subcategory" | "product";
type SectionId = "dashboard" | "catalog" | "payment-settings" | AdminItemCategory;

const fieldClass =
  "w-full rounded-[18px] border border-[#ddd3c2] bg-white px-4 py-3 text-sm font-medium text-[#17110a] outline-none transition placeholder:text-[#9b8d78] focus:border-[#d9aa4e] focus:ring-4 focus:ring-[#d9aa4e]/20";
const primaryButtonClass =
  "inline-flex items-center justify-center gap-2 rounded-[18px] bg-gradient-to-br from-amber-200 via-amber-400 to-amber-700 px-5 py-3 text-sm font-extrabold text-[#17110a] shadow-[0_14px_26px_rgba(217,170,78,0.26)] transition hover:from-amber-100 hover:via-amber-300 hover:to-amber-600 disabled:cursor-not-allowed disabled:opacity-60";
const iconButtonClass =
  "inline-flex h-10 w-10 items-center justify-center rounded-[14px] border border-[#ddd3c2] bg-white text-[#6f6251] transition hover:border-[#d9aa4e] hover:text-[#b8860b]";

const emptyForm = {
  category: "domestic" as AdminItemCategory,
  title: "",
  text: "",
  img: "",
  alt: "",
  badge: "",
  label: "",
  location: "",
  tag: "",
  cta: "",
  price: "",
  perks: "",
  featured: false,
  isActive: true,
};

const emptyCategoryForm = {
  name: "",
  slug: "",
  description: "",
  isActive: true,
};

const emptySubCategoryForm = {
  categoryId: "",
  name: "",
  slug: "",
  description: "",
  isActive: true,
};

const emptyProductForm = {
  categoryId: "",
  subCategoryId: "",
  title: "",
  description: "",
  price: "",
  image: "",
  alt: "",
  badge: "",
  location: "",
  isActive: true,
};

const categoryLabels: Record<AdminItemCategory, string> = {
  domestic: "India Destinations",
  international: "International Trips",
  hotel: "Hotels",
  resort: "Resorts",
  package: "Holiday Packages",
  membership: "Membership Plans",
};

const moduleMeta: Record<
  AdminItemCategory,
  {
    singular: string;
    label: string;
    description: string;
    icon: React.ReactNode;
  }
> = {
  domestic: {
    singular: "India Destination",
    label: "India Destinations",
    description: "Royal cities, beaches, backwaters, mountains and island escapes.",
    icon: <MapPin size={22} />,
  },
  international: {
    singular: "International Trip",
    label: "International Trips",
    description: "Maldives, Dubai, Bali, Singapore, Switzerland and global journeys.",
    icon: <Globe2 size={22} />,
  },
  hotel: {
    singular: "Hotel",
    label: "Hotels",
    description: "Luxury hotels, palace stays, city icons and premium addresses.",
    icon: <Building2 size={22} />,
  },
  resort: {
    singular: "Resort",
    label: "Resorts",
    description: "Beach resorts, private villas, family stays and wellness retreats.",
    icon: <Waves size={22} />,
  },
  package: {
    singular: "Holiday Package",
    label: "Holiday Packages",
    description: "Honeymoon, family, luxury and corporate travel styles.",
    icon: <Gem size={22} />,
  },
  membership: {
    singular: "Membership Plan",
    label: "Membership Plans",
    description: "Explorer, Voyager, Elite and other customer membership plans.",
    icon: <Crown size={22} />,
  },
};

function FormLabel({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <label className="grid gap-2 text-sm font-extrabold text-[#17110a]">
      {label}
      {children}
    </label>
  );
}

function StatusPill({ active }: { active: boolean }) {
  return (
    <span
      className={`rounded-full px-3 py-1 text-xs font-extrabold ${
        active ? "bg-emerald-50 text-emerald-700" : "bg-slate-100 text-slate-500"
      }`}
    >
      {active ? "Visible" : "Hidden"}
    </span>
  );
}

function DashboardCard({
  label,
  value,
  text,
}: {
  label: string;
  value: number;
  text: string;
}) {
  return (
    <article className="rounded-[22px] border border-[#e5dccb] bg-white p-6 shadow-[0_18px_34px_rgba(23,17,10,0.08)]">
      <p className="text-xs font-extrabold uppercase tracking-[0.12em] text-[#8a7a63]">
        {label}
      </p>
      <strong className="mt-4 block text-5xl font-extrabold leading-none text-[#b8860b]">
        {value}
      </strong>
      <p className="mt-5 text-base font-medium leading-relaxed text-[#6f6251]">{text}</p>
    </article>
  );
}

function Panel({
  title,
  children,
  action,
}: {
  title: string;
  children: React.ReactNode;
  action?: React.ReactNode;
}) {
  return (
    <section className="rounded-[22px] border border-[#e5dccb] bg-white shadow-[0_18px_34px_rgba(23,17,10,0.08)]">
      <div className="flex items-center justify-between gap-4 border-b border-[#efe7d8] px-5 py-4">
        <h2 className="text-xl font-extrabold text-[#17110a]">{title}</h2>
        {action}
      </div>
      <div className="p-5">{children}</div>
    </section>
  );
}

export default function AdminPanel() {
  const [section, setSection] = useState<SectionId>("dashboard");
  const [form, setForm] = useState<AdminForm>(emptyForm);
  const [addingItem, setAddingItem] = useState(false);
  const [newItemForm, setNewItemForm] = useState<AdminForm>(emptyForm);
  const [editingItemId, setEditingItemId] = useState<string | null>(null);
  const [editingForm, setEditingForm] = useState<AdminForm>(emptyForm);
  const [items, setItems] = useState<PublicAdminItem[]>([]);
  const [categories, setCategories] = useState<PublicAdminCategory[]>([]);
  const [subCategories, setSubCategories] = useState<PublicAdminSubCategory[]>([]);
  const [products, setProducts] = useState<PublicAdminProduct[]>([]);
  const [categoryForm, setCategoryForm] = useState<CategoryForm>(emptyCategoryForm);
  const [subCategoryForm, setSubCategoryForm] =
    useState<SubCategoryForm>(emptySubCategoryForm);
  const [productForm, setProductForm] = useState<ProductForm>(emptyProductForm);
  const [adminKey, setAdminKey] = useState(() =>
    typeof window === "undefined"
      ? ""
      : window.localStorage.getItem("phoenix-admin-key") || ""
  );
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [catalogSaving, setCatalogSaving] = useState(false);
  const [advancePaymentAmount, setAdvancePaymentAmount] = useState("");
  const [paymentSettingsSaving, setPaymentSettingsSaving] = useState(false);

  const authHeaders: Record<string, string> = adminKey
    ? { "x-admin-key": adminKey }
    : {};

  const filteredItems = useMemo(
    () => items.filter((item) => item.category === form.category),
    [form.category, items]
  );

  const selectedSubCategories = useMemo(
    () =>
      subCategories.filter(
        (subCategory) => subCategory.categoryId === productForm.categoryId
      ),
    [productForm.categoryId, subCategories]
  );

  const categoryNameById = useMemo(
    () => new Map(categories.map((category) => [category._id, category.name])),
    [categories]
  );

  const subCategoryNameById = useMemo(
    () =>
      new Map(
        subCategories.map((subCategory) => [subCategory._id, subCategory.name])
      ),
    [subCategories]
  );

  async function loadItems(category?: AdminItemCategory) {
    setLoading(true);
    setMessage("");

    try {
      const url = category
        ? `/api/admin/items?category=${category}`
        : "/api/admin/items";
      const res = await fetch(url, {
        headers: authHeaders,
        cache: "no-store",
      });
      const data = await res.json();

      if (!res.ok) throw new Error(data.error || "Items load nahi hue.");

      if (category) {
        setItems((current) => [
          ...current.filter((item) => item.category !== category),
          ...(data.items || []),
        ]);
      } else {
        setItems(data.items || []);
      }
      if (data.database?.connected === false) setMessage(data.database.message);
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "Items load nahi hue.");
    } finally {
      setLoading(false);
    }
  }

  async function loadCatalog() {
    setLoading(true);
    setMessage("");

    try {
      const res = await fetch("/api/admin/catalog", {
        headers: authHeaders,
        cache: "no-store",
      });
      const data = await res.json();

      if (!res.ok) throw new Error(data.error || "Catalog load nahi hua.");

      setCategories(data.categories || []);
      setSubCategories(data.subCategories || []);
      setProducts(data.products || []);
      if (data.database?.connected === false) setMessage(data.database.message);
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "Catalog load nahi hua.");
    } finally {
      setLoading(false);
    }
  }

  async function loadPaymentSettings() {
    try {
      const res = await fetch("/api/admin/settings", {
        headers: authHeaders,
        cache: "no-store",
      });
      const data = await res.json();

      if (!res.ok) throw new Error(data.error || "Payment settings load nahi hue.");

      setAdvancePaymentAmount(String(data.advancePaymentAmount ?? ""));
    } catch (error) {
      setMessage(
        error instanceof Error ? error.message : "Payment settings load nahi hue."
      );
    }
  }

  async function refreshAll() {
    await Promise.all([loadItems(), loadCatalog(), loadPaymentSettings()]);
  }

  useEffect(() => {
    const timer = window.setTimeout(() => {
      void refreshAll();
    }, 0);

    return () => window.clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [adminKey]);

  function updateEditingField<Key extends keyof AdminForm>(
    field: Key,
    value: AdminForm[Key]
  ) {
    setEditingForm((current) => ({ ...current, [field]: value }));
  }

  function updateNewItemField<Key extends keyof AdminForm>(
    field: Key,
    value: AdminForm[Key]
  ) {
    setNewItemForm((current) => ({ ...current, [field]: value }));
  }

  function startAdding() {
    setAddingItem(true);
    setEditingItemId(null);
    setEditingForm(emptyForm);
    setNewItemForm({ ...emptyForm, category: form.category });
    setMessage(`Adding new ${moduleMeta[form.category].singular}`);
  }

  function cancelAdding() {
    setAddingItem(false);
    setNewItemForm(emptyForm);
    setMessage("");
  }

  function startEditing(item: PublicAdminItem) {
    setAddingItem(false);
    setNewItemForm(emptyForm);
    setEditingItemId(item._id);
    setEditingForm({
      category: item.category,
      title: item.title,
      text: item.text,
      img: item.img,
      alt: item.alt,
      badge: item.badge || "",
      label: item.label || "",
      location: item.location || "",
      tag: item.tag || "",
      cta: item.cta || "",
      price: item.price || "",
      perks: item.perks?.join("\n") || "",
      featured: item.featured || false,
      isActive: item.isActive,
    });
    setSection(item.category);
    setMessage(`Editing: ${item.title}`);
  }

  function cancelEditing() {
    setEditingItemId(null);
    setEditingForm(emptyForm);
    setMessage("");
  }

  function updateCategoryField<Key extends keyof CategoryForm>(
    field: Key,
    value: CategoryForm[Key]
  ) {
    setCategoryForm((current) => ({ ...current, [field]: value }));
  }

  function updateSubCategoryField<Key extends keyof SubCategoryForm>(
    field: Key,
    value: SubCategoryForm[Key]
  ) {
    setSubCategoryForm((current) => ({ ...current, [field]: value }));
  }

  function updateProductField<Key extends keyof ProductForm>(
    field: Key,
    value: ProductForm[Key]
  ) {
    setProductForm((current) => ({
      ...current,
      [field]: value,
      ...(field === "categoryId" ? { subCategoryId: "" } : {}),
    }));
  }

  async function handleEditSubmit(
    event: React.FormEvent<HTMLFormElement>,
    itemId: string
  ) {
    event.preventDefault();
    setSaving(true);
    setMessage("");

    try {
      const res = await fetch(`/api/admin/items/${itemId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json", ...authHeaders },
        body: JSON.stringify(editingForm),
      });
      const data = await res.json();

      if (!res.ok) throw new Error(data.error || "Item update nahi hua.");

      setEditingItemId(null);
      setEditingForm(emptyForm);
      setMessage(data.database?.message || "Item update ho gaya.");
      await loadItems();
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "Item update nahi hua.");
    } finally {
      setSaving(false);
    }
  }

  async function handleAddSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSaving(true);
    setMessage("");

    try {
      const res = await fetch("/api/admin/items", {
        method: "POST",
        headers: { "Content-Type": "application/json", ...authHeaders },
        body: JSON.stringify(newItemForm),
      });
      const data = await res.json();

      if (!res.ok) throw new Error(data.error || "Item add nahi hua.");

      setAddingItem(false);
      setNewItemForm(emptyForm);
      setMessage(data.database?.message || "New item add ho gaya.");
      await loadItems();
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "Item add nahi hua.");
    } finally {
      setSaving(false);
    }
  }

  async function toggleActive(item: PublicAdminItem) {
    setMessage("");

    try {
      const res = await fetch(`/api/admin/items/${item._id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json", ...authHeaders },
        body: JSON.stringify({ isActive: !item.isActive }),
      });
      const data = await res.json();

      if (!res.ok) throw new Error(data.error || "Status update nahi hua.");

      await loadItems();
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "Status update nahi hua.");
    }
  }

  async function deleteItem(item: PublicAdminItem) {
    setMessage("");

    try {
      const res = await fetch(`/api/admin/items/${item._id}`, {
        method: "DELETE",
        headers: authHeaders,
      });
      const data = await res.json();

      if (!res.ok) throw new Error(data.error || "Delete nahi hua.");

      await loadItems();
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "Delete nahi hua.");
    }
  }

  async function handleCategorySubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setCatalogSaving(true);
    setMessage("");

    try {
      const res = await fetch("/api/admin/catalog", {
        method: "POST",
        headers: { "Content-Type": "application/json", ...authHeaders },
        body: JSON.stringify({ type: "category", ...categoryForm }),
      });
      const data = await res.json();

      if (!res.ok) throw new Error(data.error || "Category save nahi hui.");

      setCategoryForm(emptyCategoryForm);
      setMessage(data.database?.message || "Category save ho gayi.");
      await loadCatalog();
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "Category save nahi hui.");
    } finally {
      setCatalogSaving(false);
    }
  }

  async function handleSubCategorySubmit(
    event: React.FormEvent<HTMLFormElement>
  ) {
    event.preventDefault();
    setCatalogSaving(true);
    setMessage("");

    try {
      const res = await fetch("/api/admin/catalog", {
        method: "POST",
        headers: { "Content-Type": "application/json", ...authHeaders },
        body: JSON.stringify({ type: "subcategory", ...subCategoryForm }),
      });
      const data = await res.json();

      if (!res.ok) throw new Error(data.error || "Sub category save nahi hui.");

      setSubCategoryForm((current) => ({
        ...emptySubCategoryForm,
        categoryId: current.categoryId,
      }));
      setMessage(data.database?.message || "Sub category save ho gayi.");
      await loadCatalog();
    } catch (error) {
      setMessage(
        error instanceof Error ? error.message : "Sub category save nahi hui."
      );
    } finally {
      setCatalogSaving(false);
    }
  }

  async function handleProductSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setCatalogSaving(true);
    setMessage("");

    try {
      const res = await fetch("/api/admin/catalog", {
        method: "POST",
        headers: { "Content-Type": "application/json", ...authHeaders },
        body: JSON.stringify({ type: "product", ...productForm }),
      });
      const data = await res.json();

      if (!res.ok) throw new Error(data.error || "Product save nahi hua.");

      setProductForm((current) => ({
        ...emptyProductForm,
        categoryId: current.categoryId,
        subCategoryId: current.subCategoryId,
      }));
      setMessage(data.database?.message || "Product save ho gaya.");
      await loadCatalog();
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "Product save nahi hua.");
    } finally {
      setCatalogSaving(false);
    }
  }

  async function handlePaymentSettingsSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setPaymentSettingsSaving(true);
    setMessage("");

    try {
      const res = await fetch("/api/admin/settings", {
        method: "PATCH",
        headers: { "Content-Type": "application/json", ...authHeaders },
        body: JSON.stringify({ advancePaymentAmount: Number(advancePaymentAmount) }),
      });
      const data = await res.json();

      if (!res.ok) throw new Error(data.error || "Advance amount save nahi hua.");

      setAdvancePaymentAmount(String(data.advancePaymentAmount));
      setMessage("Advance payment amount save ho gaya.");
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "Advance amount save nahi hua.");
    } finally {
      setPaymentSettingsSaving(false);
    }
  }

  async function toggleCatalogActive(
    type: CatalogType,
    id: string,
    isActive: boolean
  ) {
    setMessage("");

    try {
      const res = await fetch(`/api/admin/catalog/${type}/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json", ...authHeaders },
        body: JSON.stringify({ isActive: !isActive }),
      });
      const data = await res.json();

      if (!res.ok) throw new Error(data.error || "Status update nahi hua.");

      await loadCatalog();
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "Status update nahi hua.");
    }
  }

  async function deleteCatalog(type: CatalogType, id: string) {
    setMessage("");

    try {
      const res = await fetch(`/api/admin/catalog/${type}/${id}`, {
        method: "DELETE",
        headers: authHeaders,
      });
      const data = await res.json();

      if (!res.ok) throw new Error(data.error || "Delete nahi hua.");

      await loadCatalog();
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "Delete nahi hua.");
    }
  }

  function saveAdminKey(value: string) {
    setAdminKey(value);
    window.localStorage.setItem("phoenix-admin-key", value);
  }

  function openModule(category: AdminItemCategory) {
    setAddingItem(false);
    setNewItemForm(emptyForm);
    setEditingItemId(null);
    setEditingForm(emptyForm);
    setForm({ ...emptyForm, category });
    setSection(category);
    void loadItems(category);
  }

  const sidebarItems = [
    { id: "dashboard" as const, label: "Dashboard", icon: <LayoutDashboard size={22} /> },
    { id: "domestic" as const, label: "India Destinations", icon: moduleMeta.domestic.icon },
    { id: "international" as const, label: "International Trips", icon: moduleMeta.international.icon },
    { id: "hotel" as const, label: "Hotels", icon: moduleMeta.hotel.icon },
    { id: "resort" as const, label: "Resorts", icon: moduleMeta.resort.icon },
    { id: "package" as const, label: "Holiday Packages", icon: moduleMeta.package.icon },
    { id: "membership" as const, label: "Membership Plans", icon: moduleMeta.membership.icon },
    { id: "catalog" as const, label: "Category Builder", icon: <FolderTree size={22} /> },
    { id: "payment-settings" as const, label: "Payment Settings", icon: <CreditCard size={22} /> },
  ];

  const activeModule =
    section !== "dashboard" && section !== "catalog" && section !== "payment-settings"
      ? section
      : form.category;
  const pageTitle =
    section === "dashboard"
      ? "Phoenix Dashboard"
      : section === "catalog"
        ? "Category Builder"
        : section === "payment-settings"
          ? "Payment Settings"
          : moduleMeta[section].label;

  return (
    <section className="min-h-screen bg-[#f7f1e7] text-[#17110a]">
      <div className="grid min-h-screen lg:grid-cols-[320px_1fr]">
        <aside className="bg-black p-6 text-white lg:sticky lg:top-0 lg:min-h-screen">
          <div className="mb-8 rounded-[18px] bg-white p-3 shadow-[0_18px_34px_rgba(0,0,0,0.16)]">
            <Image
              src="/images/logo.jpg"
              alt="Phoenix Hotels and Resorts logo"
              width={260}
              height={110}
              className="mx-auto h-[72px] w-auto rounded-[12px] object-contain"
            />
          </div>

          <nav className="grid gap-2.5">
            {sidebarItems.map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() =>
                  item.id === "dashboard" ||
                  item.id === "catalog" ||
                  item.id === "payment-settings"
                    ? setSection(item.id)
                    : openModule(item.id)
                }
                className={`flex items-center gap-3 rounded-[18px] px-4 py-3.5 text-left text-base font-extrabold transition ${
                  section === item.id
                    ? "bg-amber-400/16 text-amber-100 ring-1 ring-amber-300/25"
                    : "text-white/72 hover:bg-amber-400/10 hover:text-amber-100"
                }`}
              >
                {item.icon}
                {item.label}
              </button>
            ))}
          </nav>

          <div className="mt-8 rounded-[18px] border border-amber-300/15 bg-white/8 p-4">
            <p className="text-xs font-extrabold uppercase tracking-[0.16em] text-amber-100/60">
              Admin Access
            </p>
            <label className="relative mt-4 block">
              <KeyRound
                size={17}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-amber-200/55"
              />
              <input
                type="password"
                value={adminKey}
                onChange={(event) => saveAdminKey(event.target.value)}
                placeholder="Admin key"
                className="w-full rounded-[18px] border border-amber-300/15 bg-white/10 py-3 pl-11 pr-4 text-sm font-bold text-white outline-none placeholder:text-white/35 focus:border-amber-300/50"
              />
            </label>
          </div>
        </aside>

        <main className="min-w-0 p-5 sm:p-7 lg:p-8">
          <div className="mb-7 flex flex-col gap-4 xl:flex-row xl:items-start xl:justify-between">
            <div>
              <p className="text-sm font-extrabold uppercase tracking-[0.18em] text-[#8a7a63]">
                Phoenix Hotels & Resorts
              </p>
              <h1 className="mt-2 text-4xl font-extrabold leading-tight tracking-tight text-[#17110a] sm:text-5xl xl:text-[56px]">
                {pageTitle}
              </h1>
              {section !== "dashboard" &&
                section !== "catalog" &&
                section !== "payment-settings" && (
                  <p className="mt-3 max-w-2xl text-lg font-medium text-[#6f6251]">
                    {moduleMeta[section].description}
                  </p>
                )}
            </div>

            <div className="flex flex-wrap gap-3 xl:justify-end">
              <button
                type="button"
                onClick={refreshAll}
                className={primaryButtonClass}
              >
                {loading ? (
                  <LoaderCircle size={18} className="animate-spin" />
                ) : (
                  <RefreshCw size={18} />
                )}
                Refresh
              </button>
              <Link
                href="/"
                className="inline-flex items-center justify-center gap-2 rounded-[22px] bg-gradient-to-br from-amber-200 via-amber-400 to-amber-700 px-6 py-3 text-sm font-extrabold text-[#17110a] shadow-[0_18px_32px_rgba(217,170,78,0.28)] hover:from-amber-100 hover:via-amber-300 hover:to-amber-600"
              >
                <ChevronLeft size={18} />
                Back to Home
              </Link>
            </div>
          </div>

          {message && (
            <div className="mb-7 max-w-5xl rounded-[18px] border border-amber-300 bg-amber-50 px-5 py-4 text-sm font-bold leading-relaxed text-amber-900">
              {message}
            </div>
          )}

          {section === "dashboard" && (
            <div className="grid gap-8">
              <div className="grid gap-6 xl:grid-cols-2">
                <DashboardCard
                  label="Total India Destinations"
                  value={items.filter((item) => item.category === "domestic").length}
                  text="Content used on India destination pages and cards."
                />
                <DashboardCard
                  label="Total International Trips"
                  value={items.filter((item) => item.category === "international").length}
                  text="Global trips for Maldives, Dubai, Bali and other journeys."
                />
                <DashboardCard
                  label="Total Hotels"
                  value={items.filter((item) => item.category === "hotel").length}
                  text="Luxury hotel cards shown in the hotels section."
                />
                <DashboardCard
                  label="Total Resorts"
                  value={items.filter((item) => item.category === "resort").length}
                  text="Resort content for beach, family and villa experiences."
                />
                <DashboardCard
                  label="Total Holiday Packages"
                  value={items.filter((item) => item.category === "package").length}
                  text="Honeymoon, family, luxury and corporate package cards."
                />
                <DashboardCard
                  label="Total Membership Plans"
                  value={items.filter((item) => item.category === "membership").length}
                  text="Explorer, Voyager, Elite and customer membership plan cards."
                />
              </div>

              <Panel title="Quick Actions">
                <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
                  {adminItemCategories.map((category) => (
                    <button
                      key={category}
                      type="button"
                      onClick={() => openModule(category)}
                      className="rounded-[22px] border border-[#e5dccb] bg-[#fffaf1] p-6 text-left transition hover:border-[#d9aa4e]"
                    >
                      <span className="text-[#b8860b]">{moduleMeta[category].icon}</span>
                      <strong className="mt-4 block text-xl">
                        Manage {moduleMeta[category].label}
                      </strong>
                      <p className="mt-2 text-sm font-medium text-[#6f6251]">
                        {moduleMeta[category].description}
                      </p>
                    </button>
                  ))}
                  <button
                    type="button"
                    onClick={() => setSection("catalog")}
                    className="rounded-[22px] border border-[#e5dccb] bg-[#fffaf1] p-6 text-left transition hover:border-[#d9aa4e]"
                  >
                    <FolderTree className="text-[#b8860b]" />
                    <strong className="mt-4 block text-xl">Category Builder</strong>
                    <p className="mt-2 text-sm font-medium text-[#6f6251]">
                      Create custom category, sub category and product hierarchy.
                    </p>
                  </button>
                  <Link
                    href="/"
                    className="rounded-[22px] border border-[#e5dccb] bg-[#fffaf1] p-6 text-left transition hover:border-[#d9aa4e]"
                  >
                    <Home className="text-[#b8860b]" />
                    <strong className="mt-4 block text-xl">Open Website</strong>
                    <p className="mt-2 text-sm font-medium text-[#6f6251]">
                      Go back to the public Phoenix website.
                    </p>
                  </Link>
                </div>
              </Panel>
            </div>
          )}

          {section !== "dashboard" &&
            section !== "catalog" &&
            section !== "payment-settings" && (
            <div className="grid gap-8">
              <Panel
                title={`Saved ${moduleMeta[activeModule].label}`}
                action={
                  <button
                    type="button"
                    onClick={startAdding}
                    className="inline-flex items-center justify-center gap-2 rounded-[16px] bg-[#17110a] px-4 py-2.5 text-sm font-extrabold text-white transition hover:bg-[#2c2115]"
                  >
                    <Plus size={17} /> Add New {moduleMeta[activeModule].singular}
                  </button>
                }
              >
                <div className="mb-5">
                  <FormLabel label="Switch module">
                    <select
                      value={form.category}
                      onChange={(event) => openModule(event.target.value as AdminItemCategory)}
                      className={fieldClass}
                    >
                      {adminItemCategories.map((category) => (
                        <option key={category} value={category}>
                          {categoryLabels[category]}
                        </option>
                      ))}
                    </select>
                  </FormLabel>
                </div>

                <div className="grid gap-4">
                  {addingItem && (
                    <form
                      onSubmit={handleAddSubmit}
                      className="grid gap-4 rounded-[22px] border-2 border-[#17110a] bg-[#fffaf1] p-4"
                    >
                      <div className="grid gap-4">
                        <div className="grid gap-4 sm:grid-cols-2">
                          <FormLabel label="Title">
                            <input
                              value={newItemForm.title}
                              onChange={(event) =>
                                updateNewItemField("title", event.target.value)
                              }
                              placeholder="Example: New hotel name"
                              required
                              className={fieldClass}
                            />
                          </FormLabel>
                          <FormLabel label="Badge">
                            <input
                              value={newItemForm.badge}
                              onChange={(event) =>
                                updateNewItemField("badge", event.target.value)
                              }
                              placeholder="Luxury / City / Beach"
                              className={fieldClass}
                            />
                          </FormLabel>
                        </div>
                        <FormLabel label="Description">
                          <textarea
                            value={newItemForm.text}
                            onChange={(event) =>
                              updateNewItemField("text", event.target.value)
                            }
                            placeholder="Short detail shown on website card"
                            required
                            rows={3}
                            className={`${fieldClass} resize-none`}
                          />
                        </FormLabel>
                        <div className="grid gap-4 sm:grid-cols-2">
                          <FormLabel label="Image">
                            <ImageDropField
                              value={newItemForm.img}
                              onChange={(path) => updateNewItemField("img", path)}
                              authHeaders={authHeaders}
                            />
                          </FormLabel>
                          <FormLabel label="Image alt">
                            <input
                              value={newItemForm.alt}
                              onChange={(event) =>
                                updateNewItemField("alt", event.target.value)
                              }
                              placeholder="Describe the image"
                              className={fieldClass}
                            />
                          </FormLabel>
                        </div>
                        <div className="grid gap-4 sm:grid-cols-4">
                          <FormLabel label="Label">
                            <input
                              value={newItemForm.label}
                              onChange={(event) =>
                                updateNewItemField("label", event.target.value)
                              }
                              className={fieldClass}
                            />
                          </FormLabel>
                          <FormLabel label="Location">
                            <input
                              value={newItemForm.location}
                              onChange={(event) =>
                                updateNewItemField("location", event.target.value)
                              }
                              placeholder="Udaipur, India"
                              className={fieldClass}
                            />
                          </FormLabel>
                          <FormLabel label="Tag">
                            <input
                              value={newItemForm.tag}
                              onChange={(event) =>
                                updateNewItemField("tag", event.target.value)
                              }
                              className={fieldClass}
                            />
                          </FormLabel>
                          <FormLabel label="CTA">
                            <input
                              value={newItemForm.cta}
                              onChange={(event) =>
                                updateNewItemField("cta", event.target.value)
                              }
                              className={fieldClass}
                            />
                          </FormLabel>
                        </div>
                        <div className="grid gap-4 sm:grid-cols-2">
                          <FormLabel label="Price">
                            <input
                              value={newItemForm.price}
                              onChange={(event) =>
                                updateNewItemField("price", event.target.value)
                              }
                              placeholder="Price on request / Rs 4,999"
                              className={fieldClass}
                            />
                          </FormLabel>
                          <label className="flex items-center gap-2 rounded-[18px] border border-[#ddd3c2] bg-white px-4 py-3 text-sm font-extrabold">
                            <input
                              type="checkbox"
                              checked={newItemForm.featured}
                              onChange={(event) =>
                                updateNewItemField("featured", event.target.checked)
                              }
                              className="h-4 w-4 rounded border-[#ddd3c2] accent-amber-500"
                            />
                            Featured plan
                          </label>
                        </div>
                        <FormLabel label="Perks - one line per bullet">
                          <textarea
                            value={newItemForm.perks}
                            onChange={(event) =>
                              updateNewItemField("perks", event.target.value)
                            }
                            rows={4}
                            className={`${fieldClass} resize-none`}
                          />
                        </FormLabel>
                      </div>
                      <div className="flex flex-wrap items-center justify-between gap-3">
                        <label className="flex items-center gap-2 text-sm font-extrabold">
                          <input
                            type="checkbox"
                            checked={newItemForm.isActive}
                            onChange={(event) =>
                              updateNewItemField("isActive", event.target.checked)
                            }
                            className="h-4 w-4 rounded border-[#ddd3c2] accent-amber-500"
                          />
                          Show on website
                        </label>
                        <div className="flex gap-2">
                          <button
                            type="submit"
                            disabled={saving}
                            className={primaryButtonClass}
                          >
                            {saving ? (
                              <LoaderCircle size={18} className="animate-spin" />
                            ) : (
                              <Save size={18} />
                            )}
                            Insert
                          </button>
                          <button
                            type="button"
                            onClick={cancelAdding}
                            className="inline-flex items-center justify-center gap-2 rounded-[18px] border border-[#ddd3c2] bg-white px-5 py-3 text-sm font-extrabold text-[#6f6251] transition hover:border-[#d9aa4e] hover:text-[#b8860b]"
                          >
                            <X size={18} /> Cancel
                          </button>
                        </div>
                      </div>
                    </form>
                  )}

                  {filteredItems.length === 0 && (
                    <div className="rounded-[22px] border border-dashed border-[#ddd3c2] p-8 text-center text-base font-semibold text-[#8a7a63]">
                      Is category me abhi koi item nahi hai.
                    </div>
                  )}

                  {filteredItems.map((item) =>
                    editingItemId === item._id ? (
                      <form
                        key={item._id}
                        onSubmit={(event) => handleEditSubmit(event, item._id)}
                        className="grid gap-4 rounded-[22px] border-2 border-[#d9aa4e] bg-[#fffaf1] p-4"
                      >
                        <div className="grid gap-4 lg:grid-cols-[128px_1fr]">
                          <img
                            src={editingForm.img || item.img}
                            alt={editingForm.alt || item.alt}
                            className="h-28 w-full rounded-[18px] object-cover sm:w-32"
                          />
                          <div className="grid gap-4">
                            <div className="grid gap-4 sm:grid-cols-2">
                              <FormLabel label="Title">
                                <input
                                  value={editingForm.title}
                                  onChange={(event) =>
                                    updateEditingField("title", event.target.value)
                                  }
                                  required
                                  className={fieldClass}
                                />
                              </FormLabel>
                              <FormLabel label="Badge">
                                <input
                                  value={editingForm.badge}
                                  onChange={(event) =>
                                    updateEditingField("badge", event.target.value)
                                  }
                                  className={fieldClass}
                                />
                              </FormLabel>
                            </div>
                            <FormLabel label="Description">
                              <textarea
                                value={editingForm.text}
                                onChange={(event) =>
                                  updateEditingField("text", event.target.value)
                                }
                                required
                                rows={3}
                                className={`${fieldClass} resize-none`}
                              />
                            </FormLabel>
                            <div className="grid gap-4 sm:grid-cols-2">
                              <FormLabel label="Image">
                                <ImageDropField
                                  value={editingForm.img}
                                  onChange={(path) => updateEditingField("img", path)}
                                  authHeaders={authHeaders}
                                />
                              </FormLabel>
                              <FormLabel label="Image alt">
                                <input
                                  value={editingForm.alt}
                                  onChange={(event) =>
                                    updateEditingField("alt", event.target.value)
                                  }
                                  className={fieldClass}
                                />
                              </FormLabel>
                            </div>
                            <div className="grid gap-4 sm:grid-cols-4">
                              <FormLabel label="Label">
                                <input
                                  value={editingForm.label}
                                  onChange={(event) =>
                                    updateEditingField("label", event.target.value)
                                  }
                                  className={fieldClass}
                                />
                              </FormLabel>
                              <FormLabel label="Location">
                                <input
                                  value={editingForm.location}
                                  onChange={(event) =>
                                    updateEditingField("location", event.target.value)
                                  }
                                  className={fieldClass}
                                />
                              </FormLabel>
                              <FormLabel label="Tag">
                                <input
                                  value={editingForm.tag}
                                  onChange={(event) =>
                                    updateEditingField("tag", event.target.value)
                                  }
                                  className={fieldClass}
                                />
                              </FormLabel>
                              <FormLabel label="CTA">
                                <input
                                  value={editingForm.cta}
                                  onChange={(event) =>
                                    updateEditingField("cta", event.target.value)
                                  }
                                  className={fieldClass}
                                />
                              </FormLabel>
                            </div>
                            <div className="grid gap-4 sm:grid-cols-2">
                              <FormLabel label="Price">
                                <input
                                  value={editingForm.price}
                                  onChange={(event) =>
                                    updateEditingField("price", event.target.value)
                                  }
                                  placeholder="Free / Rs 4,999/yr"
                                  className={fieldClass}
                                />
                              </FormLabel>
                              <label className="flex items-center gap-2 rounded-[18px] border border-[#ddd3c2] bg-white px-4 py-3 text-sm font-extrabold">
                                <input
                                  type="checkbox"
                                  checked={editingForm.featured}
                                  onChange={(event) =>
                                    updateEditingField("featured", event.target.checked)
                                  }
                                  className="h-4 w-4 rounded border-[#ddd3c2] accent-amber-500"
                                />
                                Featured plan
                              </label>
                            </div>
                            <FormLabel label="Perks - one line per bullet">
                              <textarea
                                value={editingForm.perks}
                                onChange={(event) =>
                                  updateEditingField("perks", event.target.value)
                                }
                                rows={5}
                                className={`${fieldClass} resize-none`}
                              />
                            </FormLabel>
                          </div>
                        </div>
                        <div className="flex flex-wrap items-center justify-between gap-3">
                          <label className="flex items-center gap-2 text-sm font-extrabold">
                            <input
                              type="checkbox"
                              checked={editingForm.isActive}
                              onChange={(event) =>
                                updateEditingField("isActive", event.target.checked)
                              }
                              className="h-4 w-4 rounded border-[#ddd3c2] accent-amber-500"
                            />
                            Show on website
                          </label>
                          <div className="flex gap-2">
                            <button
                              type="submit"
                              disabled={saving}
                              className={primaryButtonClass}
                            >
                              {saving ? (
                                <LoaderCircle size={18} className="animate-spin" />
                              ) : (
                                <Save size={18} />
                              )}
                              Update
                            </button>
                            <button
                              type="button"
                              onClick={cancelEditing}
                              className="inline-flex items-center justify-center gap-2 rounded-[18px] border border-[#ddd3c2] bg-white px-5 py-3 text-sm font-extrabold text-[#6f6251] transition hover:border-[#d9aa4e] hover:text-[#b8860b]"
                            >
                              <X size={18} /> Cancel
                            </button>
                          </div>
                        </div>
                      </form>
                    ) : (
                      <article
                        key={item._id}
                        className="grid gap-4 rounded-[22px] border border-[#e5dccb] bg-[#fffaf1] p-4 sm:grid-cols-[128px_1fr_auto]"
                      >
                        <img
                          src={item.img}
                          alt={item.alt}
                          className="h-28 w-full rounded-[18px] object-cover sm:w-32"
                        />
                        <div>
                          <div className="flex flex-wrap items-center gap-2">
                            <strong className="text-lg">{item.title}</strong>
                            <StatusPill active={item.isActive} />
                          </div>
                          <p className="mt-2 text-sm font-medium text-[#6f6251]">
                            {item.text}
                          </p>
                          <p className="mt-2 text-xs font-bold uppercase tracking-wide text-[#8a7a63]">
                            {item.price ||
                              item.location ||
                              item.badge ||
                              item.label ||
                              item.tag ||
                              "No extra label"}
                          </p>
                          {item.perks?.length ? (
                            <p className="mt-1 text-xs font-semibold text-[#6f6251]">
                              {item.perks.length} perks
                              {item.featured ? " - Featured" : ""}
                            </p>
                          ) : null}
                        </div>
                        <div className="flex gap-2 sm:flex-col">
                          <button
                            type="button"
                            onClick={() => startEditing(item)}
                            className={iconButtonClass}
                            title="Edit item"
                          >
                            <Pencil size={17} />
                          </button>
                          <button
                            type="button"
                            onClick={() => toggleActive(item)}
                            className={iconButtonClass}
                            title={item.isActive ? "Hide item" : "Show item"}
                          >
                            {item.isActive ? <EyeOff size={17} /> : <Eye size={17} />}
                          </button>
                          <button
                            type="button"
                            onClick={() => deleteItem(item)}
                            className={`${iconButtonClass} hover:border-red-300 hover:text-red-600`}
                            title="Delete item"
                          >
                            <Trash2 size={17} />
                          </button>
                        </div>
                      </article>
                    )
                  )}
                </div>
              </Panel>
            </div>
          )}

          {section === "catalog" && (
            <div className="grid gap-8">
              <div className="grid gap-8 2xl:grid-cols-3">
                <Panel title="Add Category" action={<Plus className="text-[#b8860b]" />}>
                  <form onSubmit={handleCategorySubmit} className="grid gap-5">
                    <FormLabel label="Category name">
                      <input
                        value={categoryForm.name}
                        onChange={(event) => updateCategoryField("name", event.target.value)}
                        placeholder="Example: Domestic Holidays"
                        required
                        className={fieldClass}
                      />
                    </FormLabel>
                    <FormLabel label="Slug">
                      <input
                        value={categoryForm.slug}
                        onChange={(event) => updateCategoryField("slug", event.target.value)}
                        placeholder="domestic-holidays"
                        className={fieldClass}
                      />
                    </FormLabel>
                    <FormLabel label="Description">
                      <textarea
                        value={categoryForm.description}
                        onChange={(event) => updateCategoryField("description", event.target.value)}
                        rows={4}
                        className={`${fieldClass} resize-none`}
                      />
                    </FormLabel>
                    <label className="flex items-center gap-2 text-sm font-extrabold">
                      <input
                        type="checkbox"
                        checked={categoryForm.isActive}
                        onChange={(event) => updateCategoryField("isActive", event.target.checked)}
                        className="h-4 w-4 rounded border-[#ddd3c2] accent-amber-500"
                      />
                      Active
                    </label>
                    <button
                      type="submit"
                      disabled={catalogSaving}
                      className={primaryButtonClass}
                    >
                      <Save size={18} /> Save Category
                    </button>
                  </form>
                </Panel>

                <Panel title="Add Sub Category" action={<FolderTree className="text-[#b8860b]" />}>
                  <form onSubmit={handleSubCategorySubmit} className="grid gap-5">
                    <FormLabel label="Parent category">
                      <select
                        value={subCategoryForm.categoryId}
                        onChange={(event) => updateSubCategoryField("categoryId", event.target.value)}
                        required
                        className={fieldClass}
                      >
                        <option value="">Select category</option>
                        {categories.map((category) => (
                          <option key={category._id} value={category._id}>
                            {category.name}
                          </option>
                        ))}
                      </select>
                    </FormLabel>
                    <FormLabel label="Sub category name">
                      <input
                        value={subCategoryForm.name}
                        onChange={(event) => updateSubCategoryField("name", event.target.value)}
                        placeholder="Example: Beach Packages"
                        required
                        className={fieldClass}
                      />
                    </FormLabel>
                    <FormLabel label="Slug">
                      <input
                        value={subCategoryForm.slug}
                        onChange={(event) => updateSubCategoryField("slug", event.target.value)}
                        placeholder="beach-packages"
                        className={fieldClass}
                      />
                    </FormLabel>
                    <FormLabel label="Description">
                      <textarea
                        value={subCategoryForm.description}
                        onChange={(event) => updateSubCategoryField("description", event.target.value)}
                        rows={4}
                        className={`${fieldClass} resize-none`}
                      />
                    </FormLabel>
                    <label className="flex items-center gap-2 text-sm font-extrabold">
                      <input
                        type="checkbox"
                        checked={subCategoryForm.isActive}
                        onChange={(event) => updateSubCategoryField("isActive", event.target.checked)}
                        className="h-4 w-4 rounded border-[#ddd3c2] accent-amber-500"
                      />
                      Active
                    </label>
                    <button
                      type="submit"
                      disabled={catalogSaving || categories.length === 0}
                      className={primaryButtonClass}
                    >
                      <Save size={18} /> Save Sub Category
                    </button>
                  </form>
                </Panel>

                <Panel title="Add Product" action={<PackagePlus className="text-[#b8860b]" />}>
                  <form onSubmit={handleProductSubmit} className="grid gap-5">
                    <FormLabel label="Category">
                      <select
                        value={productForm.categoryId}
                        onChange={(event) => updateProductField("categoryId", event.target.value)}
                        required
                        className={fieldClass}
                      >
                        <option value="">Select category</option>
                        {categories.map((category) => (
                          <option key={category._id} value={category._id}>
                            {category.name}
                          </option>
                        ))}
                      </select>
                    </FormLabel>
                    <FormLabel label="Sub category">
                      <select
                        value={productForm.subCategoryId}
                        onChange={(event) => updateProductField("subCategoryId", event.target.value)}
                        required
                        className={fieldClass}
                      >
                        <option value="">Select sub category</option>
                        {selectedSubCategories.map((subCategory) => (
                          <option key={subCategory._id} value={subCategory._id}>
                            {subCategory.name}
                          </option>
                        ))}
                      </select>
                    </FormLabel>
                    <FormLabel label="Product title">
                      <input
                        value={productForm.title}
                        onChange={(event) => updateProductField("title", event.target.value)}
                        placeholder="Example: Goa 3 Nights Package"
                        required
                        className={fieldClass}
                      />
                    </FormLabel>
                    <FormLabel label="Description">
                      <textarea
                        value={productForm.description}
                        onChange={(event) => updateProductField("description", event.target.value)}
                        required
                        rows={4}
                        className={`${fieldClass} resize-none`}
                      />
                    </FormLabel>
                    <div className="grid gap-5 sm:grid-cols-2">
                      <FormLabel label="Price">
                        <input
                          value={productForm.price}
                          onChange={(event) => updateProductField("price", event.target.value)}
                          placeholder="Price on request"
                          className={fieldClass}
                        />
                      </FormLabel>
                      <FormLabel label="Badge">
                        <input
                          value={productForm.badge}
                          onChange={(event) => updateProductField("badge", event.target.value)}
                          placeholder="Popular"
                          className={fieldClass}
                        />
                      </FormLabel>
                    </div>
                    <FormLabel label="Image">
                      <ImageDropField
                        value={productForm.image}
                        onChange={(path) => updateProductField("image", path)}
                        authHeaders={authHeaders}
                      />
                    </FormLabel>
                    <FormLabel label="Location">
                      <input
                        value={productForm.location}
                        onChange={(event) => updateProductField("location", event.target.value)}
                        placeholder="Goa, India"
                        className={fieldClass}
                      />
                    </FormLabel>
                    <label className="flex items-center gap-2 text-sm font-extrabold">
                      <input
                        type="checkbox"
                        checked={productForm.isActive}
                        onChange={(event) => updateProductField("isActive", event.target.checked)}
                        className="h-4 w-4 rounded border-[#ddd3c2] accent-amber-500"
                      />
                      Active
                    </label>
                    <button
                      type="submit"
                      disabled={catalogSaving || selectedSubCategories.length === 0}
                      className={primaryButtonClass}
                    >
                      <Save size={18} /> Save Product
                    </button>
                  </form>
                </Panel>
              </div>

              <div className="grid gap-8 2xl:grid-cols-3">
                <Panel title="Categories">
                  <div className="grid gap-4">
                    {categories.length === 0 && (
                      <div className="rounded-[22px] border border-dashed border-[#ddd3c2] p-6 text-base font-semibold text-[#8a7a63]">
                        Category nahi hai.
                      </div>
                    )}
                    {categories.map((category) => (
                      <article key={category._id} className="rounded-[22px] border border-[#e5dccb] bg-[#fffaf1] p-5">
                        <div className="flex items-start justify-between gap-4">
                          <div>
                            <div className="flex flex-wrap items-center gap-2">
                              <strong className="text-lg">{category.name}</strong>
                              <StatusPill active={category.isActive} />
                            </div>
                            <p className="mt-1 text-xs font-bold uppercase tracking-wide text-[#8a7a63]">
                              {category.slug}
                            </p>
                            {category.description && (
                              <p className="mt-2 text-sm font-medium text-[#6f6251]">
                                {category.description}
                              </p>
                            )}
                          </div>
                          <div className="flex gap-2">
                            <button
                              type="button"
                              onClick={() => toggleCatalogActive("category", category._id, category.isActive)}
                              className={iconButtonClass}
                              title={category.isActive ? "Hide category" : "Show category"}
                            >
                              {category.isActive ? <EyeOff size={17} /> : <Eye size={17} />}
                            </button>
                            <button
                              type="button"
                              onClick={() => deleteCatalog("category", category._id)}
                              className={`${iconButtonClass} hover:border-red-300 hover:text-red-600`}
                              title="Delete category"
                            >
                              <Trash2 size={17} />
                            </button>
                          </div>
                        </div>
                      </article>
                    ))}
                  </div>
                </Panel>

                <Panel title="Sub Categories">
                  <div className="grid gap-4">
                    {subCategories.length === 0 && (
                      <div className="rounded-[22px] border border-dashed border-[#ddd3c2] p-6 text-base font-semibold text-[#8a7a63]">
                        Sub category nahi hai.
                      </div>
                    )}
                    {subCategories.map((subCategory) => (
                      <article key={subCategory._id} className="rounded-[22px] border border-[#e5dccb] bg-[#fffaf1] p-5">
                        <div className="flex items-start justify-between gap-4">
                          <div>
                            <div className="flex flex-wrap items-center gap-2">
                              <strong className="text-lg">{subCategory.name}</strong>
                              <StatusPill active={subCategory.isActive} />
                            </div>
                            <p className="mt-1 text-xs font-bold uppercase tracking-wide text-[#8a7a63]">
                              {categoryNameById.get(subCategory.categoryId) || "No category"} / {subCategory.slug}
                            </p>
                            {subCategory.description && (
                              <p className="mt-2 text-sm font-medium text-[#6f6251]">
                                {subCategory.description}
                              </p>
                            )}
                          </div>
                          <div className="flex gap-2">
                            <button
                              type="button"
                              onClick={() => toggleCatalogActive("subcategory", subCategory._id, subCategory.isActive)}
                              className={iconButtonClass}
                              title={subCategory.isActive ? "Hide sub category" : "Show sub category"}
                            >
                              {subCategory.isActive ? <EyeOff size={17} /> : <Eye size={17} />}
                            </button>
                            <button
                              type="button"
                              onClick={() => deleteCatalog("subcategory", subCategory._id)}
                              className={`${iconButtonClass} hover:border-red-300 hover:text-red-600`}
                              title="Delete sub category"
                            >
                              <Trash2 size={17} />
                            </button>
                          </div>
                        </div>
                      </article>
                    ))}
                  </div>
                </Panel>

                <Panel title="Products">
                  <div className="grid gap-4">
                    {products.length === 0 && (
                      <div className="rounded-[22px] border border-dashed border-[#ddd3c2] p-6 text-base font-semibold text-[#8a7a63]">
                        Product nahi hai.
                      </div>
                    )}
                    {products.map((product) => (
                      <article key={product._id} className="rounded-[22px] border border-[#e5dccb] bg-[#fffaf1] p-5">
                        <div className="flex items-start justify-between gap-4">
                          <div>
                            <div className="flex flex-wrap items-center gap-2">
                              <strong className="text-lg">{product.title}</strong>
                              <StatusPill active={product.isActive} />
                            </div>
                            <p className="mt-1 text-xs font-bold uppercase tracking-wide text-[#8a7a63]">
                              {categoryNameById.get(product.categoryId) || "No category"} / {subCategoryNameById.get(product.subCategoryId) || "No sub category"}
                            </p>
                            <p className="mt-2 text-sm font-medium text-[#6f6251]">
                              {product.description}
                            </p>
                            <p className="mt-2 text-xs font-bold uppercase tracking-wide text-[#8a7a63]">
                              {product.price || product.badge || product.location || "No extra detail"}
                            </p>
                          </div>
                          <div className="flex gap-2">
                            <button
                              type="button"
                              onClick={() => toggleCatalogActive("product", product._id, product.isActive)}
                              className={iconButtonClass}
                              title={product.isActive ? "Hide product" : "Show product"}
                            >
                              {product.isActive ? <EyeOff size={17} /> : <Eye size={17} />}
                            </button>
                            <button
                              type="button"
                              onClick={() => deleteCatalog("product", product._id)}
                              className={`${iconButtonClass} hover:border-red-300 hover:text-red-600`}
                              title="Delete product"
                            >
                              <Trash2 size={17} />
                            </button>
                          </div>
                        </div>
                      </article>
                    ))}
                  </div>
                </Panel>
              </div>
            </div>
          )}

          {section === "payment-settings" && (
            <div className="grid gap-8">
              <Panel title="Advance Payment Amount">
                <form
                  onSubmit={handlePaymentSettingsSubmit}
                  className="grid max-w-md gap-5"
                >
                  <FormLabel label="Advance amount (INR)">
                    <input
                      type="number"
                      min={1}
                      value={advancePaymentAmount}
                      onChange={(event) => setAdvancePaymentAmount(event.target.value)}
                      placeholder="1000"
                      required
                      className={fieldClass}
                    />
                  </FormLabel>
                  <p className="text-sm font-medium text-[#6f6251]">
                    Yeh amount Contact page ke enquiry form pe advance payment ke roop
                    mein Razorpay se collect hoga.
                  </p>
                  <button
                    type="submit"
                    disabled={paymentSettingsSaving}
                    className={`${primaryButtonClass} justify-self-start`}
                  >
                    {paymentSettingsSaving ? (
                      <LoaderCircle size={18} className="animate-spin" />
                    ) : (
                      <Save size={18} />
                    )}
                    Save Amount
                  </button>
                </form>
              </Panel>
            </div>
          )}
        </main>
      </div>
    </section>
  );
}
