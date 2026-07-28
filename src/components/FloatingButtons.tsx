"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "motion/react";
import { ArrowUp } from "lucide-react";

export default function FloatingButtons() {
  const pathname = usePathname();
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const onScroll = () => setShowScrollTop(window.scrollY > 650);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (pathname.startsWith("/admin")) {
    return null;
  }

  return (
    <>
      <a
        href="https://wa.me/919999999999"
        target="_blank"
        rel="noopener"
        aria-label="Chat with Phoenix Hotels and Resorts on WhatsApp"
        className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-[0_14px_34px_rgba(37,211,102,0.35)] transition-colors hover:bg-[#20bd5a]"
      >
        <svg
          viewBox="0 0 32 32"
          aria-hidden="true"
          className="h-7 w-7 fill-current"
        >
          <path d="M16.02 3.2A12.69 12.69 0 0 0 5.13 22.42L3.8 29l6.74-1.29A12.7 12.7 0 1 0 16.02 3.2Zm0 23.15a10.45 10.45 0 0 1-5.33-1.46l-.38-.23-4 .77.8-3.88-.25-.4A10.46 10.46 0 1 1 16.02 26.35Zm5.77-7.83c-.31-.16-1.86-.92-2.15-1.02-.29-.11-.5-.16-.71.15-.21.32-.82 1.03-1 1.24-.18.21-.37.24-.68.08-.31-.16-1.32-.49-2.52-1.56-.93-.83-1.56-1.86-1.74-2.17-.18-.32-.02-.49.14-.64.14-.14.31-.37.47-.55.16-.18.21-.32.31-.53.11-.21.05-.4-.03-.55-.08-.16-.71-1.71-.97-2.34-.26-.61-.52-.53-.71-.54h-.61c-.21 0-.55.08-.84.4-.29.32-1.1 1.08-1.1 2.62 0 1.55 1.13 3.05 1.29 3.26.16.21 2.22 3.39 5.38 4.75.75.32 1.34.52 1.8.66.76.24 1.45.21 1.99.13.61-.09 1.86-.76 2.13-1.5.26-.74.26-1.37.18-1.5-.08-.13-.29-.21-.6-.37Z" />
        </svg>
      </a>

      <AnimatePresence>
        {showScrollTop && (
          <motion.button
            initial={{ opacity: 0, scale: 0.6, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.6, y: 10 }}
            transition={{ duration: 0.2 }}
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            aria-label="Scroll to top"
            className="fixed bottom-24 right-7 z-50 flex h-12 w-12 items-center justify-center rounded-full bg-amber-500 text-neutral-900 shadow-lg hover:bg-amber-400 transition-colors"
          >
            <ArrowUp />
          </motion.button>
        )}
      </AnimatePresence>
    </>
  );
}
