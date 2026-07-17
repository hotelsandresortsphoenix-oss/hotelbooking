"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion, useInView } from "motion/react";
import { ArrowRight } from "lucide-react";

export function Reveal({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.13 });

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ opacity: 0, y: 28 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, ease: "easeOut" }}
    >
      {children}
    </motion.div>
  );
}

export function BurstText({
  text,
  className = "",
  highlightFrom,
  highlightClassName = "",
}: {
  text: string;
  className?: string;
  highlightFrom?: number;
  highlightClassName?: string;
}) {
  const letters = Array.from(text);

  return (
    <motion.span
      className={`inline-block ${className}`}
      initial="hidden"
      animate="visible"
      variants={{
        hidden: {},
        visible: {
          transition: { staggerChildren: 0.035, delayChildren: 0.1 },
        },
      }}
    >
      {letters.map((char, i) => (
        <motion.span
          key={i}
          className={`inline-block ${
            highlightFrom !== undefined && i >= highlightFrom ? highlightClassName : ""
          }`}
          variants={{
            hidden: { opacity: 0, scale: 2.2, y: -30, rotate: -12, filter: "blur(8px)" },
            visible: {
              opacity: 1,
              scale: 1,
              y: 0,
              rotate: 0,
              filter: "blur(0px)",
              transition: { type: "spring", damping: 12, stiffness: 200 },
            },
          }}
        >
          {char === " " ? " " : char}
        </motion.span>
      ))}
    </motion.span>
  );
}

export function ImageReveal({
  src,
  alt,
  className = "",
}: {
  src: string;
  alt: string;
  className?: string;
}) {
  return (
    <div className="absolute inset-0 overflow-hidden">
      <img src={src} alt={alt} loading="lazy" className={className} />
    </div>
  );
}

export function AutoCarousel({ children }: { children: React.ReactNode[] }) {
  const trackRef = useRef<HTMLDivElement>(null);
  const pausedRef = useRef(false);
  const resumeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const isDragging = useRef(false);
  const dragStartX = useRef(0);
  const dragStartScroll = useRef(0);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    let frame: number;
    const speed = 1;

    const tick = () => {
      if (!pausedRef.current) {
        track.scrollLeft += speed;
        const half = track.scrollWidth / 2;
        if (track.scrollLeft >= half) {
          track.scrollLeft -= half;
        }
      }
      frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);

    return () => cancelAnimationFrame(frame);
  }, []);

  const pause = () => {
    pausedRef.current = true;
    if (resumeTimer.current) clearTimeout(resumeTimer.current);
  };

  const scheduleResume = () => {
    if (resumeTimer.current) clearTimeout(resumeTimer.current);
    resumeTimer.current = setTimeout(() => {
      pausedRef.current = false;
    }, 1500);
  };

  const onPointerDown = (e: React.PointerEvent) => {
    const track = trackRef.current;
    if (!track) return;
    isDragging.current = true;
    pause();
    dragStartX.current = e.clientX;
    dragStartScroll.current = track.scrollLeft;
    track.setPointerCapture(e.pointerId);
  };

  const onPointerMove = (e: React.PointerEvent) => {
    if (!isDragging.current) return;
    const track = trackRef.current;
    if (!track) return;
    track.scrollLeft = dragStartScroll.current - (e.clientX - dragStartX.current);
  };

  const onPointerUp = () => {
    isDragging.current = false;
    scheduleResume();
  };

  return (
    <div
      ref={trackRef}
      onMouseEnter={pause}
      onMouseLeave={scheduleResume}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
      onWheel={() => {
        pause();
        scheduleResume();
      }}
      onTouchStart={pause}
      onTouchEnd={scheduleResume}
      className="flex gap-8 overflow-x-auto cursor-grab active:cursor-grabbing select-none [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
    >
      {React.Children.map(children, (child, i) => (
        <React.Fragment key={`a-${i}`}>{child}</React.Fragment>
      ))}
      {React.Children.map(children, (child, i) => (
        <React.Fragment key={`b-${i}`}>{child}</React.Fragment>
      ))}
    </div>
  );
}

export function StackCard({
  index,
  img,
  alt,
  badge,
  title,
  text,
  cta,
}: {
  index: number;
  img: string;
  alt: string;
  badge: string;
  title: string;
  text: string;
  cta?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.5 });

  return (
    <div className="sticky top-24 mb-6 last:mb-0" style={{ zIndex: index + 1 }}>
      <motion.article
        ref={ref}
        initial={{ opacity: 0, scale: 0.94 }}
        animate={inView ? { opacity: 1, scale: 1 } : {}}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="relative overflow-hidden rounded-2xl h-[60vh] max-h-[460px] min-h-[320px] shadow-2xl"
      >
        <ImageReveal src={img} alt={alt} className="h-full w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent" />
        <div className="absolute bottom-0 p-7 w-full text-white">
          <span className="text-xs font-semibold tracking-widest uppercase text-amber-300">{badge}</span>
          <h3 className="mt-2 font-[family-name:var(--font-display)] text-2xl sm:text-3xl font-semibold">{title}</h3>
          <p className="mt-2 text-sm text-neutral-200 max-w-md">{text}</p>
          {cta && (
            <a
              href="/contact"
              className="mt-4 inline-flex items-center gap-2 rounded-full bg-amber-500 px-5 py-2.5 text-sm font-semibold text-neutral-900 hover:bg-amber-400 transition-colors"
            >
              {cta} <ArrowRight size={17} />
            </a>
          )}
        </div>
      </motion.article>
    </div>
  );
}

export function Counter({ target, suffix }: { target: number; suffix: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.6 });
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const increment = Math.max(1, Math.floor(target / 40));
    let current = 0;
    const timer = setInterval(() => {
      current += increment;
      if (current >= target) {
        current = target;
        clearInterval(timer);
      }
      setValue(current);
    }, 35);
    return () => clearInterval(timer);
  }, [inView, target]);

  return (
    <strong ref={ref} className="block font-[family-name:var(--font-display)] text-3xl font-semibold text-white">
      {value}
      {suffix}
    </strong>
  );
}
