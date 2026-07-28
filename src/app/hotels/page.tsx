import { HotelsGrid, PageHero } from "@/components/PageSections";
import { getPublicItems } from "@backend/content";

export const dynamic = "force-dynamic";

export default async function HotelsPage() {
  const adminItems = await getPublicItems("hotel");

  return (
    <>
      <PageHero
        eyebrow="Luxury hotels"
        title="Remarkable hotels for exceptional stays."
        text="Explore iconic city hotels, palace stays, island addresses and mountain retreats selected for memorable hospitality."
        image="/images/destinations/oberoi-udaivilas.jpg"
      />
      <HotelsGrid items={adminItems} />
    </>
  );
}
