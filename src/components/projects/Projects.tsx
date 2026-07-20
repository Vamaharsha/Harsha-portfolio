/**
 * Projects — Main section with category filter tabs and dynamic project grid.
 *
 * Uses AnimatePresence for smooth filtering transitions.
 */

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { PROJECTS, CATEGORIES, CATEGORY_COLORS } from "./ProjectData";
import type { ProjectCategory } from "./ProjectData";
import ProjectCard from "./ProjectCard";

export default function Projects() {
    const [active, setActive] = useState<ProjectCategory>("All");

    const filtered =
        active === "All"
            ? PROJECTS
            : PROJECTS.filter((p) => p.category === active);

    return (
        <section id="projects" className="bg-[#0a0a0a] text-[#f5f5f5] hairline-b-dark">
            {/* Section label bar */}
            <div className="mx-auto max-w-[1400px] px-8 py-6 hairline-b-dark">
                <div className="flex items-center justify-between">
                    <span className="text-[#ff3d2e] font-mono text-[11px] tracking-[0.15em] uppercase">
                        // Projects
                    </span>
                    <span className="font-mono text-[11px] text-[#4a4a4a]">
                        {filtered.length} project{filtered.length !== 1 ? "s" : ""}
                    </span>
                </div>
            </div>

            <div className="mx-auto max-w-[1400px] px-8 py-16 md:py-20">
                {/* ── Section header ── */}
                <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12">
                    <div>
                        <h2
                            className="text-display text-[#f5f5f5]"
                            style={{ fontSize: "clamp(36px, 5vw, 64px)", lineHeight: 1, letterSpacing: "-0.03em" }}
                        >
                            Selected <span className="text-[#ff3d2e]">Work</span>
                        </h2>
                        <p className="mt-3 text-[14px] text-[#6b6b6b] max-w-md">
                            A collection of projects spanning AI/ML, RF engineering, web development, and embedded systems.
                        </p>
                    </div>

                    {/* ── Category filter tabs ── */}
                    <div className="flex flex-wrap gap-2">
                        {CATEGORIES.map((cat) => {
                            const isActive = active === cat;
                            const color = CATEGORY_COLORS[cat];
                            const count =
                                cat === "All"
                                    ? PROJECTS.length
                                    : PROJECTS.filter((p) => p.category === cat).length;

                            return (
                                <button
                                    key={cat}
                                    onClick={() => setActive(cat)}
                                    className="relative font-mono text-[11px] tracking-[0.1em] px-4 py-2 rounded-sm border transition-all duration-300"
                                    style={{
                                        borderColor: isActive ? `${color}80` : "#1f1f1f",
                                        color: isActive ? color : "#6b6b6b",
                                        background: isActive ? `${color}10` : "transparent",
                                    }}
                                >
                                    {cat}
                                    <span
                                        className="ml-2 text-[9px] opacity-60"
                                        style={{ color: isActive ? color : "#4a4a4a" }}
                                    >
                                        {count}
                                    </span>

                                    {/* Active indicator dot */}
                                    {isActive && (
                                        <motion.div
                                            layoutId="project-tab-indicator"
                                            className="absolute -bottom-[5px] left-1/2 -translate-x-1/2 w-1 h-1 rounded-full"
                                            style={{ background: color }}
                                            transition={{ type: "spring", stiffness: 400, damping: 30 }}
                                        />
                                    )}
                                </button>
                            );
                        })}
                    </div>
                </div>

                {/* ── Projects grid ── */}
                <motion.div
                    layout
                    className="grid grid-cols-1 md:grid-cols-2 gap-6"
                >
                    <AnimatePresence mode="popLayout">
                        {filtered.map((p, i) => (
                            <ProjectCard key={p.id} project={p} index={i} />
                        ))}
                    </AnimatePresence>
                </motion.div>

                {/* ── Empty state ── */}
                {filtered.length === 0 && (
                    <div className="text-center py-20">
                        <span className="font-mono text-[12px] text-[#4a4a4a]">
                            No projects in this category yet.
                        </span>
                    </div>
                )}
            </div>
        </section>
    );
}
