import { useEffect, useRef } from "react";
import { Award, Calendar, Flame, Users, Sparkles } from "lucide-react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const EXPERIENCES = [
  {
    title: "Technical Head – Spectra",
    role: "Led technical operations for the college's premier technical festival, coordinating events, mentoring teams, and overseeing developer workflows.",
    period: "2024 – 2025",
    badge: "Leadership & Fest",
  },
  {
    title: "ACROSET 2025 Volunteer",
    role: "Actively contributed to event execution, technology support, and seamless audience coordination for the annual cultural and technical flagship festival.",
    period: "2025",
    badge: "Volunteer & Ops",
  },
  {
    title: "Hackathon Competitions & Rapid Prototyping",
    role: "Designed, coded, and pitched full-stack solutions under tight time constraints, tackling civic, automation, and web intelligence challenges.",
    period: "2024 – Present",
    badge: "Competitive Dev",
  },
  {
    title: "Full Stack & AI Development Journey",
    role: "Engineered scalable MERN applications, designed transactional backend schemas, experimented with MCP server integrations, and practiced DSA.",
    period: "2023 – Present",
    badge: "Engineering",
  },
];

export default function Experience() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".timeline-card", {
        opacity: 0,
        x: -40,
        duration: 0.7,
        stagger: 0.15,
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
    <section id="experience" ref={sectionRef} className="py-24 bg-[#080808]">
      <div className="container">
        <div className="text-center md:text-left mb-14">
          <p className="text-sm font-semibold uppercase tracking-widest text-[#ff004f] mb-2">
            Journey &amp; Involvement
          </p>
          <h2 className="text-4xl sm:text-5xl font-extrabold text-white">
            Experience &amp; <span className="text-[#ff004f]">Leadership</span>
          </h2>
          <div className="w-20 h-1 bg-[#ff004f] mt-4 rounded-full" />
        </div>

        {/* Timeline Items */}
        <div className="relative border-l-2 border-[#ff004f]/40 ml-4 md:ml-6 pl-8 space-y-10">
          {EXPERIENCES.map((item, idx) => (
            <div key={idx} className="timeline-card relative group">
              {/* Glowing Dot on the line */}
              <div className="absolute -left-[41px] top-1.5 w-5 h-5 rounded-full bg-[#080808] border-3 border-[#ff004f] group-hover:scale-125 group-hover:bg-[#ff004f] transition-all shadow-[0_0_12px_rgba(255,0,79,0.8)]" />

              <div className="bg-[#1a1a1a] border border-white/5 p-6 sm:p-7 rounded-xl hover:border-[#ff004f]/50 hover:bg-[#202020] transition-all duration-300">
                <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                  <h3 className="text-xl sm:text-2xl font-bold text-white group-hover:text-[#ff004f] transition-colors">
                    {item.title}
                  </h3>
                  <span className="text-xs font-semibold px-3 py-1 rounded-full bg-[#ff004f]/20 text-[#ff004f] border border-[#ff004f]/40">
                    {item.period}
                  </span>
                </div>

                <span className="text-xs font-semibold text-[#ababab] uppercase tracking-wider block mb-3">
                  {item.badge}
                </span>

                <p className="text-sm sm:text-base text-[#ababab] leading-relaxed font-light">
                  {item.role}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
