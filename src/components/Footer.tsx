"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { useToast } from "@/components/ToastProvider";

export default function Footer() {
  const { showToast } = useToast();

  const handleNewsletterSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    showToast("Thank you for subscribing.");
    event.currentTarget.reset();
  };

  return (
    <footer className="bg-black text-neutral-400 py-16">
      <div className="mx-auto max-w-7xl px-4">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-10">
          <div>
            <Image src="/images/logo.jpg" alt="Phoenix Hotels and Resorts" width={40} height={40} className="rounded-full object-cover" />
            <p className="mt-4 text-sm leading-relaxed">
              Phoenix Hotels & Resorts brings together luxury stays, inspiring destinations and carefully planned
              cruise experiences for travellers seeking comfort, quality and memorable moments.
            </p>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-4">Explore</h4>
            <ul className="space-y-2.5 text-sm">
              <li><Link href="/india" className="hover:text-white">Domestic destinations</Link></li>
              <li><Link href="/international" className="hover:text-white">International destinations</Link></li>
              <li><Link href="/hotels" className="hover:text-white">Luxury hotels</Link></li>
              <li><Link href="/resorts" className="hover:text-white">Premium resorts</Link></li>
              <li><Link href="/cruises" className="hover:text-white">Cruise holidays</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-4">Holiday Types</h4>
            <ul className="space-y-2.5 text-sm">
              <li><Link href="/membership" className="hover:text-white">Membership plans</Link></li>
              <li><Link href="/contact" className="hover:text-white">Honeymoon packages</Link></li>
              <li><Link href="/contact" className="hover:text-white">Family holidays</Link></li>
              <li><Link href="/contact" className="hover:text-white">Luxury escapes</Link></li>
              <li><Link href="/contact" className="hover:text-white">Corporate retreats</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-4">Travel Notes</h4>
            <p className="text-xs text-neutral-500">Receive destination ideas, seasonal offers and travel inspiration.</p>
            <form onSubmit={handleNewsletterSubmit} className="mt-4 flex overflow-hidden rounded-full border border-neutral-700">
              <input type="email" aria-label="Email address for newsletter" placeholder="Your email" required className="flex-1 bg-transparent px-4 py-2.5 text-sm text-white placeholder:text-neutral-500 outline-none" />
              <button type="submit" aria-label="Subscribe" className="flex items-center justify-center px-4 bg-amber-500 text-neutral-900">
                <ArrowRight size={18} />
              </button>
            </form>
          </div>
        </div>

        <div className="mt-12 border-t border-neutral-800 pt-6 flex flex-col sm:flex-row justify-between gap-2 text-xs">
          <span>© 2026 Phoenix Hotels & Resorts. All rights reserved.</span>
          <span>Property and cruise names are shown for travel inspiration; availability and commercial terms require confirmation.</span>
        </div>
      </div>
    </footer>
  );
}
