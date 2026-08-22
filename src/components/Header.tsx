"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Phone, Mail, Sparkles, CalendarCheck, Menu, X } from "lucide-react";
import { navItems } from "@/lib/data";
import HeaderPayButton from "@/components/HeaderPayButton";

export default function Header() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 55);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const closeMenu = () => setMenuOpen(false);

  if (pathname.startsWith("/admin")) {
    return null;
  }

  return (
    <>
      {/* Top bar */}
      <div className="bg-black text-[#cfc9bd] text-xs border-b border-white/10">
        <div className="mx-auto max-w-7xl px-4 min-h-[38px] flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-6">
            <span className="flex items-center gap-2">
              <Phone size={14} /> +91 95868 17554
            </span>
            <span className="hidden sm:flex items-center gap-2">
              <Mail size={14} /> info@phoenixhotelsandresort.in
            </span>
          </div>
          <span className="flex items-center gap-2 text-amber-300">
            <Sparkles size={14} /> Curated luxury journeys worldwide
          </span>
        </div>
      </div>

      {/* Header */}
      <header
        className={`sticky top-0 z-40 transition-all duration-300 ${
          scrolled
            ? "bg-black/92 backdrop-blur-xl border-b border-amber-300/20 shadow-[0_12px_34px_rgba(0,0,0,0.22)]"
            : "bg-[#090806]/86 backdrop-blur-xl border-b border-white/10"
        }`}
      >
        <nav className="mx-auto max-w-7xl px-4 flex items-center justify-between gap-4 min-h-[74px] lg:min-h-[88px]">
          <Link href="/" className="flex items-center gap-3 shrink-0" aria-label="Phoenix Hotels and Resorts home">
            <Image
              src="/images/logo.jpg"
              alt="Phoenix Hotels and Resorts logo"
              width={58}
              height={58}
              className="rounded-[10px] object-contain lg:w-[70px] lg:h-[70px]"
            />
            <span className="flex flex-col leading-none">
              <strong className="font-[family-name:var(--font-display)] text-xl lg:text-2xl tracking-[0.08em] text-amber-200">
                PHOENIX
              </strong>
              <small className="mt-1 text-[9px] lg:text-[10px] tracking-[0.32em] text-amber-100/70">
                HOTELS &amp; RESORTS
              </small>
            </span>
          </Link>

          <ul className="hidden lg:flex items-center gap-5 text-sm font-semibold">
            {navItems.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  aria-current={pathname === item.href ? "page" : undefined}
                  className={`nav-link-underline py-3 transition-colors ${
                    pathname === item.href
                      ? "text-amber-200"
                      : "text-[#f4efe4]/88 hover:text-amber-200"
                  }`}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>

          <div className="hidden lg:flex items-center gap-2.5">
            <Link
              href="/contact"
              className="inline-flex items-center justify-center gap-2 rounded-full px-5 py-3 text-sm font-bold text-[#17110a] bg-gradient-to-br from-amber-200 via-amber-400 to-amber-700 shadow-[0_14px_34px_rgba(217,170,78,0.24)] hover:-translate-y-0.5 hover:shadow-[0_20px_42px_rgba(217,170,78,0.34)] transition-all"
            >
              <CalendarCheck size={17} /> Plan My Holiday
            </Link>
            <HeaderPayButton />
          </div>

          <button
            onClick={() => setMenuOpen((o) => !o)}
            aria-label="Open navigation menu"
            aria-expanded={menuOpen}
            className="lg:hidden inline-flex items-center justify-center rounded-full border border-amber-300/25 bg-white/5 text-white p-2.5"
          >
            {menuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </nav>

        <AnimatePresence>
          {menuOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.25, ease: "easeInOut" }}
              className="lg:hidden overflow-hidden border-t border-amber-300/15 bg-black/98"
            >
              <ul className="flex flex-col px-4 py-3 text-sm font-medium">
                {navItems.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      onClick={closeMenu}
                    aria-current={pathname === item.href ? "page" : undefined}
                    className={`block py-2.5 font-[family-name:var(--font-display)] text-2xl border-b border-white/10 last:border-none ${
                      pathname === item.href ? "text-amber-200" : "text-[#eee8dc]"
                    }`}
                  >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
              <div className="px-4 pb-5">
                <HeaderPayButton className="w-full justify-center" />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>
    </>
  );
}
