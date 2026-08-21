import type { Metadata } from "next";
import { Cormorant_Garamond, Montserrat } from "next/font/google";
import SmoothScroll from "@/components/SmoothScroll";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FloatingButtons from "@/components/FloatingButtons";
import ToastProvider from "@/components/ToastProvider";
import "./globals.css";

const cormorant = Cormorant_Garamond({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["500", "600", "700"],
});

const montserrat = Montserrat({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Phoenix Hotels & Resorts | Luxury Hotels & Resorts",
  description:
    "Discover luxury hotels, premium resorts, domestic and international destinations and curated holiday packages with Phoenix Hotels & Resorts.",
  keywords: [
    "Phoenix Hotels and Resorts",
    "luxury hotel booking",
    "resort booking",
    "domestic holiday packages",
    "international holiday packages",
    "honeymoon resorts",
    "family vacations",
  ],
  authors: [{ name: "Phoenix Hotels & Resorts" }],
  robots: "index, follow",
  icons: {
    icon: "/icon.png",
    apple: "/apple-icon.png",
  },
  openGraph: {
    title: "Phoenix Hotels & Resorts | Travel Beyond Ordinary",
    description:
      "Explore luxury hotels, beautiful resorts and iconic destinations.",
    type: "website",
    images: ["/images/logo.jpg"],
  },
  verification: {
    google: "npx7C3iU1doAUF3WyBRgrFZSMHp6-9kvdFm3JzqZY_o",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Phoenix Hotels & Resorts",
  description:
    "Luxury hotel, resort and destination holiday planning services.",
  url: "https://www.example.com",
  logo: "/images/logo.jpg",
  sameAs: [],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${cormorant.variable} ${montserrat.variable} h-full antialiased`}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-full flex flex-col font-[family-name:var(--font-body)] bg-white text-neutral-900">
        <SmoothScroll />
        <ToastProvider>
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
          <FloatingButtons />
        </ToastProvider>
      </body>
    </html>
  );
}
