import { cn } from "../../lib/utils";
import Reveal from "./Reveal";

export default function Section({ id, index, eyebrow, title, description, className, children }) {
  return (
    <section id={id} aria-labelledby={`${id}-title`} className={cn("relative py-24 sm:py-28", className)}>
      <div className="container-page">
        <Reveal className="mb-12 max-w-2xl sm:mb-14">
          <p className="eyebrow mb-3">
            <span className="text-muted">{index} /</span> {eyebrow}
          </p>
          <h2 id={`${id}-title`} className="text-3xl font-semibold text-ink sm:text-4xl">
            {title}
          </h2>
          {description && <p className="mt-4 text-base leading-relaxed text-muted">{description}</p>}
        </Reveal>
        {children}
      </div>
    </section>
  );
}
