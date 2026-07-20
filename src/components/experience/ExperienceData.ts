/**
 * ExperienceData.ts — Professional experience timeline data.
 * Covers internship at Ethara AI and freelancing at Outlier.
 */

export interface Experience {
    id: string;
    type: "internship" | "freelance";
    company: string;
    role: string;
    domain: string;
    duration: string;
    status: "completed" | "current";
    description: string;
    highlights: string[];
    skills: string[];
    color: string;
    icon: "brain" | "sparkles"; // Icon type for the timeline marker
}

export const EXPERIENCES: Experience[] = [
    {
        id: "outlier-freelance",
        type: "freelance",
        company: "Outlier AI",
        role: "AI Training Specialist — Freelancer",
        domain: "LLM Post-Training & Prompt Engineering",
        duration: "June 2026 – Present",
        status: "current",
        description:
            "Currently freelancing on the same domain — prompt engineering, LLM evaluation, and post-training tasks. Contributing to AI model quality through advanced prompting, response ranking, RLHF-style annotations, and multilingual evaluation tasks.",
        highlights: [
            "Advanced prompt engineering for LLM output quality",
            "Response evaluation & ranking for model fine-tuning",
            "RLHF-style annotation and feedback loops",
            "Multilingual quality evaluation across domains",
            "AI data curation and preparation pipelines",
        ],
        skills: [
            "Prompt Engineering",
            "LLM Evaluation",
            "RLHF",
            "AI Data Curation",
            "Response Ranking",
            "Multilingual QA",
        ],
        color: "#a855f7",
        icon: "sparkles",
    },
    {
        id: "ethara-internship",
        type: "internship",
        company: "Ethara AI",
        role: "LLM Post-Training Intern",
        domain: "LLM Post-Training & Prompt Engineering",
        duration: "January 2026 – May 2026",
        status: "completed",
        description:
            "Worked on post-training workflows for Large Language Models — prompt engineering, prompt evaluation, response evaluation, justification writing, multilingual quality evaluation, AI data preparation, model training support, and RLHF-style evaluation tasks.",
        highlights: [
            "Prompt engineering & evaluation for LLM quality",
            "Response evaluation and justification writing",
            "Multilingual quality assessment across languages",
            "AI data preparation and annotation workflows",
            "Model training support and RLHF concepts",
        ],
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
            "Multilingual Evaluation",
        ],
        color: "#00e5ff",
        icon: "brain",
    },
];
