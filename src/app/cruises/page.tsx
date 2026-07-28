import { CruisesPanel, HolidayStyles } from "@/components/PageSections";
import { getPublicItems } from "@backend/content";

export const dynamic = "force-dynamic";

export default async function CruisesPage() {
  const [adminCruises, adminPackages] = await Promise.all([
    getPublicItems("cruise"),
    getPublicItems("package"),
  ]);

  return (
    <>
      <CruisesPanel lines={adminCruises} />
      <HolidayStyles items={adminPackages} />
    </>
  );
}
