import { useEffect, useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { CheckCircle2, X } from "lucide-react";
import { projectIconFallback } from "../../data/projects";
import { useLockBodyScroll } from "../../hooks/useLockBodyScroll";
import BlockDiagram from "./BlockDiagram";
import ProjectLinks, { hasProjectLinks } from "./ProjectLinks";

const FOCUSABLE = 'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])';

export default function ProjectModal({ project, onClose }) {
  const dialogRef = useRef(null);
  const closeRef = useRef(null);

  useLockBodyScroll(Boolean(project));

  useEffect(() => {
    if (!project) return;
    const trigger = document.activeElement;
    closeRef.current?.focus();

    const onKey = (e) => {
      if (e.key === "Escape") onClose();
      if (e.key !== "Tab" || !dialogRef.current) return;
      const focusable = [...dialogRef.current.querySelectorAll(FOCUSABLE)];
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("keydown", onKey);
      trigger?.focus?.();
    };
  }, [project, onClose]);

  const Icon = project?.icon ?? projectIconFallback;

  return (
    <AnimatePresence>
      {project && (
        <motion.div
          className="fixed inset-0 z-[70] flex items-end justify-center p-0 sm:items-center sm:p-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <div className="absolute inset-0 bg-deep/80 backdrop-blur-sm" onClick={onClose} aria-hidden="true" />

          <motion.div
            ref={dialogRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby="project-modal-title"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 40 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="relative max-h-[90dvh] w-full max-w-2xl overflow-y-auto rounded-t-3xl border border-white/10 bg-surface p-6 shadow-glow sm:rounded-3xl sm:p-8"
          >
            <button
              ref={closeRef}
              type="button"
              onClick={onClose}
              aria-label="Close project details"
              className="absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-lg text-muted transition-colors hover:bg-white/5 hover:text-ink"
            >
              <X className="h-5 w-5" />
            </button>

            <div className="flex items-center gap-3 pr-10">
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-indigo to-violet text-white">
                <Icon className="h-5 w-5" aria-hidden="true" />
              </span>
              <div className="flex flex-wrap gap-1.5">
                {project.categories.map((category) => (
                  <span key={category} className="rounded-full border border-white/10 px-2.5 py-0.5 text-[11px] text-muted">
                    {category}
                  </span>
                ))}
              </div>
            </div>

            <h3 id="project-modal-title" className="mt-5 text-2xl font-semibold text-ink">
              {project.title}
            </h3>
            <p className="mt-3 text-[15px] leading-relaxed text-muted">{project.description}</p>

            {project.metrics?.length > 0 && (
              <dl className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3">
                {project.metrics.map((metric) => (
                  <div key={metric.label} className="rounded-xl border border-line bg-card px-4 py-3">
                    <dt className="text-xs text-muted">{metric.label}</dt>
                    <dd className="font-display text-xl font-semibold text-ink">{metric.value}</dd>
                  </div>
                ))}
              </dl>
            )}

            {project.diagram?.length > 0 && (
              <>
                <h4 className="mt-7 font-mono text-xs uppercase tracking-[0.2em] text-muted">Block diagram</h4>
                <BlockDiagram stages={project.diagram} className="mt-3" />
              </>
            )}

            <h4 className="mt-7 font-mono text-xs uppercase tracking-[0.2em] text-muted">Key features</h4>
            <ul className="mt-3 space-y-2.5">
              {project.features.map((feature) => (
                <li key={feature} className="flex items-start gap-2.5 text-sm text-slate-300">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-electric" aria-hidden="true" />
                  {feature}
                </li>
              ))}
            </ul>

            <h4 className="mt-7 font-mono text-xs uppercase tracking-[0.2em] text-muted">Tech</h4>
            <ul className="mt-3 flex flex-wrap gap-1.5">
              {project.tech.map((tech) => (
                <li key={tech} className="tag">
                  {tech}
                </li>
              ))}
            </ul>

            {hasProjectLinks(project) && (
              <div className="mt-8 border-t border-white/[0.06] pt-6">
                <ProjectLinks project={project} size="md" />
              </div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
