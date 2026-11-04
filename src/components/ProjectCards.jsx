import { ExternalLink, Github, ArrowUpRight } from "lucide-react";

export default function ProjectCards({ projects, onSelectProject }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
      {projects.map((project, index) => (
        <article
          key={project.title}
          className="project-card group overflow-hidden rounded-2xl border border-white/10 bg-[#111] transition duration-300 hover:-translate-y-1 hover:border-[#ff004f]/50 hover:shadow-[0_18px_50px_rgba(0,0,0,.35)]"
        >
          <div className="relative aspect-[16/10] overflow-hidden bg-[#191919]">
            <img
              src={project.image}
              alt={`${project.title} project preview`}
              loading="lazy"
              className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.035]"
            />
            <span className="absolute left-4 top-4 rounded-full border border-white/15 bg-black/65 px-3 py-1 text-[11px] font-semibold tracking-wide text-white backdrop-blur">
              PROJECT 0{index + 1}
            </span>
            {project.demo && (
              <a
                href={project.demo}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Open ${project.title} live demo`}
                className="absolute bottom-4 right-4 flex h-10 w-10 items-center justify-center rounded-full bg-[#ff004f] text-white shadow-lg transition-transform hover:scale-105 focus-visible:outline focus-visible:outline-2 focus-visible:outline-white"
              >
                <ArrowUpRight size={19} />
              </a>
            )}
          </div>

          <div className="p-5 sm:p-6">
            <div className="mb-3 flex flex-wrap items-start justify-between gap-3">
              <h3 className="text-xl font-bold leading-snug text-white sm:text-2xl">{project.title}</h3>
              <button
                type="button"
                onClick={() => onSelectProject(project)}
                className="shrink-0 rounded-full border border-white/15 px-3 py-1.5 text-xs font-medium text-white/75 transition-colors hover:border-[#ff004f] hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#ff004f]"
              >
                Details
              </button>
            </div>
            <p className="mb-5 text-sm leading-relaxed text-[#b8b8b8]">{project.tagline}</p>
            <div className="flex flex-wrap gap-2">
              {project.tech.slice(0, 4).map((technology) => (
                <span key={technology} className="rounded-full border border-white/10 bg-white/[0.04] px-2.5 py-1 text-[11px] text-white/75">
                  {technology}
                </span>
              ))}
              {project.tech.length > 4 && (
                <span className="px-1 py-1 text-[11px] text-white/45">+{project.tech.length - 4}</span>
              )}
            </div>
            <div className="mt-5 flex items-center gap-4 border-t border-white/[0.08] pt-4">
              <a href={project.github} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-xs font-medium text-white/65 transition-colors hover:text-white">
                <Github size={15} /> Source code
              </a>
              {project.demo && (
                <a href={project.demo} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-xs font-medium text-[#ff668c] transition-colors hover:text-white">
                  <ExternalLink size={14} /> Live demo
                </a>
              )}
            </div>
          </div>
        </article>
      ))}
    </div>
  );
}
