import { ArrowUpRight, Award, BadgeCheck, Calendar, FolderOpen } from "lucide-react";
import { certificates } from "../../data/certificates";
import { site } from "../../data/site";
import { isValidUrl } from "../../lib/utils";
import Reveal from "../ui/Reveal";
import Section from "../ui/Section";

function CertificateCard({ cert }) {
  return (
    <article className="card group flex h-full flex-col p-6 transition-all duration-300 hover:-translate-y-1 hover:border-indigo/40 hover:shadow-glow motion-reduce:hover:translate-y-0">
      <div className="flex items-start justify-between gap-3">
        <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-indigo/25 to-violet/15 text-[#a5b4fc]">
          <Award className="h-5 w-5" aria-hidden="true" />
        </span>
        {cert.date && (
          <span className="flex items-center gap-1.5 text-xs text-muted">
            <Calendar className="h-3.5 w-3.5" aria-hidden="true" />
            {cert.date}
          </span>
        )}
      </div>

      <h3 className="mt-5 text-base font-semibold leading-snug text-ink">{cert.title}</h3>
      {cert.issuer && <p className="mt-1 text-sm text-[#a5b4fc]">{cert.issuer}</p>}
      {cert.credentialId && (
        <p className="mt-2 font-mono text-[11px] text-muted">Credential ID: {cert.credentialId}</p>
      )}

      {cert.skills?.length > 0 && (
        <ul className="mt-4 flex flex-wrap gap-1.5" aria-label="Skills">
          {cert.skills.map((skill) => (
            <li key={skill} className="tag">
              {skill}
            </li>
          ))}
        </ul>
      )}

      {isValidUrl(cert.url) && (
        <a
          href={cert.url}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-auto inline-flex items-center gap-1.5 pt-6 text-sm font-medium text-[#a5b4fc] transition-colors hover:text-white"
          aria-label={`View certificate: ${cert.title}`}
        >
          View Certificate
          <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
        </a>
      )}
    </article>
  );
}

function EmptyState() {
  return (
    <div className="card relative overflow-hidden px-6 py-14 text-center sm:py-16">
      <div aria-hidden="true" className="bg-grid absolute inset-0 opacity-60 [mask-image:radial-gradient(ellipse_at_center,black,transparent_70%)]" />
      <div className="relative mx-auto max-w-md">
        <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl border border-indigo/30 bg-indigo/10 text-[#a5b4fc]">
          <BadgeCheck className="h-7 w-7" aria-hidden="true" />
        </span>
        <h3 className="mt-5 text-lg font-semibold text-ink">Certificates coming soon</h3>
        <p className="mt-2 text-sm leading-relaxed text-muted">
          Verified certifications and credentials will be listed here.
        </p>
      </div>
    </div>
  );
}

export default function Certificates() {
  return (
    <Section
      id="certificates"
      index="04"
      eyebrow="certificates"
      title="Certificates & Recognition"
      description={certificates.length ? "Hackathons, programs, and community work." : undefined}
    >
      {/* Add entries in src/data/certificates.js — the empty state disappears automatically. */}
      {certificates.length === 0 ? (
        <Reveal>
          <EmptyState />
        </Reveal>
      ) : (
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {certificates.map((cert, i) => (
            <Reveal key={`${cert.title}-${cert.issuer}`} delay={(i % 4) * 0.06} className="h-full">
              <CertificateCard cert={cert} />
            </Reveal>
          ))}
        </div>
      )}

      {isValidUrl(site.certificatesFolder) && (
        <Reveal className="mt-8">
          <a
            href={site.certificatesFolder}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/[0.03] px-4 py-2.5 text-sm font-medium text-slate-200 transition-colors hover:border-indigo/50 hover:text-white"
          >
            <FolderOpen className="h-4 w-4 text-[#a5b4fc]" aria-hidden="true" />
            View all certificates
            <ArrowUpRight className="h-3.5 w-3.5 opacity-60" aria-hidden="true" />
          </a>
        </Reveal>
      )}
    </Section>
  );
}
