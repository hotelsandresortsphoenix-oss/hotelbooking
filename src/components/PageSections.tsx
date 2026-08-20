import Link from "next/link";
import type React from "react";
import {
  ArrowUpRight,
  BadgeCheck,
  CalendarCheck,
  CreditCard,
  LoaderCircle,
  Mail,
  MapPin,
  Phone,
} from "lucide-react";
import { Reveal, ImageReveal } from "@/components/ui";
import type { PublicAdminItem } from "@backend/types";
import { membershipTiers } from "@/lib/data";

export function PageHero({
  eyebrow,
  title,
  text,
  image,
  primaryHref = "/contact",
  primaryLabel = "Plan My Holiday",
}: {
  eyebrow: string;
  title: string;
  text: string;
  image: string;
  primaryHref?: string;
  primaryLabel?: string;
}) {
  return (
    <section className="relative overflow-hidden bg-neutral-950 text-white">
      <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url('${image}')` }} />
      <div className="absolute inset-0 bg-gradient-to-b from-black/76 via-black/58 to-neutral-950" />
      <div className="relative z-10 mx-auto max-w-7xl px-4 py-20 lg:py-28">
        <Reveal className="max-w-3xl">
          <span className="text-xs font-semibold tracking-widest text-amber-300 uppercase">{eyebrow}</span>
          <h1 className="mt-4 font-[family-name:var(--font-display)] text-4xl sm:text-5xl lg:text-6xl font-semibold leading-tight">
            {title}
          </h1>
          <p className="mt-5 max-w-2xl text-neutral-300">{text}</p>
          <Link
            href={primaryHref}
            className="mt-8 inline-flex items-center gap-2 rounded-full bg-amber-500 px-6 py-3 text-sm font-semibold text-neutral-900 hover:bg-amber-400 transition-colors"
          >
            <CalendarCheck size={18} /> {primaryLabel}
          </Link>
        </Reveal>
      </div>
    </section>
  );
}

export function DomesticGrid({
  items = [],
}: {
  items?: PublicAdminItem[];
}) {
  return (
    <section className="bg-neutral-950 text-white py-20">
      <div className="mx-auto max-w-7xl px-4">
        <Reveal className="max-w-2xl mb-12">
          <span className="text-xs font-semibold tracking-widest text-amber-400 uppercase">Domestic collection</span>
          <h2 className="mt-3 font-[family-name:var(--font-display)] text-3xl sm:text-4xl font-semibold">
            Incredible India, beautifully experienced.
          </h2>
          <p className="mt-4 text-neutral-300">
            Choose from royal cities, beaches, backwaters, mountains and island escapes with stays matched to your
            travel style.
          </p>
        </Reveal>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.map((d) => {
            const Icon = MapPin;
            const badge = "badge" in d && d.badge ? d.badge : "Destination";
            return (
              <Reveal key={d.title}>
                <article className="diamond-card group relative overflow-hidden h-80">
                  <ImageReveal src={d.img} alt={d.alt} className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent" />
                  <div className="diamond-card-content absolute bottom-0 p-5 w-full">
                    <span className="badge inline-flex items-center gap-1.5 rounded-full bg-white/15 px-3 py-1 text-xs backdrop-blur">
                      <Icon size={13} /> {badge}
                    </span>
                    <h3 className="mt-2 font-[family-name:var(--font-display)] text-xl font-semibold">{d.title}</h3>
                    <p className="mt-1 text-sm text-neutral-300">{d.text}</p>
                    <Link href="/contact" aria-label={`Enquire for ${d.title}`} className="card-arrow mt-4">
                      <ArrowUpRight size={18} />
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

export function InternationalList({
  items = [],
}: {
  items?: PublicAdminItem[];
}) {
  return (
    <section className="bg-neutral-50 py-20">
      <div className="mx-auto max-w-7xl px-4">
        <Reveal className="max-w-2xl mb-12">
          <span className="text-xs font-semibold tracking-widest text-amber-600 uppercase">International journeys</span>
          <h2 className="mt-3 font-[family-name:var(--font-display)] text-3xl sm:text-4xl font-semibold">
            The world is waiting.
          </h2>
          <p className="mt-4 text-neutral-600">
            Premium stays, seamless planning and destination ideas for island holidays, city breaks, family travel and
            scenic escapes.
          </p>
        </Reveal>

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((item) => {
            const badge = item.badge || "International";

            return (
              <Reveal key={item.title}>
                <article className="overflow-hidden rounded-2xl border border-neutral-200 bg-white shadow-sm h-full">
                  <div className="relative h-56">
                    <ImageReveal src={item.img} alt={item.alt} className="h-full w-full object-cover" />
                    <span className="absolute top-3 left-3 z-10 rounded-full bg-amber-500 px-3 py-1 text-xs font-semibold text-neutral-900">
                      {badge}
                    </span>
                  </div>
                  <div className="p-5">
                    <h3 className="font-[family-name:var(--font-display)] text-xl font-semibold text-neutral-950">
                      {item.title}
                    </h3>
                    <p className="mt-2 text-sm text-neutral-600">{item.text}</p>
                    <div className="mt-4 flex items-center justify-between text-sm">
                      <strong className="text-neutral-900">Custom itinerary</strong>
                      <Link href="/contact" className="text-amber-600 hover:text-amber-700">
                        Enquire now -&gt;
                      </Link>
                    </div>
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

export function HotelsGrid({
  items = [],
}: {
  items?: PublicAdminItem[];
}) {
  return (
    <section className="bg-neutral-950 text-white py-20">
      <div className="mx-auto max-w-7xl px-4">
        <Reveal className="max-w-2xl mb-12">
          <span className="text-xs font-semibold tracking-widest text-amber-400 uppercase">Iconic hotels</span>
          <h2 className="mt-3 font-[family-name:var(--font-display)] text-3xl sm:text-4xl font-semibold">
            Remarkable addresses. Exceptional stays.
          </h2>
          <p className="mt-4 text-neutral-300">
            Explore hotels known for setting, service, architecture and memorable hospitality.
          </p>
        </Reveal>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {items.map((h) => {
            const label = "label" in h && h.label ? h.label : "Featured stay";
            const location = "location" in h && h.location ? h.location : "Phoenix collection";

            return (
            <Reveal key={h.title}>
              <article className="overflow-hidden rounded-2xl bg-neutral-900 border border-white/10 h-full">
                <div className="relative h-56">
                  <ImageReveal src={h.img} alt={h.alt} className="h-full w-full object-cover" />
                  <span className="absolute top-3 left-3 z-10 rounded-full bg-amber-500 px-3 py-1 text-xs font-semibold text-neutral-900">
                    {label}
                  </span>
                </div>
                <div className="p-5">
                  <div className="flex items-center justify-between text-xs text-neutral-400">
                    <span>{location}</span>
                    <span className="text-amber-400">5 star</span>
                  </div>
                  <h3 className="mt-2 font-[family-name:var(--font-display)] text-xl font-semibold">{h.title}</h3>
                  <p className="mt-2 text-sm text-neutral-300">{h.text}</p>
                  <div className="mt-4 flex items-center justify-between text-sm">
                    <strong>Price on request</strong>
                    <Link href="/contact" className="text-amber-400 hover:text-amber-300">
                      Enquire now -&gt;
                    </Link>
                  </div>
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

export function ResortsGrid({
  items = [],
}: {
  items?: PublicAdminItem[];
}) {
  return (
    <section className="bg-neutral-50 py-20">
      <div className="mx-auto max-w-7xl px-4">
        <Reveal className="max-w-2xl mb-12">
          <span className="text-xs font-semibold tracking-widest text-amber-600 uppercase">Luxury resorts</span>
          <h2 className="mt-3 font-[family-name:var(--font-display)] text-3xl sm:text-4xl font-semibold">
            Escape beautifully.
          </h2>
          <p className="mt-4 text-neutral-600">
            Beachfront resorts, private villas, family favourites and quiet retreats for relaxed holidays.
          </p>
        </Reveal>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {items.map((r) => {
            const label = "label" in r && r.label ? r.label : "Luxury resort";
            const location = "location" in r && r.location ? r.location : "Phoenix collection";
            const tag = "tag" in r && r.tag ? r.tag : "Resort";

            return (
            <Reveal key={r.title}>
              <article className="rounded-2xl overflow-hidden bg-white border border-neutral-200 shadow-sm h-full">
                <div className="relative h-56">
                  <ImageReveal src={r.img} alt={r.alt} className="h-full w-full object-cover" />
                  <span className="absolute top-3 left-3 rounded-full bg-amber-500 px-3 py-1 text-xs font-semibold text-neutral-900 z-10">
                    {label}
                  </span>
                </div>
                <div className="p-5">
                  <div className="flex items-center justify-between text-xs text-neutral-500">
                    <span>{location}</span>
                    <span className="rounded-full bg-amber-100 text-amber-700 px-2.5 py-0.5">{tag}</span>
                  </div>
                  <h3 className="mt-2 font-[family-name:var(--font-display)] text-xl font-semibold">{r.title}</h3>
                  <p className="mt-2 text-sm text-neutral-600">{r.text}</p>
                  <div className="mt-4 flex items-center justify-between text-sm">
                    <strong>Tailor-made stay</strong>
                    <Link href="/contact" className="text-amber-600 hover:text-amber-700">
                      View experience -&gt;
                    </Link>
                  </div>
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

export function HolidayStyles({
  items = [],
}: {
  items?: PublicAdminItem[];
}) {
  return (
    <section className="bg-neutral-950 text-white py-20">
      <div className="mx-auto max-w-7xl px-4">
        <Reveal className="max-w-2xl mb-12">
          <span className="text-xs font-semibold tracking-widest text-amber-400 uppercase">Holiday styles</span>
          <h2 className="mt-3 font-[family-name:var(--font-display)] text-3xl sm:text-4xl font-semibold">
            Designed around your story.
          </h2>
          <p className="mt-4 text-neutral-300">
            Select a travel style and let Phoenix shape the destination, stay and experiences around your preferences.
          </p>
        </Reveal>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {items.map((p) => {
            const Icon = BadgeCheck;
            const cta = "cta" in p && p.cta ? p.cta : "Enquire now ->";
            return (
              <Reveal key={p.title}>
                <article className="rounded-2xl bg-neutral-900 border border-white/10 p-6 h-full">
                  <div className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-amber-500/15 text-amber-400">
                    <Icon size={22} />
                  </div>
                  <h3 className="mt-4 font-[family-name:var(--font-display)] text-lg font-semibold">{p.title}</h3>
                  <p className="mt-2 text-sm text-neutral-300">{p.text}</p>
                  <Link href="/contact" className="mt-4 inline-block text-sm text-amber-400 hover:text-amber-300">
                    {cta}
                  </Link>
                </article>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export function MembershipPlans() {
  return <MembershipPlansList items={membershipTiers} />;
}

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

export function MembershipPlansList({
  items = membershipTiers,
}: {
  items?: MembershipPlanItem[];
}) {
  const planItems: MembershipPlanItem[] = items.length ? items : membershipTiers;

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

            return (
            <Reveal key={tier._id || name}>
              <article
                className={`rounded-2xl border p-7 h-full ${
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
                <ul className="mt-6 space-y-3 text-sm">
                  {(tier.perks || []).map((perk) => (
                    <li key={perk} className="flex gap-2">
                      <BadgeCheck size={18} className={tier.featured ? "text-amber-300 shrink-0" : "text-amber-600 shrink-0"} />
                      <span>{perk}</span>
                    </li>
                  ))}
                </ul>
                <Link
                  href="/contact"
                  className={`mt-7 inline-flex w-full items-center justify-center gap-2 rounded-full px-5 py-3 text-sm font-semibold transition-colors ${
                    tier.featured
                      ? "bg-amber-500 text-neutral-900 hover:bg-amber-400"
                      : "bg-neutral-900 text-white hover:bg-neutral-800"
                  }`}
                >
                  {cta}
                </Link>
              </article>
            </Reveal>
          );
          })}
        </div>
      </div>
    </section>
  );
}

export function ContactIntro() {
  return (
    <div className="grid gap-5">
      <div className="flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-amber-500/15 text-amber-400">
          <Phone size={18} />
        </div>
        <div>
          <strong className="block text-sm">Call or WhatsApp</strong>
          <span className="text-sm text-neutral-400">+91 95868 17554</span>
        </div>
      </div>
      <div className="flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-amber-500/15 text-amber-400">
          <Mail size={18} />
        </div>
        <div>
          <strong className="block text-sm">Email</strong>
          <span className="text-sm text-neutral-400">info@phoenixhotelsandresort.in</span>
        </div>
      </div>
    </div>
  );
}

export function ContactForm({
  onSubmit,
  submitting = false,
  buttonLabel = "Request My Quote",
}: {
  onSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
  submitting?: boolean;
  buttonLabel?: string;
}) {
  return (
    <form onSubmit={onSubmit} className="bg-white text-neutral-900 rounded-2xl p-7 grid gap-5">
      <div className="grid sm:grid-cols-2 gap-5">
        <div className="grid gap-1.5">
          <label htmlFor="name" className="text-xs font-semibold text-neutral-500">Full name</label>
          <input id="name" name="name" type="text" placeholder="Your name" required className="rounded-lg border border-neutral-300 px-3 py-2.5 text-sm" />
        </div>
        <div className="grid gap-1.5">
          <label htmlFor="phone" className="text-xs font-semibold text-neutral-500">Phone number</label>
          <input id="phone" name="phone" type="tel" placeholder="+91" required className="rounded-lg border border-neutral-300 px-3 py-2.5 text-sm" />
        </div>
        <div className="grid gap-1.5">
          <label htmlFor="email" className="text-xs font-semibold text-neutral-500">Email address</label>
          <input id="email" name="email" type="email" placeholder="name@example.com" required className="rounded-lg border border-neutral-300 px-3 py-2.5 text-sm" />
        </div>
        <div className="grid gap-1.5">
          <label htmlFor="tripType" className="text-xs font-semibold text-neutral-500">Travel interest</label>
          <select id="tripType" name="tripType" className="rounded-lg border border-neutral-300 px-3 py-2.5 text-sm">
            <option>Hotel booking</option>
            <option>Resort holiday</option>
            <option>Domestic package</option>
            <option>International package</option>
            <option>Membership</option>
          </select>
        </div>
        <div className="grid gap-1.5 sm:col-span-2">
          <label htmlFor="message" className="text-xs font-semibold text-neutral-500">Tell us about your holiday</label>
          <textarea id="message" name="message" placeholder="Destination, dates, travellers and preferences" rows={4} className="rounded-lg border border-neutral-300 px-3 py-2.5 text-sm resize-none" />
        </div>
      </div>

      <div className="rounded-2xl border border-neutral-200 bg-neutral-950 p-6 text-center">
        <span className="text-xs font-semibold tracking-widest text-amber-400 uppercase">
          Complete your payment
        </span>
        <p className="mt-2 text-sm text-neutral-300">
          Complete your payment securely with Razorpay.
        </p>
        <button
          type="submit"
          disabled={submitting}
          className="mt-5 inline-flex w-full items-center justify-center gap-3 rounded-2xl bg-gradient-to-br from-amber-200 via-amber-400 to-amber-600 px-6 py-4 text-neutral-900 shadow-[0_14px_30px_rgba(217,170,78,0.28)] transition hover:from-amber-100 hover:via-amber-300 hover:to-amber-500 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {submitting ? (
            <LoaderCircle size={22} className="animate-spin" />
          ) : (
            <CreditCard size={22} />
          )}
          <span className="text-left leading-tight">
            <span className="block text-base font-extrabold">
              {submitting ? "Processing..." : buttonLabel}
            </span>
            <span className="block text-xs font-medium italic text-neutral-800/80">
              Secured by Razorpay
            </span>
          </span>
        </button>
      </div>
    </form>
  );
}
