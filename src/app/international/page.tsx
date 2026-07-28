import { InternationalList, PageHero } from "@/components/PageSections";
import { getPublicItems } from "@backend/content";

export const dynamic = "force-dynamic";

export default async function InternationalPage() {
  const adminItems = await getPublicItems("international");

  return (
    <>
      <PageHero
        eyebrow="International journeys"
        title="Premium holidays across the world."
        text="From Maldives and Dubai to Bali, Singapore, Switzerland and Mauritius, explore global journeys shaped around your travel style."
        image="/images/destinations/maldives.jpg"
      />
      <InternationalList items={adminItems} />
    </>
  );
}
