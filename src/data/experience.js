/**
 * Experience entries, rendered top to bottom as a timeline.
 *
 * type:   "work" | "open-source" (controls the badge and icon)
 * period: free text such as "Jun 2025 – Aug 2025"; leave "" to hide it
 * links:  [{ label, url }]; entries with an empty url are hidden
 */

export const experience = [
  {
    type: "work",
    role: "Software/AI Engineering Intern",
    organization: "Imperative Business Ventures",
    period: "",
    location: "",
    points: [
      "Built backend features for a bank statement processing pipeline.",
      "Worked on OCR extraction, layout detection, transaction parsing, and validation across statement formats.",
    ],
    tech: ["FastAPI", "Python", "MySQL", "OCR", "HTML/CSS"],
    links: [],
  },
  {
    type: "open-source",
    role: "Open-Source Contributor",
    organization: "PyData ecosystem: ArviZ & xarray",
    period: "",
    location: "Remote",
    points: [
      "arviz-plots: nightly dependency tests in tox and a Hypothesis fix (#466); max_subplots check (#425).",
      "xarray: clearer missing-SciPy error for NDPointIndex (#11085); apply_ufunc doc links (#11063).",
    ],
    tech: ["Python", "pytest", "tox", "CI", "xarray", "ArviZ"],
    links: [
      { label: "arviz-plots #466", url: "https://github.com/arviz-devs/arviz-plots/pull/466" },
      { label: "arviz-plots #425", url: "https://github.com/arviz-devs/arviz-plots/pull/425" },
      { label: "xarray #11085", url: "https://github.com/pydata/xarray/pull/11085" },
      { label: "xarray #11063", url: "https://github.com/pydata/xarray/pull/11063" },
    ],
  },
];
