import { DomesticGrid, PageHero } from "@/components/PageSections";
import { getPublicItems } from "@backend/content";

export const dynamic = "force-dynamic";

export default async function IndiaPage() {
  const adminItems = await getPublicItems("domestic");

  return (
    <>
      <PageHero
        eyebrow="Domestic holidays"
        title="India, planned beautifully."
        text="Royal palaces, beaches, backwaters, mountains and island escapes with stays selected for comfort and memorable experiences."
        image="/images/destinations/udaipur.jpg"
      />
      <DomesticGrid items={adminItems} />
    </>
  );
}
