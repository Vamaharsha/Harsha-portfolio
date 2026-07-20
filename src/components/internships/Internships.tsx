/**
 * Internships — Main section wrapper.
 * Desktop (lg+): 3-column layout — Selector | Projector Scene | Details
 * Mobile: Horizontal pill tabs + stacked details (projector scene hidden)
 */

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { INTERNSHIPS } from "./InternshipData";
import ProjectorScene from "./ProjectorScene";
import InternshipSelector from "./InternshipSelector";
import InternshipDetails from "./InternshipDetails";

export default function Internships() {
    const [activeIndex, setActiveIndex] = useState(0);
    const [isModalOpen, setIsModalOpen] = useState(false);
    
    const active = INTERNSHIPS[activeIndex];
    const c = active.color;

    const sectionRef = useRef<HTMLDivElement>(null);
    const inView = useInView(sectionRef, { once: true, margin: "-100px" });

    // Escape key press to close modal
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === "Escape") {
                setIsModalOpen(false);
            }
        };
        if (isModalOpen) {
            window.addEventListener("keydown", handleKeyDown);
        }
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, [isModalOpen]);

    return (
        <section
            id="internships"
            ref={sectionRef}
            className="relative bg-[#070707] text-[#f5f5f5] hairline-b-dark overflow-hidden"
        >
            {/* ── Background grid pattern ── */}
            <div
                aria-hidden
                className="absolute inset-0 opacity-[0.12] pointer-events-none"
                style={{
                    backgroundImage:
                        "linear-gradient(to right, #ffffff08 1px, transparent 1px), linear-gradient(to bottom, #ffffff08 1px, transparent 1px)",
                    backgroundSize: "72px 72px",
                    maskImage:
                        "radial-gradient(ellipse at 50% 55%, #000 40%, transparent 85%)",
                }}
            />

            {/* ── Ambient color glow ── */}
            <motion.div
                aria-hidden
                className="absolute inset-0 pointer-events-none"
                animate={{
                    background: `radial-gradient(60% 55% at 50% 60%, ${c}18 0%, transparent 70%)`,
                }}
                transition={{ duration: 0.8 }}
            />

            {/* ── Corner fairy lights ── */}
            {[
                { top: "8%", left: "5%" },
                { top: "12%", right: "8%" },
                { top: "25%", left: "3%" },
                { bottom: "15%", right: "4%" },
                { bottom: "20%", left: "7%" },
            ].map((pos, i) => (
                <motion.div
                    key={i}
                    aria-hidden
                    className="absolute w-[3px] h-[3px] rounded-full pointer-events-none"
                    style={{ ...pos, background: "#ffffff" }}
                    animate={{ opacity: [0.1, 0.5, 0.1] }}
                    transition={{ duration: 2 + i * 0.7, repeat: Infinity, delay: i * 0.5 }}
                />
            ))}

            {/* ── Section header ── */}
            <div className="relative mx-auto max-w-[1400px] px-4 sm:px-8 py-6 hairline-b-dark">
                <span className="section-label">// Internships</span>
            </div>

            {/* ══════════════════════════════════════════════════
                MOBILE LAYOUT (< lg): pill tabs + stacked details
                ══════════════════════════════════════════════════ */}
            <div className="lg:hidden relative mx-auto max-w-[1400px] px-4 sm:px-6 pt-8 pb-16">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                >
                    {/* Title */}
                    <h2
                        className="text-display text-[#f5f5f5] mb-6"
                        style={{ fontSize: "clamp(36px, 10vw, 56px)", lineHeight: 0.9, letterSpacing: "-0.03em" }}
                    >
                        INTERN<span className="text-[#ff3d2e]">SHIPS</span>
                    </h2>

                    {/* Horizontal scrollable pill tabs */}
                    <div className="flex gap-2 overflow-x-auto scrollbar-none pb-2 mb-8 -mx-1 px-1">
                        {INTERNSHIPS.map((intern, i) => {
                            const isActive = i === activeIndex;
                            return (
                                <button
                                    key={intern.id}
                                    onClick={() => setActiveIndex(i)}
                                    className="shrink-0 flex items-center gap-2 px-4 py-2.5 rounded-full border font-mono text-[11px] tracking-wide transition-all duration-300 cursor-pointer"
                                    style={{
                                        borderColor: isActive ? intern.color : "#2a2a2a",
                                        color: isActive ? intern.color : "#6b6b6b",
                                        background: isActive ? `${intern.color}12` : "transparent",
                                        boxShadow: isActive ? `0 0 12px ${intern.color}22` : "none",
                                    }}
                                >
                                    <span
                                        className="w-1.5 h-1.5 rounded-full shrink-0"
                                        style={{ background: isActive ? intern.color : "#4a4a4a" }}
                                    />
                                    {intern.company}
                                </button>
                            );
                        })}
                    </div>

                    {/* Details card */}
                    <InternshipDetails
                        active={active}
                        onViewCertificate={() => setIsModalOpen(true)}
                    />
                </motion.div>
            </div>

            {/* ══════════════════════════════════════════════════
                DESKTOP LAYOUT (lg+): 3-column grid
                ══════════════════════════════════════════════════ */}
            <div className="hidden lg:block relative mx-auto max-w-[1400px] px-8 pt-10 pb-24">
                <motion.div
                    className="grid grid-cols-1 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.4fr)_minmax(0,1fr)] gap-8 lg:gap-10 items-start"
                    initial={{ opacity: 0, y: 30 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                >
                    {/* LEFT — Selector */}
                    <InternshipSelector
                        internships={INTERNSHIPS}
                        activeIndex={activeIndex}
                        onSelect={setActiveIndex}
                    />

                    {/* CENTER — Projector Scene */}
                    <ProjectorScene active={active} />

                    {/* RIGHT — Details */}
                    <InternshipDetails 
                        active={active} 
                        onViewCertificate={() => setIsModalOpen(true)}
                    />
                </motion.div>
            </div>

            {/* ── Certificate Modal ── */}
            <AnimatePresence>
                {isModalOpen && (
                    <motion.div
                        className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-6"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3 }}
                    >
                        {/* Backdrop */}
                        <div
                            className="absolute inset-0 bg-black/80 backdrop-blur-md cursor-pointer"
                            onClick={() => setIsModalOpen(false)}
                        />

                        {/* Modal */}
                        <motion.div
                            className="relative w-full max-w-[900px] rounded-lg overflow-hidden border border-[#2f2f35] bg-[#0c0d10b0] backdrop-blur-lg flex flex-col p-4 md:p-6"
                            style={{ boxShadow: `0 0 40px ${c}25, inset 0 0 30px rgba(255, 255, 255, 0.02)` }}
                            initial={{ scale: 0.9, y: 20 }}
                            animate={{ scale: 1, y: 0 }}
                            exit={{ scale: 0.9, y: 20 }}
                            transition={{ type: "spring", damping: 25, stiffness: 200 }}
                        >
                            {/* Glowing corner borders */}
                            <div className="absolute top-2 left-2 w-4 h-4 border-t border-l" style={{ borderColor: c }} />
                            <div className="absolute top-2 right-2 w-4 h-4 border-t border-r" style={{ borderColor: c }} />
                            <div className="absolute bottom-2 left-2 w-4 h-4 border-b border-l" style={{ borderColor: c }} />
                            <div className="absolute bottom-2 right-2 w-4 h-4 border-b border-r" style={{ borderColor: c }} />

                            {/* Header */}
                            <div className="w-full flex items-center justify-between mb-4 border-b border-white/5 pb-3">
                                <div>
                                    <span className="font-mono text-[9px] tracking-[0.2em] uppercase" style={{ color: c }}>
                                        {active.category}
                                    </span>
                                    <h4 className="text-display text-[14px] md:text-[20px] text-white tracking-wide uppercase mt-1">
                                        {active.company} — Certificate
                                    </h4>
                                </div>
                                <button
                                    onClick={() => setIsModalOpen(false)}
                                    className="p-2 border rounded-full transition-all duration-300 hover:scale-110 cursor-pointer shrink-0"
                                    style={{ borderColor: `${c}33`, color: c, background: "rgba(255, 255, 255, 0.02)" }}
                                >
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                </button>
                            </div>

                            {/* Certificate Image */}
                            <div className="relative flex-1 w-full overflow-hidden rounded-md border border-[#1f1f23] bg-[#050507] flex items-center justify-center p-2 min-h-[220px] md:min-h-[450px]">
                                <motion.img
                                    src={active.certificateImage}
                                    alt={`${active.company} Certificate`}
                                    className="max-w-full max-h-[65vh] object-contain"
                                    style={{ filter: `drop-shadow(0 0 15px ${c}22)` }}
                                />
                            </div>

                            {/* Footer */}
                            <div className="w-full flex justify-between items-center mt-3 font-mono text-[9px] text-[#5a5a5f]">
                                <span className="truncate">Credential: {active.credential}</span>
                                <span className="hidden sm:block ml-4 shrink-0">Press ESC to close</span>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </section>
    );
}
