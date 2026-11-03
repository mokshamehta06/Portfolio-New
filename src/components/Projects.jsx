import { useEffect, useRef, useState } from "react";
import { ExternalLink, Github, Sparkles, Layers } from "lucide-react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const PROJECTS = [
  {
    title: "CineBook – Movie Ticket Booking",
    tagline: "BookMyShow-inspired platform with seat selection & concurrency handling",
    image: "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?q=80&w=900&auto=format&fit=crop",
    problem: "Traditional ticket systems suffer from race conditions during peak seat selection.",
    solution: "Full-stack MERN platform with seat locking, transaction isolation, and live show discovery.",
    features: [
      "Live Movie & Cinema Discovery",
      "Interactive Seat Grid Selection",
      "Concurrency & Race-Condition Handling",
      "JWT Secure Authentication",
      "Automated Booking Confirmation",
    ],
    tech: ["React.js", "Node.js", "Express.js", "MongoDB", "REST APIs"],
    github: "https://github.com",
    demo: null,
  },
  {
    title: "VoiceWeb – AI Voice Assistant",
    tagline: "Embeddable website voice copilot powered by Gemini & MCP",
    image: "https://images.unsplash.com/photo-1589254065878-42c9da997008?q=80&w=900&auto=format&fit=crop",
    problem: "Static websites lack intuitive conversational navigation and assistive automation.",
    solution: "Shadow DOM-isolated voice widget leveraging Gemini AI and MCP for autonomous page interaction.",
    features: [
      "Voice & Natural Text Interaction",
      "Gemini AI Multi-turn Reasoning",
      "MCP Server Browser Automation",
      "Shadow DOM Widget Isolation",
      "Page Understanding & Action Execution",
    ],
    tech: ["JavaScript", "Gemini AI", "MCP", "Web Speech API", "Node.js"],
    github: "https://github.com",
    demo: null,
  },
  {
    title: "CivicSolve – Complaint Management",
    tagline: "Civic governance & complaint routing platform with Cloudinary",
    image: "https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=900&auto=format&fit=crop",
    problem: "Citizens struggle with bureaucratic friction and lack visibility into civic issue resolution.",
    solution: "End-to-end complaint tracking system with geo-tagging, image proof, and automated department dispatch.",
    features: [
      "Citizen Complaint Submission",
      "Cloudinary Image & Proof Upload",
      "Department & Worker Assignment",
      "Status Tracking & Progress Timelines",
      "Administrative Oversight Dashboard",
    ],
    tech: ["React.js", "Node.js", "Express.js", "MongoDB", "Cloudinary"],
    github: "https://github.com",
    demo: null,
  },
  {
    title: "WanderBook – Travel Booking App",
    tagline: "Curated travel & itinerary booking with seamless discovery",
    image: "https://images.unsplash.com/photo-1488646953014-85cb44e25828?q=80&w=900&auto=format&fit=crop",
    problem: "Travelers need an intuitive single-window booking interface without cluttered itineraries.",
    solution: "Modern travel discovery app with filtering, package customization, and booking history.",
    features: [
      "Destination Discovery & Filters",
      "Personalized Itinerary Packages",
      "User-friendly Booking Management",
      "Secure Profile & Booking Archive",
    ],
    tech: ["React.js", "Node.js", "Express.js", "MongoDB", "Tailwind CSS"],
    github: "https://github.com",
    demo: null,
  },
];

export default function Projects() {
  const sectionRef = useRef(null);
  const [selectedProject, setSelectedProject] = useState(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".work", {
        opacity: 0,
        y: 50,
        duration: 0.8,
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
    <section id="projects" ref={sectionRef} className="py-24 bg-[#080808]">
      <div className="container">
        {/* Section Heading */}
        <div className="text-center md:text-left mb-14">
          <p className="text-sm font-semibold uppercase tracking-widest text-[#ff004f] mb-2">
            Portfolio Showcase
          </p>
          <h2 className="text-4xl sm:text-5xl font-extrabold text-white">
            My <span className="text-[#ff004f]">Work &amp; Projects</span>
          </h2>
          <div className="w-20 h-1 bg-[#ff004f] mt-4 rounded-full" />
          <p className="text-[#ababab] text-base mt-4 max-w-xl font-light">
            Hover over any project to inspect problem statements, core architecture, and open-source repositories.
          </p>
        </div>

        {/* Signature Work List Grid with Sliding Layer */}
        <div className="work-list grid grid-cols-1 md:grid-cols-2 gap-10">
          {PROJECTS.map((project, idx) => (
            <div key={idx} className="work group">
              <img src={project.image} alt={project.title} />

              {/* The Signature Hot Pink Sliding Layer */}
              <div className="layer">
                <h3 className="text-2xl font-bold text-white mb-2">{project.title}</h3>
                <p className="text-xs font-medium text-white/95 max-w-md mb-3 leading-relaxed">
                  {project.tagline}
                </p>

                {/* Tech Chips */}
                <div className="flex flex-wrap justify-center gap-1.5 mb-4 max-w-xs">
                  {project.tech.map((t, tIdx) => (
                    <span
                      key={tIdx}
                      className="text-[11px] font-semibold bg-black/60 text-white px-2 py-0.5 rounded"
                    >
                      {t}
                    </span>
                  ))}
                </div>

                {/* Action Circle Links */}
                <div className="flex items-center gap-3">
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="circle-link"
                    title="View GitHub Repository"
                  >
                    <Github size={22} />
                  </a>
                  <button
                    onClick={() => setSelectedProject(project)}
                    className="circle-link"
                    title="Read Project Architecture Details"
                  >
                    <ExternalLink size={22} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Modal for In-Depth Project Details */}
        {selectedProject && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fadeIn">
            <div className="bg-[#181818] border border-[#ff004f]/40 max-w-2xl w-full rounded-2xl p-6 sm:p-8 relative text-left shadow-2xl">
              <button
                onClick={() => setSelectedProject(null)}
                className="absolute top-5 right-5 text-[#ababab] hover:text-white text-2xl font-bold"
              >
                ✕
              </button>

              <span className="text-xs font-semibold text-[#ff004f] uppercase tracking-widest">
                Architecture Breakdown
              </span>
              <h3 className="text-2xl sm:text-3xl font-bold text-white mt-1 mb-4">
                {selectedProject.title}
              </h3>

              <div className="space-y-4 text-sm text-[#c0c0c0] leading-relaxed">
                <div>
                  <strong className="text-[#ff004f] block font-semibold mb-1">Problem Statement:</strong>
                  <p>{selectedProject.problem}</p>
                </div>

                <div>
                  <strong className="text-[#ff004f] block font-semibold mb-1">Engineered Solution:</strong>
                  <p>{selectedProject.solution}</p>
                </div>

                <div>
                  <strong className="text-white block font-semibold mb-2">Key Engineering Features:</strong>
                  <ul className="list-disc list-inside space-y-1 text-xs sm:text-sm text-[#ababab]">
                    {selectedProject.features.map((feat, fIdx) => (
                      <li key={fIdx}>{feat}</li>
                    ))}
                  </ul>
                </div>

                <div>
                  <strong className="text-white block font-semibold mb-2">Tech Stack:</strong>
                  <div className="flex flex-wrap gap-2">
                    {selectedProject.tech.map((t, tIdx) => (
                      <span
                        key={tIdx}
                        className="text-xs font-medium px-2.5 py-1 rounded bg-[#262626] text-white border border-white/10"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="mt-8 flex gap-4">
                <a
                  href={selectedProject.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-pink filled text-xs py-2.5 px-6 font-semibold"
                >
                  <Github size={15} /> GitHub Code
                </a>
                <button
                  onClick={() => setSelectedProject(null)}
                  className="btn-pink text-xs py-2.5 px-6 font-semibold"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
