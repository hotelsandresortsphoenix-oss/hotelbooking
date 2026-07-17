import { PageHero, ResortsGrid } from "@/components/PageSections";

export default function ResortsPage() {
  return (
    <>
      <PageHero
        eyebrow="Luxury resorts"
        title="Relaxed escapes, curated for you."
        text="Beach resorts, private islands, family favourites and wellness retreats for holidays that feel effortless."
        image="/images/destinations/atlantis-palm.jpg"
      />
      <ResortsGrid />
    </>
  );
}
