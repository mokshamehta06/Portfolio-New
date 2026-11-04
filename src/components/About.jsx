import { useState, useRef } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { GraduationCap, Award, Code, Briefcase, Sparkles } from "lucide-react";
import ScrollScrubText, { ScrubWords, ScrubHighlight } from "./ScrollScrubText";

gsap.registerPlugin(ScrollTrigger);

export default function About() {
  const [activeTab, setActiveTab] = useState("skills");
  const sectionRef = useRef(null);

  useGSAP(
    () => {
      gsap.from(".about-col-1", {
        opacity: 0,
        x: -50,
        duration: 0.9,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 75%",
          toggleActions: "play none none reverse",
        },
      });

      gsap.from(".about-col-2", {
        opacity: 0,
        x: 50,
        duration: 0.9,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 75%",
          toggleActions: "play none none reverse",
        },
      });
    },
    { scope: sectionRef }
  );

  return (
    <section id="about" ref={sectionRef} className="py-24 bg-[#080808] text-[#ababab]">
      <div className="container">
        <div className="flex flex-col lg:flex-row justify-between items-start gap-12 lg:gap-16">
          {/* Column 1: Photo */}
          <div className="about-col-1 w-full lg:w-[38%] flex-shrink-0">
            <div className="relative group">
              <div className="absolute -inset-1 rounded-2xl bg-[#ff004f]/30 blur-lg group-hover:bg-[#ff004f]/60 transition-all duration-500" />
              <div className="relative w-full h-[450px] sm:h-[500px] rounded-2xl overflow-hidden bg-[#161616] border border-white/10 group-hover:border-[#ff004f]/60 transition-all duration-300 shadow-2xl">
                <img
                  src="/image.png"
                  alt="Moksha Mehta"
                  className="absolute h-[132%] max-w-none transition-transform duration-700 group-hover:scale-105 block"
                  style={{
                    left: "-14%",
                    top: "-12%",
                    width: "295%",
                    objectFit: "contain",
                    objectPosition: "left top",
                  }}
                />
              </div>
            </div>
          </div>

          {/* Column 2: Details & Interactive Tabs */}
          <div className="about-col-2 w-full lg:w-[58%]">
            <h2 className="text-4xl sm:text-5xl font-extrabold text-white mb-6">
              About <span className="text-[#ff004f]">Me</span>
            </h2>

            {/* ScrollTrigger Word-by-Word Scrub with Red Marker Wipes */}
            <ScrollScrubText className="space-y-4 mb-6">
              <p className="text-base sm:text-lg leading-relaxed text-[#c0c0c0] font-light">
                <ScrubWords text="I am" />
                <strong className="text-white font-semibold">
                  <ScrubWords text="Moksha Mehta," />
                </strong>{" "}
                <ScrubWords text="a third-year" />
                <span className="text-[#ff004f] font-medium">
                  <ScrubWords text="B.Tech Computer Science Engineering student" />
                </span>{" "}
                <ScrubWords text="holding a" />
                <strong className="text-white font-semibold">
                  <ScrubWords text="7.5 CGPA." />
                </strong>{" "}
                <ScrubWords text="I am passionate about building production-ready," />{" "}
                <ScrubHighlight>scalable web applications</ScrubHighlight>{" "}
                <ScrubWords text="and engineering robust backend architectures." />
              </p>

              <p className="text-base leading-relaxed text-[#ababab] font-light">
                <ScrubWords text="My core engineering focus spans" />{" "}
                <ScrubHighlight>Full Stack Web Development</ScrubHighlight>,{" "}
                <strong className="text-white">
                  <ScrubWords text="Backend Engineering & RESTful API Design," />
                </strong>{" "}
                <ScrubHighlight>AI-powered applications</ScrubHighlight>,{" "}
                <ScrubWords text="and rigorous" />{" "}
                <strong className="text-white">
                  <ScrubWords text="Data Structures and Algorithms" />
                </strong>{" "}
                <ScrubWords text="practice. I love architecting efficient, scalable systems that translate complex challenges into intuitive, high-performance digital experiences." />
              </p>
            </ScrollScrubText>

            {/* Tab navigation headers with signature #ff004f underline */}
            <div className="flex items-center gap-8 sm:gap-12 mt-6 mb-8 border-b border-white/10 pb-3">
              <button
                onClick={() => setActiveTab("skills")}
                className={`tab-links ${activeTab === "skills" ? "active-link" : ""}`}
              >
                <span className="text-roll">
                  <span>Core Skills</span>
                  <span className="text-[#ff004f]">Core Skills</span>
                </span>
              </button>
              <button
                onClick={() => setActiveTab("experience")}
                className={`tab-links ${activeTab === "experience" ? "active-link" : ""}`}
              >
                <span className="text-roll">
                  <span>Experience</span>
                  <span className="text-[#ff004f]">Experience</span>
                </span>
              </button>
              <button
                onClick={() => setActiveTab("education")}
                className={`tab-links ${activeTab === "education" ? "active-link" : ""}`}
              >
                <span className="text-roll">
                  <span>Education &amp; Honors</span>
                  <span className="text-[#ff004f]">Education &amp; Honors</span>
                </span>
              </button>
            </div>

            {/* Tab 1: Skills */}
            {activeTab === "skills" && (
              <div className="tab-contents animate-fadeIn">
                <ul className="space-y-4">
                  <li>
                    <span className="text-[#ff004f] font-semibold block text-sm uppercase tracking-wide">
                      Frontend Development
                    </span>
                    <p className="text-white text-base">
                      React.js, JavaScript (ES6+), HTML5, CSS3, Tailwind CSS, Responsive UI Design
                    </p>
                  </li>
                  <li>
                    <span className="text-[#ff004f] font-semibold block text-sm uppercase tracking-wide">
                      Backend &amp; API Engineering
                    </span>
                    <p className="text-white text-base">
                      Node.js, Express.js, RESTful APIs, JWT Authentication, Microservices &amp; Concurrency
                    </p>
                  </li>
                  <li>
                    <span className="text-[#ff004f] font-semibold block text-sm uppercase tracking-wide">
                      Databases &amp; Caching
                    </span>
                    <p className="text-white text-base">
                      MongoDB (Mongoose), MySQL, Redis
                    </p>
                  </li>
                  <li>
                    <span className="text-[#ff004f] font-semibold block text-sm uppercase tracking-wide">
                      DevOps, Tools &amp; AI
                    </span>
                    <p className="text-white text-base">
                      Git, GitHub, Docker, Postman, Socket.io, Gemini AI, MCP Architecture
                    </p>
                  </li>
                </ul>
              </div>
            )}

            {/* Tab 2: Experience */}
            {activeTab === "experience" && (
              <div className="tab-contents animate-fadeIn">
                <ul className="space-y-4">
                  <li>
                    <span className="text-[#ff004f] font-semibold block text-sm uppercase tracking-wide">
                      2024 – 2025
                    </span>
                    <strong className="text-white text-base block font-medium">Technical Head – Spectra</strong>
                    <p className="text-sm text-[#ababab]">
                      Spearheaded technical operations, coordinated collegiate tech festival infrastructure, and mentored technical coordinators.
                    </p>
                  </li>
                  <li>
                    <span className="text-[#ff004f] font-semibold block text-sm uppercase tracking-wide">
                      2025
                    </span>
                    <strong className="text-white text-base block font-medium">ACROSET 2025 Volunteer</strong>
                    <p className="text-sm text-[#ababab]">
                      Volunteered in technical event orchestration, stage technical management, and campus coordinator logistics.
                    </p>
                  </li>
                  <li>
                    <span className="text-[#ff004f] font-semibold block text-sm uppercase tracking-wide">
                      2024 – Present
                    </span>
                    <strong className="text-white text-base block font-medium">Hackathons &amp; Prototype Development</strong>
                    <p className="text-sm text-[#ababab]">
                      Built innovative solutions under competitive hackathon timelines, focusing on full-stack web applications and AI APIs.
                    </p>
                  </li>
                </ul>
              </div>
            )}

            {/* Tab 3: Education & Honors */}
            {activeTab === "education" && (
              <div className="tab-contents animate-fadeIn">
                <ul className="space-y-4">
                  <li>
                    <span className="text-[#ff004f] font-semibold block text-sm uppercase tracking-wide">
                      2022 – 2026 (Expected)
                    </span>
                    <strong className="text-white text-base block font-medium">
                      B.Tech in Computer Science and Engineering
                    </strong>
                    <p className="text-sm text-white font-medium">
                      Academic Standing: <span className="text-[#ff004f] font-bold">7.5 CGPA</span>
                    </p>
                    <p className="text-xs text-[#ababab] mt-0.5">
                      Core Subjects: Data Structures &amp; Algorithms, Database Systems, Computer Networks, Operating Systems
                    </p>
                  </li>
                  <li>
                    <span className="text-[#ff004f] font-semibold block text-sm uppercase tracking-wide">
                      Academic Recognition
                    </span>
                    <strong className="text-white text-base block font-medium">
                      Cummins Scholarship Recipient
                    </strong>
                    <p className="text-sm text-[#ababab]">
                      Selected for academic merit, technical aptitude, and engineering leadership potential.
                    </p>
                  </li>
                  <li>
                    <span className="text-[#ff004f] font-semibold block text-sm uppercase tracking-wide">
                      Continuous Practice
                    </span>
                    <strong className="text-white text-base block font-medium">
                      LeetCode &amp; Problem Solving
                    </strong>
                    <p className="text-sm text-[#ababab]">
                      Practicing Data Structures &amp; Algorithms to build strong problem-solving fundamentals.
                    </p>
                  </li>
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
