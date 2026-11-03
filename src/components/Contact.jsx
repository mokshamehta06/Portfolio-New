import { useState, useRef, useEffect } from "react";
import { Mail, Phone, Send, Github, Linkedin, ExternalLink, Code2 } from "lucide-react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function Contact() {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [statusMsg, setStatusMsg] = useState("");
  const sectionRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".contact-left", {
        opacity: 0,
        x: -40,
        duration: 0.8,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 75%",
          toggleActions: "play none none reverse",
        },
      });

      gsap.from(".contact-right", {
        opacity: 0,
        x: 40,
        duration: 0.8,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 75%",
          toggleActions: "play none none reverse",
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setStatusMsg("Message sent successfully! 💖 Thank you for reaching out.");
    setFormData({ name: "", email: "", message: "" });
    setTimeout(() => setStatusMsg(""), 5000);
  };

  return (
    <section id="contact" ref={sectionRef} className="py-24 bg-[#080808]">
      <div className="container">
        <div className="flex flex-col lg:flex-row justify-between gap-12 lg:gap-16">
          {/* Contact Left */}
          <div className="contact-left w-full lg:w-[38%]">
            <h2 className="text-4xl sm:text-5xl font-extrabold text-white mb-4">
              Contact <span className="text-[#ff004f]">Me</span>
            </h2>
            <div className="w-20 h-1 bg-[#ff004f] mb-6 rounded-full" />

            <p className="text-base text-[#ababab] font-light leading-relaxed mb-8">
              I am open to full-stack developer roles, internships, and collaborative software projects.
              Feel free to send a message or connect through my social profiles.
            </p>

            <div className="space-y-5 text-base text-[#c0c0c0]">
              <div className="flex items-center gap-4">
                <Mail className="text-[#ff004f] w-6 h-6 flex-shrink-0" />
                <a
                  href="mailto:moksha.mehta.dev@gmail.com"
                  className="hover:text-[#ff004f] transition-colors"
                >
                  moksha.mehta.dev@gmail.com
                </a>
              </div>

              <div className="flex items-center gap-4">
                <Code2 className="text-[#ff004f] w-6 h-6 flex-shrink-0" />
                <a
                  href="https://leetcode.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[#ff004f] transition-colors"
                >
                  leetcode.com/MokshaMehta
                </a>
              </div>
            </div>

            {/* Social Icons (User's .social-icons style) */}
            <div className="flex items-center gap-5 mt-8">
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub profile"
                className="w-12 h-12 rounded-full bg-[#262626] flex items-center justify-center text-[#ababab] hover:text-white hover:bg-[#ff004f] hover:-translate-y-1.5 transition-all duration-300 shadow-md"
              >
                <Github size={20} />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn profile"
                className="w-12 h-12 rounded-full bg-[#262626] flex items-center justify-center text-[#ababab] hover:text-white hover:bg-[#ff004f] hover:-translate-y-1.5 transition-all duration-300 shadow-md"
              >
                <Linkedin size={20} />
              </a>
            </div>

            <div className="mt-10">
              <a
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  alert("Resume download link is ready for your uploaded PDF!");
                }}
                className="btn-pink"
              >
                Download CV
              </a>
            </div>
          </div>

          {/* Contact Right: Form */}
          <div className="contact-right w-full lg:w-[58%]">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <input
                  type="text"
                  name="name"
                  placeholder="Your Name"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  className="contact-input"
                />
              </div>

              <div>
                <input
                  type="email"
                  name="email"
                  placeholder="Your Email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className="contact-input"
                />
              </div>

              <div>
                <textarea
                  name="message"
                  rows="6"
                  placeholder="Your Message"
                  required
                  value={formData.message}
                  onChange={handleChange}
                  className="contact-input resize-none"
                />
              </div>

              <button
                type="submit"
                className="btn-pink filled py-3.5 px-12 text-base font-semibold cursor-pointer"
              >
                Submit Message
              </button>

              {statusMsg && (
                <p className="text-[#ff004f] text-sm font-medium mt-3 animate-fadeIn">
                  {statusMsg}
                </p>
              )}
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
