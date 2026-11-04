import React, { useRef } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/**
 * AnimatedTimeline Component
 * - A vertical red line draws itself downward as the user scrolls (scrubbed scaleY).
 * - Each entry's dot pops in with a back.out bounce when the line reaches it.
 * - Cards slide in from alternating sides (left / right) with a smooth fade.
 * - Responsive: Alternates on desktop; on mobile, aligns along the left vertical track.
 * - 60fps GPU acceleration: Animates ONLY transform and opacity with force3D: true.
 * - Respects prefers-reduced-motion.
 */
export default function AnimatedTimeline({ experiences }) {
  const containerRef = useRef(null);
  const lineRef = useRef(null);

  useGSAP(
    () => {
      const prefersReducedMotion =
        typeof window !== "undefined" &&
        window.matchMedia("(prefers-reduced-motion: reduce)").matches;

      const line = lineRef.current;
      const items = gsap.utils.toArray(".timeline-item");
      const dots = gsap.utils.toArray(".timeline-dot");
      const cards = gsap.utils.toArray(".timeline-card-content");

      if (prefersReducedMotion) {
        gsap.set(line, { scaleY: 1 });
        gsap.set(dots, { scale: 1, opacity: 1 });
        gsap.set(cards, { x: 0, opacity: 1 });
        return;
      }

      // 1. Scrubbed vertical red line scaleY downward draw
      gsap.fromTo(
        line,
        { scaleY: 0 },
        {
          scaleY: 1,
          ease: "none",
          force3D: true,
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 72%",
            end: "bottom 75%",
            scrub: 0.5,
          },
        }
      );

      // 2. Individual Entry Dot Bounce + Alternating Card Slide-In
      items.forEach((item, idx) => {
        const dot = item.querySelector(".timeline-dot");
        const card = item.querySelector(".timeline-card-content");
        const isEven = idx % 2 === 0;

        // Dot bounce pop-in
        gsap.fromTo(
          dot,
          { scale: 0, opacity: 0 },
          {
            scale: 1,
            opacity: 1,
            duration: 0.5,
            ease: "back.out(2.2)",
            force3D: true,
            scrollTrigger: {
              trigger: item,
              start: "top 70%",
              toggleActions: "play none none reverse",
            },
          }
        );

        // Alternating side slide-in (Even: from left (-55px), Odd: from right (+55px))
        // On mobile (<768px): always slides from right (+35px)
        const isDesktop = typeof window !== "undefined" && window.innerWidth >= 768;
        const fromX = isDesktop ? (isEven ? -55 : 55) : 35;

        gsap.fromTo(
          card,
          { x: fromX, opacity: 0 },
          {
            x: 0,
            opacity: 1,
            duration: 0.75,
            ease: "power3.out",
            force3D: true,
            scrollTrigger: {
              trigger: item,
              start: "top 72%",
              toggleActions: "play none none reverse",
            },
          }
        );
      });
    },
    { scope: containerRef }
  );

  return (
    <div ref={containerRef} className="relative w-full max-w-5xl mx-auto py-8">
      {/* Background Track Line (Subtle grey) */}
      <div
        className="absolute left-4 md:left-1/2 -translate-x-1/2 top-4 bottom-4 w-1 bg-white/10 rounded-full"
        aria-hidden="true"
      />

      {/* Scrubbed Vertical Red Progress Line */}
      <div
        ref={lineRef}
        className="absolute left-4 md:left-1/2 -translate-x-1/2 top-4 bottom-4 w-1 bg-[#ff004f] rounded-full origin-top scale-y-0 will-change-transform shadow-[0_0_16px_#ff004f]"
        aria-hidden="true"
      />

      {/* Timeline Entries */}
      <div className="space-y-12 sm:space-y-16">
        {experiences.map((item, idx) => {
          const isEven = idx % 2 === 0;

          return (
            <div
              key={idx}
              className={`timeline-item relative flex flex-col md:flex-row items-start md:items-center ${
                isEven ? "md:flex-row" : "md:flex-row-reverse"
              }`}
            >
              {/* Card Container (45% on desktop, full width on mobile) */}
              <div className="w-full md:w-[45%] pl-12 md:pl-0">
                <div className="timeline-card-content bg-[#1a1a1a] border border-white/5 p-6 sm:p-7 rounded-xl hover:border-[#ff004f]/50 hover:bg-[#202020] transition-all duration-300 shadow-xl group will-change-transform">
                  <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                    <h3 className="text-xl sm:text-2xl font-bold text-white group-hover:text-[#ff004f] transition-colors">
                      {item.title}
                    </h3>
                    <span className="text-xs font-semibold px-3 py-1 rounded-full bg-[#ff004f]/20 text-[#ff004f] border border-[#ff004f]/40">
                      {item.period}
                    </span>
                  </div>

                  <span className="text-xs font-semibold text-[#ababab] uppercase tracking-wider block mb-3">
                    {item.badge}
                  </span>

                  <p className="text-sm sm:text-base text-[#ababab] leading-relaxed font-light">
                    {item.role}
                  </p>
                </div>
              </div>

              {/* Center Dot with Bounce Pop-in */}
              <div className="timeline-dot absolute left-4 md:left-1/2 -translate-x-1/2 top-7 md:top-1/2 md:-translate-y-1/2 z-20 will-change-transform">
                <div className="relative flex items-center justify-center">
                  {/* Glowing Ring */}
                  <span className="absolute w-7 h-7 rounded-full bg-[#ff004f]/25 animate-ping" />
                  {/* Solid Center Dot */}
                  <span className="relative w-5 h-5 rounded-full bg-[#ff004f] border-3 border-[#080808] shadow-[0_0_14px_#ff004f]" />
                </div>
              </div>

              {/* Desktop Empty Spacer (opposite 45% side) */}
              <div className="hidden md:block md:w-[45%]" />
            </div>
          );
        })}
      </div>
    </div>
  );
}

