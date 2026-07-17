import { HotelsGrid, PageHero } from "@/components/PageSections";

export default function HotelsPage() {
  return (
    <>
      <PageHero
        eyebrow="Luxury hotels"
        title="Remarkable hotels for exceptional stays."
        text="Explore iconic city hotels, palace stays, island addresses and mountain retreats selected for memorable hospitality."
        image="/images/destinations/oberoi-udaivilas.jpg"
      />
      <HotelsGrid />
    </>
  );
}
