import React, { useRef } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";

/**
 * HeroStickers Component
 * Renders 4 branded pill stickers around the Hero headline.
 * - Entrance: Staggered pop-in with back.out(1.8) bounce
 * - Idle: Gentle, continuous vertical float loop
 * - Interaction: Mouse parallax at different depths (disabled on touch/mobile)
 * - 60fps GPU-accelerated (transform & opacity only)
 * - Palette strictly adheres to: Red (#ff004f, #e60046), Black (#080808, #161616), White (#fff), Grey (#ababab)
 */
export default function HeroStickers({ parentRef, isReady = true }) {
  const stickersContainerRef = useRef(null);

  // Definition of the 4 stickers with positioning, rotation, depths and styling
  const stickers = [
    {
      id: "sticker-mern",
      label: "MERN",
      rotation: -7,
      depth: 0.05,
      floatDuration: 3.2,
      floatOffset: 8,
      className:
        "-top-4 right-6 sm:-top-6 sm:right-16 md:right-32 bg-[#161616] text-white border border-[#ff004f]/60 shadow-[0_4px_18px_rgba(255,0,79,0.25)]",
      badge: "✦",
    },
    {
      id: "sticker-react",
      label: "REACT",
      rotation: 8,
      depth: -0.06,
      floatDuration: 3.8,
      floatOffset: 10,
      className:
        "top-14 right-2 sm:top-12 sm:right-8 md:right-12 bg-[#ff004f] text-white font-bold shadow-[0_6px_22px_rgba(255,0,79,0.4)]",
      badge: null,
    },
    {
      id: "sticker-node",
      label: "NODE.JS",
      rotation: -5,
      depth: 0.08,
      floatDuration: 4.1,
      floatOffset: 7,
      className:
        "-bottom-4 left-2 sm:-bottom-5 sm:left-6 bg-white text-[#080808] font-bold border border-white shadow-[0_4px_16px_rgba(255,255,255,0.25)]",
      badge: "•",
    },
    {
      id: "sticker-work",
      label: "OPEN TO WORK",
      rotation: 6,
      depth: -0.04,
      floatDuration: 3.5,
      floatOffset: 9,
      className:
        "-bottom-6 right-8 sm:-bottom-7 sm:right-24 md:right-40 bg-[#161616] text-white border border-white/20 shadow-[0_4px_20px_rgba(0,0,0,0.6)]",
      beacon: true,
    },
  ];

  useGSAP(
    () => {
      if (!isReady) return;

      const prefersReducedMotion =
        typeof window !== "undefined" &&
        window.matchMedia("(prefers-reduced-motion: reduce)").matches;

      const stickerElements = gsap.utils.toArray(".hero-pill-sticker");

      if (prefersReducedMotion) {
        gsap.set(stickerElements, { scale: 1, opacity: 1 });
        return;
      }

      // 1. Initial State: Invisible & scaled down for back.out bounce entrance
      gsap.set(stickerElements, { scale: 0, opacity: 0 });

      // 2. Entrance Animation: Pop-in with back.out bounce
      gsap.to(stickerElements, {
        scale: 1,
        opacity: 1,
        duration: 0.8,
        delay: 0.5,
        ease: "back.out(1.8)",
        stagger: 0.12,
        force3D: true,
        onComplete: () => {
          // 3. Idle Float Animation: Gentle vertical loop
          stickerElements.forEach((el, idx) => {
            const data = stickers[idx];
            gsap.to(el, {
              y: `+=${data.floatOffset}`,
              duration: data.floatDuration,
              ease: "sine.inOut",
              repeat: -1,
              yoyo: true,
              delay: idx * 0.2,
            });
          });
        },
      });

      // 4. Mouse Parallax (desktop only, disabled on touch/mobile)
      const isTouchDevice =
        typeof window !== "undefined" &&
        ("ontouchstart" in window || navigator.maxTouchPoints > 0);

      if (!isTouchDevice) {
        const handleMouseMove = (e) => {
          const { clientX, clientY } = e;
          const centerX = window.innerWidth / 2;
          const centerY = window.innerHeight / 2;
          const deltaX = clientX - centerX;
          const deltaY = clientY - centerY;

          stickerElements.forEach((el, idx) => {
            const depth = stickers[idx].depth;
            gsap.to(el, {
              x: deltaX * depth,
              duration: 0.7,
              ease: "power2.out",
              overwrite: "auto",
            });
          });
        };

        window.addEventListener("mousemove", handleMouseMove, { passive: true });

        // Cleanup listener when component unmounts
        return () => {
          window.removeEventListener("mousemove", handleMouseMove);
        };
      }
    },
    { scope: stickersContainerRef, dependencies: [isReady] }
  );

  return (
    <div
      ref={stickersContainerRef}
      className="absolute inset-0 pointer-events-none select-none overflow-visible z-20"
      aria-hidden="true"
    >
      {stickers.map((item) => (
        <div
          key={item.id}
          className={`hero-pill-sticker absolute inline-flex items-center gap-1.5 px-3 py-1 sm:px-3.5 sm:py-1.5 rounded-full text-[10px] sm:text-xs font-semibold tracking-wider transition-shadow cursor-default will-change-transform ${item.className}`}
          style={{
            transform: `rotate(${item.rotation}deg)`,
          }}
        >
          {item.beacon && (
            <span className="relative flex h-2 w-2 mr-0.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#ff004f] opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#ff004f]" />
            </span>
          )}
          {item.badge && <span className="text-[#ff004f] text-[10px]">{item.badge}</span>}
          <span>{item.label}</span>
        </div>
      ))}
    </div>
  );
}

