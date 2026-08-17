import { HotelsGrid, PageHero, ResortsGrid } from "@/components/PageSections";
import { getPublicItems } from "@backend/content";

export const dynamic = "force-dynamic";

export default async function HotelsPage() {
  const [hotels, resorts] = await Promise.all([
    getPublicItems("hotel"),
    getPublicItems("resort"),
  ]);

  return (
    <>
      <PageHero
        eyebrow="Luxury hotels & resorts"
        title="Remarkable hotels for exceptional stays."
        text="Explore iconic city hotels, palace stays, beach resorts and mountain retreats selected for memorable hospitality."
        image="/images/destinations/oberoi-udaivilas.jpg"
      />
      <HotelsGrid items={hotels} />
      <div id="resorts">
        <ResortsGrid items={resorts} />
      </div>
    </>
  );
}
