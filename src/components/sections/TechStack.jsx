import { skillGroups } from "../../data/skills";
import { cn } from "../../lib/utils";
import Reveal from "../ui/Reveal";
import Section from "../ui/Section";

export default function TechStack() {
  return (
    <Section
      id="tech-stack"
      index="05"
      eyebrow="tech stack"
      title="Tools I Build With"
      className="bg-surface/40"
    >
      <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {skillGroups.map((group, i) => {
          const GroupIcon = group.icon;
          return (
            <Reveal
              key={group.title}
              delay={(i % 3) * 0.06}
              // Stretch a lone last card across the row instead of leaving a gap.
              className={cn(
                "h-full",
                i === skillGroups.length - 1 && skillGroups.length % 2 === 1 && "md:col-span-2",
                i === skillGroups.length - 1 && skillGroups.length % 3 === 1 && "lg:col-span-3"
              )}
            >
              <article className="card h-full p-6 transition-colors duration-300 hover:border-indigo/30">
                <div className="flex items-center gap-3">
                  <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-indigo/10 text-[#a5b4fc]">
                    <GroupIcon className="h-[18px] w-[18px]" aria-hidden="true" />
                  </span>
                  <h3 className="text-base font-semibold text-ink">{group.title}</h3>
                </div>

                <ul className="mt-5 flex flex-wrap gap-2">
                  {group.items.map(({ name, icon: Icon, color }) => (
                    <li
                      key={name}
                      className="flex items-center gap-2 rounded-lg border border-white/[0.07] bg-deep/50 px-3 py-2 text-sm text-slate-300 transition-all duration-200 hover:-translate-y-0.5 hover:border-indigo/40 hover:text-white motion-reduce:hover:translate-y-0"
                    >
                      {Icon && <Icon className="h-4 w-4 shrink-0" style={{ color }} aria-hidden="true" />}
                      {name}
                    </li>
                  ))}
                </ul>
              </article>
            </Reveal>
          );
        })}
      </div>
    </Section>
  );
}
