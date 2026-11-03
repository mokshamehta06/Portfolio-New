import { useEffect, useRef } from "react";
import { Award, BookOpen, FileCheck, Trophy, Sparkles } from "lucide-react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const ACHIEVEMENTS = [
  {
    icon: <Award className="w-8 h-8 text-[#ff004f]" />,
    title: "Cummins Scholarship",
    badge: "Scholarship Award",
    description: "Awarded the Cummins Scholarship in recognition of academic excellence, engineering leadership potential, and technical aptitude.",
  },
  {
    icon: <BookOpen className="w-8 h-8 text-[#ff004f]" />,
    title: "LeetCode Problem Solving",
    badge: "DSA Practice",
    description: "Actively solving algorithmic and data structure challenges on LeetCode, strengthening core problem-solving fundamentals.",
  },
  {
    icon: <FileCheck className="w-8 h-8 text-[#ff004f]" />,
    title: "Technical Certifications",
    badge: "Credentials",
    description: "Earned certifications in full-stack web development, modern JavaScript engineering, and RESTful API architecture.",
  },
  {
    icon: <Trophy className="w-8 h-8 text-[#ff004f]" />,
    title: "Hackathon Competitions",
    badge: "Competitive Dev",
    description: "Participated in competitive hackathons, collaborating under tight deadlines to engineer and present functional software prototypes.",
  },
];

export default function Achievements() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".achievement-card", {
        opacity: 0,
        y: 40,
        duration: 0.7,
        stagger: 0.12,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 75%",
          toggleActions: "play none none reverse",
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="achievements" ref={sectionRef} className="py-24 bg-[#080808]">
      <div className="container">
        <div className="text-center md:text-left mb-14">
          <p className="text-sm font-semibold uppercase tracking-widest text-[#ff004f] mb-2">
            Recognition &amp; Honors
          </p>
          <h2 className="text-4xl sm:text-5xl font-extrabold text-white">
            Achievements &amp; <span className="text-[#ff004f]">Accolades</span>
          </h2>
          <div className="w-20 h-1 bg-[#ff004f] mt-4 rounded-full" />
          <p className="text-[#ababab] text-base mt-4 max-w-xl font-light">
            Highlighting academic merit, scholarship honors, and competitive coding milestones.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {ACHIEVEMENTS.map((item, idx) => (
            <div
              key={idx}
              className="achievement-card bg-[#1a1a1a] border border-white/5 p-6 rounded-xl hover:border-[#ff004f] hover:shadow-[0_10px_25px_rgba(255,0,79,0.25)] hover:-translate-y-2 transition-all duration-300 flex flex-col justify-between group"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="p-3 rounded-lg bg-black/40 border border-white/5 group-hover:scale-110 transition-transform">
                    {item.icon}
                  </div>
                  <span className="text-[11px] font-bold text-[#ff004f] bg-[#ff004f]/15 px-2.5 py-1 rounded-full uppercase tracking-wider">
                    {item.badge}
                  </span>
                </div>

                <h3 className="text-lg font-bold text-white mb-2 group-hover:text-[#ff004f] transition-colors">
                  {item.title}
                </h3>

                <p className="text-xs sm:text-sm text-[#ababab] leading-relaxed font-light">
                  {item.description}
                </p>
              </div>

              <div className="mt-6 pt-3 border-t border-white/5 flex items-center justify-between text-xs text-white/60">
                <span>Verified Milestone</span>
                <span className="text-[#ff004f]">✦</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
