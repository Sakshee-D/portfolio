import { motion } from "framer-motion";
import { ArrowRight, Download, MapPin } from "lucide-react";
import { site } from "../../data/site";
import { useFileAvailable } from "../../hooks/useFileAvailable";
import Button from "../ui/Button";
import SocialLinks from "../ui/SocialLinks";
import HeroVisual from "../hero/HeroVisual";

const ease = [0.22, 1, 0.36, 1];

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease } },
};

export default function Hero() {
  const hasResume = useFileAvailable(site.resume.url);

  return (
    <section id="top" className="relative overflow-hidden pb-24 pt-32 sm:pt-40 lg:pb-32">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <div className="bg-grid absolute inset-0 [mask-image:radial-gradient(ellipse_70%_60%_at_50%_30%,black,transparent)]" />
        <div className="absolute -top-40 left-1/4 h-[480px] w-[480px] rounded-full bg-indigo/20 blur-[120px]" />
        <div className="absolute right-0 top-20 h-[420px] w-[420px] rounded-full bg-violet/15 blur-[120px]" />
      </div>

      <div className="container-page relative grid grid-cols-1 items-center gap-16 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)] lg:gap-12">
        <motion.div
          className="min-w-0"
          initial="hidden"
          animate="show"
          variants={{ show: { transition: { staggerChildren: 0.09 } } }}
        >
          <motion.p
            variants={item}
            className="inline-flex items-center gap-2.5 rounded-full border border-indigo/25 bg-indigo/10 px-3.5 py-1.5 text-xs font-medium text-slate-200"
          >
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-60 motion-reduce:animate-none" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
            </span>
            {site.status}
          </motion.p>

          <motion.h1 variants={item} className="mt-7">
            <span className="block text-lg font-medium text-muted sm:text-xl">Hi, I&apos;m</span>
            <span className="mt-2 block font-display text-5xl font-bold leading-[1.02] tracking-tight text-ink sm:text-7xl lg:text-[5.25rem]">
              {site.name}.
            </span>
          </motion.h1>

          <motion.p
            variants={item}
            className="mt-5 font-display text-xl font-medium leading-snug text-slate-300 sm:text-2xl"
          >
            Building <span className="text-gradient">Intelligent Systems.</span>{" "}
            <br className="hidden sm:block" />
            Engineering Real-World Impact.
          </motion.p>

          <motion.p variants={item} className="mt-6 max-w-xl text-base leading-relaxed text-muted sm:text-lg">
            Engineering student building AI tools, data pipelines, backend APIs, and FPGA &amp; embedded systems.
          </motion.p>

          <motion.div variants={item} className="mt-9 flex flex-wrap items-center gap-3">
            <Button href="#projects" size="lg">
              Explore My Projects
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
            </Button>
            <Button href="#contact" variant="secondary" size="lg">
              Get In Touch
            </Button>
            {hasResume && (
              <Button href={site.resume.url} download={site.resume.downloadName} variant="ghost" size="lg">
                <Download className="h-4 w-4" aria-hidden="true" />
                Resume
              </Button>
            )}
          </motion.div>

          <motion.div variants={item} className="mt-10 flex flex-wrap items-center gap-5">
            <SocialLinks />
            <span className="flex items-center gap-1.5 text-sm text-muted">
              <MapPin className="h-4 w-4 text-indigo" aria-hidden="true" />
              {site.location}
            </span>
          </motion.div>
        </motion.div>

        <motion.div
          className="min-w-0"
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.9, delay: 0.2, ease }}
        >
          <HeroVisual />
        </motion.div>
      </div>
    </section>
  );
}
