import { MembershipPlans, PageHero } from "@/components/PageSections";

export default function MembershipPage() {
  return (
    <>
      <PageHero
        eyebrow="Phoenix membership"
        title="Travel privileges for every journey."
        text="Choose a membership plan for curated offers, priority assistance and added comfort across hotels, resorts and holidays."
        image="/images/destinations/hero-bg.jpg"
      />
      <MembershipPlans />
    </>
  );
}
