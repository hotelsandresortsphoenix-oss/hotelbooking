"use client";

import { useState } from "react";
import { motion } from "motion/react";
import { Search, Send } from "lucide-react";
import { useToast } from "@/components/ToastProvider";

export function HomeSearchForm() {
  const { showToast } = useToast();

  const handleSearchSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    showToast("Share your details and we will prepare suitable travel options.");
  };

  return (
    <motion.form
      onSubmit={handleSearchSubmit}
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
      className="relative z-[3] mt-14 w-full rounded-[20px] border border-white/18 bg-black/72 backdrop-blur-xl p-3 shadow-[0_24px_70px_rgba(0,0,0,0.24)] grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-[1.25fr_1fr_1fr_0.8fr_auto] divide-y divide-white/10 lg:divide-y-0 lg:divide-x lg:divide-white/10"
    >
      <div className="px-4 py-2.5">
        <label htmlFor="destination" className="block text-[11px] font-bold text-amber-200 uppercase tracking-[0.15em] mb-1">
          Destination
        </label>
        <select id="destination" name="destination" className="w-full bg-transparent text-sm text-white outline-none [&>option]:text-neutral-900">
          <option>Choose a destination</option>
          <option>Udaipur</option>
          <option>Goa</option>
          <option>Kerala</option>
          <option>Maldives</option>
          <option>Dubai</option>
          <option>Bali</option>
        </select>
      </div>

      <div className="px-4 py-2.5">
        <label htmlFor="checkin" className="block text-[11px] font-bold text-amber-200 uppercase tracking-[0.15em] mb-1">
          Check-in
        </label>
        <input id="checkin" name="checkin" type="date" className="w-full bg-transparent text-sm text-white outline-none [color-scheme:dark]" />
      </div>

      <div className="px-4 py-2.5">
        <label htmlFor="checkout" className="block text-[11px] font-bold text-amber-200 uppercase tracking-[0.15em] mb-1">
          Check-out
        </label>
        <input id="checkout" name="checkout" type="date" className="w-full bg-transparent text-sm text-white outline-none [color-scheme:dark]" />
      </div>

      <div className="px-4 py-2.5">
        <label htmlFor="travellers" className="block text-[11px] font-bold text-amber-200 uppercase tracking-[0.15em] mb-1">
          Travellers
        </label>
        <select id="travellers" name="travellers" className="w-full bg-transparent text-sm text-white outline-none [&>option]:text-neutral-900">
          <option>2 Guests</option>
          <option>1 Guest</option>
          <option>3 Guests</option>
          <option>4+ Guests</option>
        </select>
      </div>

      <div className="p-1.5 lg:p-0 lg:pl-3 flex items-stretch">
        <button
          type="submit"
          className="w-full lg:w-auto lg:min-w-[150px] inline-flex items-center justify-center gap-2 rounded-2xl lg:rounded-[14px] bg-gradient-to-br from-amber-200 via-amber-400 to-amber-700 px-6 py-3 text-sm font-bold text-[#17110a] shadow-[0_14px_34px_rgba(217,170,78,0.24)] hover:-translate-y-0.5 hover:shadow-[0_20px_42px_rgba(217,170,78,0.34)] transition-all"
        >
          <Search size={18} /> Search
        </button>
      </div>
    </motion.form>
  );
}

export function HomeResortTabs({ tabs }: { tabs: string[] }) {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <div className="flex flex-wrap gap-3 mb-10">
      {tabs.map((tab, i) => (
        <button
          key={tab}
          type="button"
          onClick={() => setActiveTab(i)}
          className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${
            activeTab === i
              ? "bg-amber-500 text-neutral-900"
              : "bg-white border border-neutral-300 text-neutral-600 hover:border-amber-400"
          }`}
        >
          {tab}
        </button>
      ))}
    </div>
  );
}

export function HomeContactForm() {
  const { showToast } = useToast();

  const handleContactSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    showToast("Thank you. Your enquiry has been recorded.");
    event.currentTarget.reset();
  };

  return (
    <form onSubmit={handleContactSubmit} className="bg-white text-neutral-900 rounded-2xl p-7 grid gap-5">
      <div className="grid sm:grid-cols-2 gap-5">
        <div className="grid gap-1.5">
          <label htmlFor="name" className="text-xs font-semibold text-neutral-500">
            Full name
          </label>
          <input id="name" name="name" type="text" placeholder="Your name" required className="rounded-lg border border-neutral-300 px-3 py-2.5 text-sm" />
        </div>
        <div className="grid gap-1.5">
          <label htmlFor="phone" className="text-xs font-semibold text-neutral-500">
            Phone number
          </label>
          <input id="phone" name="phone" type="tel" placeholder="+91" required className="rounded-lg border border-neutral-300 px-3 py-2.5 text-sm" />
        </div>
        <div className="grid gap-1.5">
          <label htmlFor="email" className="text-xs font-semibold text-neutral-500">
            Email address
          </label>
          <input id="email" name="email" type="email" placeholder="name@example.com" required className="rounded-lg border border-neutral-300 px-3 py-2.5 text-sm" />
        </div>
        <div className="grid gap-1.5">
          <label htmlFor="tripType" className="text-xs font-semibold text-neutral-500">
            Travel interest
          </label>
          <select id="tripType" name="tripType" className="rounded-lg border border-neutral-300 px-3 py-2.5 text-sm">
            <option>Hotel booking</option>
            <option>Resort holiday</option>
            <option>Domestic package</option>
            <option>International package</option>
            <option>Corporate retreat</option>
          </select>
        </div>
        <div className="grid gap-1.5 sm:col-span-2">
          <label htmlFor="message" className="text-xs font-semibold text-neutral-500">
            Tell us about your holiday
          </label>
          <textarea id="message" name="message" placeholder="Destination, dates, travellers and preferences" rows={4} className="rounded-lg border border-neutral-300 px-3 py-2.5 text-sm resize-none" />
        </div>
      </div>

      <button type="submit" className="inline-flex items-center justify-center gap-2 rounded-full bg-amber-500 px-6 py-3 text-sm font-semibold text-neutral-900 hover:bg-amber-400 transition-colors">
        <Send size={18} /> Request My Quote
      </button>
      <p className="text-xs text-neutral-500">
        Demo form: connect this form to your email, CRM or website backend before publishing.
      </p>
    </form>
  );
}
