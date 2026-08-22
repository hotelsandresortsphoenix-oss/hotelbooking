"use client";

import Link from "next/link";
import { useState } from "react";
import { BadgeCheck, CreditCard, LoaderCircle } from "lucide-react";
import { Reveal } from "@/components/ui";
import { useToast } from "@/components/ToastProvider";
import { loadRazorpayScript } from "@/lib/razorpay";
import { membershipTiers } from "@/lib/data";

type MembershipPlanItem = {
  _id?: string;
  name?: string;
  title?: string;
  price?: string;
  tagline?: string;
  text?: string;
  perks?: string[];
  cta?: string;
  featured?: boolean;
};

function hasPayableAmount(price?: string) {
  return typeof price === "string" && /\d/.test(price);
}

export function MembershipPlansList({
  items = membershipTiers,
}: {
  items?: MembershipPlanItem[];
}) {
  const { showToast } = useToast();
  const [payingId, setPayingId] = useState<string | null>(null);
  const planItems: MembershipPlanItem[] = items.length ? items : membershipTiers;

  async function handlePayNow(tier: MembershipPlanItem) {
    if (!tier._id) return;

    setPayingId(tier._id);

    try {
      const scriptLoaded = await loadRazorpayScript();

      if (!scriptLoaded || !window.Razorpay) {
        showToast("Unable to load payment gateway. Please try again.");
        setPayingId(null);
        return;
      }

      const orderRes = await fetch("/api/payment/create-membership-order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ itemId: tier._id }),
      });
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
        description: `${orderData.planName} membership`,
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

            showToast(`Payment received. Welcome to ${orderData.planName}!`);
          } catch (error) {
            showToast(
              error instanceof Error
                ? error.message
                : "Payment verification failed. Please contact us."
            );
          } finally {
            setPayingId(null);
          }
        },
        modal: {
          ondismiss: () => setPayingId(null),
        },
      });

      razorpay.open();
    } catch (error) {
      showToast(error instanceof Error ? error.message : "Unable to start payment.");
      setPayingId(null);
    }
  }

  return (
    <section className="bg-neutral-50 py-20">
      <div className="mx-auto max-w-7xl px-4">
        <Reveal className="max-w-2xl mb-12">
          <span className="text-xs font-semibold tracking-widest text-amber-600 uppercase">Phoenix membership</span>
          <h2 className="mt-3 font-[family-name:var(--font-display)] text-3xl sm:text-4xl font-semibold">
            More value for every journey.
          </h2>
          <p className="mt-4 text-neutral-600">
            Membership options for travellers who want curated offers, better support and added comfort.
          </p>
        </Reveal>

        <div className="grid md:grid-cols-3 gap-8">
          {planItems.map((tier) => {
            const name = tier.name || tier.title || "Membership";
            const tagline = tier.tagline || tier.text || "";
            const cta = tier.cta || `Join ${name}`;
            const payable = hasPayableAmount(tier.price) && Boolean(tier._id);
            const isPaying = payingId === tier._id;

            return (
            <Reveal key={tier._id || name}>
              <article
                className={`rounded-2xl border p-7 h-full flex flex-col ${
                  tier.featured
                    ? "bg-neutral-950 text-white border-amber-400 shadow-2xl"
                    : "bg-white text-neutral-900 border-neutral-200 shadow-sm"
                }`}
              >
                <span className={`text-xs font-semibold tracking-widest uppercase ${tier.featured ? "text-amber-300" : "text-amber-600"}`}>
                  {name}
                </span>
                <h3 className="mt-3 font-[family-name:var(--font-display)] text-3xl font-semibold">{tier.price}</h3>
                <p className={`mt-2 text-sm ${tier.featured ? "text-neutral-300" : "text-neutral-600"}`}>{tagline}</p>
                <ul className="mt-6 space-y-3 text-sm flex-1">
                  {(tier.perks || []).map((perk) => (
                    <li key={perk} className="flex gap-2">
                      <BadgeCheck size={18} className={tier.featured ? "text-amber-300 shrink-0" : "text-amber-600 shrink-0"} />
                      <span>{perk}</span>
                    </li>
                  ))}
                </ul>

                <div className="mt-7 grid gap-3">
                  {payable && (
                    <button
                      type="button"
                      onClick={() => handlePayNow(tier)}
                      disabled={isPaying}
                      className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-gradient-to-br from-amber-200 via-amber-400 to-amber-600 px-5 py-3 text-sm font-semibold text-neutral-900 shadow-[0_10px_24px_rgba(217,170,78,0.28)] transition hover:from-amber-100 hover:via-amber-300 hover:to-amber-500 disabled:cursor-not-allowed disabled:opacity-60"
                    >
                      {isPaying ? (
                        <LoaderCircle size={17} className="animate-spin" />
                      ) : (
                        <CreditCard size={17} />
                      )}
                      {isPaying ? "Processing..." : "Pay Now"}
                    </button>
                  )}
                  <Link
                    href="/contact"
                    className={`inline-flex w-full items-center justify-center gap-2 rounded-full px-5 py-3 text-sm font-semibold transition-colors ${
                      tier.featured
                        ? "bg-amber-500 text-neutral-900 hover:bg-amber-400"
                        : "bg-neutral-900 text-white hover:bg-neutral-800"
                    }`}
                  >
                    {cta}
                  </Link>
                </div>
              </article>
            </Reveal>
          );
          })}
        </div>
      </div>
    </section>
  );
}
