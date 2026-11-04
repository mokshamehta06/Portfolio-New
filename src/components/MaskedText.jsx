import React, { useRef } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";

/**
 * MaskedText Component
 * Splits text into individual characters wrapped in an overflow:hidden mask.
 * Slides up from behind the mask with 60fps transform & opacity animation.
 * Respects prefers-reduced-motion.
 */
export default function MaskedText({
  text,
  className = "",
  charClassName = "",
  delay = 0,
  stagger = 0.04,
  isReady = true,
}) {
  const containerRef = useRef(null);

  useGSAP(
    () => {
      if (!isReady) return;

      // Check if user prefers reduced motion
      const prefersReducedMotion =
        typeof window !== "undefined" &&
        window.matchMedia("(prefers-reduced-motion: reduce)").matches;

      const chars = containerRef.current.querySelectorAll(".masked-char");

      if (prefersReducedMotion) {
        gsap.set(chars, { yPercent: 0, opacity: 1 });
        return;
      }

      gsap.fromTo(
        chars,
        {
          yPercent: 120,
          opacity: 0,
        },
        {
          yPercent: 0,
          opacity: 1,
          duration: 0.85,
          ease: "power4.out",
          stagger: stagger,
          delay: delay,
          force3D: true, // GPU acceleration for 60fps
        }
      );
    },
    { scope: containerRef, dependencies: [isReady] }
  );

  // Split string into words and characters to preserve layout & word wrapping
  const words = text.split(" ");

  return (
    <span ref={containerRef} className={`inline-block ${className}`} aria-label={text}>
      {words.map((word, wIdx) => (
        <span key={wIdx} className="inline-block whitespace-nowrap">
          {word.split("").map((char, cIdx) => (
            <span key={cIdx} className="inline-block overflow-hidden align-baseline">
              <span className={`masked-char inline-block will-change-transform ${charClassName}`}>
                {char}
              </span>
            </span>
          ))}
          {wIdx < words.length - 1 && <span className="inline-block">&nbsp;</span>}
        </span>
      ))}
    </span>
  );
}

