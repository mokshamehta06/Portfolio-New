import React, { useRef } from "react";
import { ExternalLink, Github, Code2, Sparkles, Layers, Cpu } from "lucide-react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// Custom floating badges for each project to parallax at different speeds
const BADGES = [
  { label: "MERN STACK", icon: <Code2 size={13} className="text-[#ff004f]" /> },
  { label: "GEMINI AI • MCP", icon: <Sparkles size={13} className="text-[#ff004f]" /> },
  { label: "CLOUDINARY • REST", icon: <Layers size={13} className="text-[#ff004f]" /> },
  { label: "FULL STACK ARCH", icon: <Cpu size={13} className="text-[#ff004f]" /> },
];

/**
 * StackedProjectCards Component
 * - Cards stack on scroll: Each card pins with sticky positioning while the next card slides up over it.
 * - Previous card smoothly scales down to 0.92 and dims via a black overlay.
 * - Floating tech-logo badge on each card parallaxes at a different speed.
 * - Preserves existing card design, sliding hot-pink layer, actions, and architecture breakdown modal.
 * - 60fps GPU-accelerated: Animates ONLY transform and opacity.
 * - Respects prefers-reduced-motion.
 */
export default function StackedProjectCards({ projects, onSelectProject }) {
  const containerRef = useRef(null);

  useGSAP(
    () => {
      const prefersReducedMotion =
        typeof window !== "undefined" &&
        window.matchMedia("(prefers-reduced-motion: reduce)").matches;

      if (prefersReducedMotion) return;

      const cardWrappers = gsap.utils.toArray(".stack-card-wrapper");
      const cardInners = gsap.utils.toArray(".stack-card-inner");
      const dimOverlays = gsap.utils.toArray(".stack-card-dim");
      const techBadges = gsap.utils.toArray(".stack-tech-badge");

      // 1. Floating Badge Parallax (each badge floats at a different parallax rate)
      techBadges.forEach((badge, idx) => {
        const speed = -40 - (idx % 3) * 15; // Different speeds: -40px, -55px, -70px
        gsap.to(badge, {
          y: speed,
          ease: "none",
          force3D: true,
          scrollTrigger: {
            trigger: cardWrappers[idx],
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        });
      });

      // 2. Card Stacking: When the next card scrolls up, scale down current card to 0.92 and dim it
      cardWrappers.forEach((wrapper, idx) => {
        if (idx === cardWrappers.length - 1) return; // Last card doesn't need to scale down

        const currentInner = cardInners[idx];
        const currentDim = dimOverlays[idx];
        const nextWrapper = cardWrappers[idx + 1];

        ScrollTrigger.create({
          trigger: nextWrapper,
          start: "top 80%",
          end: "top 25%",
          scrub: true,
          onUpdate: (self) => {
            const p = self.progress; // 0 to 1
            const targetScale = 1 - p * 0.08; // 1.0 down to 0.92
            const targetDim = p * 0.45; // 0 to 0.45 dim

            gsap.set(currentInner, {
              scale: targetScale,
              transformOrigin: "top center",
              force3D: true,
            });

            gsap.set(currentDim, {
              opacity: targetDim,
              force3D: true,
            });
          },
        });
      });
    },
    { scope: containerRef }
  );

  return (
    <div ref={containerRef} className="relative w-full max-w-5xl mx-auto space-y-12 sm:space-y-16 pb-20">
      {projects.map((project, idx) => {
        const badge = BADGES[idx] || BADGES[0];

        return (
          <div
            key={idx}
            className="stack-card-wrapper sticky"
            style={{
              top: `${80 + idx * 16}px`,
              zIndex: idx + 10,
            }}
          >
            {/* Card Inner with 60fps transform scale & dimming */}
            <div className="stack-card-inner work group relative rounded-2xl overflow-hidden bg-[#161616] border border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.8),0_0_30px_rgba(255,0,79,0.12)] transition-shadow hover:shadow-[0_20px_50px_rgba(255,0,79,0.25)] will-change-transform">
              {/* Dim overlay that fades in when next card covers it */}
              <div
                className="stack-card-dim absolute inset-0 bg-black pointer-events-none opacity-0 z-30 transition-opacity will-change-[opacity]"
                aria-hidden="true"
              />

              {/* Small Floating Tech-Logo Badge that parallaxes at different speed */}
              <div className="stack-tech-badge absolute top-4 right-4 sm:top-6 sm:right-6 z-40 bg-[#161616]/95 backdrop-blur-md border border-[#ff004f] text-white px-3 sm:px-4 py-1 sm:py-1.5 rounded-full text-[11px] sm:text-xs font-bold tracking-wider shadow-[0_6px_22px_rgba(255,0,79,0.4)] flex items-center gap-2 will-change-transform select-none">
                {badge.icon}
                <span>{badge.label}</span>
              </div>

              {/* Project Image */}
              <img
                src={project.image}
                alt={project.title}
                className="w-full h-[360px] sm:h-[440px] md:h-[480px] object-cover object-center block"
              />

              {/* The Signature Hot Pink Sliding Layer on Hover (Existing Card Design) */}
              <div className="layer">
                <span className="text-xs font-bold uppercase tracking-widest text-white/80 mb-1">
                  Project 0{idx + 1}
                </span>
                <h3 className="text-2xl sm:text-3xl font-extrabold text-white mb-2 text-center">
                  {project.title}
                </h3>
                <p className="text-xs sm:text-sm font-medium text-white/95 max-w-lg mb-4 text-center leading-relaxed">
                  {project.tagline}
                </p>

                {/* Tech Chips */}
                <div className="flex flex-wrap justify-center gap-1.5 mb-5 max-w-md">
                  {project.tech.map((t, tIdx) => (
                    <span
                      key={tIdx}
                      className="text-[11px] font-semibold bg-black/70 text-white px-2.5 py-1 rounded-full border border-white/20"
                    >
                      {t}
                    </span>
                  ))}
                </div>

                {/* Action Circle Links */}
                <div className="flex items-center gap-4">
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="circle-link"
                    title="View GitHub Repository"
                  >
                    <Github size={22} />
                  </a>
                  {project.demo && (
                    <a
                      href={project.demo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="circle-link"
                      title="Open Live Demo"
                    >
                      <ExternalLink size={22} />
                    </a>
                  )}
                  <button
                    onClick={() => onSelectProject(project)}
                    className="circle-link"
                    title="Read Project Architecture Details"
                  >
                    <ExternalLink size={22} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

