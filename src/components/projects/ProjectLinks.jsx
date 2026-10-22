import { ArrowUpRight, FileText } from "lucide-react";
import { FaGithub } from "react-icons/fa";
import { isValidUrl } from "../../lib/utils";

export function hasProjectLinks(project) {
  return Object.values(project.links ?? {}).some(isValidUrl);
}

/** GitHub / report / demo links for a project. Links without a valid URL are not rendered. */
export default function ProjectLinks({ project, size = "sm" }) {
  const { github, demo, report } = project.links ?? {};
  const pad = size === "sm" ? "px-3 py-1.5 text-xs" : "px-4 py-2 text-sm";

  if (!hasProjectLinks(project)) return null;

  return (
    <div className="flex flex-wrap items-center gap-2">
      {isValidUrl(github) && (
        <a
          href={github}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`${project.title} source code on GitHub`}
          className={`inline-flex items-center gap-1.5 rounded-lg border border-white/10 bg-white/[0.03] font-medium text-slate-200 transition-colors hover:border-indigo/50 hover:text-white ${pad}`}
        >
          <FaGithub className="h-3.5 w-3.5" aria-hidden="true" />
          GitHub
          <ArrowUpRight className="h-3 w-3 opacity-60" aria-hidden="true" />
        </a>
      )}
      {isValidUrl(report) && (
        <a
          href={report}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`${project.title} project report`}
          className={`inline-flex items-center gap-1.5 rounded-lg border border-white/10 bg-white/[0.03] font-medium text-slate-200 transition-colors hover:border-indigo/50 hover:text-white ${pad}`}
        >
          <FileText className="h-3.5 w-3.5" aria-hidden="true" />
          Report
          <ArrowUpRight className="h-3 w-3 opacity-60" aria-hidden="true" />
        </a>
      )}
      {isValidUrl(demo) && (
        <a
          href={demo}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`${project.title} live demo`}
          className={`inline-flex items-center gap-1.5 rounded-lg bg-indigo/15 font-medium text-[#c7d2fe] transition-colors hover:bg-indigo/25 ${pad}`}
        >
          Live Demo
          <ArrowUpRight className="h-3 w-3" aria-hidden="true" />
        </a>
      )}
    </div>
  );
}
