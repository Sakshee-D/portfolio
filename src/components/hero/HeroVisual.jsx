import { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useReducedMotion, useSpring, useTransform } from "framer-motion";

/**
 * Decorative hero illustration: a chip with traces running to focus areas.
 *
 * Intro: the chip powers on, traces draw outward one by one, then pads and
 * labels pop in. After that, comet-like signals travel each trace and ripple
 * the pad they reach (CSS: .trace-pulse / .pad-glow / .pad-ripple /
 * .chip-orbit / .chip-breathe in index.css).
 *
 * Pointer interaction (mouse/pen only): the board tilts toward the cursor,
 * a spotlight follows it, and the nearest pad's trace (or every trace, over
 * the chip) is highlighted. Tilt is skipped under prefers-reduced-motion.
 */

const VIEW = 520;
const DURATION = 3.6; // seconds per pulse, shared by trace, pad glow and ripple so they stay in sync
const BOOT = 1.6; // seconds before the first pulses, so the intro reads cleanly
const HOVER_RADIUS = 70; // viewBox units around a pad that count as "near"
const CHIP = { min: 175, max: 345 };
const ease = [0.22, 1, 0.36, 1];

// Each trace starts at a chip pin and ends at a labelled pad.
const traces = [
  { label: "AI / ML", d: "M185 225 H120 V120 H64", end: [64, 120], text: [64, 100], delay: 0 },
  { label: "Backend", d: "M335 225 H400 V120 H456", end: [456, 120], text: [456, 100], delay: 0.6 },
  { label: "Open Source", d: "M260 185 V64", end: [260, 64], text: [260, 44], delay: 1.2 },
  { label: "Data", d: "M185 295 H120 V400 H64", end: [64, 400], text: [64, 428], delay: 1.8 },
  { label: "FPGA", d: "M335 295 H400 V400 H456", end: [456, 400], text: [456, 428], delay: 2.4 },
  { label: "Embedded", d: "M260 335 V456", end: [260, 456], text: [260, 484], delay: 3.0 },
];

// Unlabelled stubs that make the board feel denser without adding noise.
const stubs = [
  { d: "M215 185 V150 H180", via: [180, 150] },
  { d: "M305 185 V150 H340", via: [340, 150] },
  { d: "M215 335 V370 H180", via: [180, 370] },
  { d: "M305 335 V370 H340", via: [340, 370] },
  { d: "M185 260 H150", via: [150, 260] },
  { d: "M335 260 H370", via: [370, 260] },
];

const pinOffsets = [-50, -25, 0, 25, 50];
const clamp = (v) => Math.max(-1, Math.min(1, v));
const centred = { transformBox: "fill-box", transformOrigin: "center" };

function hitTest(x, y) {
  if (x > CHIP.min && x < CHIP.max && y > CHIP.min && y < CHIP.max) return "chip";
  let best = null;
  let bestDist = HOVER_RADIUS;
  for (const t of traces) {
    const dist = Math.hypot(x - t.end[0], y - t.end[1]);
    if (dist < bestDist) {
      best = t.label;
      bestDist = dist;
    }
  }
  return best;
}

export default function HeroVisual() {
  const ref = useRef(null);
  const reduceMotion = useReducedMotion();
  const [active, setActive] = useState(null);

  // Pointer position relative to the board centre, clamped to -1..1.
  const px = useMotionValue(0);
  const py = useMotionValue(0);
  const spring = { stiffness: 120, damping: 18, mass: 0.5 };
  const rotateY = useTransform(useSpring(px, spring), [-1, 1], [-12, 12]);
  const rotateX = useTransform(useSpring(py, spring), [-1, 1], [10, -10]);

  // Spotlight position in viewBox units.
  const lightX = useSpring(VIEW / 2, { stiffness: 300, damping: 30 });
  const lightY = useSpring(VIEW / 2, { stiffness: 300, damping: 30 });
  const lightOpacity = useSpring(0, { stiffness: 200, damping: 30 });

  useEffect(() => {
    const el = ref.current;
    let frame = 0;
    let last = null;

    const update = () => {
      frame = 0;
      const rect = el.getBoundingClientRect();
      const nx = ((last.clientX - rect.left) / rect.width) * 2 - 1;
      const ny = ((last.clientY - rect.top) / rect.height) * 2 - 1;
      px.set(clamp(nx));
      py.set(clamp(ny));

      const inside = Math.abs(nx) <= 1 && Math.abs(ny) <= 1;
      const vx = ((nx + 1) / 2) * VIEW;
      const vy = ((ny + 1) / 2) * VIEW;
      lightX.set(vx);
      lightY.set(vy);
      lightOpacity.set(inside ? 1 : 0);

      const next = inside ? hitTest(vx, vy) : null;
      setActive((prev) => (prev === next ? prev : next));
    };

    const onMove = (e) => {
      if (e.pointerType === "touch") return; // no hover on touch; avoids jitter while scrolling
      last = e;
      if (!frame) frame = requestAnimationFrame(update);
    };

    const reset = () => {
      px.set(0);
      py.set(0);
      lightOpacity.set(0);
      setActive(null);
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    document.documentElement.addEventListener("pointerleave", reset);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("pointermove", onMove);
      document.documentElement.removeEventListener("pointerleave", reset);
    };
  }, [px, py, lightX, lightY, lightOpacity]);

  const chipActive = active === "chip";

  return (
    <div ref={ref} className="relative mx-auto aspect-square w-full max-w-[500px] [perspective:1100px]" aria-hidden="true">
      <motion.div
        className="absolute inset-[12%] rounded-full bg-gradient-to-br from-indigo/25 via-violet/15 to-electric/10 blur-3xl"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.4, ease }}
      />

      <motion.svg
        viewBox={`0 0 ${VIEW} ${VIEW}`}
        className="relative h-full w-full overflow-visible"
        fill="none"
        style={reduceMotion ? undefined : { rotateX, rotateY }}
      >
        <defs>
          <linearGradient id="chip-stroke" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#38BDF8" />
            <stop offset="0.5" stopColor="#6366F1" />
            <stop offset="1" stopColor="#8B5CF6" />
          </linearGradient>
          <linearGradient id="chip-fill" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#151D35" />
            <stop offset="1" stopColor="#0D1222" />
          </linearGradient>
          <radialGradient id="spotlight">
            <stop offset="0" stopColor="#818CF8" stopOpacity="0.35" />
            <stop offset="1" stopColor="#818CF8" stopOpacity="0" />
          </radialGradient>
          <pattern id="board-dots" width="20" height="20" patternUnits="userSpaceOnUse">
            <circle cx="1" cy="1" r="1" fill="rgba(148,163,184,0.18)" />
          </pattern>
          <radialGradient id="board-fade" cx="0.5" cy="0.5" r="0.5">
            <stop offset="0.55" stopColor="white" />
            <stop offset="1" stopColor="black" />
          </radialGradient>
          <mask id="board-mask">
            <rect width={VIEW} height={VIEW} fill="url(#board-fade)" />
          </mask>
          <filter id="soft-glow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="14" />
          </filter>
          <filter id="pulse-glow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="3" />
          </filter>
        </defs>

        <motion.rect
          width={VIEW}
          height={VIEW}
          fill="url(#board-dots)"
          mask="url(#board-mask)"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.2 }}
        />
        <motion.circle cx={lightX} cy={lightY} r="120" fill="url(#spotlight)" style={{ opacity: lightOpacity }} />

        {/* Slow dashed orbit around the chip */}
        <motion.circle
          cx="260"
          cy="260"
          r="112"
          stroke="rgba(129,140,248,0.25)"
          strokeDasharray="2 9"
          className="chip-orbit"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.9, duration: 1 }}
        />

        {stubs.map(({ d, via }, i) => (
          <motion.g
            key={d}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 + i * 0.05, duration: 0.6 }}
          >
            <path d={d} stroke="rgba(129,140,248,0.18)" strokeWidth="1.5" strokeLinecap="round" />
            <circle cx={via[0]} cy={via[1]} r="3" fill="#0D1222" stroke="rgba(129,140,248,0.35)" />
          </motion.g>
        ))}

        {traces.map((t, i) => {
          const on = chipActive || active === t.label;
          const draw = 0.35 + i * 0.12;
          const timing = { animationDuration: `${DURATION}s`, animationDelay: `${BOOT + t.delay}s` };
          return (
            <g key={t.label}>
              <motion.path
                d={t.d}
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="transition-[stroke] duration-300"
                style={{ stroke: on ? "rgba(165,180,252,0.8)" : "rgba(129,140,248,0.28)" }}
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ delay: draw, duration: 0.9, ease: "easeInOut" }}
              />
              {/* Comet: blurred halo + crisp core travelling together */}
              <path
                d={t.d}
                pathLength="100"
                className="trace-pulse"
                stroke="rgba(129,140,248,0.7)"
                strokeWidth="7"
                strokeLinecap="round"
                strokeLinejoin="round"
                filter="url(#pulse-glow)"
                style={timing}
              />
              <path
                d={t.d}
                pathLength="100"
                className="trace-pulse"
                stroke="url(#chip-stroke)"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                style={timing}
              />

              <motion.g
                style={centred}
                initial={{ opacity: 0, scale: 0.4 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: draw + 0.75, type: "spring", stiffness: 260, damping: 18 }}
              >
                <circle cx={t.end[0]} cy={t.end[1]} r="12" fill="#6366F1" className="pad-glow" style={timing} />
                <circle cx={t.end[0]} cy={t.end[1]} r="6" stroke="#38BDF8" strokeWidth="1.5" className="pad-ripple" style={timing} />
                <circle
                  cx={t.end[0]}
                  cy={t.end[1]}
                  r="16"
                  fill="#38BDF8"
                  filter="url(#soft-glow)"
                  className="transition-opacity duration-300"
                  style={{ opacity: on ? 0.7 : 0 }}
                />
                <circle
                  cx={t.end[0]}
                  cy={t.end[1]}
                  r="5.5"
                  fill="#0D1222"
                  strokeWidth="1.5"
                  className="transition-[stroke] duration-300"
                  style={{ stroke: on ? "#38BDF8" : "#A5B4FC" }}
                />
                <text
                  x={t.text[0]}
                  y={t.text[1]}
                  textAnchor="middle"
                  className="font-mono transition-[fill] duration-300"
                  fontSize="13"
                  letterSpacing="0.04em"
                  style={{ fill: on ? "#F8FAFC" : "#CBD5E1" }}
                >
                  {t.label}
                </text>
              </motion.g>
            </g>
          );
        })}

        {/* Chip: powers on first */}
        <motion.g
          style={centred}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, ease }}
        >
          {pinOffsets.map((o) => (
            <g key={o} stroke="rgba(165,180,252,0.45)" strokeWidth="2" strokeLinecap="round">
              <line x1={260 + o} y1="185" x2={260 + o} y2="175" />
              <line x1={260 + o} y1="335" x2={260 + o} y2="345" />
              <line x1="185" y1={260 + o} x2="175" y2={260 + o} />
              <line x1="335" y1={260 + o} x2="345" y2={260 + o} />
            </g>
          ))}

          <rect x="185" y="185" width="150" height="150" rx="22" fill="#6366F1" filter="url(#soft-glow)" className="chip-breathe" />
          <rect
            x="185"
            y="185"
            width="150"
            height="150"
            rx="22"
            fill="#6366F1"
            filter="url(#soft-glow)"
            className="transition-opacity duration-300"
            style={{ opacity: chipActive ? 0.55 : 0 }}
          />
          <rect x="185" y="185" width="150" height="150" rx="22" fill="url(#chip-fill)" stroke="url(#chip-stroke)" strokeWidth="2" />
          <rect x="203" y="203" width="114" height="114" rx="14" stroke="rgba(148,163,184,0.14)" />
          <circle cx="216" cy="216" r="3" fill="#34D399" className="chip-led" />
          <text x="260" y="270" textAnchor="middle" className="font-display" fontSize="46" fontWeight="700" fill="url(#chip-stroke)">
            SD
          </text>
          <text x="260" y="296" textAnchor="middle" className="fill-slate-400 font-mono" fontSize="10" letterSpacing="0.2em">
            AI · SYSTEMS
          </text>
        </motion.g>
      </motion.svg>
    </div>
  );
}
