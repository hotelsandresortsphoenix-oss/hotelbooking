import { PageHero } from "@/components/PageSections";
import { MembershipPlansList } from "@/components/MembershipPlans";
import { getPublicItems } from "@backend/content";

export const dynamic = "force-dynamic";

export default async function MembershipPage() {
  const membershipPlans = await getPublicItems("membership");

  return (
    <>
      <PageHero
        eyebrow="Phoenix membership"
        title="Travel privileges for every journey."
        text="Choose a membership plan for curated offers, priority assistance and added comfort across hotels, resorts and holidays."
        image="/images/destinations/hero-bg.jpg"
      />
      <MembershipPlansList items={membershipPlans} />
    </>
  );
}
