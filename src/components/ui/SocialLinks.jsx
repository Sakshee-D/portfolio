import { FaGithub, FaLinkedin } from "react-icons/fa";
import { SiLeetcode } from "react-icons/si";
import { Mail } from "lucide-react";
import { site, socials } from "../../data/site";
import { cn, isValidUrl } from "../../lib/utils";

export function getSocialItems({ includeEmail = false } = {}) {
  const items = [
    { label: "GitHub", href: socials.github, icon: FaGithub, show: isValidUrl(socials.github) },
    { label: "LinkedIn", href: socials.linkedin, icon: FaLinkedin, show: isValidUrl(socials.linkedin) },
    { label: "LeetCode", href: socials.leetcode, icon: SiLeetcode, show: isValidUrl(socials.leetcode) },
    { label: "Email", href: `mailto:${site.email}`, icon: Mail, show: includeEmail && Boolean(site.email) },
  ];
  return items.filter((item) => item.show);
}

/** Icon buttons for the configured social profiles. Unconfigured ones are omitted. */
export default function SocialLinks({ includeEmail = false, className }) {
  const items = getSocialItems({ includeEmail });
  if (!items.length) return null;

  return (
    <ul className={cn("flex items-center gap-2", className)}>
      {items.map(({ label, href, icon: Icon }) => (
        <li key={label}>
          <a
            href={href}
            aria-label={label}
            title={label}
            {...(href.startsWith("http") ? { target: "_blank", rel: "noopener noreferrer" } : {})}
            className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/[0.03] text-muted transition-all duration-200 hover:-translate-y-0.5 hover:border-indigo/50 hover:text-ink hover:shadow-glow"
          >
            <Icon className="h-[18px] w-[18px]" aria-hidden="true" />
          </a>
        </li>
      ))}
    </ul>
  );
}
