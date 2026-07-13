/**
 * InternshipSelector — Left panel with clickable internship list.
 * Active item gets accent border, background glow, and highlighted text.
 */

import { motion } from "framer-motion";
import type { Internship } from "./InternshipData";

interface Props {
    internships: Internship[];
    activeIndex: number;
    onSelect: (index: number) => void;
}

export default function InternshipSelector({ internships, activeIndex, onSelect }: Props) {
    return (
        <div className="flex flex-col gap-3">
            {/* Section micro-title */}
            <div className="flex items-center gap-2 mb-2">
                <span className="section-label">// Experience</span>
            </div>
            <h2
                className="text-display text-[#f5f5f5] mb-6"
                style={{
                    fontSize: "clamp(32px, 4vw, 56px)",
                    lineHeight: 0.9,
                    letterSpacing: "-0.03em",
                }}
            >
                INTERN
                <span className="text-[#ff3d2e]">SHIPS</span>
            </h2>

            {/* Internship list */}
            <ul className="space-y-3">
                {internships.map((intern, i) => {
                    const isActive = i === activeIndex;
                    const c = intern.color;

                    return (
                        <li key={intern.id}>
                            <motion.button
                                onClick={() => onSelect(i)}
                                className="w-full text-left rounded-md border px-5 py-4 flex items-start gap-4 transition-all duration-300 cursor-pointer"
                                style={{
                                    borderColor: isActive ? c : "#1c1c1c",
                                    background: isActive
                                        ? `linear-gradient(135deg, ${c}12, ${c}05)`
                                        : "transparent",
                                    boxShadow: isActive
                                        ? `0 0 0 1px ${c}44, 0 6px 30px -8px ${c}33`
                                        : "none",
                                }}
                                whileHover={{
                                    borderColor: isActive ? c : `${c}44`,
                                    background: isActive
                                        ? `linear-gradient(135deg, ${c}12, ${c}05)`
                                        : `${c}06`,
                                }}
                            >
                                {/* Index number */}
                                <span
                                    className="font-mono text-[11px] tabular-nums pt-0.5 shrink-0 font-semibold"
                                    style={{ color: isActive ? c : "#4a4a4a" }}
                                >
                                    {intern.index}
                                </span>

                                {/* Info */}
                                <span className="min-w-0 flex-1">
                                    <span
                                        className="block text-[15px] font-semibold leading-tight transition-colors duration-300"
                                        style={{ color: isActive ? "#fff" : "#6a6a6a" }}
                                    >
                                        {intern.company}
                                    </span>
                                    <span
                                        className="block mt-1.5 font-mono text-[9px] tracking-[0.2em] uppercase transition-colors duration-300"
                                        style={{ color: isActive ? c : "#3a3a3a" }}
                                    >
                                        {intern.category}
                                    </span>
                                </span>

                                {/* Active indicator dot */}
                                {isActive && (
                                    <motion.div
                                        layoutId="active-dot"
                                        className="w-2 h-2 rounded-full mt-1.5 shrink-0"
                                        style={{
                                            background: c,
                                            boxShadow: `0 0 8px ${c}`,
                                        }}
                                    />
                                )}
                            </motion.button>
                        </li>
                    );
                })}
            </ul>
        </div>
    );
}
