/**
 * DockData.ts — Skills & tools with icon images and project cross-references.
 *
 * Each tool uses an imported PNG icon instead of emojis.
 * Cross-references to project IDs from ProjectData.ts.
 */

import icon_javascript from "@/assets/javascript_icon.png";
import icon_typescript from "@/assets/typescript_icon.png";
import icon_cprograming from "@/assets/cprograming_icon.png";
import icon_verilog from "@/assets/verilog_icon.png";
import icon_react from "@/assets/react_icon.png";
import icon_django from "@/assets/django_icon.png";
import icon_flask from "@/assets/flask_icon.png";
import icon_tensorflow from "@/assets/tensorflow_icon.png";
import icon_gradio from "@/assets/gradio_icon.png";
import icon_framermotion from "@/assets/framermotion_icon.png";
import icon_opencv from "@/assets/opencv_icon.png";
import icon_sklearn from "@/assets/scikit-learn_icon.png";
import icon_hfss from "@/assets/ansysshfss_icon.png";
import icon_github from "@/assets/github_icon.png";
import icon_pygame from "@/assets/pygames_icon.png";
import icon_terminal from "@/assets/terminal_icon.png";
import icon_huggingface from "@/assets/huggingface_icon.png";
import icon_mongodb from "@/assets/mongodb_icon.png";
import icon_railway from "@/assets/railway_icon.png";
import icon_chatgpt from "@/assets/chatgpt_icon.png";
import icon_claude from "@/assets/claude_icon.png";
import icon_gemini from "@/assets/gemini_icon.png";
import icon_python from "@/assets/python_logo.png";
import icon_vscode from "@/assets/vscode_logo.png";
import icon_antigravity from "@/assets/antigravity_logo.png";
import icon_codex from "@/assets/codex_logo.png";

export interface DockItem {
    id: string;
    name: string;
    icon: string;           // Imported PNG path
    category: DockCategory;
    projectIds: string[];   // Cross-reference to ProjectData IDs
    experience?: string;    // Professional context
}

export type DockCategory =
    | "All"
    | "Languages"
    | "Frameworks"
    | "Tools"
    | "Platforms"
    | "AI"
    | "Code Editors";

export const DOCK_CATEGORIES: DockCategory[] = [
    "All",
    "Languages",
    "Frameworks",
    "Tools",
    "Platforms",
    "AI",
    "Code Editors",
];

export const DOCK_ITEMS: DockItem[] = [
    // ── Languages ────────────────────────────────────────────
    {
        id: "python",
        name: "Python",
        icon: icon_python,
        category: "Languages",
        projectIds: ["rf-chatbot", "yolo-detection", "alumni-book", "flappy-peacock"],
        experience: "Primary language for machine learning pipelines, chatbot backends, data visualization, and simulation scripts.",
    },
    {
        id: "javascript",
        name: "JavaScript",
        icon: icon_javascript,
        category: "Languages",
        projectIds: ["taskman", "alumni-book"],
        experience: "Frontend and full-stack development across multiple web projects.",
    },
    {
        id: "typescript",
        name: "TypeScript",
        icon: icon_typescript,
        category: "Languages",
        projectIds: ["taskman"],
        experience: "Type-safe development for production React applications.",
    },
    {
        id: "c-lang",
        name: "C",
        icon: icon_cprograming,
        category: "Languages",
        projectIds: ["smart-irrigation", "home-automation"],
        experience: "Embedded C programming for Arduino-based IoT systems and firmware development.",
    },
    {
        id: "verilog",
        name: "Verilog HDL",
        icon: icon_verilog,
        category: "Languages",
        projectIds: ["uart-controller"],
        experience: "RTL design and verification for digital communication controllers.",
    },

    // ── Frameworks ───────────────────────────────────────────
    {
        id: "react",
        name: "React",
        icon: icon_react,
        category: "Frameworks",
        projectIds: ["taskman"],
        experience: "Component-driven UI development with hooks, context, and Framer Motion animations.",
    },
    {
        id: "django",
        name: "Django",
        icon: icon_django,
        category: "Frameworks",
        projectIds: ["alumni-book"],
        experience: "Full-stack Python web framework for data-driven applications.",
    },
    {
        id: "flask",
        name: "Flask",
        icon: icon_flask,
        category: "Frameworks",
        projectIds: ["alumni-book"],
        experience: "Lightweight Python web framework for alumni management backend.",
    },
    {
        id: "tensorflow",
        name: "TensorFlow",
        icon: icon_tensorflow,
        category: "Frameworks",
        projectIds: ["rf-chatbot"],
        experience: "Deep learning model training and deployment. ANN surrogate models for RF filter optimization.",
    },
    {
        id: "gradio",
        name: "Gradio",
        icon: icon_gradio,
        category: "Frameworks",
        projectIds: ["rf-chatbot"],
        experience: "Rapid ML demo interface building for chatbot and prediction tools.",
    },
    {
        id: "framer-motion",
        name: "Framer Motion",
        icon: icon_framermotion,
        category: "Frameworks",
        projectIds: ["taskman"],
        experience: "Production-grade animation library for React — used in Taskman and this portfolio.",
    },

    // ── Tools ────────────────────────────────────────────────
    {
        id: "opencv",
        name: "OpenCV",
        icon: icon_opencv,
        category: "Tools",
        projectIds: ["yolo-detection"],
        experience: "Computer vision preprocessing, image augmentation, and real-time video inference.",
    },
    {
        id: "sklearn",
        name: "Scikit-learn",
        icon: icon_sklearn,
        category: "Tools",
        projectIds: ["rf-chatbot"],
        experience: "ML model benchmarking — Random Forest, Linear Regression, and preprocessing pipelines.",
    },
    {
        id: "hfss",
        name: "Ansys HFSS",
        icon: icon_hfss,
        category: "Tools",
        projectIds: ["hm-siw"],
        experience: "Electromagnetic simulation software for RF filter design and S-parameter analysis.",
    },
    {
        id: "github",
        name: "GitHub",
        icon: icon_github,
        category: "Tools",
        projectIds: ["taskman", "alumni-book", "uart-controller"],
        experience: "Version control, collaboration, and CI/CD across all major projects.",
    },
    {
        id: "pygame",
        name: "Pygame",
        icon: icon_pygame,
        category: "Tools",
        projectIds: ["flappy-peacock"],
        experience: "2D game development framework — physics, sprites, and game loop design.",
    },
    {
        id: "terminal",
        name: "Terminal",
        icon: icon_terminal,
        category: "Tools",
        projectIds: [],
        experience: "CLI-first workflow — shell scripting, SSH, and system administration.",
    },
    {
        id: "huggingface",
        name: "Hugging Face",
        icon: icon_huggingface,
        category: "Tools",
        projectIds: ["rf-chatbot"],
        experience: "Model hosting, datasets, and transformer-based ML pipelines.",
    },

    // ── Platforms ─────────────────────────────────────────────
    {
        id: "mongodb",
        name: "MongoDB",
        icon: icon_mongodb,
        category: "Platforms",
        projectIds: ["taskman"],
        experience: "NoSQL database for task management data persistence.",
    },
    {
        id: "railway",
        name: "Railway",
        icon: icon_railway,
        category: "Platforms",
        projectIds: ["taskman"],
        experience: "Cloud deployment platform for full-stack applications.",
    },

    // ── AI ────────────────────────────────────────────────────
    {
        id: "chatgpt",
        name: "ChatGPT",
        icon: icon_chatgpt,
        category: "AI",
        projectIds: [],
        experience: "Prompt engineering, AI model evaluation, and LLM-assisted development workflows. Professional freelance work in AI output quality assessment.",
    },
    {
        id: "claude",
        name: "Claude",
        icon: icon_claude,
        category: "AI",
        projectIds: [],
        experience: "Advanced prompting, RLHF annotation, and AI model comparison for evaluation pipelines.",
    },
    {
        id: "gemini",
        name: "Gemini",
        icon: icon_gemini,
        category: "AI",
        projectIds: [],
        experience: "Multimodal AI development, prompt crafting, and integration into production applications.",
    },
    {
        id: "codex",
        name: "OpenAI Codex",
        icon: icon_codex,
        category: "AI",
        projectIds: [],
        experience: "AI model and API for automated code generation, smart code suggestions, refactoring, and logic optimization.",
    },

    // ── Code Editors ──────────────────────────────────────────
    {
        id: "vscode",
        name: "VS Code",
        icon: icon_vscode,
        category: "Code Editors",
        projectIds: ["alumni-book", "flappy-peacock"],
        experience: "Primary IDE for full-stack web, python, and embedded development.",
    },
    {
        id: "antigravity",
        name: "Antigravity IDE",
        icon: icon_antigravity,
        category: "Code Editors",
        projectIds: ["taskman"],
        experience: "Advanced agentic coding workspace used for pair programming and rapid application iteration.",
    },
];
