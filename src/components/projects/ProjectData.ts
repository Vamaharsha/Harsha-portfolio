/**
 * ProjectData.ts — Single source of truth for all portfolio projects.
 *
 * Each project has a category, tech stack, optional GitHub link,
 * and optional highlight badge. Images can be added later.
 */

export interface Project {
    id: string;
    title: string;
    category: ProjectCategory;
    year: string;
    description: string;
    techStack: string[];
    githubUrl?: string;
    liveUrl?: string;
    image?: string;
    highlight?: string;
    color: string;          // Accent color per category
}

export type ProjectCategory =
    | "All"
    | "AI / ML"
    | "RF / Microwave"
    | "Web Dev"
    | "Embedded / VLSI";

export const CATEGORIES: ProjectCategory[] = [
    "All",
    "AI / ML",
    "RF / Microwave",
    "Web Dev",
    "Embedded / VLSI",
];

/** Category → accent color mapping */
export const CATEGORY_COLORS: Record<ProjectCategory, string> = {
    "All":              "#ff3d2e",
    "AI / ML":          "#a855f7",
    "RF / Microwave":   "#06b6d4",
    "Web Dev":          "#f97316",
    "Embedded / VLSI":  "#22c55e",
};

export const PROJECTS: Project[] = [
    // ── AI / ML ──────────────────────────────────────────────
    {
        id: "rf-chatbot",
        title: "Universal RF Filter\nDesign Chatbot",
        category: "AI / ML",
        year: "2026",
        description:
            "ML platform for Half-Mode SIW bandpass filter optimization, benchmarking ANN, Random Forest, Linear Regression, and XGBoost models — the ANN achieved R² = 0.952 with 1.52% MAPE. Supports forward prediction, inverse design, and partial-parameter solving via a Gradio chatbot interface, with the optimizer migrated from Genetic Algorithm to Grey Wolf Optimizer for publication-grade rigor.",
        techStack: ["Python", "Gradio", "Scikit-learn", "TensorFlow", "XGBoost", "Grey Wolf Optimizer"],
        highlight: "R² = 0.952 Forward Prediction",
        color: CATEGORY_COLORS["AI / ML"],
    },
    {
        id: "yolo-detection",
        title: "Cat & Dog\nDetection (YOLO)",
        category: "AI / ML",
        year: "2025",
        description:
            "Real-time object detection pipeline for classifying cats and dogs in images and video streams using the YOLO architecture with OpenCV-based preprocessing and inference.",
        techStack: ["Python", "OpenCV", "YOLO"],
        color: CATEGORY_COLORS["AI / ML"],
    },

    // ── RF / Microwave ───────────────────────────────────────
    {
        id: "hm-siw",
        title: "Half-Mode SIW\nBandpass Filter",
        category: "RF / Microwave",
        year: "2026",
        description:
            "Spoof surface plasmon polariton (SSPP) based Half-Mode Substrate Integrated Waveguide bandpass filter designed and simulated in HFSS for X-band applications. Generated S-parameter datasets later used to train the RF ML chatbot.",
        techStack: ["HFSS", "EM Simulation", "S-Parameter Analysis", "RF Filter Design"],
        highlight: "Published in IRJET Vol.13 Issue 04",
        color: CATEGORY_COLORS["RF / Microwave"],
    },

    // ── Web Dev ──────────────────────────────────────────────
    {
        id: "taskman",
        title: "Taskman — Team\nTask Manager",
        category: "Web Dev",
        year: "2026",
        description:
            "Full-stack team task management app with a dark editorial aesthetic — custom CSS token system, Space Grotesk/IBM Plex typography, and Framer Motion animations throughout. Deployed on Railway.",
        techStack: ["React", "Node.js", "MongoDB", "Framer Motion", "Railway"],
        githubUrl: "https://github.com/Vamaharsha/TASKMAN",
        color: CATEGORY_COLORS["Web Dev"],
    },
    {
        id: "alumni-book",
        title: "Alumni Book\nWeb Application",
        category: "Web Dev",
        year: "2025",
        description:
            "Python full-stack web application for alumni interaction and institutional data management, built with Django backend and JavaScript-powered frontend.",
        techStack: ["Django", "JavaScript", "Python"],
        githubUrl: "https://github.com/Vamaharsha/memorialbookflask",
        color: CATEGORY_COLORS["Web Dev"],
    },

    // ── Embedded / VLSI ──────────────────────────────────────
    {
        id: "flappy-peacock",
        title: "Flappy Peacock\nCS50 Final Project",
        category: "Web Dev",
        year: "2025",
        description:
            "Indian-themed twist on Flappy Bird — CS50x (Harvard) final project built with Python and Pygame. Features custom peacock character animation, smooth flapping physics, randomized obstacle generation, score tracking, and full game loop design.",
        techStack: ["Python", "Pygame", "Game Physics", "Sprite Animation"],
        highlight: "Harvard CS50x Final Project",
        color: CATEGORY_COLORS["Web Dev"],
    },
    {
        id: "uart-controller",
        title: "UART Communication\nController",
        category: "Embedded / VLSI",
        year: "2026",
        description:
            "UART transmitter and receiver modules for asynchronous serial communication, with FSM-based baud-rate generation, validated through waveform simulation and self-checking testbenches.",
        techStack: ["Verilog HDL", "UART Protocol", "FSM Design", "RTL Verification"],
        githubUrl: "https://github.com/Vamaharsha/uart-communication-controller-verilog",
        color: CATEGORY_COLORS["Embedded / VLSI"],
    },
    {
        id: "cmos-layout",
        title: "CMOS Layout\nDesign",
        category: "Embedded / VLSI",
        year: "2025",
        description:
            "CMOS transistor-level layouts for logic gates and arithmetic circuits, with layout verification and optimization for VLSI implementation using industry-standard EDA tools.",
        techStack: ["Mentor Graphics", "CMOS Layout", "VLSI Design"],
        color: CATEGORY_COLORS["Embedded / VLSI"],
    },
    {
        id: "smart-irrigation",
        title: "Smart Irrigation\nSystem",
        category: "Embedded / VLSI",
        year: "2025",
        description:
            "Automated irrigation system using real-time soil moisture data and relay switching, reducing water usage by nearly 30% and eliminating manual effort.",
        techStack: ["Arduino UNO", "Soil Sensor", "Relay", "Embedded C", "IoT"],
        highlight: "30% Water Savings",
        color: CATEGORY_COLORS["Embedded / VLSI"],
    },
    {
        id: "home-automation",
        title: "Home Automation\nSmart Technologies",
        category: "Embedded / VLSI",
        year: "2025",
        description:
            "IoT-enabled home automation system allowing remote control and monitoring of appliances through a smartphone using the Blynk platform.",
        techStack: ["Arduino UNO", "Wi-Fi Module", "Sensors", "Blynk"],
        color: CATEGORY_COLORS["Embedded / VLSI"],
    },
];
