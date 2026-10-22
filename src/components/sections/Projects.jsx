import { useCallback, useMemo, useState } from "react";
import { AnimatePresence } from "framer-motion";
import { PROJECT_CATEGORIES, projects } from "../../data/projects";
import { cn } from "../../lib/utils";
import ProjectCard from "../projects/ProjectCard";
import ProjectModal from "../projects/ProjectModal";
import Reveal from "../ui/Reveal";
import Section from "../ui/Section";

const ALL = "All";

export default function Projects() {
  const [filter, setFilter] = useState(ALL);
  const [selected, setSelected] = useState(null);

  // Only offer filters that at least one project uses.
  const filters = useMemo(
    () => [ALL, ...PROJECT_CATEGORIES.filter((c) => projects.some((p) => p.categories.includes(c)))],
    []
  );

  const visible = filter === ALL ? projects : projects.filter((p) => p.categories.includes(filter));
  const closeModal = useCallback(() => setSelected(null), []);

  return (
    <Section
      id="projects"
      index="02"
      eyebrow="projects"
      title="Things I've Built"
      description="Applied AI, data, backend, and hardware projects."
    >
      <Reveal>
        <div role="group" aria-label="Filter projects by category" className="mb-10 flex flex-wrap gap-2">
          {filters.map((category) => {
            const active = category === filter;
            const count =
              category === ALL ? projects.length : projects.filter((p) => p.categories.includes(category)).length;
            return (
              <button
                key={category}
                type="button"
                onClick={() => setFilter(category)}
                aria-pressed={active}
                className={cn(
                  "inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm transition-all duration-200",
                  active
                    ? "border-indigo/60 bg-indigo/15 text-ink shadow-[0_0_20px_-6px_rgba(99,102,241,0.7)]"
                    : "border-white/10 text-muted hover:border-white/20 hover:text-ink"
                )}
              >
                {category}
                <span className={cn("font-mono text-[11px]", active ? "text-[#a5b4fc]" : "text-muted/60")}>{count}</span>
              </button>
            );
          })}
        </div>
      </Reveal>

      <p className="sr-only" aria-live="polite">
        Showing {visible.length} {visible.length === 1 ? "project" : "projects"}
        {filter !== ALL ? ` in ${filter}` : ""}
      </p>

      {/* grid-flow-dense backfills the gaps that wide featured cards would otherwise leave. */}
      <div className="grid grid-flow-row-dense gap-5 md:grid-cols-2 lg:grid-cols-3">
        <AnimatePresence mode="popLayout">
          {visible.map((project) => (
            <ProjectCard key={project.id} project={project} onOpen={setSelected} />
          ))}
        </AnimatePresence>
      </div>

      <ProjectModal project={selected} onClose={closeModal} />
    </Section>
  );
}
