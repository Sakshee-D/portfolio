import { Fragment } from "react";
import { ArrowDown, ArrowRight } from "lucide-react";
import { cn } from "../../lib/utils";

/**
 * Renders a project's `diagram` data: stages left-to-right (top-to-bottom on
 * small screens, or always when `compact`), each stage a stack of blocks.
 *
 *   diagram: [{ label: "Inputs", items: ["Rain sensor (6-bit)", ...] }, ...]
 */
export default function BlockDiagram({ stages, compact = false, className }) {
  const summary = stages
    .map((s) => (s.label ? `${s.label}: ` : "") + s.items.join(", "))
    .join(" → ");

  return (
    <figure className={cn("rounded-xl border border-line bg-deep/50 p-3 sm:p-4", className)}>
      <figcaption className="sr-only">Block diagram. {summary}</figcaption>
      <div aria-hidden="true" className={cn("flex flex-col items-stretch gap-1.5", !compact && "sm:flex-row sm:items-center")}>
        {stages.map((stage, i) => (
          <Fragment key={stage.label ?? stage.items.join()}>
            {i > 0 && (
              <div className="flex shrink-0 justify-center text-[#818CF8]">
                <ArrowDown className={cn("h-3.5 w-3.5", !compact && "sm:hidden")} />
                {!compact && <ArrowRight className="hidden h-3.5 w-3.5 sm:block" />}
              </div>
            )}
            <div className="min-w-0 flex-1">
              {stage.label && (
                <p className="mb-1.5 text-center font-mono text-[9px] uppercase tracking-[0.18em] text-muted">{stage.label}</p>
              )}
              <ul className={cn("flex flex-wrap justify-center gap-1.5", !compact && "sm:flex-col sm:flex-nowrap")}>
                {stage.items.map((item) => (
                  <li
                    key={item}
                    className="rounded-lg border border-indigo/25 bg-card px-2.5 py-1.5 text-center text-[11px] leading-tight text-slate-200 [overflow-wrap:anywhere]"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </Fragment>
        ))}
      </div>
    </figure>
  );
}
