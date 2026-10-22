import { forwardRef } from "react";
import { motion } from "framer-motion";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { projectIconFallback } from "../../data/projects";
import { cn } from "../../lib/utils";
import ProjectLinks from "./ProjectLinks";

const MAX_TAGS = 5;

const ProjectCard = forwardRef(function ProjectCard({ project, onOpen }, ref) {
  const Icon = project.icon ?? projectIconFallback;
  const extraTags = project.tech.length - MAX_TAGS;

  return (
    <motion.article
      ref={ref}
      layout
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.97 }}
      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
      className={cn(
        "group relative flex flex-col overflow-hidden rounded-2xl border bg-card/80 p-6 shadow-card transition-[border-color,box-shadow,transform] duration-300 hover:-translate-y-1.5 hover:shadow-glow motion-reduce:hover:translate-y-0",
        project.featured ? "border-indigo/30 md:col-span-2" : "border-line hover:border-indigo/40"
      )}
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-20 -top-20 h-48 w-48 rounded-full bg-indigo/10 opacity-0 blur-3xl transition-opacity duration-500 group-hover:opacity-100"
      />

      <div className="relative flex items-start justify-between gap-4">
        <span className="flex h-11 w-11 items-center justify-center rounded-xl border border-indigo/20 bg-gradient-to-br from-indigo/20 to-violet/10 text-[#a5b4fc]">
          <Icon className="h-5 w-5" aria-hidden="true" />
        </span>
        <div className="flex flex-wrap justify-end gap-1.5">
          <span className="rounded-full border border-white/10 px-2.5 py-0.5 text-[11px] text-muted">
            {project.categories[0]}
          </span>
        </div>
      </div>

      <h3 className="relative mt-5 text-lg font-semibold text-ink sm:text-xl">{project.title}</h3>
      <p className="relative mt-2.5 text-sm leading-relaxed text-muted">{project.summary}</p>

      {project.featured && project.metrics?.length > 0 && (
        <dl className="relative mt-5 grid max-w-md grid-cols-3 gap-3">
          {project.metrics.map((metric) => (
            <div key={metric.label} className="rounded-xl border border-line bg-deep/50 px-3 py-2.5">
              <dt className="text-[11px] text-muted">{metric.label}</dt>
              <dd className="font-display text-lg font-semibold text-ink">{metric.value}</dd>
            </div>
          ))}
        </dl>
      )}

      {project.featured && !project.metrics?.length && (
        <ul className="relative mt-5 space-y-2">
          {project.features.slice(0, 3).map((feature) => (
            <li key={feature} className="flex items-start gap-2.5 text-sm text-slate-300">
              <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-electric" aria-hidden="true" />
              {feature}
            </li>
          ))}
        </ul>
      )}

      <ul className="relative mt-5 flex flex-wrap gap-1.5" aria-label="Technologies">
        {project.tech.slice(0, MAX_TAGS).map((tech) => (
          <li key={tech} className="tag">
            {tech}
          </li>
        ))}
        {extraTags > 0 && <li className="tag">+{extraTags}</li>}
      </ul>

      <div className="relative mt-auto flex flex-wrap items-center justify-between gap-3 pt-6">
        <button
          type="button"
          onClick={() => onOpen(project)}
          className="inline-flex items-center gap-1.5 text-sm font-medium text-[#a5b4fc] transition-colors hover:text-white"
          aria-haspopup="dialog"
        >
          View details
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
        </button>
        <ProjectLinks project={project} />
      </div>
    </motion.article>
  );
});

export default ProjectCard;
