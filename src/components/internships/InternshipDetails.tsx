/**
 * InternshipDetails — Right panel showing role, company, skills, credential.
 * Slides in with AnimatePresence when the active internship changes.
 * Clean skill list without percentages or ratings.
 */

import { motion, AnimatePresence } from "framer-motion";
import type { Internship } from "./InternshipData";

interface Props {
    active: Internship;
    onViewCertificate: () => void;
}

export default function InternshipDetails({ active, onViewCertificate }: Props) {
    const c = active.color;

    return (
        <div className="relative">
            <AnimatePresence mode="wait">
                <motion.div
                    key={active.id}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -12 }}
                    transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                    className="space-y-6"
                >
                    {/* Category badge */}
                    <motion.span
                        className="inline-block px-3 py-1.5 border font-mono text-[10px] tracking-[0.22em] uppercase rounded-sm"
                        style={{ borderColor: c, color: c }}
                    >
                        {active.category}
                    </motion.span>

                    {/* Role title */}
                    <h3
                        className="text-display text-[#f5f5f5]"
                        style={{
                            fontSize: "clamp(24px, 2.8vw, 40px)",
                            lineHeight: 1.05,
                            letterSpacing: "-0.02em",
                            textTransform: "uppercase",
                        }}
                    >
                        {active.role}
                    </h3>

                    {/* Company / Duration / Year / Mode grid */}
                    <div className="grid grid-cols-2 gap-x-6 gap-y-4 pt-1">
                        <div>
                            <div className="font-mono text-[9px] tracking-[0.22em] uppercase text-[#5a5a5a]">
                                Company
                            </div>
                            <div className="mt-1.5 text-[14px] font-medium" style={{ color: c }}>
                                {active.company}
                            </div>
                        </div>
                        <div>
                            <div className="font-mono text-[9px] tracking-[0.22em] uppercase text-[#5a5a5a]">
                                Duration
                            </div>
                            <div className="mt-1.5 text-[14px] font-medium text-[#e8e8ea]">
                                {active.duration}
                            </div>
                        </div>
                        <div>
                            <div className="font-mono text-[9px] tracking-[0.22em] uppercase text-[#5a5a5a]">
                                Year
                            </div>
                            <div className="mt-1.5 text-[14px] font-medium text-[#e8e8ea]">
                                {active.year}
                            </div>
                        </div>
                        <div>
                            <div className="font-mono text-[9px] tracking-[0.22em] uppercase text-[#5a5a5a]">
                                Mode
                            </div>
                            <div className="mt-1.5 text-[14px] font-medium text-[#e8e8ea]">
                                {active.mode}
                            </div>
                        </div>
                    </div>

                    {/* Description */}
                    <p
                        className="text-[13px] leading-relaxed text-[#8a8a8a] border-l pl-4"
                        style={{ borderColor: `${c}44` }}
                    >
                        {active.description}
                    </p>

                    {/* Featured Project details if they exist */}
                    {active.project && (
                        <div
                            className="rounded-sm border px-4 py-3 space-y-1.5 border-[#1f1f23]"
                            style={{
                                background: "rgba(13, 13, 16, 0.5)",
                                backdropFilter: "blur(8px)",
                                boxShadow: `inset 0 0 12px ${c}05`
                            }}
                        >
                            <div className="font-mono text-[9px] tracking-[0.22em] uppercase text-[#5a5a5a]">
                                Featured Project
                            </div>
                            <div className="text-[14px] font-bold text-[#f5f5f5] tracking-wide">
                                {active.project.name}
                            </div>
                            <div className="text-[12px] leading-relaxed text-[#8a8a8a]">
                                {active.project.description}
                            </div>
                        </div>
                    )}

                    {/* Skills - clean list of skill names only */}
                    <div className="space-y-3 pt-1">
                        <div className="font-mono text-[9px] tracking-[0.22em] uppercase text-[#5a5a5a]">
                            Skills Acquired
                        </div>
                        <div className="flex flex-wrap gap-2">
                            {active.skills.map((skill, i) => (
                                <motion.span
                                    key={skill}
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    transition={{
                                        duration: 0.3,
                                        delay: 0.05 * i,
                                        ease: "easeOut"
                                    }}
                                    className="font-mono text-[10.5px] px-2.5 py-1.5 border rounded-sm transition-all duration-300"
                                    style={{
                                        borderColor: `${c}22`,
                                        color: "#c0c0c5",
                                        background: "rgba(255, 255, 255, 0.02)",
                                    }}
                                    whileHover={{
                                        borderColor: c,
                                        color: c,
                                        background: `${c}10`,
                                        boxShadow: `0 0 8px ${c}22`
                                    }}
                                >
                                    {skill}
                                </motion.span>
                            ))}
                        </div>
                    </div>

                    {/* Credential */}
                    <div
                        className="rounded-sm border px-4 py-3"
                        style={{ borderColor: "#1f1f1f", background: "#0d0d0d" }}
                    >
                        <div className="font-mono text-[9px] tracking-[0.22em] uppercase text-[#5a5a5a]">
                            Credential
                        </div>
                        <div className="mt-1.5 font-mono text-[12px] truncate" style={{ color: c }}>
                            {active.credential}
                        </div>
                    </div>

                    {/* View Certificate button */}
                    <button
                        onClick={onViewCertificate}
                        className="group block w-full text-center border px-5 py-4 font-mono text-[10px] tracking-[0.28em] uppercase transition-all cursor-pointer"
                        style={{
                            borderColor: c,
                            color: c,
                            background: "transparent",
                        }}
                        onMouseEnter={(e) => {
                            (e.currentTarget as HTMLButtonElement).style.background = `${c}15`;
                            (e.currentTarget as HTMLButtonElement).style.boxShadow = `0 0 15px ${c}33`;
                        }}
                        onMouseLeave={(e) => {
                            (e.currentTarget as HTMLButtonElement).style.background = "transparent";
                            (e.currentTarget as HTMLButtonElement).style.boxShadow = "none";
                        }}
                    >
                        View Certificate ↗
                    </button>
                </motion.div>
            </AnimatePresence>
        </div>
    );
}
