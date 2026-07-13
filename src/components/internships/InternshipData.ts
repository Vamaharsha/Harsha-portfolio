import etharaCert from "@/assets/ethara.png";
import learnsquareCert from "@/assets/learnsquare.png";
import jyestaCert from "@/assets/jyesta.png";
import ibmCert from "@/assets/1m1b.png";

export interface ProjectDetails {
    name: string;
    description: string;
}

export interface Internship {
    id: string;
    index: string;
    company: string;
    role: string;
    category: string;
    duration: string;
    year: string;
    mode: string;
    description: string;
    skills: string[]; // Clean list of skill names only
    project?: ProjectDetails; // Project details
    credential: string;
    color: string;
    certificateImage: string;
}

export const INTERNSHIPS: Internship[] = [
    {
        id: "ethara",
        index: "01",
        company: "Ethara AI",
        role: "LLM Post Training Intern",
        category: "AI / LLM",
        duration: "January 2026 – May 2026",
        year: "2026",
        mode: "Remote",
        description:
            "Worked on post-training workflows for Large Models, prompt engineering, prompt evaluation, response evaluation, justification writing, multilingual quality evaluation, AI data preparation, model training support, and reinforcement learning from human feedback (RLHF)-style evaluation tasks. Contributed to improving AI model quality through high-quality annotation and evaluation.",
        skills: [
            "Prompt Engineering",
            "Prompt Evaluation",
            "Response Evaluation",
            "Justification Writing",
            "Model Training",
            "LLM Evaluation",
            "RLHF Concepts",
            "AI Quality Assurance",
            "Data Annotation",
            "Multilingual Evaluation"
        ],
        credential: "ETHARA-LLM-2026",
        color: "#00e5ff",
        certificateImage: etharaCert,
    },
    {
        id: "learnsquare",
        index: "02",
        company: "LearnSquare Technologies",
        role: "Python Full Stack Intern",
        category: "Software Development",
        duration: "June 2025 – July 2025",
        year: "2025",
        mode: "In-person",
        description:
            "Completed a Python Full Stack internship where I learned HTML, CSS, JavaScript, responsive web development, Python, Flask, SQL, MongoDB, REST APIs, Git, backend development, and full-stack application development.",
        project: {
            name: "Memorial Book",
            description: "A full-stack alumni platform that allows former students to create accounts, upload memories, share photographs, write experiences, and preserve their college memories digitally while allowing current students to interact with alumni. Worked on frontend design, backend APIs, authentication, database integration, and responsive user interfaces."
        },
        skills: [
            "Python",
            "Flask",
            "HTML",
            "CSS",
            "JavaScript",
            "SQL",
            "MongoDB",
            "REST APIs",
            "Git",
            "Responsive Web Design",
            "Full Stack Development"
        ],
        credential: "LEARNSQUARE-FS-2025",
        color: "#ff6b35",
        certificateImage: learnsquareCert,
    },
    {
        id: "jyesta",
        index: "03",
        company: "Jyesta Corporate Entity",
        role: "Embedded Systems Intern",
        category: "Embedded Systems / IoT",
        duration: "January 2026 – March 2026",
        year: "2026",
        mode: "Virtual",
        description:
            "Learned embedded systems design, embedded programming, hardware interfacing, microcontrollers, sensors, embedded C programming, IoT fundamentals, debugging, and system implementation.",
        project: {
            name: "Smart Car Parking System",
            description: "Detects vehicle availability, monitors parking slots, indicates vacant spaces, and automates parking management using embedded hardware and sensors. The project focused on practical embedded system implementation and hardware-software integration."
        },
        skills: [
            "Embedded Systems",
            "Embedded C",
            "Microcontrollers",
            "Sensors",
            "Hardware Interfacing",
            "IoT Basics",
            "System Design",
            "Debugging",
            "Problem Solving"
        ],
        credential: "JYE-EMB-2026",
        color: "#39ff14",
        certificateImage: jyestaCert,
    },
    {
        id: "ibm-1m1b",
        index: "04",
        company: "1M1B & IBM SkillsBuild",
        role: "AI for Sustainability Virtual Intern",
        category: "Artificial Intelligence",
        duration: "December 2025 – January 2026",
        year: "2026",
        mode: "Virtual",
        description:
            "Learned AI fundamentals, different types of AI models, AI response generation, responsible AI practices, sustainability-focused AI applications, and practical AI problem-solving.",
        project: {
            name: "Smart Waste Segregation System",
            description: "Uses AI concepts for intelligent waste classification and segregation to promote environmental sustainability and smart waste management. The internship emphasized applying AI to solve real-world sustainability challenges."
        },
        skills: [
            "Artificial Intelligence",
            "AI Models",
            "AI Responses",
            "Sustainability",
            "Responsible AI",
            "Smart Waste Segregation",
            "Problem Solving",
            "IBM SkillsBuild",
            "Environmental AI"
        ],
        credential: "IBM-AI-2026",
        color: "#a855f7",
        certificateImage: ibmCert,
    }
];
