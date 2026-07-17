import Link from "next/link";
import type React from "react";
import { ArrowUpRight, BadgeCheck, CalendarCheck, Mail, Phone, Send, Ship } from "lucide-react";
import { Reveal, ImageReveal, StackCard } from "@/components/ui";
import {
  cruiseLines,
  domesticDestinations,
  hotels,
  internationalStack,
  membershipTiers,
  packages,
  resorts,
} from "@/lib/data";

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

export function DomesticGrid() {
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
          {domesticDestinations.map((d) => {
            const Icon = d.icon;
            return (
              <Reveal key={d.title}>
                <article className="diamond-card group relative overflow-hidden h-80">
                  <ImageReveal src={d.img} alt={d.alt} className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent" />
                  <div className="diamond-card-content absolute bottom-0 p-5 w-full">
                    <span className="badge inline-flex items-center gap-1.5 rounded-full bg-white/15 px-3 py-1 text-xs backdrop-blur">
                      <Icon size={13} /> {d.badge}
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

export function InternationalList() {
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

        <div className="relative">
          {internationalStack.map((item, i) => (
            <StackCard key={item.title} index={i} {...item} />
          ))}
        </div>
      </div>
    </section>
  );
}

export function HotelsGrid() {
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
          {hotels.map((h) => (
            <Reveal key={h.title}>
              <article className="overflow-hidden rounded-2xl bg-neutral-900 border border-white/10 h-full">
                <div className="relative h-56">
                  <ImageReveal src={h.img} alt={h.alt} className="h-full w-full object-cover" />
                  <span className="absolute top-3 left-3 z-10 rounded-full bg-amber-500 px-3 py-1 text-xs font-semibold text-neutral-900">
                    {h.label}
                  </span>
                </div>
                <div className="p-5">
                  <div className="flex items-center justify-between text-xs text-neutral-400">
                    <span>{h.location}</span>
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
          ))}
        </div>
      </div>
    </section>
  );
}

export function ResortsGrid() {
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
          {resorts.map((r) => (
            <Reveal key={r.title}>
              <article className="rounded-2xl overflow-hidden bg-white border border-neutral-200 shadow-sm h-full">
                <div className="relative h-56">
                  <ImageReveal src={r.img} alt={r.alt} className="h-full w-full object-cover" />
                  <span className="absolute top-3 left-3 rounded-full bg-amber-500 px-3 py-1 text-xs font-semibold text-neutral-900 z-10">
                    {r.label}
                  </span>
                </div>
                <div className="p-5">
                  <div className="flex items-center justify-between text-xs text-neutral-500">
                    <span>{r.location}</span>
                    <span className="rounded-full bg-amber-100 text-amber-700 px-2.5 py-0.5">{r.tag}</span>
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
          ))}
        </div>
      </div>
    </section>
  );
}

export function CruisesPanel() {
  return (
    <section
      className="relative grid items-center text-white overflow-hidden"
      style={{
        minHeight: "760px",
        background:
          "linear-gradient(90deg, rgba(3,5,8,0.96) 0%, rgba(3,5,8,0.78) 45%, rgba(3,5,8,0.25) 100%), url('/images/destinations/cruise.jpg') center/cover fixed",
      }}
    >
      <div className="relative z-10 mx-auto max-w-7xl px-4 w-full">
        <Reveal className="max-w-[710px]">
          <span className="text-xs font-semibold tracking-widest text-amber-400 uppercase">Cruise holidays</span>
          <h1 className="mt-3 font-[family-name:var(--font-display)] text-4xl sm:text-6xl font-semibold">
            Wake up somewhere new.
          </h1>
          <p className="mt-4 text-neutral-300 max-w-2xl">
            Sail across beautiful coastlines with comfortable accommodation, dining, entertainment and exciting port
            experiences.
          </p>

          <div className="mt-8 flex flex-wrap gap-4">
            <Link href="/contact" className="inline-flex items-center gap-2 rounded-full bg-amber-500 px-6 py-3 text-sm font-semibold text-neutral-900 hover:bg-amber-400 transition-colors">
              <Ship size={18} /> Find My Cruise
            </Link>
            <Link href="/contact" className="inline-flex items-center gap-2 rounded-full border border-white/30 px-6 py-3 text-sm font-semibold hover:bg-white/10 transition-colors">
              Request Sailing Dates
            </Link>
          </div>

          <div className="mt-14 grid sm:grid-cols-3 gap-8 text-left">
            {cruiseLines.map((c) => {
              const Icon = c.icon;
              return (
                <article key={c.title} className="rounded-2xl bg-white/5 border border-white/10 p-6">
                  <Icon size={25} className="text-amber-400" />
                  <h4 className="mt-3 font-[family-name:var(--font-display)] text-lg font-semibold">{c.title}</h4>
                  <p className="mt-2 text-sm text-neutral-300">{c.text}</p>
                </article>
              );
            })}
          </div>
        </Reveal>
      </div>
    </section>
  );
}

export function HolidayStyles() {
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
          {packages.map((p) => {
            const Icon = p.icon;
            return (
              <Reveal key={p.title}>
                <article className="rounded-2xl bg-neutral-900 border border-white/10 p-6 h-full">
                  <div className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-amber-500/15 text-amber-400">
                    <Icon size={22} />
                  </div>
                  <h3 className="mt-4 font-[family-name:var(--font-display)] text-lg font-semibold">{p.title}</h3>
                  <p className="mt-2 text-sm text-neutral-300">{p.text}</p>
                  <Link href="/contact" className="mt-4 inline-block text-sm text-amber-400 hover:text-amber-300">
                    Enquire now -&gt;
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
          {membershipTiers.map((tier) => (
            <Reveal key={tier.name}>
              <article
                className={`rounded-2xl border p-7 h-full ${
                  tier.featured
                    ? "bg-neutral-950 text-white border-amber-400 shadow-2xl"
                    : "bg-white text-neutral-900 border-neutral-200 shadow-sm"
                }`}
              >
                <span className={`text-xs font-semibold tracking-widest uppercase ${tier.featured ? "text-amber-300" : "text-amber-600"}`}>
                  {tier.name}
                </span>
                <h3 className="mt-3 font-[family-name:var(--font-display)] text-3xl font-semibold">{tier.price}</h3>
                <p className={`mt-2 text-sm ${tier.featured ? "text-neutral-300" : "text-neutral-600"}`}>{tier.tagline}</p>
                <ul className="mt-6 space-y-3 text-sm">
                  {tier.perks.map((perk) => (
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
                  Join {tier.name}
                </Link>
              </article>
            </Reveal>
          ))}
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
          <span className="text-sm text-neutral-400">+91 99999 99999</span>
        </div>
      </div>
      <div className="flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-amber-500/15 text-amber-400">
          <Mail size={18} />
        </div>
        <div>
          <strong className="block text-sm">Email</strong>
          <span className="text-sm text-neutral-400">reservations@phoenixhotelsresorts.com</span>
        </div>
      </div>
    </div>
  );
}

export function ContactForm({
  onSubmit,
}: {
  onSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
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
            <option>Cruise holiday</option>
            <option>Membership</option>
          </select>
        </div>
        <div className="grid gap-1.5 sm:col-span-2">
          <label htmlFor="message" className="text-xs font-semibold text-neutral-500">Tell us about your holiday</label>
          <textarea id="message" name="message" placeholder="Destination, dates, travellers and preferences" rows={4} className="rounded-lg border border-neutral-300 px-3 py-2.5 text-sm resize-none" />
        </div>
      </div>

      <button type="submit" className="inline-flex items-center justify-center gap-2 rounded-full bg-amber-500 px-6 py-3 text-sm font-semibold text-neutral-900 hover:bg-amber-400 transition-colors">
        <Send size={18} /> Request My Quote
      </button>
    </form>
  );
}
