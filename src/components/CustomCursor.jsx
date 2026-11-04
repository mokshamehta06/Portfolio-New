import React, { useRef, useState, useEffect } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";

/**
 * CustomCursor Component
 * - Small red dot (#ff004f) plus a larger outline ring that follows with lag (gsap.quickTo).
 * - "VIEW" Mode: Over project cards, the ring expands, fills with red, and reveals "VIEW".
 * - "Link / Button" Mode: Over links/buttons, the ring shrinks and dot expands.
 * - "Magnetic" Mode: Buttons and links gently pull toward the cursor with an elastic release.
 * - 60fps GPU acceleration: Animates ONLY transform and opacity with force3D: true.
 * - Completely disabled on touch devices and respects prefers-reduced-motion.
 */
export default function CustomCursor() {
  const dotRef = useRef(null);
  const ringRef = useRef(null);
  const textRef = useRef(null);
  const [isTouch, setIsTouch] = useState(true);

  // Check for touch / mobile devices
  useEffect(() => {
    const isTouchDevice =
      typeof window !== "undefined" &&
      ("ontouchstart" in window ||
        navigator.maxTouchPoints > 0 ||
        window.matchMedia("(hover: none)").matches);

    setIsTouch(isTouchDevice);
  }, []);

  useGSAP(
    () => {
      if (isTouch) return;

      const prefersReducedMotion =
        typeof window !== "undefined" &&
        window.matchMedia("(prefers-reduced-motion: reduce)").matches;

      if (prefersReducedMotion) return;

      const dot = dotRef.current;
      const ring = ringRef.current;
      const text = textRef.current;

      if (!dot || !ring || !text) return;

      // 60fps quickTo Setters
      // Dot (instant follow)
      const dotX = gsap.quickTo(dot, "x", { duration: 0.08, ease: "power3.out" });
      const dotY = gsap.quickTo(dot, "y", { duration: 0.08, ease: "power3.out" });

      // Ring (smooth lag follow)
      const ringX = gsap.quickTo(ring, "x", { duration: 0.38, ease: "power3.out" });
      const ringY = gsap.quickTo(ring, "y", { duration: 0.38, ease: "power3.out" });

      // Track cursor visibility
      let isVisible = false;
      let currentMode = "default"; // "default" | "view" | "link"

      // 1. Mouse Move Listener
      const onMouseMove = (e) => {
        const { clientX, clientY } = e;

        if (!isVisible) {
          gsap.to([dot, ring], { opacity: 1, duration: 0.2 });
          isVisible = true;
        }

        // Center offsets: Dot (8px -> -4), Ring (38px -> -19)
        dotX(clientX - 4);
        dotY(clientY - 4);
        ringX(clientX - 19);
        ringY(clientY - 19);

        // Check hover target for dynamic cursor states
        const target = e.target;
        if (!target) return;

        // Check if hovering a project card
        const isProjectCard = target.closest(".work, .stack-card-inner, [data-cursor='view']");
        // Check if hovering a link or button
        const isInteractive = target.closest(
          "a, button, .btn-pink, .tab-links, .circle-link, input, textarea, select"
        );

        if (isProjectCard && !isInteractive) {
          if (currentMode !== "view") {
            currentMode = "view";
            // Grow ring and show "VIEW"
            gsap.to(ring, {
              scale: 2.2,
              backgroundColor: "rgba(255, 0, 79, 0.95)",
              borderColor: "#ff004f",
              duration: 0.3,
              ease: "back.out(1.6)",
              force3D: true,
            });
            gsap.to(text, { opacity: 1, scale: 1, duration: 0.2 });
            gsap.to(dot, { opacity: 0, scale: 0, duration: 0.2 });
          }
        } else if (isInteractive) {
          if (currentMode !== "link") {
            currentMode = "link";
            // Shrink ring and highlight dot
            gsap.to(ring, {
              scale: 0.65,
              backgroundColor: "transparent",
              borderColor: "#ffffff",
              duration: 0.25,
              ease: "power2.out",
              force3D: true,
            });
            gsap.to(text, { opacity: 0, scale: 0.5, duration: 0.15 });
            gsap.to(dot, { opacity: 1, scale: 1.6, duration: 0.2 });
          }
        } else {
          if (currentMode !== "default") {
            currentMode = "default";
            // Reset to default ring & dot
            gsap.to(ring, {
              scale: 1,
              backgroundColor: "transparent",
              borderColor: "#ff004f",
              duration: 0.3,
              ease: "power2.out",
              force3D: true,
            });
            gsap.to(text, { opacity: 0, scale: 0.5, duration: 0.15 });
            gsap.to(dot, { opacity: 1, scale: 1, duration: 0.2 });
          }
        }
      };

      const onMouseLeave = () => {
        gsap.to([dot, ring], { opacity: 0, duration: 0.2 });
        isVisible = false;
      };

      // 2. Magnetic Buttons Effect
      // Subtle physical magnetic pull when hovering interactive buttons
      const magneticTargets = document.querySelectorAll(
        ".btn-pink, a.circle-link, .hero-pill-sticker, button.tab-links"
      );

      const magneticCleanups = [];

      magneticTargets.forEach((el) => {
        const onMagneticMove = (e) => {
          const rect = el.getBoundingClientRect();
          const centerX = rect.left + rect.width / 2;
          const centerY = rect.top + rect.height / 2;
          const deltaX = (e.clientX - centerX) * 0.28;
          const deltaY = (e.clientY - centerY) * 0.28;

          gsap.to(el, {
            x: deltaX,
            y: deltaY,
            duration: 0.25,
            ease: "power2.out",
            overwrite: "auto",
            force3D: true,
          });
        };

        const onMagneticLeave = () => {
          gsap.to(el, {
            x: 0,
            y: 0,
            duration: 0.65,
            ease: "elastic.out(1.1, 0.4)",
            overwrite: "auto",
            force3D: true,
          });
        };

        el.addEventListener("mousemove", onMagneticMove, { passive: true });
        el.addEventListener("mouseleave", onMagneticLeave);

        magneticCleanups.push(() => {
          el.removeEventListener("mousemove", onMagneticMove);
          el.removeEventListener("mouseleave", onMagneticLeave);
        });
      });

      window.addEventListener("mousemove", onMouseMove, { passive: true });
      document.body.addEventListener("mouseleave", onMouseLeave);

      return () => {
        window.removeEventListener("mousemove", onMouseMove);
        document.body.removeEventListener("mouseleave", onMouseLeave);
        magneticCleanups.forEach((cleanup) => cleanup());
      };
    },
    { dependencies: [isTouch] }
  );

  // Return null on touch devices
  if (isTouch) return null;

  return (
    <>
      {/* Small Red Dot */}
      <div
        ref={dotRef}
        className="fixed top-0 left-0 w-2 h-2 rounded-full bg-[#ff004f] pointer-events-none z-[9999] opacity-0 select-none shadow-[0_0_8px_#ff004f] will-change-transform"
        aria-hidden="true"
      />

      {/* Larger Outline Ring */}
      <div
        ref={ringRef}
        className="fixed top-0 left-0 w-[38px] h-[38px] rounded-full border border-[#ff004f] pointer-events-none z-[9998] opacity-0 select-none flex items-center justify-center will-change-transform shadow-[0_0_12px_rgba(255,0,79,0.25)]"
        aria-hidden="true"
      >
        {/* Dynamic "VIEW" Label */}
        <span
          ref={textRef}
          className="text-[9px] font-extrabold tracking-wider text-white uppercase opacity-0 scale-50 select-none pointer-events-none"
        >
          VIEW
        </span>
      </div>
    </>
  );
}

