import React, { useRef } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const MARQUEE_ITEMS = [
  "REACT",
  "NODE.JS",
  "MONGODB",
  "EXPRESS",
  "FULL STACK",
  "AI",
];

/**
 * RibbonMarqueeDivider Component
 * - Two full-width ribbons crossing at -3° and +3°
 * - Ribbon 1: Solid red (#ff004f) with crisp white text
 * - Ribbon 2: White with red (#ff004f) text and red borders
 * - Infinite scroll in opposite directions
 * - Reacts dynamically to scroll velocity, smoothly easing back to idle speed
 * - 60fps GPU acceleration: Animates ONLY transform (xPercent) with force3D
 * - Respects prefers-reduced-motion
 */
export default function RibbonMarqueeDivider() {
  const containerRef = useRef(null);
  const track1Ref = useRef(null);
  const track2Ref = useRef(null);

  useGSAP(
    () => {
      const prefersReducedMotion =
        typeof window !== "undefined" &&
        window.matchMedia("(prefers-reduced-motion: reduce)").matches;

      if (prefersReducedMotion) {
        return;
      }

      const track1 = track1Ref.current;
      const track2 = track2Ref.current;

      if (!track1 || !track2) return;

      // Positions in percent (-50 to 0)
      let x1 = 0;
      let x2 = -25;

      // Idle base velocities (track 1 moves left, track 2 moves right)
      const baseSpeed1 = -0.08;
      const baseSpeed2 = 0.08;

      let scrollVelocity = 0;

      // Track scroll velocity via ScrollTrigger
      const trigger = ScrollTrigger.create({
        onUpdate: (self) => {
          // Normalize velocity (pixels per second)
          const v = self.getVelocity() / 250;
          // Clamp to avoid extreme jumps
          scrollVelocity = Math.max(Math.min(v, 4), -4);
        },
      });

      // 60fps GPU Ticker Loop
      const tickerCallback = () => {
        // Smoothly decay velocity back to 0 when user stops scrolling (damping factor 0.93)
        scrollVelocity *= 0.93;

        // Apply base speed + scroll velocity reaction
        x1 += baseSpeed1 - scrollVelocity * 0.12;
        x2 += baseSpeed2 + scrollVelocity * 0.12;

        // Seamless wrap around -50% to 0%
        if (x1 <= -50) x1 += 50;
        if (x1 > 0) x1 -= 50;

        if (x2 >= 0) x2 -= 50;
        if (x2 < -50) x2 += 50;

        gsap.set(track1, { xPercent: x1, force3D: true });
        gsap.set(track2, { xPercent: x2, force3D: true });
      };

      gsap.ticker.add(tickerCallback);

      // Cleanup
      return () => {
        gsap.ticker.remove(tickerCallback);
        trigger.kill();
      };
    },
    { scope: containerRef }
  );

  // Repeat sequence enough times for seamless infinite loops across 4K screens
  const content = Array(8).fill(MARQUEE_ITEMS).flat();

  return (
    <div
      ref={containerRef}
      className="relative w-full overflow-hidden py-14 sm:py-20 my-6 sm:my-10 select-none pointer-events-none"
      aria-hidden="true"
    >
      {/* Ribbon 1: -3 deg Solid Red with White Text */}
      <div
        className="w-[140vw] -ml-[20vw] bg-[#ff004f] py-3 sm:py-4 shadow-[0_8px_25px_rgba(255,0,79,0.35)] relative z-10 will-change-transform"
        style={{ transform: "rotate(-3deg)" }}
      >
        <div ref={track1Ref} className="flex whitespace-nowrap will-change-transform">
          {content.map((item, idx) => (
            <span
              key={`r1-${idx}`}
              className="inline-flex items-center text-white font-extrabold text-sm sm:text-base md:text-lg tracking-widest uppercase mx-3 sm:mx-5"
            >
              <span>{item}</span>
              <span className="text-white/80 ml-3 sm:ml-5">•</span>
            </span>
          ))}
        </div>
      </div>

      {/* Ribbon 2: +3 deg White with Red Text and Red Borders */}
      <div
        className="w-[140vw] -ml-[20vw] bg-white py-3 sm:py-4 border-y-2 border-[#ff004f] shadow-[0_10px_30px_rgba(0,0,0,0.6)] relative z-20 -mt-10 sm:-mt-12 will-change-transform"
        style={{ transform: "rotate(3deg)" }}
      >
        <div ref={track2Ref} className="flex whitespace-nowrap will-change-transform">
          {content.map((item, idx) => (
            <span
              key={`r2-${idx}`}
              className="inline-flex items-center text-[#ff004f] font-extrabold text-sm sm:text-base md:text-lg tracking-widest uppercase mx-3 sm:mx-5"
            >
              <span>{item}</span>
              <span className="text-[#ff004f]/60 ml-3 sm:ml-5">•</span>
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

