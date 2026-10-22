import { ArrowUpRight } from "lucide-react";
import { achievements } from "../../data/achievements";
import { isUsableLink } from "../../lib/utils";
import Reveal from "../ui/Reveal";
import Section from "../ui/Section";

export default function Achievements() {
  return (
    <Section id="highlights" index="06" eyebrow="highlights" title="Milestones So Far">
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {achievements.map(({ icon: Icon, title, description, link }, i) => {
          const hasLink = link && isUsableLink(link.url);
          const external = hasLink && link.url.startsWith("http");
          return (
            <Reveal key={title} delay={i * 0.06} className="h-full">
              <article className="card relative flex h-full flex-col overflow-hidden p-6 transition-colors duration-300 hover:border-indigo/30">
                <div aria-hidden="true" className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-indigo/60 to-transparent" />
                <Icon className="h-6 w-6 text-electric" aria-hidden="true" />
                <h3 className="mt-4 text-base font-semibold text-ink">{title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">{description}</p>
                {hasLink && (
                  <a
                    href={link.url}
                    {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                    className="mt-auto inline-flex items-center gap-1 pt-5 text-sm font-medium text-[#a5b4fc] transition-colors hover:text-white"
                  >
                    {link.label}
                    <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
                  </a>
                )}
              </article>
            </Reveal>
          );
        })}
      </div>
    </Section>
  );
}
