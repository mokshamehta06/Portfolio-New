import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";

const NAV_LINKS = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Projects", href: "#projects" },
  { label: "Experience", href: "#experience" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [activeSection, setActiveSection] = useState("home");
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);

      const sections = NAV_LINKS.map((l) => l.href.replace("#", ""));
      const scrollPos = window.scrollY + 200;

      for (const id of sections) {
        const el = document.getElementById(id);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPos >= top && scrollPos < top + height) {
            setActiveSection(id);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavClick = (e, href) => {
    e.preventDefault();
    setMenuOpen(false);
    const id = href.replace("#", "");
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-[#080808]/95 backdrop-blur-md py-4 shadow-lg shadow-black/80 border-b border-white/5"
          : "bg-transparent py-6"
      }`}
    >
      <div className="container flex items-center justify-between">
        {/* Brand Logo */}
        <a
          href="#home"
          onClick={(e) => handleNavClick(e, "#home")}
          className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white select-none"
        >
          <span className="text-[#ff004f]">M</span>oksha
          <span className="text-[#ff004f]">.</span>
        </a>

        {/* Desktop Menu */}
        <ul className="hidden md:flex items-center gap-8 list-none">
          {NAV_LINKS.map(({ label, href }) => {
            const id = href.replace("#", "");
            const isActive = activeSection === id;
            return (
              <li key={label}>
                <a
                  href={href}
                  onClick={(e) => handleNavClick(e, href)}
                  className={`nav-link ${isActive ? "active" : ""}`}
                >
                  <span className="text-roll">
                    <span>{label}</span>
                    <span>{label}</span>
                  </span>
                </a>
              </li>
            );
          })}
        </ul>

        {/* Action Button (Desktop) with Text Roll & Red Fill Wipe */}
        <div className="hidden md:block">
          <a
            href="#contact"
            onClick={(e) => handleNavClick(e, "#contact")}
            className="btn-pink text-xs uppercase tracking-wider py-2.5 px-6 font-semibold"
          >
            <span className="text-roll">
              <span>Let's Talk</span>
              <span>Let's Talk</span>
            </span>
          </a>
        </div>

        {/* Mobile Hamburger Toggle */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden text-white p-2 focus:outline-none hover:text-[#ff004f] transition-colors"
          aria-label="Toggle navigation"
        >
          {menuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Sliding Drawer (Signature #ff004f pink background from your CSS) */}
      <div
        className={`fixed top-0 right-0 h-screen w-[220px] bg-[#ff004f] text-white p-8 pt-20 transition-all duration-400 ease-in-out z-50 shadow-2xl flex flex-col justify-start md:hidden ${
          menuOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <button
          onClick={() => setMenuOpen(false)}
          className="absolute top-6 left-6 text-white hover:rotate-90 transition-transform"
          aria-label="Close menu"
        >
          <X size={26} />
        </button>

        <ul className="flex flex-col gap-6 list-none mt-4">
          {NAV_LINKS.map(({ label, href }) => {
            return (
              <li key={label}>
                <a
                  href={href}
                  onClick={(e) => handleNavClick(e, href)}
                  className="text-lg font-medium tracking-wide text-white hover:translate-x-2 inline-block transition-transform"
                >
                  {label}
                </a>
              </li>
            );
          })}
        </ul>
      </div>

      {/* Backdrop overlay for mobile menu */}
      {menuOpen && (
        <div
          onClick={() => setMenuOpen(false)}
          className="fixed inset-0 bg-black/60 backdrop-blur-xs z-40 md:hidden"
        />
      )}
    </nav>
  );
}
