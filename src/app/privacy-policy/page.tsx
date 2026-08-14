import { LegalPageLayout } from "@/components/LegalPage";

export const metadata = {
  title: "Privacy Policy | Phoenix Hotels & Resorts",
};

export default function PrivacyPolicyPage() {
  return (
    <LegalPageLayout
      title="Privacy Policy"
      intro="Phoenix Hotels & Resorts PVT. LTD."
      sections={[
        {
          heading: "Your Privacy Matters to Us",
          paragraphs: [
            "Your privacy plays an important role for Phoenix Hotels & Resorts PVT. LTD. We believe that our customers have the right to understand the privacy policy we follow. Phoenix Hotels & Resorts PVT. LTD. recognizes the importance of the information that is collected, used, disclosed, and stored.",
            "The purpose of this privacy policy is to inform our customers about the type of personal information we collect and how we use it. We also assure you that your personal information will never be shared with any third parties without your consent or during the time of registration.",
          ],
        },
        {
          heading: "Collection of Personal Information",
          paragraphs: [
            "Personal information refers to valid data that can be used to identify a particular individual and contact them. Phoenix Hotels & Resorts may request customers to share their personal information directly or indirectly through third parties. However, we do not collect any information without your permission or knowledge. Our team takes reasonable steps to ensure the security of the personal information we collect from you.",
          ],
        },
        {
          heading: "Changes to this Privacy Policy",
          paragraphs: [
            "Phoenix Hotels & Resorts PVT. LTD. reserves the right to modify this policy at any time. We recommend users review this page periodically, as we are not responsible if users do not read the updated policy. However, we will notify all our customers about any changes made to the privacy policy through email or postal communication.",
            "If you have any questions or concerns, please feel free to contact us. We value your feedback and are eager to hear your thoughts on our privacy practices.",
            "For more information, write to us at info@phoenixhotelsandresort.in, and we will respond promptly.",
          ],
        },
      ]}
    />
  );
}