import { site } from "../../data/site";

export default function Logo({ onClick }) {
  return (
    <a href="#top" onClick={onClick} className="group flex items-center gap-2.5" aria-label={`${site.name}, back to top`}>
      <span className="relative flex h-9 w-9 items-center justify-center rounded-xl bg-surface font-display text-sm font-bold text-ink ring-1 ring-indigo/40 transition-shadow duration-300 group-hover:shadow-glow">
        <span className="absolute inset-0 rounded-xl bg-gradient-to-br from-indigo/30 to-violet/20 opacity-70" />
        <span className="relative">{site.initials}</span>
      </span>
      <span className="hidden font-display text-[15px] font-semibold text-ink sm:inline">{site.name}</span>
    </a>
  );
}
