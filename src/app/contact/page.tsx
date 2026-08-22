"use client";

import type React from "react";
import { ContactForm, ContactIntro, PageHero } from "@/components/PageSections";
import { Reveal } from "@/components/ui";
import { useToast } from "@/components/ToastProvider";

export default function ContactPage() {
  const { showToast } = useToast();

  const handleContactSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    showToast("Thank you. Your enquiry has been recorded.");
    event.currentTarget.reset();
  };

  return (
    <>
      <PageHero
        eyebrow="Start planning"
        title="Your dream journey begins here."
        text="Share your preferred destination, travel dates and holiday style. Our team will help shortlist suitable options."
        image="/images/destinations/hero-bg.jpg"
        primaryHref="#enquiry"
        primaryLabel="Send Enquiry"
      />
      <section id="enquiry" className="bg-neutral-950 text-white py-20">
        <div className="mx-auto max-w-7xl px-4 grid lg:grid-cols-2 gap-12">
          <Reveal>
            <span className="text-xs font-semibold tracking-widest text-amber-400 uppercase">Contact Phoenix</span>
            <h2 className="mt-3 font-[family-name:var(--font-display)] text-3xl sm:text-4xl font-semibold">
              Tell us what you want to plan.
            </h2>
            <p className="mt-4 text-neutral-300">
              Hotels, resorts, domestic packages, international holidays or membership support - send your
              details and we will get back to you.
            </p>
            <div className="mt-8">
              <ContactIntro />
            </div>
          </Reveal>

          <Reveal>
            <ContactForm onSubmit={handleContactSubmit} />
          </Reveal>
        </div>
      </section>
    </>
  );
}
