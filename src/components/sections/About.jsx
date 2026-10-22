import { Code2, Database, GitPullRequest, Lightbulb, Puzzle, Sparkles } from "lucide-react";
import { education } from "../../data/site";
import Reveal from "../ui/Reveal";
import Section from "../ui/Section";

const enjoys = [
  { icon: Lightbulb, text: "Turning ideas into apps" },
  { icon: Database, text: "Backend APIs & data pipelines" },
  { icon: Sparkles, text: "AI, LLMs & RAG" },
  { icon: Puzzle, text: "Algorithmic problem-solving" },
  { icon: GitPullRequest, text: "Open source" },
];

const interests = ["AI/ML Engineering", "Software Engineering", "Data Engineering", "Backend Development", "Open Source"];

export default function About() {
  return (
    <Section id="about" index="01" eyebrow="about" title="A Little About Me">
      <div className="grid gap-10 lg:grid-cols-[1.35fr_1fr] lg:gap-14">
        <Reveal>
          <div className="space-y-5 text-[15px] leading-relaxed text-muted sm:text-base">
            <p>
              I&apos;m a student at <span className="text-ink">MKSSS&apos;s Cummins College of Engineering for Women, Pune</span>.
              I like turning rough ideas into software that works, and figuring out where AI actually helps.
            </p>
          </div>

          <h3 className="mt-10 font-mono text-xs uppercase tracking-[0.2em] text-muted">What I enjoy</h3>
          <ul className="mt-4 grid gap-3 sm:grid-cols-2">
            {enjoys.map(({ icon: Icon, text }) => (
              <li
                key={text}
                className="flex items-start gap-3 rounded-xl border border-line bg-card/50 p-4 transition-colors duration-200 hover:border-indigo/30"
              >
                <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-indigo/10 text-indigo">
                  <Icon className="h-4 w-4" aria-hidden="true" />
                </span>
                <span className="text-sm leading-relaxed text-slate-300">{text}</span>
              </li>
            ))}
          </ul>
        </Reveal>

        <Reveal delay={0.1}>
          <aside className="card relative overflow-hidden p-6 sm:p-7" aria-label="Profile summary">
            <div aria-hidden="true" className="absolute -right-16 -top-16 h-40 w-40 rounded-full bg-violet/20 blur-3xl" />
            <div className="relative">
              <div className="flex items-center gap-3">
                <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-indigo to-violet">
                  <Code2 className="h-5 w-5 text-white" aria-hidden="true" />
                </span>
                <div>
                  <p className="font-display font-semibold text-ink">Profile</p>
                  <p className="font-mono text-xs text-muted">whoami</p>
                </div>
              </div>

              <dl className="mt-6 space-y-5 text-sm">
                <div>
                  <dt className="font-mono text-[11px] uppercase tracking-widest text-muted/80">Degree</dt>
                  <dd className="mt-1 text-slate-200">{education.degree}</dd>
                </div>
                <div>
                  <dt className="font-mono text-[11px] uppercase tracking-widest text-muted/80">College</dt>
                  <dd className="mt-1 text-slate-200">{education.college}</dd>
                </div>
                <div>
                  <dt className="font-mono text-[11px] uppercase tracking-widest text-muted/80">Graduation</dt>
                  <dd className="mt-1 text-slate-200">
                    {education.graduation}
                    {education.cgpa && <span className="text-muted"> · CGPA {education.cgpa}</span>}
                  </dd>
                </div>
                <div>
                  <dt className="font-mono text-[11px] uppercase tracking-widest text-muted/80">Interests</dt>
                  <dd className="mt-2 flex flex-wrap gap-1.5">
                    {interests.map((interest) => (
                      <span key={interest} className="tag">
                        {interest}
                      </span>
                    ))}
                  </dd>
                </div>
                <div>
                  <dt className="font-mono text-[11px] uppercase tracking-widest text-muted/80">Current focus</dt>
                  <dd className="mt-1 leading-relaxed text-slate-200">
                    Applied AI, data pipelines, and backend systems.
                  </dd>
                </div>
              </dl>
            </div>
          </aside>
        </Reveal>
      </div>
    </Section>
  );
}
