import { useState, useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { GraduationCap, Award, Code, Briefcase, Sparkles } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

export default function About() {
  const [activeTab, setActiveTab] = useState("skills");
  const sectionRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
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
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="about" ref={sectionRef} className="py-24 bg-[#080808] text-[#ababab]">
      <div className="container">
        <div className="flex flex-col lg:flex-row justify-between items-start gap-12 lg:gap-16">
          {/* Column 1: Photo */}
          <div className="about-col-1 w-full lg:w-[38%] flex-shrink-0">
            <div className="relative group">
              <div className="absolute -inset-1 rounded-2xl bg-[#ff004f]/30 blur-lg group-hover:bg-[#ff004f]/60 transition-all duration-500" />
              <img
                src="/image.jpg"
                alt="Moksha Mehta"
                className="relative w-full rounded-2xl object-cover shadow-2xl border border-white/10 group-hover:border-[#ff004f]/60 transition-all duration-300"
              />
            </div>
          </div>

          {/* Column 2: Details & Interactive Tabs */}
          <div className="about-col-2 w-full lg:w-[58%]">
            <h2 className="text-4xl sm:text-5xl font-extrabold text-white mb-6">
              About <span className="text-[#ff004f]">Me</span>
            </h2>

            <p className="text-base sm:text-lg leading-relaxed text-[#c0c0c0] font-light mb-4">
              I am <strong className="text-white font-semibold">Moksha Mehta</strong>, a third-year{" "}
              <span className="text-[#ff004f] font-medium">B.Tech Computer Science Engineering student</span>{" "}
              holding a <strong className="text-white font-semibold">7.5 CGPA</strong>. I am passionate about
              building production-ready, scalable full-stack web applications and engineering robust backend architectures.
            </p>

            <p className="text-base leading-relaxed text-[#ababab] font-light mb-6">
              My core engineering focus spans <strong className="text-white">Full Stack Web Development</strong>,{" "}
              <strong className="text-white">Backend Engineering &amp; RESTful API Design</strong>,{" "}
              <strong className="text-white">AI-powered applications</strong>, and rigorous{" "}
              <strong className="text-white">Data Structures and Algorithms</strong> practice. I love architecting
              efficient, scalable systems that translate complex challenges into intuitive, high-performance digital experiences.
            </p>

            {/* Tab navigation headers with signature #ff004f underline */}
            <div className="flex items-center gap-8 sm:gap-12 mt-6 mb-8 border-b border-white/10 pb-3">
              <button
                onClick={() => setActiveTab("skills")}
                className={`tab-links ${activeTab === "skills" ? "active-link" : ""}`}
              >
                Core Skills
              </button>
              <button
                onClick={() => setActiveTab("experience")}
                className={`tab-links ${activeTab === "experience" ? "active-link" : ""}`}
              >
                Experience
              </button>
              <button
                onClick={() => setActiveTab("education")}
                className={`tab-links ${activeTab === "education" ? "active-link" : ""}`}
              >
                Education &amp; Honors
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
