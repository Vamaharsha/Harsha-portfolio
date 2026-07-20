/**
 * DockDetail — Expanded panel showing tool info, related projects, and experience.
 * Appears above the dock when a tool icon is clicked.
 */

import { motion } from "framer-motion";
import type { DockItem } from "./DockData";
import { PROJECTS } from "../projects/ProjectData";

interface Props {
    item: DockItem;
    onClose: () => void;
}

export default function DockDetail({ item, onClose }: Props) {
    const relatedProjects = PROJECTS.filter((p) =>
        item.projectIds.includes(p.id)
    );

    return (
        <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="relative w-full max-w-2xl mx-auto rounded-md border border-[#1f1f1f] overflow-hidden"
            style={{
                background: "linear-gradient(180deg, #12121600 0%, #121216 100%)",
                backdropFilter: "blur(20px)",
                WebkitBackdropFilter: "blur(20px)",
            }}
        >
            {/* Glass surface */}
            <div
                className="absolute inset-0 pointer-events-none"
                style={{
                    background: "linear-gradient(135deg, rgba(255,255,255,0.03) 0%, transparent 50%)",
                }}
            />

            <div className="relative p-6 md:p-8">
                {/* Header */}
                <div className="flex items-start justify-between mb-6">
                    <div className="flex items-center gap-4">
                        <div
                            className="w-14 h-14 rounded-lg relative overflow-hidden flex items-center justify-center border border-white/10"
                            style={{
                                background: "linear-gradient(145deg, #ffffff 0%, #f4f4f6 60%, #e2e2e8 100%)",
                                boxShadow: "0 2px 8px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.9)",
                            }}
                        >
                            <img
                                src={item.icon}
                                alt={item.name}
                                className="w-full h-full object-contain p-[20%] select-none pointer-events-none"
                            />
                        </div>
                        <div>
                            <h3 className="text-[20px] font-semibold text-[#f0f0f0]">
                                {item.name}
                            </h3>
                            <span className="font-mono text-[10px] tracking-[0.2em] uppercase text-[#ff3d2e]">
                                {item.category}
                            </span>
                        </div>
                    </div>

                    {/* Close button */}
                    <button
                        onClick={onClose}
                        className="w-8 h-8 rounded-full border border-[#2a2a2e] flex items-center justify-center text-[#6b6b6b] hover:text-[#ff3d2e] hover:border-[#ff3d2e] transition-colors"
                    >
                        ✕
                    </button>
                </div>

                {/* Experience description */}
                {item.experience && (
                    <p className="text-[13px] leading-relaxed text-[#8a8a8a] mb-6">
                        {item.experience}
                    </p>
                )}

                {/* Related Projects */}
                {relatedProjects.length > 0 && (
                    <div>
                        <div className="font-mono text-[9px] tracking-[0.25em] uppercase text-[#555] mb-3">
                            Used in {relatedProjects.length} project{relatedProjects.length > 1 ? "s" : ""}
                        </div>
                        <div className="space-y-2">
                            {relatedProjects.map((p) => (
                                <div
                                    key={p.id}
                                    className="flex items-center justify-between py-2.5 px-3 rounded-sm border border-[#1a1a1e] hover:border-[#2a2a2e] transition-colors"
                                >
                                    <div className="flex items-center gap-3">
                                        <div
                                            className="w-2 h-2 rounded-full shrink-0"
                                            style={{ background: p.color }}
                                        />
                                        <span className="text-[13px] text-[#c0c0c0]">
                                            {p.title.replace("\n", " ")}
                                        </span>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <span
                                            className="font-mono text-[9px] tracking-[0.1em] px-2 py-0.5 rounded-sm"
                                            style={{
                                                color: `${p.color}cc`,
                                                background: `${p.color}12`,
                                                border: `1px solid ${p.color}20`,
                                            }}
                                        >
                                            {p.category}
                                        </span>
                                        <span className="font-mono text-[10px] text-[#4a4a4a]">
                                            {p.year}
                                        </span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {relatedProjects.length === 0 && item.experience && (
                    <div className="py-3 px-4 rounded-sm border border-[#1a1a1e]">
                        <span className="font-mono text-[10px] text-[#4a4a4a]">
                            Professional skill — used across internships and freelance work
                        </span>
                    </div>
                )}
            </div>
        </motion.div>
    );
}
