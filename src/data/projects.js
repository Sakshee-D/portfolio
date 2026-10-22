import {
  Brain,
  BrainCircuit,
  CarFront,
  Clock,
  FileSpreadsheet,
  LineChart,
  Microchip,
  Newspaper,
  ScanFace,
  Wallet,
} from "lucide-react";

/**
 * Projects are rendered in the order of this array, so reorder freely.
 *
 * Fields:
 *   id          unique slug
 *   title       card title
 *   summary     one short sentence for the card
 *   description a few sentences for the detail modal
 *   categories  any of PROJECT_CATEGORIES below (first one is shown as the primary label)
 *   tech        technology tags
 *   features    bullet points shown in the detail modal
 *   metrics     optional [{ label, value }]: only add validated numbers
 *   diagram     optional [{ label, items: [] }]: block diagram stages, shown in the details modal
 *   links       { github, demo }: leave "" until a real URL exists; empty links are hidden
 *   featured    optional, renders a wider card
 *   icon        any lucide-react icon component
 *
 * To add a project, copy one object, give it a new id, and edit the fields.
 */

export const PROJECT_CATEGORIES = [
  "AI/ML",
  "Computer Vision",
  "Healthcare AI",
  "Backend",
  "Data Engineering",
  "Software Engineering",
  "Hardware",
];

export const projects = [
  {
    id: "mri-brain-tumor",
    title: "MRI Brain Tumor Classification",
    summary: "Classifies brain MRI scans into four tumor types using transfer learning.",
    description:
      "A fine-tuned EfficientNetV2B0 CNN trained on ~7,200 MRI scans, with preprocessing and augmentation, classifying four tumor categories.",
    categories: ["Healthcare AI", "Computer Vision", "AI/ML"],
    tech: ["Python", "TensorFlow/Keras", "EfficientNetV2B0", "CNNs", "Transfer Learning", "Medical Imaging"],
    features: [
      "Transfer learning on ~7,200 MRI scans",
      "Preprocessing and data augmentation",
      "89.19% accuracy across four classes",
    ],
    metrics: [
      { label: "Accuracy", value: "89.19%" },
      { label: "MRI scans", value: "~7,200" },
      { label: "Classes", value: "4" },
    ],
    diagram: [
      { label: "Data", items: ["~7,200 MRI scans"] },
      { label: "Prep", items: ["Preprocessing", "Augmentation"] },
      { label: "Model", items: ["EfficientNetV2B0 (transfer learning)"] },
      { label: "Output", items: ["4 tumor classes"] },
    ],
    links: {
      github: "https://github.com/Sakshee-D/Brain-Tumor-MRI-Classifier",
      demo: "",
    },
    featured: true,
    icon: Brain,
  },
  {
    id: "stock-rag",
    title: "AI-Based Stock Recommendation System",
    summary: "RAG-powered stock research that grounds LLM answers in real financial data.",
    description:
      "Financial news and fundamentals are embedded with Sentence-Transformers and searched with FAISS; the most relevant context is passed to Gemini to generate recommendations. Served with FastAPI and a Streamlit app.",
    categories: ["AI/ML", "Backend"],
    tech: ["FastAPI", "FAISS", "SentenceTransformers", "Gemini API", "Streamlit", "RAG"],
    features: [
      "Uses financial news and stock fundamentals as context",
      "Semantic search to ground the LLM and reduce hallucinations",
      "Interactive Streamlit app on a FastAPI backend",
    ],
    diagram: [
      { label: "Sources", items: ["Financial news", "Stock fundamentals"] },
      { label: "Embed", items: ["Sentence-Transformers"] },
      { label: "Retrieve", items: ["FAISS semantic search"] },
      { label: "Generate", items: ["Gemini LLM"] },
      { label: "Serve", items: ["FastAPI", "Streamlit app"] },
    ],
    links: { github: "https://github.com/Sakshee-D/AI_Investment_Portfolio_Recommendation", demo: "" },
    featured: true,
    icon: LineChart,
  },
  {
    id: "bank-statement-pipeline",
    title: "Bank Statement Processing Pipeline",
    summary: "Turns bank statements of any layout into clean, validated transaction data.",
    description:
      "OCR and layout detection locate transaction tables; rows are parsed, cleaned, and validated, then stored in MySQL. Built as a base for future analytics and fraud detection.",
    categories: ["Data Engineering", "Backend"],
    tech: ["Python", "FastAPI", "OCR", "Layout Detection", "MySQL"],
    features: [
      "OCR + layout detection for parsing",
      "Handles different statement formats",
      "Cleaning and validation before storage",
    ],
    diagram: [
      { label: "Input", items: ["Bank statement"] },
      { label: "Extract", items: ["OCR", "Layout detection"] },
      { label: "Parse", items: ["Transaction parsing"] },
      { label: "Validate", items: ["Cleaning & validation"] },
      { label: "Store", items: ["MySQL"] },
    ],
    links: { github: "", demo: "" },
    icon: FileSpreadsheet,
  },
  {
    id: "face-verification",
    title: "Face Verification & Gender Classification",
    summary: "A Siamese network for face matching plus a MobileNetV2 gender classifier.",
    description:
      "Built for the COMSYS Hackathon: a Siamese network verifies faces by embedding similarity, and a MobileNetV2 model classifies gender via transfer learning. Augmentation improves robustness to lighting and noise.",
    categories: ["Computer Vision", "AI/ML"],
    tech: ["Python", "TensorFlow/Keras", "Siamese Networks", "MobileNetV2", "Transfer Learning"],
    features: [
      "Face verification via embedding similarity",
      "Gender classification with transfer learning",
      "~90% validation accuracy across tasks",
    ],
    metrics: [{ label: "Val. accuracy", value: "~90%" }],
    diagram: [
      { label: "Input", items: ["Face images"] },
      { label: "Prep", items: ["Augmentation"] },
      { label: "Models", items: ["Siamese network", "MobileNetV2"] },
      { label: "Output", items: ["Verification result", "Gender label"] },
    ],
    links: { github: "https://github.com/Sakshee-D/comys_ml", demo: "" },
    icon: ScanFace,
  },
  {
    id: "fake-news",
    title: "Fake News Detection",
    summary: "Flags potentially misleading news with TF-IDF and a Random Forest.",
    description:
      "News text is cleaned with Pandas, vectorised with TF-IDF, and classified with a Scikit-learn Random Forest.",
    categories: ["AI/ML"],
    tech: ["Python", "Pandas", "Scikit-learn", "TF-IDF", "Random Forest"],
    features: ["Text preprocessing", "TF-IDF features", "Random Forest classifier"],
    // A 96.2% accuracy was reported earlier. Uncomment only once it matches
    // your final validated evaluation results:
    // metrics: [{ label: "Accuracy", value: "96.2%" }],
    diagram: [
      { label: "Input", items: ["News text"] },
      { label: "Clean", items: ["Pandas"] },
      { label: "Features", items: ["TF-IDF"] },
      { label: "Model", items: ["Random Forest"] },
      { label: "Output", items: ["Reliable / misleading"] },
    ],
    links: { github: "", demo: "" },
    icon: Newspaper,
  },
  {
    id: "aarthika",
    title: "Aarthika — Financial Inclusion App",
    summary: "An accessible finance app with local-language audio, budgeting, and micro-investing.",
    description:
      "A React Native (Expo) app backed by a Flask API and MySQL, built to make financial tools easier to use for everyone.",
    categories: ["Software Engineering", "Backend"],
    tech: ["React Native", "Expo", "Flask", "MySQL"],
    features: ["Local-language audio", "Budgeting tools", "Micro-investment concepts"],
    diagram: [
      { label: "App", items: ["React Native + Expo"] },
      { label: "API", items: ["Flask"] },
      { label: "Data", items: ["MySQL"] },
    ],
    links: { github: "", demo: "" },
    icon: Wallet,
  },
  {
    id: "road-safety-fpga",
    title: "Road Safety System (ADAS) on FPGA",
    summary: "Rain wipers, lane-change alerts, and airbag logic in Verilog on an FPGA.",
    description:
      "A 5-member VLSI Design Lab project: three driver-assistance modules running in parallel in Verilog, verified with a Vivado testbench and tested on an FPGA board.",
    categories: ["Hardware"],
    tech: ["Verilog", "Xilinx Vivado", "FPGA", "XSIM"],
    features: [
      "Four-speed wipers from a 6-bit rain sensor",
      "1 Hz lane indicators with a solid warning on dangerous turns",
      "Airbag trigger from accelerometer input",
    ],
    diagram: [
      { label: "Inputs", items: ["Rain sensor (6-bit)", "Lane buttons", "Accelerometer (2-bit)"] },
      { label: "Logic", items: ["Threshold mapping", "Lane logic & timer", "Collision detection"] },
      { label: "Outputs", items: ["Wiper mode (2-bit)", "Turn indicator LEDs", "Airbag trigger"] },
    ],
    links: { github: "", demo: "" },
    icon: CarFront,
  },
  {
    id: "stm32-vehicle-safety",
    title: "STM32 Smart Vehicle Safety System",
    summary: "STM32F407 firmware that monitors sensors in real time and raises alerts.",
    description:
      "Embedded firmware on the STM32F407, interfacing sensors through GPIO, ADC, UART, timers, and interrupts to monitor readings and generate alerts.",
    categories: ["Hardware"],
    tech: ["STM32F407", "GPIO", "ADC", "UART", "Timers", "Interrupts"],
    features: ["Real-time sensor monitoring", "GPIO, ADC, UART, timers, interrupts", "Alert generation"],
    diagram: [
      { label: "Inputs", items: ["Sensors"] },
      { label: "Interfaces", items: ["GPIO", "ADC", "UART"] },
      { label: "MCU", items: ["STM32F407 firmware", "Timers & interrupts"] },
      { label: "Output", items: ["Alerts"] },
    ],
    links: { github: "", demo: "" },
    icon: Microchip,
  },
  {
    id: "attendance-tracker",
    title: "Attendance System Tracker",
    summary: "An FPGA attendance tracker with timestamps and a late-mark buzzer.",
    description:
      "Built with Xilinx FPGA tools: tracks working hours against an 8-hour period, adjusts for interruptions, shows timestamps, and sounds a buzzer for late marks.",
    categories: ["Hardware"],
    tech: ["Verilog", "Xilinx FPGA"],
    features: ["8-hour working-time tracking", "Adjusts for interruptions", "Timestamp display and late-mark buzzer"],
    diagram: [
      { label: "Inputs", items: ["Attendance marks", "Interruptions", "Clock"] },
      { label: "Logic", items: ["Working-hours counter (8 h)", "Late-mark check"] },
      { label: "Outputs", items: ["Timestamp display", "Buzzer alert"] },
    ],
    links: { github: "", demo: "" },
    icon: Clock,
  },
];

export const projectIconFallback = BrainCircuit;
