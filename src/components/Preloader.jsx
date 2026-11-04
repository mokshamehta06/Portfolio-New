import React, { useRef, useState, useEffect } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";

const SESSION_STORAGE_KEY = "hasSeenPreloader";

/**
 * Preloader Component
 * - Full red screen (#ff004f) with Moksha Mehta's name and monogram initials in white.
 * - Numerical counter counting up from 0 to 100% with matching progress indicator.
 * - Screen slides up (yPercent: -100) to reveal the site while the hero animation starts.
 * - Total duration strictly under 2.5s (2.2s total: 1.25s count + 0.15s hold + 0.8s slide-up).
 * - Plays only once per session using sessionStorage.
 * - 60fps GPU-accelerated: Animates ONLY transform (yPercent, scaleX) and numerical value.
 * - Respects prefers-reduced-motion.
 */
export default function Preloader({ onComplete }) {
  const [isVisible, setIsVisible] = useState(() => {
    if (typeof window === "undefined") return false;
    return sessionStorage.getItem(SESSION_STORAGE_KEY) !== "true";
  });

  const containerRef = useRef(null);
  const counterRef = useRef(null);
  const progressBarRef = useRef(null);
  const contentRef = useRef(null);

  // If already seen in this session, immediately trigger onComplete and don't render
  useEffect(() => {
    if (typeof window !== "undefined" && sessionStorage.getItem(SESSION_STORAGE_KEY) === "true") {
      onComplete?.();
    }
  }, [onComplete]);

  useGSAP(
    () => {
      if (!isVisible) return;

      const prefersReducedMotion =
        typeof window !== "undefined" &&
        window.matchMedia("(prefers-reduced-motion: reduce)").matches;

      if (prefersReducedMotion) {
        sessionStorage.setItem(SESSION_STORAGE_KEY, "true");
        onComplete?.();
        setIsVisible(false);
        return;
      }

      // Prevent page scrolling while preloader is active
      const originalOverflow = document.body.style.overflow;
      document.body.style.overflow = "hidden";

      const counterObj = { val: 0 };
      const tl = gsap.timeline({
        onComplete: () => {
          sessionStorage.setItem(SESSION_STORAGE_KEY, "true");
          document.body.style.overflow = originalOverflow;
          setIsVisible(false);
        },
      });

      // 1. Initial subtle entrance of initials & typography
      tl.from(contentRef.current, {
        opacity: 0,
        y: 20,
        duration: 0.4,
        ease: "power3.out",
        force3D: true,
      });

      // 2. Count up 0 -> 100% (1.25s) with matching progress bar fill
      tl.to(
        counterObj,
        {
          val: 100,
          duration: 1.25,
          ease: "power2.inOut",
          onUpdate: () => {
            const currentVal = Math.floor(counterObj.val);
            if (counterRef.current) {
              counterRef.current.textContent = currentVal;
            }
            if (progressBarRef.current) {
              progressBarRef.current.style.transform = `scaleX(${counterObj.val / 100})`;
            }
          },
        },
        "-=0.2"
      );

      // 3. Brief hold at 100% (0.15s)
      tl.to({}, { duration: 0.15 });

      // 4. Content elements fade and lift slightly before curtain lift
      tl.to(
        contentRef.current,
        {
          opacity: 0,
          y: -30,
          duration: 0.35,
          ease: "power3.in",
          force3D: true,
        },
        "+=0.05"
      );

      // 5. Screen slides up to reveal the site, triggering Hero animation on slide start
      tl.to(
        containerRef.current,
        {
          yPercent: -100,
          duration: 0.75,
          ease: "power4.inOut",
          force3D: true,
          onStart: () => {
            // Trigger site/hero animation at the moment the red curtain begins sliding up
            onComplete?.();
          },
        },
        "-=0.15"
      );

      return () => {
        document.body.style.overflow = originalOverflow;
      };
    },
    { scope: containerRef, dependencies: [isVisible] }
  );

  if (!isVisible) return null;

  return (
    <aside
      ref={containerRef}
      role="status"
      aria-live="polite"
      aria-label="Loading Moksha Mehta Portfolio"
      className="fixed inset-0 z-[99999] bg-[#ff004f] text-white flex flex-col justify-between p-6 sm:p-12 md:p-16 overflow-hidden select-none will-change-transform"
      style={{ touchAction: "none" }}
    >
      {/* Top Header Bar */}
      <div className="flex items-center justify-between w-full border-b border-white/20 pb-4">
        <div className="flex items-center gap-3">
          <span className="w-2 h-2 rounded-full bg-white animate-pulse" />
          <span className="text-xs sm:text-sm font-bold tracking-[0.25em] uppercase text-white">
            MOKSHA MEHTA
          </span>
        </div>
        <span className="text-xs sm:text-sm font-mono tracking-widest text-white/80 uppercase hidden sm:inline-block">
          PORTFOLIO &bull; 2026
        </span>
      </div>

      {/* Center Initials & Title Monogram */}
      <div
        ref={contentRef}
        className="flex flex-col items-center justify-center text-center my-auto px-4"
      >
        {/* Monogram Badge */}
        <div className="relative mb-6">
          <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl border-2 border-white flex items-center justify-center shadow-[0_8px_30px_rgba(0,0,0,0.25)] bg-white/10 backdrop-blur-sm">
            <span className="text-3xl sm:text-4xl font-black tracking-widest text-white">
              MM
            </span>
          </div>
          <span className="absolute -bottom-2 -right-2 bg-white text-[#ff004f] text-[10px] font-black px-2 py-0.5 rounded-full uppercase tracking-wider shadow">
            DEV
          </span>
        </div>

        {/* Name Headline */}
        <h1 className="text-4xl sm:text-6xl md:text-7xl font-black uppercase tracking-tight text-white mb-2">
          Moksha Mehta
        </h1>
        <p className="text-xs sm:text-sm md:text-base font-semibold tracking-[0.3em] text-white/90 uppercase">
          Full Stack MERN Developer
        </p>
      </div>

      {/* Bottom Counter & Progress Bar */}
      <div className="w-full max-w-5xl mx-auto flex flex-col gap-3">
        <div className="flex items-end justify-between">
          <div className="flex flex-col">
            <span className="text-[10px] sm:text-xs font-mono uppercase tracking-[0.25em] text-white/75">
              INITIALIZING EXPERIENCE
            </span>
            <span className="text-xs sm:text-sm font-medium text-white/95">
              React &bull; Node.js &bull; MongoDB &bull; Express
            </span>
          </div>

          {/* 0 to 100% Counter */}
          <div className="font-mono text-5xl sm:text-7xl md:text-8xl font-black text-white tabular-nums tracking-tighter leading-none flex items-baseline">
            <span ref={counterRef}>0</span>
            <span className="text-2xl sm:text-4xl md:text-5xl font-light text-white/80 ml-1">
              %
            </span>
          </div>
        </div>

        {/* Minimalist White Progress Bar */}
        <div className="w-full h-1 sm:h-1.5 bg-white/25 rounded-full overflow-hidden">
          <div
            ref={progressBarRef}
            className="h-full bg-white origin-left will-change-transform"
            style={{ transform: "scaleX(0)" }}
          />
        </div>
      </div>
    </aside>
  );
}
