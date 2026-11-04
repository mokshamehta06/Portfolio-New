import React, { useRef } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/**
 * ScrollScrubText Component
 * - Words start at 20% opacity and fill to 100% opacity word-by-word as user scrolls (ScrollTrigger scrub).
 * - Key phrases are highlighted with a red marker background that wipes in left-to-right (transform: scaleX).
 * - 60fps GPU-accelerated: Animates ONLY transform and opacity.
 * - Respects prefers-reduced-motion.
 */
export default function ScrollScrubText({ children, className = "" }) {
  const containerRef = useRef(null);

  useGSAP(
    () => {
      const prefersReducedMotion =
        typeof window !== "undefined" &&
        window.matchMedia("(prefers-reduced-motion: reduce)").matches;

      const words = containerRef.current.querySelectorAll(".scrub-word");
      const markers = containerRef.current.querySelectorAll(".marker-wipe");

      if (prefersReducedMotion) {
        gsap.set(words, { opacity: 1 });
        gsap.set(markers, { scaleX: 1 });
        return;
      }

      // 1. Initial State: Words at 20% opacity, markers collapsed at scaleX(0)
      gsap.set(words, { opacity: 0.2 });
      gsap.set(markers, { scaleX: 0, transformOrigin: "left center" });

      // 2. ScrollTrigger Scrub: Words fill from 20% to 100% opacity sequentially
      gsap.to(words, {
        opacity: 1,
        stagger: 0.05,
        ease: "none",
        force3D: true,
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 82%",
          end: "bottom 48%",
          scrub: 0.5,
        },
      });

      // 3. Red Marker Background Wipe: Wipes in left-to-right when phrase becomes active
      markers.forEach((marker) => {
        const parent = marker.closest(".scrub-highlight-wrapper");
        if (!parent) return;

        ScrollTrigger.create({
          trigger: parent,
          start: "top 78%",
          end: "bottom 45%",
          toggleActions: "play reverse play reverse",
          onEnter: () =>
            gsap.to(marker, {
              scaleX: 1,
              duration: 0.45,
              ease: "power2.out",
              force3D: true,
            }),
          onLeaveBack: () =>
            gsap.to(marker, {
              scaleX: 0,
              duration: 0.35,
              ease: "power2.in",
              force3D: true,
            }),
        });
      });
    },
    { scope: containerRef }
  );

  return (
    <div ref={containerRef} className={className}>
      {children}
    </div>
  );
}

/**
 * Helper to split plain text string into individual scrub words
 */
export function ScrubWords({ text, className = "" }) {
  const words = text.split(" ");
  return (
    <>
      {words.map((word, idx) => (
        <span
          key={idx}
          className={`scrub-word inline-block will-change-[opacity] ${className}`}
        >
          {word}&nbsp;
        </span>
      ))}
    </>
  );
}

/**
 * Helper to wrap a key phrase with a red marker background that wipes in left-to-right
 */
export function ScrubHighlight({ children, className = "" }) {
  return (
    <span className={`scrub-highlight-wrapper relative inline-block px-1.5 py-0.5 mx-0.5 rounded text-white font-semibold align-baseline ${className}`}>
      {/* 60fps GPU transform-only red marker wipe background */}
      <span
        className="marker-wipe absolute inset-0 bg-[#ff004f] rounded -z-0 origin-left scale-x-0 will-change-transform shadow-[0_2px_10px_rgba(255,0,79,0.35)]"
        aria-hidden="true"
      />
      <span className="scrub-word relative z-10 inline-block will-change-[opacity]">
        {children}
      </span>
    </span>
  );
}

