import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/**
 * useCardGridReveal Hook
 * Reveals cards within any grid container as the user scrolls into view:
 * - Initial state: y: 60, opacity: 0
 * - Entrance: 0.08s stagger, power3.out easing
 * - 60fps GPU acceleration: Animates ONLY transform and opacity with force3D: true
 * - Respects prefers-reduced-motion
 *
 * @param {React.RefObject} scopeRef - Ref of the grid or section container
 * @param {string} cardSelector - CSS selector targeting cards to reveal (default: ".grid-card")
 */
export default function useCardGridReveal(scopeRef, cardSelector = ".grid-card") {
  useGSAP(
    () => {
      const prefersReducedMotion =
        typeof window !== "undefined" &&
        window.matchMedia("(prefers-reduced-motion: reduce)").matches;

      const cards = gsap.utils.toArray(cardSelector);
      if (!cards.length) return;

      if (prefersReducedMotion) {
        gsap.set(cards, { y: 0, opacity: 1 });
        return;
      }

      gsap.fromTo(
        cards,
        {
          y: 60,
          opacity: 0,
        },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.08,
          ease: "power3.out",
          force3D: true,
          scrollTrigger: {
            trigger: scopeRef.current,
            start: "top 82%",
            toggleActions: "play none none reverse",
          },
        }
      );
    },
    { scope: scopeRef }
  );
}

