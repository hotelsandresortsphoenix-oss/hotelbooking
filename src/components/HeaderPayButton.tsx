"use client";

import { useState, type FormEvent } from "react";
import { CreditCard, LoaderCircle, X } from "lucide-react";
import { useToast } from "@/components/ToastProvider";
import { loadRazorpayScript } from "@/lib/razorpay";

export default function HeaderPayButton({ className = "" }: { className?: string }) {
  const { showToast } = useToast();
  const [showModal, setShowModal] = useState(false);
  const [paying, setPaying] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const amount = Number(formData.get("amount"));

    if (!Number.isFinite(amount) || amount < 1) {
      showToast("Enter a valid amount.");
      return;
    }

    setPaying(true);

    try {
      const scriptLoaded = await loadRazorpayScript();

      if (!scriptLoaded || !window.Razorpay) {
        showToast("Unable to load payment gateway. Please try again.");
        setPaying(false);
        return;
      }

      const orderRes = await fetch("/api/payment/create-custom-order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ amount }),
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
        description: "Payment to Phoenix Hotels & Resorts",
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

            showToast("Payment received. Thank you!");
            setShowModal(false);
          } catch (error) {
            showToast(
              error instanceof Error
                ? error.message
                : "Payment verification failed. Please contact us."
            );
          } finally {
            setPaying(false);
          }
        },
        modal: {
          ondismiss: () => setPaying(false),
        },
      });

      razorpay.open();
    } catch (error) {
      showToast(error instanceof Error ? error.message : "Unable to start payment.");
      setPaying(false);
    }
  }

  return (
    <>
      <button
        type="button"
        onClick={() => setShowModal(true)}
        className={`inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-bold text-[#17110a] bg-gradient-to-br from-amber-200 via-amber-400 to-amber-700 shadow-[0_14px_34px_rgba(217,170,78,0.24)] hover:-translate-y-0.5 hover:shadow-[0_20px_42px_rgba(217,170,78,0.34)] transition-all ${className}`}
      >
        <CreditCard size={17} /> Pay Now
      </button>

      {showModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/70 px-4">
          <div className="w-full max-w-sm rounded-2xl bg-neutral-950 border border-white/10 p-6 text-white">
            <div className="flex items-center justify-between">
              <h3 className="font-[family-name:var(--font-display)] text-xl font-semibold">
                Pay Phoenix Hotels &amp; Resorts
              </h3>
              <button
                type="button"
                onClick={() => setShowModal(false)}
                aria-label="Close"
                className="text-neutral-400 hover:text-white"
              >
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="mt-5 grid gap-4">
              <div className="grid gap-1.5">
                <label htmlFor="header-pay-amount" className="text-xs font-semibold text-neutral-400">
                  Enter amount (₹)
                </label>
                <input
                  id="header-pay-amount"
                  name="amount"
                  type="number"
                  min={1}
                  step="1"
                  required
                  autoFocus
                  placeholder="1000"
                  className="rounded-lg border border-neutral-700 bg-neutral-900 px-3 py-2.5 text-sm text-white placeholder:text-neutral-500"
                />
              </div>

              <button
                type="submit"
                disabled={paying}
                className="inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-br from-amber-200 via-amber-400 to-amber-600 px-6 py-3 text-sm font-bold text-neutral-900 shadow-[0_14px_30px_rgba(217,170,78,0.28)] transition hover:from-amber-100 hover:via-amber-300 hover:to-amber-500 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {paying ? (
                  <LoaderCircle size={18} className="animate-spin" />
                ) : (
                  <CreditCard size={18} />
                )}
                {paying ? "Processing..." : "Continue to Pay"}
              </button>
              <p className="text-center text-xs text-neutral-500">Secured by Razorpay</p>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
