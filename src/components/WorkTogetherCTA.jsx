import React, { useRef, useEffect } from "react";
import { ArrowUpRight } from "lucide-react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";

// Sticker SVG templates (Stars, Swirls, Arrows, Smiley, Sparkles)
const SHAPES = [
  // 1. Star
  (color) => (
    <svg viewBox="0 0 24 24" width="22" height="22" fill={color}>
      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
    </svg>
  ),
  // 2. 4-point Sparkle Star
  (color) => (
    <svg viewBox="0 0 24 24" width="22" height="22" fill={color}>
      <path d="M12 0L14.5 9.5L24 12L14.5 14.5L12 24L9.5 14.5L0 12L9.5 9.5L12 0Z" />
    </svg>
  ),
  // 3. Swirl
  (color) => (
    <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke={color} strokeWidth="2.5">
      <path d="M12 2a10 10 0 0 1 10 10 8 8 0 0 1-8 8 6 6 0 0 1-6-6 4 4 0 0 1 4-4 2 2 0 0 1 2 2" />
    </svg>
  ),
  // 4. Arrow
  (color) => (
    <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke={color} strokeWidth="3">
      <path d="M7 17L17 7M17 7H7M17 7V17" />
    </svg>
  ),
  // 5. Smiley
  (color) => (
    <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke={color} strokeWidth="2.2">
      <circle cx="12" cy="12" r="10" />
      <path d="M8 14s1.5 2 4 2 4-2 4-2" />
      <circle cx="9" cy="9" r="1.2" fill={color} />
      <circle cx="15" cy="9" r="1.2" fill={color} />
    </svg>
  ),
];

// Color palette strictly adherence: Red (#ff004f), White (#fff), Black/Dark with red border (#161616)
const STICKER_COLORS = ["#ff004f", "#ffffff", "#ff004f", "#ffffff"];

/**
 * WorkTogetherCTA Component
 * - Giant "Let's Work Together" headline with ambient red glow.
 * - Mousemove interactive sticker spawner: small stars, swirls, arrows, smiley spawn at cursor,
 *   pop in with random rotation, then fall and fade.
 * - Red pill "Get in touch" button with text roll effect & sliding arrow swap on hover.
 * - 60fps GPU acceleration: Animates ONLY transform and opacity with force3D: true.
 * - Completely disabled on touch devices and respects prefers-reduced-motion.
 */
export default function WorkTogetherCTA() {
  const containerRef = useRef(null);
  const stickersLayerRef = useRef(null);
  const lastSpawnPos = useRef({ x: 0, y: 0, time: 0 });

  useGSAP(
    () => {
      const prefersReducedMotion =
        typeof window !== "undefined" &&
        window.matchMedia("(prefers-reduced-motion: reduce)").matches;

      const isTouch =
        typeof window !== "undefined" &&
        ("ontouchstart" in window ||
          navigator.maxTouchPoints > 0 ||
          window.matchMedia("(hover: none)").matches);

      if (prefersReducedMotion || isTouch) return;

      const container = containerRef.current;
      const layer = stickersLayerRef.current;
      if (!container || !layer) return;

      const handleMouseMove = (e) => {
        const now = Date.now();
        const rect = container.getBoundingClientRect();

        // Calculate relative coordinates inside container
        const relX = e.clientX - rect.left;
        const relY = e.clientY - rect.top;

        // Throttle spawns: minimum 25px distance or 70ms interval
        const dist = Math.hypot(
          relX - lastSpawnPos.current.x,
          relY - lastSpawnPos.current.y
        );

        if (dist < 28 && now - lastSpawnPos.current.time < 75) return;
        lastSpawnPos.current = { x: relX, y: relY, time: now };

        // 1. Create sticker element
        const sticker = document.createElement("div");
        sticker.className =
          "absolute pointer-events-none select-none z-20 will-change-transform";
        sticker.style.left = `${relX}px`;
        sticker.style.top = `${relY}px`;

        // Pick random shape and color
        const shapeIdx = Math.floor(Math.random() * SHAPES.length);
        const colorIdx = Math.floor(Math.random() * STICKER_COLORS.length);
        const color = STICKER_COLORS[colorIdx];

        // Wrap with badge background if black
        const isDarkBadge = colorIdx === 2;
        if (isDarkBadge) {
          sticker.className +=
            " p-1.5 rounded-full bg-[#161616] border border-[#ff004f] shadow-[0_0_12px_rgba(255,0,79,0.3)]";
        }

        // Render SVG into sticker
        const svgContainer = document.createElement("div");
        svgContainer.innerHTML = ReactToHTML(SHAPES[shapeIdx](color));
        sticker.appendChild(svgContainer);

        layer.appendChild(sticker);

        // 2. Animate with GSAP (Pop in with random rotation -> fall and fade)
        const initialRotation = gsap.utils.random(-45, 45);
        const fallDistance = gsap.utils.random(45, 80);
        const fallRotation = initialRotation + gsap.utils.random(-35, 35);

        gsap.set(sticker, {
          xPercent: -50,
          yPercent: -50,
          scale: 0,
          opacity: 0,
          rotation: initialRotation,
        });

        const tl = gsap.timeline({
          onComplete: () => {
            sticker.remove();
          },
        });

        // Pop in with bounce
        tl.to(sticker, {
          scale: 1,
          opacity: 1,
          duration: 0.22,
          ease: "back.out(2)",
          force3D: true,
        })
          // Fall and fade out
          .to(
            sticker,
            {
              y: `+=${fallDistance}`,
              rotation: fallRotation,
              opacity: 0,
              duration: 0.65,
              ease: "power2.in",
              force3D: true,
            },
            "+=0.1"
          );
      };

      container.addEventListener("mousemove", handleMouseMove, { passive: true });

      return () => {
        container.removeEventListener("mousemove", handleMouseMove);
      };
    },
    { scope: containerRef }
  );

  const scrollToContact = (e) => {
    e.preventDefault();
    const el = document.getElementById("contact");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section
      ref={containerRef}
      className="relative w-full py-28 sm:py-36 md:py-44 overflow-hidden bg-[#080808] border-t border-white/5 select-none"
    >
      {/* Background ambient red glow orbs */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] sm:w-[500px] h-[350px] sm:h-[500px] rounded-full bg-[#ff004f]/15 blur-[120px] pointer-events-none" />

      {/* Interactive Sticker Spawner Canvas Layer */}
      <div
        ref={stickersLayerRef}
        className="absolute inset-0 pointer-events-none overflow-hidden"
        aria-hidden="true"
      />

      <div className="container relative z-10 text-center flex flex-col items-center justify-center">
        {/* Subtle Upper Tagline */}
        <p className="text-xs sm:text-sm font-semibold uppercase tracking-widest text-[#ff004f] mb-4">
          ✦ Have a project or role in mind?
        </p>

        {/* Giant Headline */}
        <h2 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-extrabold uppercase tracking-tight text-white leading-tight sm:leading-none mb-8 sm:mb-12">
          Let's Work <span className="text-[#ff004f] glow-pink">Together.</span>
        </h2>

        {/* Red Pill Button with Text Roll & Sliding Arrow Swap */}
        <a
          href="#contact"
          onClick={scrollToContact}
          className="btn-pink filled group relative inline-flex items-center gap-3.5 px-8 sm:px-10 py-4 sm:py-4.5 rounded-full text-base sm:text-lg font-bold tracking-wide shadow-[0_8px_30px_rgba(255,0,79,0.4)] hover:shadow-[0_12px_45px_rgba(255,0,79,0.7)] transition-shadow duration-300"
        >
          {/* Text Roll Effect (Overflow hidden container with two stacked texts) */}
          <div className="relative overflow-hidden h-[26px] flex flex-col items-center">
            <span className="block transform transition-transform duration-300 ease-out group-hover:-translate-y-full">
              Get in touch
            </span>
            <span className="block absolute top-full left-0 transform transition-transform duration-300 ease-out group-hover:-translate-y-full text-white">
              Get in touch
            </span>
          </div>

          {/* Sliding Arrow Swap (White circle container with swapping arrows) */}
          <div className="w-8 h-8 rounded-full bg-white text-[#ff004f] flex items-center justify-center overflow-hidden relative shadow-sm">
            {/* Arrow 1: Slides up-right and exits */}
            <ArrowUpRight
              size={18}
              className="transform transition-transform duration-300 ease-out group-hover:-translate-y-7 group-hover:translate-x-7"
            />
            {/* Arrow 2: Slides in from bottom-left */}
            <ArrowUpRight
              size={18}
              className="absolute transform translate-y-7 -translate-x-7 transition-transform duration-300 ease-out group-hover:translate-y-0 group-hover:translate-x-0"
            />
          </div>
        </a>
      </div>
    </section>
  );
}

// Helper to convert React SVG elements to string for dynamic DOM insertion
function ReactToHTML(element) {
  const { type, props } = element;
  const children = props.children
    ? Array.isArray(props.children)
      ? props.children.map(ReactToHTML).join("")
      : ReactToHTML(props.children)
    : "";

  const attrs = Object.entries(props)
    .filter(([key]) => key !== "children")
    .map(([key, val]) => `${key}="${val}"`)
    .join(" ");

  return `<${type} ${attrs}>${children}</${type}>`;
}

