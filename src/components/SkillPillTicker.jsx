import React, { useRef } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";

// Curated skills matching user's full-stack & backend engineering stack
const ROW_1 = [
  { name: "React.js", variant: "filled" },
  { name: "Node.js", variant: "outline" },
  { name: "Express.js", variant: "filled" },
  { name: "MongoDB", variant: "outline" },
  { name: "JavaScript (ES6+)", variant: "filled" },
  { name: "Tailwind CSS", variant: "outline" },
  { name: "RESTful APIs", variant: "filled" },
  { name: "Git & GitHub", variant: "outline" },
  { name: "Docker", variant: "filled" },
];

const ROW_2 = [
  { name: "JWT Authentication", variant: "outline" },
  { name: "Gemini AI Integration", variant: "filled" },
  { name: "Redis Caching", variant: "outline" },
  { name: "Socket.io WebSockets", variant: "filled" },
  { name: "MCP Architecture", variant: "outline" },
  { name: "Postman API Testing", variant: "filled" },
  { name: "MySQL Relational DB", variant: "outline" },
  { name: "Data Structures & Algorithms", variant: "filled" },
  { name: "System Architecture", variant: "outline" },
];

/**
 * SkillPillTicker Component
 * - Seamless infinite horizontal ticker of skill pills.
 * - Red-outlined and filled-red styling variants.
 * - Row 1 glides left, Row 2 glides right (opposite direction for 3D depth).
 * - Smoothly decelerates to slow-motion on hover via gsap.to(tween, { timeScale: 0.2 }).
 * - 60fps GPU-accelerated: Animates ONLY transform (xPercent) with force3D: true.
 * - Strict palette: Red (#ff004f), White (#fff), Black (#080808, #161616), Light Grey.
 * - Respects prefers-reduced-motion.
 */
export default function SkillPillTicker() {
  const containerRef = useRef(null);
  const track1Ref = useRef(null);
  const track2Ref = useRef(null);
  const tween1Ref = useRef(null);
  const tween2Ref = useRef(null);

  useGSAP(
    () => {
      const prefersReducedMotion =
        typeof window !== "undefined" &&
        window.matchMedia("(prefers-reduced-motion: reduce)").matches;

      const track1 = track1Ref.current;
      const track2 = track2Ref.current;

      if (!track1 || !track2) return;

      if (prefersReducedMotion) {
        gsap.set([track1, track2], { xPercent: 0 });
        return;
      }

      // 1. Row 1: Infinite Glide Left (0% to -50%)
      tween1Ref.current = gsap.to(track1, {
        xPercent: -50,
        duration: 26,
        ease: "none",
        repeat: -1,
        force3D: true,
      });

      // 2. Row 2: Infinite Glide Right (-50% to 0%)
      gsap.set(track2, { xPercent: -50 });
      tween2Ref.current = gsap.to(track2, {
        xPercent: 0,
        duration: 28,
        ease: "none",
        repeat: -1,
        force3D: true,
      });
    },
    { scope: containerRef }
  );

  // Slow down on hover (smoothly tween timeScale to 0.2)
  const handleMouseEnter = () => {
    if (tween1Ref.current && tween2Ref.current) {
      gsap.to(tween1Ref.current, { timeScale: 0.18, duration: 0.6, ease: "power2.out" });
      gsap.to(tween2Ref.current, { timeScale: 0.18, duration: 0.6, ease: "power2.out" });
    }
  };

  // Return to normal speed on leave
  const handleMouseLeave = () => {
    if (tween1Ref.current && tween2Ref.current) {
      gsap.to(tween1Ref.current, { timeScale: 1, duration: 0.6, ease: "power2.inOut" });
      gsap.to(tween2Ref.current, { timeScale: 1, duration: 0.6, ease: "power2.inOut" });
    }
  };

  // Duplicate arrays for seamless 0 to -50% loop
  const row1Items = [...ROW_1, ...ROW_1];
  const row2Items = [...ROW_2, ...ROW_2];

  return (
    <div
      ref={containerRef}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className="relative w-full overflow-hidden py-8 sm:py-10 my-8 space-y-4 sm:space-y-5 select-none"
    >
      {/* Edge Gradient Masks for Soft Fade */}
      <div className="absolute top-0 bottom-0 left-0 w-16 sm:w-32 bg-gradient-to-r from-[#080808] to-transparent z-10 pointer-events-none" />
      <div className="absolute top-0 bottom-0 right-0 w-16 sm:w-32 bg-gradient-to-l from-[#080808] to-transparent z-10 pointer-events-none" />

      {/* Row 1: Glides Left */}
      <div className="flex overflow-hidden">
        <div ref={track1Ref} className="flex whitespace-nowrap will-change-transform gap-3 sm:gap-4">
          {row1Items.map((item, idx) => {
            const isFilled = item.variant === "filled";
            return (
              <span
                key={`r1-${idx}`}
                className={`inline-flex items-center gap-2 px-4 sm:px-5 py-2 sm:py-2.5 rounded-full text-xs sm:text-sm font-bold tracking-wide transition-all duration-300 cursor-default ${
                  isFilled
                    ? "bg-[#ff004f] text-white border border-[#ff004f] shadow-[0_4px_16px_rgba(255,0,79,0.35)] hover:shadow-[0_6px_22px_rgba(255,0,79,0.5)] hover:scale-105"
                    : "bg-[#161616]/90 text-white border border-[#ff004f]/60 hover:border-white shadow-[0_4px_12px_rgba(0,0,0,0.6)] hover:scale-105"
                }`}
              >
                <span
                  className={`w-1.5 h-1.5 rounded-full ${
                    isFilled ? "bg-white" : "bg-[#ff004f]"
                  }`}
                />
                <span>{item.name}</span>
              </span>
            );
          })}
        </div>
      </div>

      {/* Row 2: Glides Right (Opposite Direction for Depth) */}
      <div className="flex overflow-hidden">
        <div ref={track2Ref} className="flex whitespace-nowrap will-change-transform gap-3 sm:gap-4">
          {row2Items.map((item, idx) => {
            const isFilled = item.variant === "filled";
            return (
              <span
                key={`r2-${idx}`}
                className={`inline-flex items-center gap-2 px-4 sm:px-5 py-2 sm:py-2.5 rounded-full text-xs sm:text-sm font-bold tracking-wide transition-all duration-300 cursor-default ${
                  isFilled
                    ? "bg-[#ff004f] text-white border border-[#ff004f] shadow-[0_4px_16px_rgba(255,0,79,0.35)] hover:shadow-[0_6px_22px_rgba(255,0,79,0.5)] hover:scale-105"
                    : "bg-[#161616]/90 text-white border border-[#ff004f]/60 hover:border-white shadow-[0_4px_12px_rgba(0,0,0,0.6)] hover:scale-105"
                }`}
              >
                <span
                  className={`w-1.5 h-1.5 rounded-full ${
                    isFilled ? "bg-white" : "bg-[#ff004f]"
                  }`}
                />
                <span>{item.name}</span>
              </span>
            );
          })}
        </div>
      </div>
    </div>
  );
}

