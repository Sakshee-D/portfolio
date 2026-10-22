import { ArrowUpRight, Briefcase, Calendar, GitPullRequest, MapPin } from "lucide-react";
import { experience } from "../../data/experience";
import { cn, isValidUrl } from "../../lib/utils";
import Reveal from "../ui/Reveal";
import Section from "../ui/Section";

const typeMeta = {
  work: { label: "Internship", icon: Briefcase },
  "open-source": { label: "Open Source", icon: GitPullRequest },
};

export default function Experience() {
  return (
    <Section
      id="experience"
      index="03"
      eyebrow="experience"
      title="Where I've Worked & Contributed"
      className="bg-surface/40"
    >
      <ol className="relative space-y-8 before:absolute before:bottom-2 before:left-[19px] before:top-2 before:w-px before:bg-gradient-to-b before:from-indigo/60 before:via-violet/30 before:to-transparent sm:space-y-10">
        {experience.map((entry, i) => {
          const meta = typeMeta[entry.type] ?? typeMeta.work;
          const Icon = meta.icon;
          const links = (entry.links ?? []).filter((link) => isValidUrl(link.url));

          return (
            <li key={`${entry.organization}-${entry.role}`} className="relative pl-14 sm:pl-16">
              <span className="absolute left-0 top-1 flex h-10 w-10 items-center justify-center rounded-xl border border-indigo/30 bg-card text-[#a5b4fc] shadow-glow">
                <Icon className="h-[18px] w-[18px]" aria-hidden="true" />
              </span>

              <Reveal delay={i * 0.05}>
                <article className="card p-6 transition-colors duration-300 hover:border-indigo/30 sm:p-7">
                  <div className="flex flex-wrap items-start justify-between gap-3">
                    <div>
                      <h3 className="text-lg font-semibold text-ink sm:text-xl">{entry.role}</h3>
                      <p className="mt-1 text-[15px] text-[#a5b4fc]">{entry.organization}</p>
                    </div>
                    <span
                      className={cn(
                        "rounded-full px-3 py-1 text-xs font-medium",
                        entry.type === "open-source"
                          ? "border border-emerald-400/30 bg-emerald-400/10 text-emerald-300"
                          : "border border-indigo/30 bg-indigo/10 text-[#c7d2fe]"
                      )}
                    >
                      {meta.label}
                    </span>
                  </div>

                  {(entry.period || entry.location) && (
                    <div className="mt-3 flex flex-wrap gap-x-5 gap-y-1 text-sm text-muted">
                      {entry.period && (
                        <span className="flex items-center gap-1.5">
                          <Calendar className="h-3.5 w-3.5" aria-hidden="true" />
                          {entry.period}
                        </span>
                      )}
                      {entry.location && (
                        <span className="flex items-center gap-1.5">
                          <MapPin className="h-3.5 w-3.5" aria-hidden="true" />
                          {entry.location}
                        </span>
                      )}
                    </div>
                  )}

                  <ul className="mt-5 space-y-2.5">
                    {entry.points.map((point) => (
                      <li key={point} className="flex gap-3 text-sm leading-relaxed text-slate-300 sm:text-[15px]">
                        <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-violet" aria-hidden="true" />
                        {point}
                      </li>
                    ))}
                  </ul>

                  {entry.tech?.length > 0 && (
                    <ul className="mt-5 flex flex-wrap gap-1.5" aria-label="Technologies">
                      {entry.tech.map((tech) => (
                        <li key={tech} className="tag">
                          {tech}
                        </li>
                      ))}
                    </ul>
                  )}

                  {links.length > 0 && (
                    <div className="mt-5 flex flex-wrap gap-2 border-t border-white/[0.06] pt-5">
                      {links.map((link) => (
                        <a
                          key={link.url}
                          href={link.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 rounded-lg border border-white/10 px-3 py-1.5 font-mono text-xs text-slate-300 transition-colors hover:border-indigo/50 hover:text-white"
                        >
                          {link.label}
                          <ArrowUpRight className="h-3 w-3 opacity-60" aria-hidden="true" />
                        </a>
                      ))}
                    </div>
                  )}
                </article>
              </Reveal>
            </li>
          );
        })}
      </ol>
    </Section>
  );
}
