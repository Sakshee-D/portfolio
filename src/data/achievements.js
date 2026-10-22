import { GitPullRequest, GraduationCap, Puzzle, Trophy } from "lucide-react";
import { education, socials } from "./site";

/**
 * Highlights. Keep every entry factual: no invented ranks, awards or stats.
 * link: optional { label, url }; hidden when url is "".
 */

export const achievements = [
  {
    icon: Trophy,
    title: "1st Position, Buffer 2025",
    description: "Won with Nirbhaya, a women safety web app.",
    link: {
      label: "View certificate",
      url: "https://drive.google.com/file/d/18oqaH0WXaDCREpFF73ovHbxtuS4-ab2X/view?usp=drive_link",
    },
  },
  {
    icon: GitPullRequest,
    title: "4 merged open-source PRs",
    description: "In ArviZ and xarray (PyData).",
    link: { label: "See contributions", url: "#experience" },
  },
  {
    icon: Puzzle,
    title: "Algorithmic problem-solving",
    description: "Practising DSA on LeetCode.",
    link: { label: "LeetCode profile", url: socials.leetcode },
  },
  {
    icon: GraduationCap,
    title: `B.Tech, CGPA ${education.cgpa}`,
    description: "ENTC, Cummins College of Engineering, Pune · Class of 2027.",
    link: { label: "", url: "" },
  },
];
