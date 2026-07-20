/**
 * ProjectCard — Individual project card with category-colored gradient,
 * tech stack tags, GitHub link, and optional highlight badge.
 */

import { motion } from "framer-motion";
import type { Project } from "./ProjectData";

interface Props {
    project: Project;
    index: number;
}

export default function ProjectCard({ project: p, index }: Props) {
    const hasGithub = !!p.githubUrl;

    return (
        <motion.article
            layout
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            transition={{
                duration: 0.5,
                delay: index * 0.06,
                ease: [0.22, 1, 0.36, 1],
            }}
            className="group relative flex flex-col border border-[#1f1f1f] rounded-sm overflow-hidden bg-[#0d0d10] hover:border-[#333] transition-colors duration-500"
        >
            {/* ── Header / Image area ── */}
            <div
                className="relative aspect-[16/9] overflow-hidden"
                style={{
                    background: `linear-gradient(135deg, ${p.color}18 0%, ${p.color}08 40%, #0d0d1000 70%), linear-gradient(225deg, ${p.color}12 0%, transparent 50%)`,
                }}
            >
                {/* Category-colored decorative elements */}
                <div
                    className="absolute top-0 right-0 w-[60%] h-[60%] opacity-[0.06] blur-3xl pointer-events-none"
                    style={{ background: p.color }}
                />

                {/* Grid pattern overlay */}
                <div
                    className="absolute inset-0 opacity-[0.04] pointer-events-none"
                    style={{
                        backgroundImage: `
                            linear-gradient(to right, ${p.color} 1px, transparent 1px),
                            linear-gradient(to bottom, ${p.color} 1px, transparent 1px)
                        `,
                        backgroundSize: "30px 30px",
                    }}
                />

                {/* Center decorative text */}
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    <span
                        className="text-[80px] md:text-[100px] font-black uppercase opacity-[0.03] select-none leading-none text-center"
                        style={{ color: p.color }}
                    >
                        {p.category.split(" / ")[0]}
                    </span>
                </div>

                {/* Project image if available */}
                {p.image && (
                    <img
                        src={p.image}
                        alt={p.title.replace("\n", " ")}
                        loading="lazy"
                        className="absolute inset-0 w-full h-full object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-105"
                    />
                )}

                {/* Year badge */}
                <div
                    className="absolute top-4 right-4 font-mono text-[10px] tracking-[0.2em] px-3 py-1.5 rounded-sm border"
                    style={{
                        borderColor: `${p.color}40`,
                        color: p.color,
                        background: `${p.color}10`,
                        backdropFilter: "blur(8px)",
                    }}
                >
                    {p.year}
                </div>

                {/* Category badge */}
                <div
                    className="absolute top-4 left-4 font-mono text-[9px] tracking-[0.15em] uppercase px-2.5 py-1 rounded-sm"
                    style={{
                        color: `${p.color}cc`,
                        background: `${p.color}12`,
                        border: `1px solid ${p.color}25`,
                    }}
                >
                    {p.category}
                </div>

                {/* Highlight badge */}
                {p.highlight && (
                    <div className="absolute bottom-4 left-4 right-4">
                        <div
                            className="inline-flex items-center gap-2 font-mono text-[10px] tracking-[0.1em] px-3 py-1.5 rounded-sm"
                            style={{
                                background: `${p.color}18`,
                                border: `1px solid ${p.color}30`,
                                color: p.color,
                            }}
                        >
                            <span className="w-1.5 h-1.5 rounded-full" style={{ background: p.color }} />
                            {p.highlight}
                        </div>
                    </div>
                )}
            </div>

            {/* ── Content area ── */}
            <div className="flex flex-col flex-1 p-6 md:p-7">
                {/* Title */}
                <h3
                    className="text-display text-[#f0f0f0] whitespace-pre-line group-hover:text-white transition-colors"
                    style={{ fontSize: "clamp(22px, 2.5vw, 32px)", lineHeight: 1.1 }}
                >
                    {p.title}
                </h3>

                {/* Description */}
                <p className="mt-4 text-[13px] leading-relaxed text-[#8a8a8a] line-clamp-3">
                    {p.description}
                </p>

                {/* Tech stack tags */}
                <div className="mt-5 flex flex-wrap gap-2">
                    {p.techStack.map((t) => (
                        <span
                            key={t}
                            className="font-mono text-[10px] tracking-[0.05em] px-2.5 py-1 rounded-sm border border-[#1f1f1f] text-[#6b6b6b] hover:border-[#333] hover:text-[#999] transition-colors"
                        >
                            {t}
                        </span>
                    ))}
                </div>

                {/* Actions — pushed to bottom */}
                <div className="mt-auto pt-6 flex items-center gap-3">
                    {hasGithub && (
                        <a
                            href={p.githubUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="group/btn inline-flex items-center gap-2 px-4 py-2 border border-[#2a2a2a] rounded-sm font-mono text-[11px] tracking-[0.1em] text-[#999] hover:border-[#ff3d2e] hover:text-[#ff3d2e] transition-all duration-300"
                        >
                            <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
                            </svg>
                            Source Code
                        </a>
                    )}
                    {p.liveUrl && (
                        <a
                            href={p.liveUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 px-4 py-2 border border-[#2a2a2a] rounded-sm font-mono text-[11px] tracking-[0.1em] text-[#999] hover:border-[#ff3d2e] hover:text-[#ff3d2e] transition-all duration-300"
                        >
                            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                            </svg>
                            Live Demo
                        </a>
                    )}
                </div>
            </div>

            {/* Bottom accent line on hover */}
            <motion.div
                className="absolute bottom-0 left-0 right-0 h-[2px]"
                initial={{ scaleX: 0 }}
                whileHover={{ scaleX: 1 }}
                style={{
                    background: `linear-gradient(90deg, transparent, ${p.color}, transparent)`,
                    transformOrigin: "center",
                }}
            />
        </motion.article>
    );
}
