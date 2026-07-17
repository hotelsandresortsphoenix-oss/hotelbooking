import { InternationalList, PageHero } from "@/components/PageSections";

export default function InternationalPage() {
  return (
    <>
      <PageHero
        eyebrow="International journeys"
        title="Premium holidays across the world."
        text="From Maldives and Dubai to Bali, Singapore, Switzerland and Mauritius, explore global journeys shaped around your travel style."
        image="/images/destinations/maldives.jpg"
      />
      <InternationalList />
    </>
  );
}
