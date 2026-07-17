import { DomesticGrid, PageHero } from "@/components/PageSections";

export default function IndiaPage() {
  return (
    <>
      <PageHero
        eyebrow="Domestic holidays"
        title="India, planned beautifully."
        text="Royal palaces, beaches, backwaters, mountains and island escapes with stays selected for comfort and memorable experiences."
        image="/images/destinations/udaipur.jpg"
      />
      <DomesticGrid />
    </>
  );
}
