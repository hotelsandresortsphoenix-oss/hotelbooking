import Link from "next/link";
import {
  Compass,
  MessageCircle,
  ArrowUpRight,
  Ship,
  Phone,
  Mail,
  Clock3,
  MapPin,
  BadgeCheck,
} from "lucide-react";
import { Reveal, BurstText, ImageReveal, AutoCarousel, StackCard, Counter } from "@/components/ui";
import { HomeContactForm, HomeResortTabs, HomeSearchForm } from "@/components/HomeInteractions";
import { getPublicItems } from "@backend/content";
import {
  heroStats,
  resortTabs,
  benefits,
  testimonials,
  blogPosts,
} from "@/lib/data";

export const dynamic = "force-dynamic";

export default async function Home() {
  const [
    domesticDestinations,
    internationalStack,
    hotels,
    resorts,
    cruiseLines,
    packages,
  ] = await Promise.all([
    getPublicItems("domestic"),
    getPublicItems("international"),
    getPublicItems("hotel"),
    getPublicItems("resort"),
    getPublicItems("cruise"),
    getPublicItems("package"),
  ]);

  return (
    <>
      {/* Hero */}
      <section id="home" className="relative overflow-hidden bg-neutral-950 text-white">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: "url('/images/destinations/hero-bg.jpg')" }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/60 to-neutral-950" />

        <div className="mx-auto max-w-7xl px-4 py-20 lg:py-28 relative z-10">
          <Reveal>
            <div className="inline-block rounded-full bg-white/10 px-4 py-1.5 text-xs tracking-wide text-amber-300 mb-5">
              Luxury stays • remarkable journeys
            </div>
            <h1 className="font-[family-name:var(--font-display)] text-4xl sm:text-5xl lg:text-6xl font-semibold leading-tight">
              <BurstText text="Travel Beyond Ordinary." highlightFrom={14} highlightClassName="text-amber-400" />
            </h1>
            <p className="mt-5 text-neutral-300 max-w-xl">
              Discover carefully selected hotels, iconic resorts, beautiful domestic and international
              destinations, and memorable cruise holidays—designed around your style of travel.
            </p>

            <div className="mt-8 flex flex-wrap gap-4">
              <Link
                href="/india"
                className="inline-flex items-center gap-2 rounded-full bg-amber-500 px-6 py-3 text-sm font-semibold text-neutral-900 hover:bg-amber-400 transition-colors"
              >
                <Compass size={18} /> Explore Destinations
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 rounded-full border border-white/30 px-6 py-3 text-sm font-semibold hover:bg-white/10 transition-colors"
              >
                <MessageCircle size={18} /> Request a Custom Quote
              </Link>
            </div>

            <div className="mt-12 grid grid-cols-3 gap-6 max-w-md">
              {heroStats.map((stat) => (
                <div key={stat.label}>
                  <Counter target={stat.target} suffix={stat.suffix} />
                  <span className="text-xs text-neutral-400">{stat.label}</span>
                </div>
              ))}
            </div>
          </Reveal>

          <HomeSearchForm />
        </div>
      </section>

      {/* Domestic teaser */}
      <section className="bg-neutral-950 text-white py-20">
        <div className="mx-auto max-w-7xl px-4">
          <Reveal className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-12">
            <div className="max-w-2xl">
              <span className="text-xs font-semibold tracking-widest text-amber-400 uppercase">Domestic collection</span>
              <h2 className="mt-3 font-[family-name:var(--font-display)] text-3xl sm:text-4xl font-semibold">
                Incredible India,
                <br />
                beautifully experienced.
              </h2>
              <p className="mt-4 text-neutral-300">
                From royal palace stays in Rajasthan and peaceful Himalayan retreats to tropical backwaters and
                premium beach resorts, explore Indian destinations selected for romance, family travel and elegant
                escapes.
              </p>
            </div>
            <Link href="/india" className="inline-flex items-center gap-1.5 text-amber-400 hover:text-amber-300 font-medium whitespace-nowrap">
              View all India destinations <ArrowUpRight size={17} />
            </Link>
          </Reveal>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {domesticDestinations.slice(0, 3).map((d) => {
              const Icon = MapPin;
              return (
                <Reveal key={d.title}>
                  <article className="diamond-card group relative overflow-hidden h-80">
                    <ImageReveal src={d.img} alt={d.alt} className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent" />
                    <div className="diamond-card-content absolute bottom-0 p-5 w-full">
                      <span className="badge inline-flex items-center gap-1.5 rounded-full bg-white/15 px-3 py-1 text-xs backdrop-blur">
                        <Icon size={13} /> {d.badge ?? "Destination"}
                      </span>
                      <h3 className="mt-2 font-[family-name:var(--font-display)] text-xl font-semibold">{d.title}</h3>
                      <p className="mt-1 text-sm text-neutral-300">{d.text}</p>
                      <Link href="/india" aria-label={`Explore ${d.title}`} className="card-arrow mt-4">
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

      {/* International teaser */}
      <section className="bg-neutral-50 py-20">
        <div className="mx-auto max-w-7xl px-4">
          <Reveal className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-12">
            <div className="max-w-2xl">
              <span className="text-xs font-semibold tracking-widest text-amber-600 uppercase">International journeys</span>
              <h2 className="mt-3 font-[family-name:var(--font-display)] text-3xl sm:text-4xl font-semibold">
                The world is waiting.
              </h2>
              <p className="mt-4 text-neutral-600">
                Explore iconic global destinations through personalised itineraries, premium accommodation,
                carefully selected experiences and seamless travel planning.
              </p>
            </div>
            <Link href="/international" className="inline-flex items-center gap-1.5 text-amber-600 hover:text-amber-700 font-medium whitespace-nowrap">
              View all international journeys <ArrowUpRight size={17} />
            </Link>
          </Reveal>

          <div className="relative">
            {internationalStack.slice(0, 3).map((item, i) => (
              <StackCard
                key={item.title}
                index={i}
                img={item.img}
                alt={item.alt}
                badge={item.badge ?? "International"}
                title={item.title}
                text={item.text}
                cta={item.cta}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Hotels teaser */}
      <section className="bg-neutral-950 text-white py-20">
        <div className="mx-auto max-w-7xl px-4">
          <Reveal className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-12">
            <div className="max-w-2xl">
              <span className="text-xs font-semibold tracking-widest text-amber-400 uppercase">Iconic hotels</span>
              <h2 className="mt-3 font-[family-name:var(--font-display)] text-3xl sm:text-4xl font-semibold">
                Remarkable addresses.
                <br />
                Exceptional stays.
              </h2>
              <p className="mt-4 text-neutral-300">
                Discover renowned hotels celebrated for distinctive architecture, privileged locations, elevated
                dining and memorable hospitality.
              </p>
            </div>
            <Link href="/hotels" className="inline-flex items-center gap-1.5 text-amber-400 hover:text-amber-300 font-medium whitespace-nowrap">
              View all hotels <ArrowUpRight size={17} />
            </Link>
          </Reveal>
        </div>

        <div className="mt-4 px-4">
          <AutoCarousel>
            {hotels.map((h) => (
              <article key={h.title} className="shrink-0 w-[280px] sm:w-[340px] rounded-2xl overflow-hidden bg-neutral-900 border border-white/10">
                <div className="relative h-56">
                  <ImageReveal src={h.img} alt={h.alt} className="h-full w-full object-cover" />
                  <span className="absolute top-3 left-3 rounded-full bg-amber-500 px-3 py-1 text-xs font-semibold text-neutral-900 z-10">
                    {h.label ?? "Featured stay"}
                  </span>
                </div>
                <div className="p-5">
                  <div className="flex items-center justify-between text-xs text-neutral-400">
                    <span>{h.location ?? "Phoenix collection"}</span>
                    <span className="text-amber-400">★★★★★</span>
                  </div>
                  <h3 className="mt-2 font-[family-name:var(--font-display)] text-xl font-semibold">{h.title}</h3>
                  <p className="mt-2 text-sm text-neutral-300">{h.text}</p>
                  <div className="mt-4 flex items-center justify-between text-sm">
                    <strong>Price on request</strong>
                    <Link href="/contact" className="text-amber-400 hover:text-amber-300">
                      Enquire now →
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </AutoCarousel>
        </div>
      </section>

      {/* Resorts teaser */}
      <section className="bg-neutral-50 py-20">
        <div className="mx-auto max-w-7xl px-4">
          <Reveal className="max-w-2xl mb-10">
            <span className="text-xs font-semibold tracking-widest text-amber-600 uppercase">Luxury resorts</span>
            <h2 className="mt-3 font-[family-name:var(--font-display)] text-3xl sm:text-4xl font-semibold">
              Escape beautifully.
            </h2>
            <p className="mt-4 text-neutral-600">
              Reconnect with nature at beachfront resorts, mountain retreats, private pool villas and wellness
              properties selected for complete relaxation.
            </p>
          </Reveal>

          <Reveal>
            <HomeResortTabs tabs={resortTabs} />
          </Reveal>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {resorts.map((r) => (
              <Reveal key={r.title}>
                <article className="rounded-2xl overflow-hidden bg-white border border-neutral-200 shadow-sm">
                  <div className="relative h-56">
                    <ImageReveal src={r.img} alt={r.alt} className="h-full w-full object-cover" />
                    <span className="absolute top-3 left-3 rounded-full bg-amber-500 px-3 py-1 text-xs font-semibold text-neutral-900 z-10">
                      {r.label ?? "Luxury resort"}
                    </span>
                  </div>
                  <div className="p-5">
                    <div className="flex items-center justify-between text-xs text-neutral-500">
                      <span>{r.location ?? "Phoenix collection"}</span>
                      <span className="rounded-full bg-amber-100 text-amber-700 px-2.5 py-0.5">{r.tag ?? "Resort"}</span>
                    </div>
                    <h3 className="mt-2 font-[family-name:var(--font-display)] text-xl font-semibold">{r.title}</h3>
                    <p className="mt-2 text-sm text-neutral-600">{r.text}</p>
                    <div className="mt-4 flex items-center justify-between text-sm">
                      <strong>Tailor-made stay</strong>
                      <Link href="/contact" className="text-amber-600 hover:text-amber-700">
                        View experience →
                      </Link>
                    </div>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>

          <Reveal className="mt-10 text-center">
            <Link href="/resorts" className="inline-flex items-center gap-1.5 text-amber-600 hover:text-amber-700 font-medium">
              View all resorts <ArrowUpRight size={17} />
            </Link>
          </Reveal>
        </div>
      </section>

      {/* Cruises teaser */}
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
            <h2 className="mt-3 font-[family-name:var(--font-display)] text-4xl sm:text-6xl font-semibold">
              Wake up somewhere new.
            </h2>
            <p className="mt-4 text-neutral-300 max-w-2xl">
              Sail across spectacular coastlines with comfortable accommodation, international dining,
              entertainment and exciting port experiences. Choose short domestic escapes or memorable international
              voyages.
            </p>

            <div className="mt-8 flex flex-wrap gap-4">
              <Link href="/cruises" className="inline-flex items-center gap-2 rounded-full bg-amber-500 px-6 py-3 text-sm font-semibold text-neutral-900 hover:bg-amber-400 transition-colors">
                <Ship size={18} /> Find My Cruise
              </Link>
              <Link href="/contact" className="inline-flex items-center gap-2 rounded-full border border-white/30 px-6 py-3 text-sm font-semibold hover:bg-white/10 transition-colors">
                Request Sailing Dates
              </Link>
            </div>

            <div className="mt-14 grid sm:grid-cols-3 gap-8 text-left">
              {cruiseLines.map((c) => {
                const Icon = Ship;
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

      {/* Holiday styles */}
      <section className="bg-neutral-950 text-white py-20">
        <div className="mx-auto max-w-7xl px-4">
          <Reveal className="max-w-2xl mb-12">
            <span className="text-xs font-semibold tracking-widest text-amber-400 uppercase">Holiday styles</span>
            <h2 className="mt-3 font-[family-name:var(--font-display)] text-3xl sm:text-4xl font-semibold">
              Designed around your story.
            </h2>
            <p className="mt-4 text-neutral-300">
              Select a travel style and let Phoenix Hotels & Resorts shape the destination, stay and experiences
              around your preferences.
            </p>
          </Reveal>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {packages.map((p) => {
              const Icon = BadgeCheck;
              return (
                <Reveal key={p.title}>
                  <article className="rounded-2xl bg-neutral-900 border border-white/10 p-6 h-full">
                    <div className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-amber-500/15 text-amber-400">
                      <Icon size={22} />
                    </div>
                    <h3 className="mt-4 font-[family-name:var(--font-display)] text-lg font-semibold">{p.title}</h3>
                    <p className="mt-2 text-sm text-neutral-300">{p.text}</p>
                    <Link href="/contact" className="mt-4 inline-block text-sm text-amber-400 hover:text-amber-300">
                      {p.cta ?? "Enquire now ->"}
                    </Link>
                  </article>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* Why Phoenix */}
      <section className="bg-neutral-50 py-20">
        <div className="mx-auto max-w-7xl px-4 grid lg:grid-cols-2 gap-12 items-center">
          <Reveal>
            <div
              role="img"
              aria-label="Luxury tropical resort selected by Phoenix Hotels and Resorts"
              className="h-80 lg:h-full min-h-[320px] rounded-2xl bg-[url('/images/destinations/atlantis-palm.jpg')] bg-cover bg-center"
            />
          </Reveal>

          <Reveal>
            <span className="text-xs font-semibold tracking-widest text-amber-600 uppercase">Why Phoenix</span>
            <h2 className="mt-3 font-[family-name:var(--font-display)] text-3xl sm:text-4xl font-semibold">
              Every detail,
              <br />
              considered.
            </h2>
            <p className="mt-4 text-neutral-600">
              We combine destination knowledge, quality accommodation options and responsive assistance to help
              create confident, comfortable and memorable journeys.
            </p>

            <div className="mt-8 grid sm:grid-cols-2 gap-6">
              {benefits.map((b) => {
                const Icon = b.icon;
                return (
                  <article key={b.title} className="flex gap-3">
                    <Icon size={24} className="text-amber-600 shrink-0 mt-0.5" />
                    <div>
                      <h4 className="font-semibold">{b.title}</h4>
                      <p className="mt-1 text-sm text-neutral-600">{b.text}</p>
                    </div>
                  </article>
                );
              })}
            </div>
          </Reveal>
        </div>
      </section>

      {/* Partners */}
      <section className="bg-white py-16 border-t border-neutral-100">
        <div className="mx-auto max-w-7xl px-4">
          <Reveal className="max-w-2xl mb-10">
            <span className="text-xs font-semibold tracking-widest text-amber-600 uppercase">Trusted network</span>
            <h2 className="mt-3 font-[family-name:var(--font-display)] text-3xl sm:text-4xl font-semibold">
              Our airline, travel and hospitality partners.
            </h2>
          </Reveal>

          <div className="grid gap-8 sm:grid-cols-3">
            <Reveal>
              <h3 className="text-xs font-semibold tracking-widest text-neutral-500 uppercase mb-4">Airline partners</h3>
              <div className="flex flex-wrap gap-3">
                {["Indigo", "Air Asia", "Air India Express", "Air India"].map((name) => (
                  <span key={name} className="rounded-full border border-neutral-200 bg-white px-4 py-2 text-sm font-medium text-neutral-700 shadow-sm">
                    {name}
                  </span>
                ))}
              </div>
            </Reveal>

            <Reveal>
              <h3 className="text-xs font-semibold tracking-widest text-neutral-500 uppercase mb-4">Travel partners</h3>
              <div className="flex flex-wrap gap-3">
                {["MakeMyTrip", "Booking.com", "Goibibo", "Trivago"].map((name) => (
                  <span key={name} className="rounded-full border border-neutral-200 bg-white px-4 py-2 text-sm font-medium text-neutral-700 shadow-sm">
                    {name}
                  </span>
                ))}
              </div>
            </Reveal>

            <Reveal>
              <h3 className="text-xs font-semibold tracking-widest text-neutral-500 uppercase mb-4">Preferred brands</h3>
              <div className="flex flex-wrap gap-3">
                {[
                  "Royal Orchid Hotels",
                  "The Fern Hotels & Resorts",
                  "Sarovar Portico",
                  "Ramada by Wyndham",
                  "Radisson Blu",
                  "Summit Hotel and Resort",
                  "DLS Resorts",
                  "Perfect Stayz Group",
                ].map((name) => (
                  <span key={name} className="rounded-full border border-neutral-200 bg-white px-4 py-2 text-sm font-medium text-neutral-700 shadow-sm">
                    {name}
                  </span>
                ))}
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="bg-neutral-950 text-white py-20">
        <div className="mx-auto max-w-7xl px-4">
          <Reveal className="max-w-2xl mb-12">
            <span className="text-xs font-semibold tracking-widest text-amber-400 uppercase">Guest stories</span>
            <h2 className="mt-3 font-[family-name:var(--font-display)] text-3xl sm:text-4xl font-semibold">
              Journeys worth remembering.
            </h2>
            <p className="mt-4 text-neutral-300">
              Sample testimonial layout—replace with verified reviews from real Phoenix travellers before publishing.
            </p>
          </Reveal>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {testimonials.map((t) => (
              <Reveal key={t.name}>
                <article className="rounded-2xl bg-neutral-900 border border-white/10 p-6 h-full flex flex-col">
                  <div className="text-amber-400">★★★★★</div>
                  <blockquote className="mt-3 text-sm text-neutral-300 flex-1">&ldquo;{t.quote}&rdquo;</blockquote>
                  <div className="mt-5 flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-amber-500/20 text-amber-400 text-xs font-semibold">
                      {t.initials}
                    </div>
                    <div className="text-sm">
                      <strong className="block">{t.name}</strong>
                      <small className="text-neutral-400">{t.trip}</small>
                    </div>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Blog */}
      <section className="bg-neutral-50 py-20">
        <div className="mx-auto max-w-7xl px-4">
          <Reveal className="max-w-2xl mb-12">
            <span className="text-xs font-semibold tracking-widest text-amber-600 uppercase">Travel inspiration</span>
            <h2 className="mt-3 font-[family-name:var(--font-display)] text-3xl sm:text-4xl font-semibold">
              Ideas for your next escape.
            </h2>
            <p className="mt-4 text-neutral-600">
              SEO-friendly travel guides can help customers compare destinations and strengthen the website&apos;s
              organic search visibility.
            </p>
          </Reveal>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogPosts.map((post) => (
              <Reveal key={post.title}>
                <article className="rounded-2xl overflow-hidden bg-white border border-neutral-200 shadow-sm">
                  <div className="relative h-48">
                    <ImageReveal src={post.img} alt={post.alt} className="h-full w-full object-cover" />
                  </div>
                  <div className="p-5">
                    <small className="text-amber-600 font-semibold uppercase tracking-wide text-xs">{post.label}</small>
                    <h3 className="mt-2 font-[family-name:var(--font-display)] text-lg font-semibold">{post.title}</h3>
                    <p className="mt-2 text-sm text-neutral-600">{post.text}</p>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <section id="contact" className="bg-neutral-950 text-white py-20">
        <div className="mx-auto max-w-7xl px-4 grid lg:grid-cols-2 gap-12">
          <Reveal>
            <span className="text-xs font-semibold tracking-widest text-amber-400 uppercase">Start planning</span>
            <h2 className="mt-3 font-[family-name:var(--font-display)] text-3xl sm:text-4xl font-semibold">
              Your dream journey begins here.
            </h2>
            <p className="mt-4 text-neutral-300">
              Share your preferred destination, travel dates and holiday style. Our team will help shortlist
              suitable hotels, resorts, packages or cruise options.
            </p>

            <div className="mt-8 grid gap-5">
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
                  <span className="text-sm text-neutral-400">hotelsandresortsphoenix@gmail.com</span>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-amber-500/15 text-amber-400">
                  <Clock3 size={18} />
                </div>
                <div>
                  <strong className="block text-sm">Travel assistance</strong>
                  <span className="text-sm text-neutral-400">Monday–Saturday, 9:30 AM–7:00 PM</span>
                </div>
              </div>
            </div>

            <Link href="/contact" className="mt-8 inline-flex items-center gap-1.5 text-amber-400 hover:text-amber-300 font-medium">
              Go to full contact page <ArrowUpRight size={17} />
            </Link>
          </Reveal>

          <Reveal>
            <HomeContactForm />
          </Reveal>
        </div>
      </section>
    </>
  );
}
