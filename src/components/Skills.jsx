import { useEffect, useRef } from "react";
import { Layout, Server, Database, Wrench, Cpu } from "lucide-react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const SKILL_CATEGORIES = [
  {
    title: "Frontend Engineering",
    icon: <Layout className="w-10 h-10 mb-5 text-[#ff004f] group-hover:text-white transition-colors" />,
    skills: ["HTML5", "CSS3", "JavaScript (ES6+)", "React.js", "Tailwind CSS"],
    description: "Building responsive, modern, pixel-perfect user interfaces with optimized render lifecycles.",
  },
  {
    title: "Backend & APIs",
    icon: <Server className="w-10 h-10 mb-5 text-[#ff004f] group-hover:text-white transition-colors" />,
    skills: ["Node.js", "Express.js", "RESTful APIs", "JWT Auth", "System Architecture"],
    description: "Designing scalable server-side systems, secure authentication pipelines, and robust APIs.",
  },
  {
    title: "Database Management",
    icon: <Database className="w-10 h-10 mb-5 text-[#ff004f] group-hover:text-white transition-colors" />,
    skills: ["MongoDB", "Mongoose", "MySQL", "Schema Design", "Query Optimization"],
    description: "Architecting reliable relational and NoSQL database schemas with high availability.",
  },
  {
    title: "DevOps & Tools",
    icon: <Wrench className="w-10 h-10 mb-5 text-[#ff004f] group-hover:text-white transition-colors" />,
    skills: ["Git", "GitHub", "Docker", "Postman", "CI/CD Workflows"],
    description: "Industry-standard version control, API testing, containerization, and developer tooling.",
  },
  {
    title: "Advanced Concepts & AI",
    icon: <Cpu className="w-10 h-10 mb-5 text-[#ff004f] group-hover:text-white transition-colors" />,
    skills: ["Redis Caching", "Socket.io", "MCP Protocol", "Gemini AI Integration", "WebSockets"],
    description: "Real-time communication, intelligent agent integration, caching, and distributed protocol handling.",
  },
];

export default function Skills() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".service-card", {
        opacity: 0,
        y: 45,
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
    <section id="skills" ref={sectionRef} className="py-24 bg-[#080808]">
      <div className="container">
        <div className="text-center md:text-left mb-14">
          <p className="text-sm font-semibold uppercase tracking-widest text-[#ff004f] mb-2">
            Technical Proficiency
          </p>
          <h2 className="text-4xl sm:text-5xl font-extrabold text-white">
            My <span className="text-[#ff004f]">Skills &amp; Expertise</span>
          </h2>
          <div className="w-20 h-1 bg-[#ff004f] mt-4 rounded-full" />
        </div>

        {/* Services / Skills Grid (Classic #262626 card that lifts and turns #ff004f on hover) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {SKILL_CATEGORIES.map((category, idx) => (
            <div key={idx} className="service-card group cursor-pointer">
              {category.icon}
              <h3 className="text-2xl font-semibold text-white mb-3 group-hover:text-white">
                {category.title}
              </h3>
              <p className="text-sm text-[#ababab] group-hover:text-white/90 leading-relaxed mb-6 font-light">
                {category.description}
              </p>

              {/* Skills Chips */}
              <div className="flex flex-wrap gap-2 pt-2 border-t border-white/10 group-hover:border-white/30">
                {category.skills.map((skill, sIdx) => (
                  <span
                    key={sIdx}
                    className="text-xs px-2.5 py-1 rounded bg-black/40 text-white/90 font-medium group-hover:bg-white group-hover:text-[#ff004f] transition-colors"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
