import { useEffect, useRef, useState } from "react";
import { Github, Linkedin, ArrowDown, Download } from "lucide-react";
import { motion } from "framer-motion";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import MaskedText from "./MaskedText";
import HeroStickers from "./HeroStickers";

gsap.registerPlugin(ScrollTrigger);

const ROLES = [
  "Full Stack Developer",
  "MERN Stack Developer",
  "Backend Engineer",
  "Problem Solver",
];

function HeroCard() {
  return (
    <div className="hero-card relative rounded-2xl overflow-hidden bg-[#161616] border-2 border-[#ff0055]/50 w-[300px] sm:w-[350px] shadow-2xl">
      <div className="relative w-full h-[430px] sm:h-[480px] overflow-hidden bg-[#161616]">
        <img
          src="/image.png"
          alt="Moksha Mehta"
          className="absolute h-[132%] max-w-none transition-transform duration-700 hover:scale-105 block"
          style={{
            left: "-14%",
            top: "-12%",
            width: "295%",
            objectFit: "contain",
            objectPosition: "left top",
          }}
        />
      </div>

      {/* Bottom gradient bar overlay */}
      <div className="absolute bottom-0 left-0 right-0 p-5 bg-gradient-to-t from-black via-black/90 to-transparent">
        <p className="text-xs font-semibold text-pink tracking-widest uppercase mb-0.5">
          Full Stack MERN Developer
        </p>
        <h3 className="text-xl font-bold text-white">Moksha Mehta</h3>
        <p className="text-xs text-[#ababab] mt-1">B.Tech CSE • CGPA: 7.5</p>
      </div>
    </div>
  );
}

export default function Hero({ isReady = true }) {
  const [roleText, setRoleText] = useState("");
  const [roleIdx, setRoleIdx] = useState(0);
  const [charIdx, setCharIdx] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  const heroRef = useRef(null);

  // Typewriter effect
  useEffect(() => {
    if (!isReady) return;
    const current = ROLES[roleIdx];
    let timer;

    if (!isDeleting && charIdx <= current.length) {
      timer = setTimeout(() => {
        setRoleText(current.substring(0, charIdx));
        setCharIdx((prev) => prev + 1);
      }, 90);
    } else if (!isDeleting && charIdx > current.length) {
      timer = setTimeout(() => setIsDeleting(true), 1600);
    } else if (isDeleting && charIdx >= 0) {
      timer = setTimeout(() => {
        setRoleText(current.substring(0, charIdx));
        setCharIdx((prev) => prev - 1);
      }, 50);
    } else {
      setIsDeleting(false);
      setRoleIdx((prev) => (prev + 1) % ROLES.length);
    }

    return () => clearTimeout(timer);
  }, [charIdx, isDeleting, roleIdx, isReady]);

  // GSAP Entrance with useGSAP and context cleanup
  useGSAP(
    () => {
      if (!isReady) return;

      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      tl.from(".hero-tagline", { opacity: 0, y: 30, duration: 0.7 })
        .from(".hero-typewriter-box", { opacity: 0, y: 25, duration: 0.6 }, "-=0.3")
        .from(".hero-bio", { opacity: 0, y: 25, duration: 0.6 }, "-=0.3")
        .from(".hero-actions", { opacity: 0, y: 25, duration: 0.6 }, "-=0.3")
        .from(".hero-socials", { opacity: 0, x: -20, duration: 0.5 }, "-=0.2");
    },
    { scope: heroRef, dependencies: [isReady] }
  );

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="home"
      ref={heroRef}
      className="relative min-h-screen flex items-center pt-24 pb-16 overflow-hidden bg-[#080808]"
    >
      {/* Background ambient hot pink glow orbs */}
      <div className="bg-glow-orb top-[-100px] left-[-150px] opacity-40" />
      <div className="bg-glow-orb bottom-[-100px] right-[-150px] opacity-35" />

      <div className="container w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center z-10">
        {/* Left Column: Text Content */}
        <div className="lg:col-span-7 flex flex-col justify-center">
          <p className="hero-tagline text-lg md:text-xl font-medium tracking-wide text-[#ababab] mb-2">
            Third-Year B.Tech CSE Student (7.5 CGPA)
          </p>

          {/* Headline with Masked Character Slide-Up & Float Stickers */}
          <div className="relative mb-4">
            <HeroStickers isReady={isReady} />
            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold text-white leading-tight">
              <MaskedText text="Hi, I'm" delay={0.1} stagger={0.05} isReady={isReady} />{" "}
              <span className="text-pink glow-pink inline-block">
                <MaskedText
                  text="Moksha Mehta"
                  delay={0.35}
                  stagger={0.05}
                  isReady={isReady}
                  charClassName="text-pink glow-pink"
                />
              </span>
            </h1>
          </div>

          {/* Animated Typewriter Title */}
          <div className="hero-typewriter-box flex items-center text-xl sm:text-3xl font-semibold mb-6 text-white min-h-[44px]">
            <span className="text-[#ababab] mr-2">I am a</span>
            <span className="text-pink font-bold">{roleText}</span>
            <span className="ml-1 text-pink animate-pulse font-normal">|</span>
          </div>

          {/* Bio text */}
          <p className="hero-bio text-base sm:text-lg text-[#ababab] leading-relaxed max-w-2xl mb-8 font-light">
            Passionate about engineering scalable web applications and solving real-world problems.
            Specializing in the <span className="text-white font-medium">MERN stack</span>, robust{" "}
            <span className="text-white font-medium">backend API architectures</span>, and cutting-edge{" "}
            <span className="text-pink font-medium">AI integrations</span>.
          </p>

          {/* CTA Buttons with Text Roll & Red Fill Wipes */}
          <div className="hero-actions flex flex-wrap items-center gap-4 mb-8">
            <button
              onClick={() => scrollTo("projects")}
              className="btn-pink filled"
            >
              <span className="text-roll">
                <span>View My Work</span>
                <span>View My Work</span>
              </span>
            </button>
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault();
                alert("Resume link will be configured with your latest PDF!");
              }}
              className="btn-pink"
            >
              <Download size={16} />
              <span className="text-roll">
                <span>Download Resume</span>
                <span>Download Resume</span>
              </span>
            </a>
            <button
              onClick={() => scrollTo("contact")}
              className="text-[#ababab] hover:text-pink font-medium text-sm transition-colors ml-2 underline underline-offset-8 group"
            >
              <span className="text-roll">
                <span>Let's Connect →</span>
                <span className="text-pink">Let's Connect →</span>
              </span>
            </button>
          </div>

          {/* Social Icons */}
          <div className="hero-socials flex items-center gap-5">
            <span className="text-xs text-[#ababab] uppercase tracking-widest font-semibold">
              Connect With Me
            </span>
            <div className="w-10 h-px bg-white/20" />
            <a
              href="https://github.com/mokshamehta06"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
              className="text-[#ababab] hover:text-pink hover:-translate-y-1 transition-all text-xl"
            >
              <Github size={22} />
            </a>
            <a
              href="https://www.linkedin.com/in/moksha-mehta-9b55262b9/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className="text-[#ababab] hover:text-pink hover:-translate-y-1 transition-all text-xl"
            >
              <Linkedin size={22} />
            </a>
          </div>
        </div>

        {/* Right Column: Requested Floating Card */}
        <div className="lg:col-span-5 flex justify-center lg:justify-end">
          <motion.div
            animate={{ y: [0, -15, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            className="relative"
          >
            <HeroCard />

            {/* Floating Metric Badges */}
            <div className="absolute -top-4 -left-4 bg-[#1e1e1e] border border-[#ff0055]/50 py-2 px-4 rounded-xl shadow-xl flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#ff0055] animate-ping" />
              <span className="text-xs font-bold text-white">7.5 CGPA</span>
            </div>

            <div className="absolute -bottom-4 -right-4 bg-[#1e1e1e] border border-white/20 py-2 px-4 rounded-xl shadow-xl flex items-center gap-2">
              <span className="text-pink text-sm">✦</span>
              <span className="text-xs font-bold text-white">MERN &amp; AI</span>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll Down Hint */}
      <div
        onClick={() => scrollTo("about")}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 cursor-pointer flex flex-col items-center gap-1 opacity-70 hover:opacity-100 transition-opacity"
      >
        <span className="text-[11px] text-[#ababab] uppercase tracking-widest">Scroll</span>
        <ArrowDown size={16} className="text-pink animate-bounce" />
      </div>
    </section>
  );
}
