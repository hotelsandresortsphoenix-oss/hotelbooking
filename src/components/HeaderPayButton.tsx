"use client";

import { useState } from "react";
import { CreditCard, LoaderCircle } from "lucide-react";
import { useToast } from "@/components/ToastProvider";
import { loadRazorpayScript } from "@/lib/razorpay";

export default function HeaderPayButton({ className = "" }: { className?: string }) {
  const { showToast } = useToast();
  const [paying, setPaying] = useState(false);

  async function handlePayNow() {
    setPaying(true);

    try {
      const scriptLoaded = await loadRazorpayScript();

      if (!scriptLoaded || !window.Razorpay) {
        showToast("Unable to load payment gateway. Please try again.");
        setPaying(false);
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

            showToast("Payment received. Our team will contact you shortly.");
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
    <button
      type="button"
      onClick={handlePayNow}
      disabled={paying}
      className={`inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-bold text-[#17110a] bg-gradient-to-br from-amber-200 via-amber-400 to-amber-700 shadow-[0_14px_34px_rgba(217,170,78,0.24)] hover:-translate-y-0.5 hover:shadow-[0_20px_42px_rgba(217,170,78,0.34)] transition-all disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:translate-y-0 ${className}`}
    >
      {paying ? <LoaderCircle size={17} className="animate-spin" /> : <CreditCard size={17} />}
      {paying ? "Processing..." : "Pay Now"}
    </button>
  );
}
