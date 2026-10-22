import { cn } from "../../lib/utils";

const base =
  "group inline-flex items-center justify-center gap-2 rounded-xl font-medium transition-all duration-200 disabled:cursor-not-allowed disabled:opacity-50";

const variants = {
  primary:
    "bg-gradient-to-r from-indigo to-violet text-white shadow-[0_8px_30px_-8px_rgba(99,102,241,0.6)] hover:shadow-[0_10px_40px_-6px_rgba(139,92,246,0.7)] hover:brightness-110",
  secondary:
    "border border-white/10 bg-white/[0.03] text-ink hover:border-indigo/50 hover:bg-indigo/10",
  ghost: "text-muted hover:bg-white/5 hover:text-ink",
};

const sizes = {
  sm: "px-3.5 py-2 text-sm",
  md: "px-5 py-3 text-sm",
  lg: "px-6 py-3.5 text-[15px]",
};

/** Renders an <a> when `href` is given, otherwise a <button>. */
export default function Button({
  href,
  variant = "primary",
  size = "md",
  className,
  children,
  external = false,
  ...props
}) {
  const classes = cn(base, variants[variant], sizes[size], className);

  if (href) {
    return (
      <a
        href={href}
        className={classes}
        {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
        {...props}
      >
        {children}
      </a>
    );
  }

  return (
    <button type="button" className={classes} {...props}>
      {children}
    </button>
  );
}
