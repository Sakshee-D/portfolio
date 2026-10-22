import { ArrowUpRight } from "lucide-react";
import { site } from "../../data/site";
import ContactForm from "../contact/ContactForm";
import Reveal from "../ui/Reveal";
import { getSocialItems } from "../ui/SocialLinks";

export default function Contact() {
  const channels = getSocialItems({ includeEmail: true });

  return (
    <section id="contact" aria-labelledby="contact-title" className="relative overflow-hidden py-24 sm:py-28">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <div className="absolute bottom-0 left-1/2 h-[420px] w-[720px] -translate-x-1/2 rounded-full bg-indigo/15 blur-[130px]" />
      </div>

      <div className="container-page relative">
        <div className="grid gap-12 lg:grid-cols-[1fr_1.2fr] lg:gap-16">
          <Reveal>
            <p className="eyebrow mb-3">
              <span className="text-muted">07 /</span> contact
            </p>
            <h2 id="contact-title" className="text-3xl font-semibold leading-tight text-ink sm:text-[2.6rem]">
              Have an Interesting Idea? <span className="text-gradient">Let&apos;s Build It.</span>
            </h2>
            <p className="mt-5 max-w-md leading-relaxed text-muted">
              Open to internships, roles, AI/ML projects, and open-source collaboration.
            </p>

            {channels.length > 0 && (
              <ul className="mt-9 space-y-3">
                {channels.map(({ label, href, icon: Icon }) => {
                  const external = href.startsWith("http");
                  const display = label === "Email" ? site.email : href.replace(/^https?:\/\/(www\.)?/, "").replace(/\/$/, "");
                  return (
                    <li key={label}>
                      <a
                        href={href}
                        {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                        className="group flex items-center gap-4 rounded-xl border border-line bg-card/60 p-4 transition-all duration-200 hover:border-indigo/40 hover:bg-card"
                      >
                        <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-indigo/10 text-[#a5b4fc]">
                          <Icon className="h-[18px] w-[18px]" aria-hidden="true" />
                        </span>
                        <span className="min-w-0 flex-1">
                          <span className="block text-xs text-muted">{label}</span>
                          <span className="block truncate text-sm text-ink">{display}</span>
                        </span>
                        <ArrowUpRight className="h-4 w-4 text-muted transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-ink" aria-hidden="true" />
                      </a>
                    </li>
                  );
                })}
              </ul>
            )}
          </Reveal>

          <Reveal delay={0.1}>
            <div className="glass rounded-3xl p-6 shadow-card sm:p-8">
              <ContactForm />
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
