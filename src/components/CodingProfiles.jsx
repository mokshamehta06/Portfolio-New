import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Github, Code2, ExternalLink, CheckCircle2, Flame } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

// Contribution calendar visual mockup with pink & green tones
function ContributionGrid() {
  const intensities = [
    "bg-pink-100",
    "bg-pink-200",
    "bg-pink-300",
    "bg-rose-400",
    "bg-pink-500",
  ];

  return (
    <div className="p-4 rounded-xl bg-pink-50/60 border border-pink-100 my-4">
      <div className="flex items-center justify-between text-xs text-gray-500 font-medium mb-2.5">
        <span>Activity Calendar</span>
        <span className="flex items-center gap-1 text-pink-600 font-semibold">
          <Flame size={12} className="text-pink-500" /> Continuous commits
        </span>
      </div>
      <div className="grid grid-flow-col grid-rows-4 gap-1.5 overflow-x-auto py-1">
        {Array.from({ length: 48 }).map((_, i) => {
          const level = (i * 7 + 3) % intensities.length;
          return (
            <div
              key={i}
              className={`w-3.5 h-3.5 rounded-sm ${intensities[level]} transition-transform hover:scale-125 cursor-pointer`}
              title="Activity node"
            />
          );
        })}
      </div>
      <div className="flex items-center justify-end gap-1.5 text-[10px] text-gray-400 mt-2">
        <span>Less</span>
        <div className="w-2.5 h-2.5 rounded-xs bg-pink-100" />
        <div className="w-2.5 h-2.5 rounded-xs bg-pink-300" />
        <div className="w-2.5 h-2.5 rounded-xs bg-rose-400" />
        <div className="w-2.5 h-2.5 rounded-xs bg-pink-500" />
        <span>More</span>
      </div>
    </div>
  );
}

export default function CodingProfiles() {
  const sectionRef = useRef(null);
  const githubCardRef = useRef(null);
  const leetcodeCardRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      [githubCardRef, leetcodeCardRef].forEach((ref, i) => {
        if (!ref.current) return;
        gsap.fromTo(
          ref.current,
          { y: 50, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.7,
            ease: "power3.out",
            scrollTrigger: {
              trigger: ref.current,
              start: "top 88%",
              toggleActions: "play none none reverse",
            },
            delay: i * 0.15,
          }
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="coding"
      ref={sectionRef}
      className="py-24 px-6 relative overflow-hidden bg-gradient-to-b from-white via-pink-50/30 to-white"
    >
      {/* Background blobs */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-[450px] h-[450px] bg-pink-200/25 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-5xl mx-auto relative z-10">
        {/* Section Title */}
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-1.5 rounded-full bg-pink-100 border border-pink-200 text-pink-600 text-xs font-bold tracking-widest uppercase mb-3 shadow-sm">
            ✦ Code &amp; Problem Solving
          </span>
          <h2 className="text-4xl md:text-5xl font-extrabold text-gray-800 mb-3">
            Coding <span className="shimmer-text">Profiles</span>
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-pink-500 to-rose-400 rounded-full mx-auto mb-4" />
          <p className="text-gray-500 text-base max-w-lg mx-auto">
            My daily coding practice, open-source repositories, and problem-solving metrics.
          </p>
          <div className="inline-flex items-center gap-1.5 text-xs text-pink-700 bg-pink-100/70 border border-pink-200 rounded-full px-4 py-1 mt-4">
            <span>ℹ️</span> Profile handles are configurable with verified URLs.
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* GitHub Card */}
          <div
            ref={githubCardRef}
            className="glass-card rounded-2xl border border-pink-200/80 bg-white/90 shadow-md shadow-pink-100/60 hover:shadow-xl hover:shadow-pink-200/80 hover:border-pink-300 transition-all duration-300 p-8 flex flex-col group"
          >
            {/* Header */}
            <div className="flex items-center gap-4 mb-4">
              <div className="p-3.5 rounded-2xl bg-gradient-to-br from-pink-500 to-rose-400 text-white shadow-md shadow-pink-300/40">
                <Github size={28} />
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-800 group-hover:text-pink-600 transition-colors">
                  GitHub Profile
                </h3>
                <p className="text-gray-500 text-sm">Open Source Repositories &amp; MERN Code</p>
              </div>
            </div>

            {/* Profile handle display */}
            <div className="text-pink-600 text-xs font-mono font-semibold bg-pink-50 border border-pink-200 rounded-xl px-3.5 py-2 mb-3">
              github.com/MokshaMehta
            </div>

            <p className="text-gray-600 text-sm leading-relaxed mb-2">
              Explore source code for full-stack apps, concurrency handling algorithms, REST APIs, and modern responsive frontends.
            </p>

            {/* Contribution Visual Mock */}
            <ContributionGrid />

            {/* Action Button */}
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-auto flex items-center justify-center gap-2 px-5 py-3 rounded-full bg-gradient-to-r from-pink-500 to-rose-400 text-white font-semibold text-sm hover:shadow-lg hover:shadow-pink-300/60 hover:scale-[1.02] active:scale-95 transition-all duration-200"
            >
              Visit GitHub Profile
              <ExternalLink size={15} />
            </a>
          </div>

          {/* LeetCode Card */}
          <div
            ref={leetcodeCardRef}
            className="glass-card rounded-2xl border border-pink-200/80 bg-white/90 shadow-md shadow-pink-100/60 hover:shadow-xl hover:shadow-pink-200/80 hover:border-pink-300 transition-all duration-300 p-8 flex flex-col group"
          >
            {/* Header */}
            <div className="flex items-center gap-4 mb-4">
              <div className="p-3.5 rounded-2xl bg-gradient-to-br from-rose-500 to-pink-500 text-white shadow-md shadow-pink-300/40">
                <Code2 size={28} />
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-800 group-hover:text-pink-600 transition-colors">
                  LeetCode Practice
                </h3>
                <p className="text-gray-500 text-sm">DSA Problem Solving &amp; Algorithmic Growth</p>
              </div>
            </div>

            {/* Profile handle display */}
            <div className="text-pink-600 text-xs font-mono font-semibold bg-pink-50 border border-pink-200 rounded-xl px-3.5 py-2 mb-3">
              leetcode.com/MokshaMehta
            </div>

            <p className="text-gray-600 text-sm leading-relaxed mb-4">
              Regularly practicing algorithmic challenges with emphasis on time and space complexity optimization across common patterns.
            </p>

            {/* Practice Highlights Pills */}
            <div className="grid grid-cols-3 gap-2.5 my-3">
              <div className="p-3 rounded-xl bg-pink-50/70 border border-pink-100 text-center">
                <span className="block text-base font-black text-pink-600">Arrays</span>
                <span className="text-[11px] text-gray-500">Hash Maps &amp; 2-Pointers</span>
              </div>
              <div className="p-3 rounded-xl bg-pink-50/70 border border-pink-100 text-center">
                <span className="block text-base font-black text-rose-500">Trees</span>
                <span className="text-[11px] text-gray-500">BFS &amp; DFS Traversal</span>
              </div>
              <div className="p-3 rounded-xl bg-pink-50/70 border border-pink-100 text-center">
                <span className="block text-base font-black text-pink-600">Strings</span>
                <span className="text-[11px] text-gray-500">Sliding Window</span>
              </div>
            </div>

            <div className="space-y-1.5 my-3 text-xs text-gray-600">
              <div className="flex items-center gap-2">
                <CheckCircle2 size={14} className="text-pink-500" />
                <span>Focus on clean, optimal solutions &amp; edge cases</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 size={14} className="text-pink-500" />
                <span>Consistent continuous preparation for tech interview rounds</span>
              </div>
            </div>

            {/* Action Button */}
            <a
              href="https://leetcode.com"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-auto flex items-center justify-center gap-2 px-5 py-3 rounded-full bg-white border-2 border-pink-400 text-pink-600 font-semibold text-sm hover:bg-pink-50 hover:border-pink-500 hover:scale-[1.02] active:scale-95 transition-all duration-200 shadow-sm"
            >
              Explore LeetCode Activity
              <ExternalLink size={15} />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
