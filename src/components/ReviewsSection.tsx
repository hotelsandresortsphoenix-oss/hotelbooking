"use client";

import { useState, type CSSProperties, type FormEvent } from "react";
import { LoaderCircle, Send, Star } from "lucide-react";
import { Reveal } from "@/components/ui";
import { useToast } from "@/components/ToastProvider";
import type { PublicAdminItem } from "@backend/types";

function initialsFrom(name: string) {
  const parts = name.trim().split(/\s+/).filter(Boolean);
  const initials = parts.slice(0, 2).map((part) => part[0]?.toUpperCase() ?? "");
  return initials.join("") || "?";
}

function StarRow({ rating, size = 15 }: { rating: number; size?: number }) {
  return (
    <div className="flex gap-0.5 text-amber-400">
      {Array.from({ length: 5 }, (_, index) => (
        <Star
          key={index}
          size={size}
          fill={index < rating ? "currentColor" : "none"}
          strokeWidth={1.5}
        />
      ))}
    </div>
  );
}

export function ReviewsSection({
  initialReviews,
}: {
  initialReviews: PublicAdminItem[];
}) {
  const { showToast } = useToast();
  const reviews = initialReviews;
  const [showForm, setShowForm] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [rating, setRating] = useState(5);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);
    const name = String(formData.get("name") || "");
    const text = String(formData.get("text") || "");

    setSubmitting(true);

    try {
      const res = await fetch("/api/reviews", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, text, rating }),
      });
      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Review submit nahi hui.");
      }

      showToast("Thank you! Your review will appear after approval.");
      form.reset();
      setRating(5);
      setShowForm(false);
    } catch (error) {
      showToast(error instanceof Error ? error.message : "Review submit nahi hui.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section className="bg-neutral-950 text-white py-20">
      <div className="mx-auto max-w-7xl px-4">
        <Reveal className="mb-12 flex flex-wrap items-end justify-between gap-6">
          <div className="max-w-2xl">
            <span className="text-xs font-semibold tracking-widest text-amber-400 uppercase">Guest stories</span>
            <h2 className="mt-3 font-[family-name:var(--font-display)] text-3xl sm:text-4xl font-semibold">
              Journeys worth remembering.
            </h2>
            <p className="mt-4 text-neutral-300">
              Real feedback from Phoenix travellers.
            </p>
          </div>
          <button
            type="button"
            onClick={() => setShowForm((current) => !current)}
            className="inline-flex items-center gap-2 rounded-full bg-amber-500 px-6 py-3 text-sm font-semibold text-neutral-900 hover:bg-amber-400 transition-colors"
          >
            {showForm ? "Cancel" : "Write a Review"}
          </button>
        </Reveal>

        {showForm && (
          <Reveal className="mb-12">
            <form
              onSubmit={handleSubmit}
              className="grid gap-5 rounded-2xl border border-white/10 bg-neutral-900 p-6 sm:grid-cols-2"
            >
              <div className="grid gap-1.5">
                <label htmlFor="review-name" className="text-xs font-semibold text-neutral-400">
                  Your name
                </label>
                <input
                  id="review-name"
                  name="name"
                  type="text"
                  required
                  placeholder="Your name"
                  className="rounded-lg border border-neutral-700 bg-neutral-950 px-3 py-2.5 text-sm text-white placeholder:text-neutral-500"
                />
              </div>
              <div className="grid gap-1.5">
                <span className="text-xs font-semibold text-neutral-400">Your rating</span>
                <div className="flex items-center gap-1 py-1">
                  {Array.from({ length: 5 }, (_, index) => {
                    const value = index + 1;
                    return (
                      <button
                        key={value}
                        type="button"
                        onClick={() => setRating(value)}
                        aria-label={`Rate ${value} star${value > 1 ? "s" : ""}`}
                        className="text-amber-400"
                      >
                        <Star size={22} fill={value <= rating ? "currentColor" : "none"} strokeWidth={1.5} />
                      </button>
                    );
                  })}
                </div>
              </div>
              <div className="grid gap-1.5 sm:col-span-2">
                <label htmlFor="review-text" className="text-xs font-semibold text-neutral-400">
                  Your review
                </label>
                <textarea
                  id="review-text"
                  name="text"
                  required
                  minLength={10}
                  rows={4}
                  placeholder="Share your experience with Phoenix Hotels & Resorts"
                  className="resize-none rounded-lg border border-neutral-700 bg-neutral-950 px-3 py-2.5 text-sm text-white placeholder:text-neutral-500"
                />
              </div>
              <button
                type="submit"
                disabled={submitting}
                className="inline-flex items-center justify-center gap-2 rounded-full bg-amber-500 px-6 py-3 text-sm font-semibold text-neutral-900 hover:bg-amber-400 transition-colors disabled:cursor-not-allowed disabled:opacity-60 sm:col-span-2 sm:justify-self-start"
              >
                {submitting ? <LoaderCircle size={18} className="animate-spin" /> : <Send size={18} />}
                {submitting ? "Submitting..." : "Submit Review"}
              </button>
            </form>
          </Reveal>
        )}

        {reviews.length === 0 ? (
          <p className="text-neutral-400">Be the first to share your experience with Phoenix Hotels & Resorts.</p>
        ) : (
          <div
            className="partner-marquee"
            style={{ "--marquee-duration": `${reviews.length * 6}s` } as CSSProperties}
          >
            <div className="partner-marquee-track">
              {[...reviews, ...reviews].map((review, index) => (
                <div key={`${review._id}-${index}`} className="w-80 flex-shrink-0 px-3">
                  <article className="flex h-full flex-col rounded-2xl border border-white/10 bg-neutral-900 p-6">
                    <StarRow rating={review.rating ?? 5} />
                    <blockquote className="mt-3 flex-1 text-sm text-neutral-300">
                      &ldquo;{review.text}&rdquo;
                    </blockquote>
                    <div className="mt-5 flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-amber-500/20 text-xs font-semibold text-amber-400">
                        {initialsFrom(review.title)}
                      </div>
                      <strong className="text-sm">{review.title}</strong>
                    </div>
                  </article>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
