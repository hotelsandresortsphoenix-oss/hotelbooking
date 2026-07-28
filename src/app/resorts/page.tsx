import { PageHero, ResortsGrid } from "@/components/PageSections";
import { getPublicItems } from "@backend/content";

export const dynamic = "force-dynamic";

export default async function ResortsPage() {
  const adminItems = await getPublicItems("resort");

  return (
    <>
      <PageHero
        eyebrow="Luxury resorts"
        title="Relaxed escapes, curated for you."
        text="Beach resorts, private islands, family favourites and wellness retreats for holidays that feel effortless."
        image="/images/destinations/atlantis-palm.jpg"
      />
      <ResortsGrid items={adminItems} />
    </>
  );
}
