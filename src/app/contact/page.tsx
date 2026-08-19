"use client";

import type React from "react";
import { useEffect, useState } from "react";
import { ContactForm, ContactIntro, PageHero } from "@/components/PageSections";
import { Reveal } from "@/components/ui";
import { useToast } from "@/components/ToastProvider";

declare global {
  interface Window {
    Razorpay?: new (options: Record<string, unknown>) => {
      open: () => void;
    };
  }
}

function loadRazorpayScript(): Promise<boolean> {
  return new Promise((resolve) => {
    if (window.Razorpay) {
      resolve(true);
      return;
    }

    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });
}

export default function ContactPage() {
  const { showToast } = useToast();
  const [advanceAmount, setAdvanceAmount] = useState<number | null>(null);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    fetch("/api/settings")
      .then((res) => res.json())
      .then((data) => setAdvanceAmount(data.advancePaymentAmount ?? null))
      .catch(() => setAdvanceAmount(null));
  }, []);

  const handleContactSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!advanceAmount) {
      showToast("Payment is not available right now. Please try again shortly.");
      return;
    }

    const form = event.currentTarget;
    const formData = new FormData(form);
    const name = String(formData.get("name") || "");
    const email = String(formData.get("email") || "");
    const phone = String(formData.get("phone") || "");

    setSubmitting(true);

    try {
      const scriptLoaded = await loadRazorpayScript();

      if (!scriptLoaded || !window.Razorpay) {
        showToast("Unable to load payment gateway. Please try again.");
        setSubmitting(false);
        return;
      }

      const orderRes = await fetch("/api/payment/create-order", { method: "POST" });
      const orderData = await orderRes.json();

      if (!orderRes.ok) {
        throw new Error(orderData.error || "Unable to start payment.");
      }

      const razorpay = new window.Razorpay({
        key: orderData.keyId,
        amount: orderData.amount * 100,
        currency: orderData.currency,
        order_id: orderData.orderId,
        name: "Phoenix Hotels & Resorts",
        description: "Booking advance payment",
        prefill: { name, email, contact: phone },
        theme: { color: "#d9aa4e" },
        handler: async (response: {
          razorpay_order_id: string;
          razorpay_payment_id: string;
          razorpay_signature: string;
        }) => {
          try {
            const verifyRes = await fetch("/api/payment/verify", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify(response),
            });
            const verifyData = await verifyRes.json();

            if (!verifyRes.ok || !verifyData.verified) {
              throw new Error("Payment verification failed.");
            }

            showToast("Payment received. Your enquiry has been recorded.");
            form.reset();
          } catch (error) {
            showToast(
              error instanceof Error
                ? error.message
                : "Payment verification failed. Please contact us."
            );
          } finally {
            setSubmitting(false);
          }
        },
        modal: {
          ondismiss: () => setSubmitting(false),
        },
      });

      razorpay.open();
    } catch (error) {
      showToast(error instanceof Error ? error.message : "Unable to start payment.");
      setSubmitting(false);
    }
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
            <ContactForm
              onSubmit={handleContactSubmit}
              submitting={submitting}
              buttonLabel={
                advanceAmount
                  ? `Pay ₹${advanceAmount.toLocaleString("en-IN")} Advance & Submit Enquiry`
                  : "Submit Enquiry"
              }
            />
          </Reveal>
        </div>
      </section>
    </>
  );
}
