import {
  Binary,
  Bot,
  Braces,
  Cable,
  CircuitBoard,
  Cpu,
  Database,
  FileCheck2,
  FileSearch,
  LayoutTemplate,
  Microchip,
  Network,
  Radio,
  ScanText,
  Search,
  Server,
  Timer,
  Workflow,
} from "lucide-react";
import {
  SiC,
  SiCss,
  SiFastapi,
  SiFigma,
  SiFlask,
  SiGit,
  SiGithub,
  SiGithubactions,
  SiHtml5,
  SiHuggingface,
  SiKeras,
  SiLinux,
  SiMysql,
  SiOpenjdk,
  SiPandas,
  SiPytest,
  SiPython,
  SiScikitlearn,
  SiStmicroelectronics,
  SiStreamlit,
  SiTensorflow,
} from "react-icons/si";

/**
 * Tech stack grouped by category. `icon` can be any React icon component;
 * `color` tints the icon (use the brand colour or leave undefined).
 */

export const skillGroups = [
  {
    title: "Languages",
    icon: Braces,
    items: [
      { name: "Python", icon: SiPython, color: "#5B9BD5" },
      { name: "Java", icon: SiOpenjdk, color: "#E76F00" },
      { name: "C", icon: SiC, color: "#7D8FD6" },
      { name: "SQL", icon: Database, color: "#38BDF8" },
    ],
  },
  {
    title: "Backend & APIs",
    icon: Server,
    items: [
      { name: "FastAPI", icon: SiFastapi, color: "#05998B" },
      { name: "Flask", icon: SiFlask, color: "#E2E8F0" },
      { name: "REST APIs", icon: Network, color: "#818CF8" },
      { name: "MySQL", icon: SiMysql, color: "#4E8CB4" },
    ],
  },
  {
    title: "AI / Machine Learning",
    icon: Bot,
    items: [
      { name: "Scikit-learn", icon: SiScikitlearn, color: "#F7931E" },
      { name: "TensorFlow", icon: SiTensorflow, color: "#FF8F00" },
      { name: "Keras", icon: SiKeras, color: "#D00000" },
      { name: "SentenceTransformers", icon: SiHuggingface, color: "#FFD21E" },
      { name: "FAISS", icon: Search, color: "#38BDF8" },
      { name: "RAG", icon: FileSearch, color: "#A78BFA" },
      { name: "LLMs", icon: Bot, color: "#818CF8" },
    ],
  },
  {
    title: "Data Engineering",
    icon: Workflow,
    items: [
      { name: "Pandas", icon: SiPandas, color: "#A5A8F7" },
      { name: "Data Pipelines", icon: Workflow, color: "#38BDF8" },
      { name: "OCR", icon: ScanText, color: "#A78BFA" },
      { name: "Layout Detection", icon: LayoutTemplate, color: "#818CF8" },
      { name: "Data Validation", icon: FileCheck2, color: "#34D399" },
    ],
  },
  {
    title: "Frontend & Design",
    icon: LayoutTemplate,
    items: [
      { name: "HTML", icon: SiHtml5, color: "#E34F26" },
      { name: "CSS", icon: SiCss, color: "#3C99DC" },
      { name: "Figma", icon: SiFigma, color: "#F24E1E" },
    ],
  },
  {
    title: "Tools & Platforms",
    icon: Binary,
    items: [
      { name: "Git", icon: SiGit, color: "#F05032" },
      { name: "GitHub", icon: SiGithub, color: "#E2E8F0" },
      { name: "Linux", icon: SiLinux, color: "#FCC624" },
      { name: "pytest", icon: SiPytest, color: "#0A9EDC" },
      { name: "tox", icon: FileCheck2, color: "#A5B4FC" },
      { name: "CI/CD", icon: SiGithubactions, color: "#2088FF" },
      { name: "Streamlit", icon: SiStreamlit, color: "#FF4B4B" },
    ],
  },
  {
    title: "Embedded & Hardware",
    icon: Microchip,
    items: [
      { name: "STM32F407", icon: SiStmicroelectronics, color: "#3CB4E6" },
      { name: "GPIO / ADC / UART", icon: Cable, color: "#38BDF8" },
      { name: "Timers & Interrupts", icon: Timer, color: "#818CF8" },
      { name: "Sensor Interfacing", icon: Radio, color: "#34D399" },
      { name: "Verilog", icon: Cpu, color: "#A78BFA" },
      { name: "Xilinx FPGA", icon: CircuitBoard, color: "#A78BFA" },
    ],
  },
];
