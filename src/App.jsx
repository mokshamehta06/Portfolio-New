import { useState } from "react";
import Preloader from "./components/Preloader";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import RibbonMarqueeDivider from "./components/RibbonMarqueeDivider";
import Skills from "./components/Skills";
import Projects from "./components/Projects";
import Experience from "./components/Experience";
import Contact from "./components/Contact";
import WorkTogetherCTA from "./components/WorkTogetherCTA";
import Footer from "./components/Footer";
import BackToTop from "./components/BackToTop";
import CustomCursor from "./components/CustomCursor";

export default function App() {
  const [isLoaded, setIsLoaded] = useState(() => {
    if (typeof window === "undefined") return false;
    return sessionStorage.getItem("hasSeenPreloader") === "true";
  });

  return (
    <div className="min-h-screen bg-[#080808] text-white selection:bg-[#ff004f] selection:text-white">
      <Preloader onComplete={() => setIsLoaded(true)} />
      <CustomCursor />
      <Navbar />
      <main>
        <Hero isReady={isLoaded} />
        <About />
        <RibbonMarqueeDivider />
        <Skills />
        <Projects />
        <Experience />
        <Contact />
        <WorkTogetherCTA />
      </main>
      <Footer />
      <BackToTop />
    </div>
  );
}
