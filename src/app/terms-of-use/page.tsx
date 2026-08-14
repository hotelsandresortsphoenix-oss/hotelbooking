import { LegalPageLayout } from "@/components/LegalPage";

export const metadata = {
  title: "Terms of Use | Phoenix Hotels & Resorts",
};

export default function TermsOfUsePage() {
  return (
    <LegalPageLayout
      title="Terms of Use"
      sections={[
        {
          heading: "Use of Personal Information",
          paragraphs: [
            "We use the personal information of the users in a beneficial way for both parties. The collected information is used and may be transferred to third parties for booking, enquiry, and transaction processes. You should know that the information gathered from you will be processed outside India as we may need to arrange the products and services requested by you. Customers will be requested to confirm their acceptance of sharing information at the time of booking.",
            "The personal information collected from you will be used to send Phoenix Hotels & Resorts latest product announcements, promotions, offers, and events. We are glad to inform you that this helps us improve our products and offerings to a great extent. Customers have the option to unsubscribe from announcements at any point in time.",
            "We mainly use your information to upgrade our current products, services, content, and advertising. Sometimes, the collected personal information will also be used internally for research, analysis, and auditing.",
          ],
        },
        {
          heading: "Use of Cookies and Technologies",
          paragraphs: [
            "Cookies play an important role in offering the best user experience for all our valued customers. Most web browsers accept cookies by default, while others may require adjustments to your browser settings. However, users can easily control and delete the required cookies at any time.",
            "We use cookies to enhance our online services, applications, advertisements, and email communications. Generally, cookies help identify certain details like passwords, pages visited, session tracking on our website, and so on.",
            "Phoenix Hotels & Resorts assures you that we do not use cookies to identify your personal information or share your privacy with any third parties.",
          ],
        },
        {
          heading: "Disclosure to Third Parties",
          paragraphs: [
            "Phoenix Hotels & Resorts has the right to share personal information as required with third parties, mainly for matters relating to bookings, reservations, blocking, or any other activity initiated by users.",
          ],
        },
        {
          heading: "Disclaimer",
          paragraphs: [
            "This website is designed and developed by a third-party developer. The website developer is not involved in any transactions, bookings, payments, refunds, or service delivery. All payments, refunds, and services are solely the responsibility of the business owner. Any disputes regarding bookings or payments must be addressed directly with the company.",
          ],
        },
        {
          heading: "Service Providers and Partners",
          paragraphs: [
            "Phoenix Hotels & Resorts may disclose personal information to companies that provide services such as data processing, customer data development, conducting customer research, and satisfaction surveys.",
          ],
        },
        {
          heading: "With Whom Your Personal Information is Shared?",
          paragraphs: [
            "We usually share anonymous information and reports with our trusted suppliers, advertisers, or potential business partners. Phoenix Hotels & Resorts requests all customers to read the privacy policy carefully before completing any booking process. This allows you to better understand how we operate and protect your data.",
            "Customers generally share their personal information in the following scenarios:",
            "When booking tickets or holiday packages through our website, you may be asked for personal details via email, letter, fax, or other means.",
            "During registration, our customer service team may request your participation in competitions or to subscribe to promotional newsletters.",
            "When participating in surveys, you may be directed to a form asking for personal details. Your privacy is 100% protected by us.",
          ],
        },
      ]}
    />
  );
}
