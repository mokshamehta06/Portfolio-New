import { useRef } from "react";
import AnimatedTimeline from "./AnimatedTimeline";

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

        {/* Animated Interactive Scrubbed Timeline */}
        <AnimatedTimeline experiences={EXPERIENCES} />
      </div>
    </section>
  );
}
