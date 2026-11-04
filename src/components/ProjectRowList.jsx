import React, { useRef, useState, useEffect } from "react";
import { ExternalLink, Github, ArrowUpRight } from "lucide-react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";

/**
 * ProjectRowList Component
 * - Renders project rows (Project name in bold uppercase, tech stack as small red-outlined pills).
 * - On hover: Row gets a soft red-tinted background.
 * - Floating preview card follows the cursor with smooth lag via gsap.quickTo().
 * - Tilts slightly based on mouse movement speed.
 * - Scales in on enter and scales out on leave (60fps GPU transform & opacity only).
 * - Automatically disabled on touch devices with original layout as fallback.
 * - Respects prefers-reduced-motion.
 */
export default function ProjectRowList({ projects, onSelectProject }) {
  const containerRef = useRef(null);
  const previewRef = useRef(null);
  const [activeProject, setActiveProject] = useState(null);
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  // Detect touch device on mount
  useEffect(() => {
    const isTouch =
      typeof window !== "undefined" &&
      ("ontouchstart" in window ||
        navigator.maxTouchPoints > 0 ||
        window.matchMedia("(hover: none)").matches);
    setIsTouchDevice(isTouch);
  }, []);

  const quickX = useRef(null);
  const quickY = useRef(null);
  const quickRotate = useRef(null);
  const lastMousePos = useRef({ x: 0, y: 0, time: Date.now() });

  useGSAP(
    () => {
      if (isTouchDevice || !previewRef.current) return;

      const prefersReducedMotion =
        typeof window !== "undefined" &&
        window.matchMedia("(prefers-reduced-motion: reduce)").matches;

      // Initialize gsap.quickTo for high-performance 60fps cursor tracking
      quickX.current = gsap.quickTo(previewRef.current, "x", {
        duration: 0.35,
        ease: "power3.out",
      });
      quickY.current = gsap.quickTo(previewRef.current, "y", {
        duration: 0.35,
        ease: "power3.out",
      });
      quickRotate.current = gsap.quickTo(previewRef.current, "rotation", {
        duration: 0.45,
        ease: "power2.out",
      });

      // Mousemove listener with tilt calculation based on horizontal speed
      const handleMouseMove = (e) => {
        const { clientX, clientY } = e;
        const now = Date.now();
        const dt = Math.max(now - lastMousePos.current.time, 1);
        const dx = clientX - lastMousePos.current.x;

        // Calculate velocity-based tilt (-12deg to +12deg)
        const speed = dx / dt;
        const tilt = prefersReducedMotion ? 0 : Math.max(Math.min(speed * 12, 14), -14);

        lastMousePos.current = { x: clientX, y: clientY, time: now };

        // Position preview card centered slightly offset from cursor
        quickX.current(clientX + 25);
        quickY.current(clientY - 120);
        quickRotate.current(tilt);
      };

      window.addEventListener("mousemove", handleMouseMove, { passive: true });

      return () => {
        window.removeEventListener("mousemove", handleMouseMove);
      };
    },
    { scope: containerRef, dependencies: [isTouchDevice] }
  );

  // Handle row hover enter
  const handleMouseEnterRow = (project, e) => {
    if (isTouchDevice) return;
    setActiveProject(project);

    if (previewRef.current) {
      // Position immediately near cursor before scaling in
      gsap.set(previewRef.current, {
        x: e.clientX + 25,
        y: e.clientY - 120,
        rotation: 0,
        scale: 0.75,
        opacity: 0,
      });

      // Scale in
      gsap.to(previewRef.current, {
        scale: 1,
        opacity: 1,
        duration: 0.3,
        ease: "back.out(1.6)",
        force3D: true,
      });
    }
  };

  // Handle row hover leave
  const handleMouseLeaveRow = () => {
    if (isTouchDevice || !previewRef.current) return;

    gsap.to(previewRef.current, {
      scale: 0.75,
      opacity: 0,
      duration: 0.22,
      ease: "power2.in",
      force3D: true,
      onComplete: () => {
        setActiveProject(null);
      },
    });
  };

  return (
    <div ref={containerRef} className="relative w-full">
      {/* Floating Preview Card (Desktop cursor follower) */}
      {!isTouchDevice && (
        <div
          ref={previewRef}
          className="fixed top-0 left-0 pointer-events-none z-50 opacity-0 overflow-hidden rounded-xl border-2 border-[#ff004f] shadow-[0_15px_35px_rgba(0,0,0,0.8),0_0_25px_rgba(255,0,79,0.35)] bg-[#161616] w-[280px] sm:w-[320px] aspect-video will-change-transform"
          style={{ willChange: "transform, opacity" }}
          aria-hidden="true"
        >
          {activeProject && (
            <div className="relative w-full h-full">
              <img
                src={activeProject.image}
                alt={activeProject.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent p-3 flex flex-col justify-end">
                <span className="text-[10px] uppercase font-bold text-[#ff004f] tracking-wider">
                  Live Preview
                </span>
                <p className="text-xs font-semibold text-white truncate">
                  {activeProject.title}
                </p>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Rows Container */}
      <div className="flex flex-col divide-y divide-white/10 border-y border-white/10">
        {projects.map((project, idx) => (
          <div
            key={idx}
            onMouseEnter={(e) => handleMouseEnterRow(project, e)}
            onMouseLeave={handleMouseLeaveRow}
            className="group relative flex flex-col md:flex-row md:items-center justify-between py-6 px-4 sm:px-6 transition-colors duration-300 hover:bg-[#ff004f]/10 rounded-lg cursor-pointer"
          >
            {/* Left: Project Number & Bold Uppercase Name & Tagline */}
            <div className="flex items-start md:items-center gap-4 sm:gap-6 flex-1 pr-4">
              <span className="text-xs sm:text-sm font-mono text-[#ff004f] pt-1 md:pt-0 font-bold">
                0{idx + 1}
              </span>
              <div>
                <h3 className="text-lg sm:text-xl md:text-2xl font-extrabold uppercase tracking-wide text-white group-hover:text-[#ff004f] transition-colors flex items-center gap-2">
                  <span>{project.title}</span>
                  <ArrowUpRight
                    size={18}
                    className="opacity-0 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all text-[#ff004f] hidden md:inline-block"
                  />
                </h3>
                <p className="text-xs sm:text-sm text-[#ababab] font-light mt-1 max-w-xl">
                  {project.tagline}
                </p>
              </div>
            </div>

            {/* Middle: Tech Stack as Small Red-Outlined Pills */}
            <div className="flex flex-wrap items-center gap-1.5 mt-3 md:mt-0 md:px-4">
              {project.tech.map((t, tIdx) => (
                <span
                  key={tIdx}
                  className="text-[11px] font-medium px-2.5 py-0.5 rounded-full border border-[#ff004f]/60 bg-[#ff004f]/10 text-white tracking-wide"
                >
                  {t}
                </span>
              ))}
            </div>

            {/* Right: Actions */}
            <div className="flex items-center gap-3 mt-4 md:mt-0" onClick={(e) => e.stopPropagation()}>
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-[#1e1e1e] border border-white/10 flex items-center justify-center text-[#ababab] hover:text-white hover:bg-[#ff004f] hover:border-[#ff004f] transition-colors shadow-sm"
                title="View GitHub Repository"
              >
                <Github size={16} />
              </a>

              {project.demo && (
                <a
                  href={project.demo}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-full bg-[#ff004f] text-white flex items-center justify-center hover:bg-[#e60046] transition-colors shadow-md"
                  title="Open Live Demo"
                >
                  <ExternalLink size={16} />
                </a>
              )}

              <button
                onClick={() => onSelectProject(project)}
                className="text-xs font-semibold px-3 py-1.5 rounded-md bg-[#222] hover:bg-[#ff004f] text-[#c0c0c0] hover:text-white transition-colors"
              >
                Details
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

