"use client";

import { useEffect, useState, type FormEvent } from "react";
import { createPortal } from "react-dom";
import { CreditCard, LoaderCircle, X } from "lucide-react";
import { useToast } from "@/components/ToastProvider";
import { loadRazorpayScript } from "@/lib/razorpay";

export default function HeaderPayButton({ className = "" }: { className?: string }) {
  const { showToast } = useToast();
  const [showModal, setShowModal] = useState(false);
  const [paying, setPaying] = useState(false);

  useEffect(() => {
    if (!showModal) return;

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape" && !paying) {
        setShowModal(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [paying, showModal]);

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

  const modalRoot = typeof document === "undefined" ? null : document.body;
  const modal = showModal ? (
    <div
      className="fixed inset-0 z-[1000] grid place-items-center overflow-y-auto bg-black/78 px-4 py-6 backdrop-blur-sm sm:px-6"
      role="dialog"
      aria-modal="true"
      aria-labelledby="header-pay-title"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget && !paying) {
          setShowModal(false);
        }
      }}
    >
      <div className="relative w-full max-w-[440px] overflow-hidden rounded-[22px] border border-amber-300/20 bg-[#10100e] p-5 text-white shadow-[0_28px_90px_rgba(0,0,0,0.62)] sm:p-7">
        <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-amber-200 via-amber-400 to-amber-700" />
        <div className="flex items-start justify-between gap-5">
          <div>
            <span className="text-[11px] font-bold uppercase tracking-[0.22em] text-amber-300">
              Secure payment
            </span>
            <h3
              id="header-pay-title"
              className="mt-2 font-[family-name:var(--font-display)] text-2xl font-semibold leading-tight"
            >
              Pay Phoenix Hotels &amp; Resorts
            </h3>
            <p className="mt-2 text-sm leading-6 text-neutral-400">
              Enter the amount shared by our team and continue to Razorpay.
            </p>
          </div>
          <button
            type="button"
            onClick={() => setShowModal(false)}
            disabled={paying}
            aria-label="Close payment dialog"
            className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-white/10 bg-white/5 text-neutral-300 transition hover:border-amber-300/40 hover:text-white disabled:cursor-not-allowed disabled:opacity-50"
          >
            <X size={18} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="mt-6 grid gap-5">
          <div className="grid gap-2">
            <label htmlFor="header-pay-amount" className="text-xs font-bold uppercase tracking-[0.14em] text-neutral-400">
              Amount (INR)
            </label>
            <div className="flex overflow-hidden rounded-xl border border-white/12 bg-neutral-950 transition focus-within:border-amber-300/70 focus-within:ring-4 focus-within:ring-amber-300/10">
              <span className="grid w-12 place-items-center border-r border-white/10 text-sm font-bold text-amber-300">
                Rs
              </span>
              <input
                id="header-pay-amount"
                name="amount"
                type="number"
                min={1}
                step="1"
                required
                autoFocus
                placeholder="1000"
                className="min-w-0 flex-1 bg-transparent px-4 py-3.5 text-base font-semibold text-white outline-none placeholder:text-neutral-600"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={paying}
            className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-gradient-to-br from-amber-200 via-amber-400 to-amber-600 px-6 py-3 text-sm font-bold text-neutral-950 shadow-[0_16px_34px_rgba(217,170,78,0.28)] transition hover:-translate-y-0.5 hover:from-amber-100 hover:via-amber-300 hover:to-amber-500 disabled:translate-y-0 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {paying ? (
              <LoaderCircle size={18} className="animate-spin" />
            ) : (
              <CreditCard size={18} />
            )}
            {paying ? "Processing..." : "Continue to Pay"}
          </button>
          <p className="text-center text-xs font-medium text-neutral-500">Secured by Razorpay</p>
        </form>
      </div>
    </div>
  ) : null;

  return (
    <>
      <button
        type="button"
        onClick={() => setShowModal(true)}
        className={`inline-flex items-center justify-center gap-2 rounded-full px-5 py-3 text-sm font-bold text-[#17110a] bg-gradient-to-br from-amber-200 via-amber-400 to-amber-700 shadow-[0_14px_34px_rgba(217,170,78,0.24)] hover:-translate-y-0.5 hover:shadow-[0_20px_42px_rgba(217,170,78,0.34)] transition-all ${className}`}
      >
        <CreditCard size={17} /> Pay Now
      </button>

      {modalRoot && modal ? createPortal(modal, modalRoot) : null}
    </>
  );
}
