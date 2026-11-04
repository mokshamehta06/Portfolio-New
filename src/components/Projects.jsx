import { useRef, useState } from "react";
import { ExternalLink, Github, Sparkles, Layers, Layers3, List } from "lucide-react";
import ProjectRowList from "./ProjectRowList";
import StackedProjectCards from "./StackedProjectCards";
import useCardGridReveal from "../hooks/useCardGridReveal";

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
    github: "https://github.com/mokshamehta06",
    demo: null,
  },
  {
    title: "VoiceWeb – AI Voice Assistant",
    tagline: "Embeddable website voice copilot powered by Gemini & MCP",
    image: "/voiceassistant-preview.jpg",
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
    github: "https://github.com/mokshamehta06",
    demo: "https://embedded-voice-assistant-mokshamehtas-projects.vercel.app",
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
    github: "https://github.com/mokshamehta06",
    demo: null,
  },
  {
    title: "SETU – E-Waste Management Platform",
    tagline: "Connecting citizens with authorized recycling agencies for responsible e-waste disposal",
    image: "https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?q=80&w=900&auto=format&fit=crop",
    problem: "Millions of electronic devices are discarded irresponsibly, causing environmental hazards due to lack of accessible recycling infrastructure.",
    solution: "A platform that bridges citizens and authorized e-waste recycling agencies, enabling scheduled pickups, drop-off tracking, and responsible disposal of electronic devices.",
    features: [
      "E-Waste Pickup Scheduling",
      "Authorized Recycling Agency Network",
      "Device Category & Quantity Management",
      "Disposal Status Tracking",
      "Citizen & Agency Dashboards",
    ],
    tech: ["React.js", "Node.js", "Express.js", "MongoDB", "Tailwind CSS"],
    github: "https://github.com/mokshamehta06",
    demo: "https://hackwave-3-0-blond.vercel.app/",
  },
];

export default function Projects() {
  const sectionRef = useRef(null);
  const [selectedProject, setSelectedProject] = useState(null);
  const [viewMode, setViewMode] = useState("stack"); // "stack" or "rows"

  // 60fps Scroll Reveal: start at y:60 and opacity: 0, 0.08s stagger
  useCardGridReveal(sectionRef, ".work");

  return (
    <section id="projects" ref={sectionRef} className="py-24 bg-[#080808]">
      <div className="container">
        {/* Section Heading */}
        {/* Section Heading & View Switcher */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14">
          <div>
            <p className="text-sm font-semibold uppercase tracking-widest text-[#ff004f] mb-2">
              Portfolio Showcase
            </p>
            <h2 className="text-4xl sm:text-5xl font-extrabold text-white">
              My <span className="text-[#ff004f]">Work &amp; Projects</span>
            </h2>
            <div className="w-20 h-1 bg-[#ff004f] mt-4 rounded-full" />
            <p className="text-[#ababab] text-base mt-4 max-w-xl font-light">
              Explore my full-stack engineering work through interactive stacked cards or quick list views.
            </p>
          </div>

          {/* View Mode Toggle Pill */}
          <div className="hidden sm:inline-flex items-center p-1 bg-[#1a1a1a] border border-white/10 rounded-full self-start md:self-auto shadow-inner">
            <button
              onClick={() => setViewMode("stack")}
              className={`flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold transition-all ${
                viewMode === "stack"
                  ? "bg-[#ff004f] text-white shadow-[0_2px_12px_rgba(255,0,79,0.4)]"
                  : "text-[#ababab] hover:text-white"
              }`}
            >
              <Layers3 size={14} />
              <span>Stack Cards</span>
            </button>
            <button
              onClick={() => setViewMode("rows")}
              className={`flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold transition-all ${
                viewMode === "rows"
                  ? "bg-[#ff004f] text-white shadow-[0_2px_12px_rgba(255,0,79,0.4)]"
                  : "text-[#ababab] hover:text-white"
              }`}
            >
              <List size={14} />
              <span>Rows List</span>
            </button>
          </div>
        </div>

        {/* Dynamic Project Presentation */}
        {viewMode === "stack" ? (
          <StackedProjectCards
            projects={PROJECTS}
            onSelectProject={setSelectedProject}
          />
        ) : (
          <ProjectRowList
            projects={PROJECTS}
            onSelectProject={setSelectedProject}
          />
        )}

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
