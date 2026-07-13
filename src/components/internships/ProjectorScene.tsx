/**
 * ProjectorScene — Cinematic projector built entirely with CSS/SVG.
 *
 * Visual stack (bottom to top):
 *   1. Perspective floor grid
 *   2. Projector device (CSS + SVG lens)
 *   3. Light cone (clip-path trapezoid)
 *   4. Dust particles floating through beam
 *   5. Wall / screen with dashed border
 *   6. Certificate image projected onto the wall
 *   7. Scanline sweep overlay
 */

import { motion, AnimatePresence } from "framer-motion";
import type { Internship } from "./InternshipData";

interface Props {
    active: Internship;
}

export default function ProjectorScene({ active }: Props) {
    const c = active.color;

    return (
        <div className="relative flex flex-col items-center justify-end w-full min-h-[520px] lg:min-h-[640px] select-none">
            {/* ── Perspective floor grid ── */}
            <div
                aria-hidden
                className="absolute bottom-0 left-0 right-0 h-[35%] pointer-events-none"
                style={{
                    perspective: "400px",
                    perspectiveOrigin: "50% 0%",
                }}
            >
                <div
                    className="w-full h-full origin-top"
                    style={{
                        transform: "rotateX(60deg)",
                        backgroundImage: `
                            linear-gradient(to right, ${c}15 1px, transparent 1px),
                            linear-gradient(to bottom, ${c}15 1px, transparent 1px)
                        `,
                        backgroundSize: "40px 40px",
                        maskImage: "linear-gradient(to bottom, transparent 0%, #000 30%, #000 70%, transparent 100%)",
                    }}
                />
            </div>

            {/* ── Floor glow beneath projector ── */}
            <motion.div
                aria-hidden
                className="absolute bottom-[10%] left-1/2 -translate-x-1/2 w-[50%] h-10 rounded-[50%] blur-2xl pointer-events-none"
                animate={{
                    background: `radial-gradient(ellipse, ${c}55 0%, transparent 70%)`,
                }}
                transition={{ duration: 0.6 }}
            />

            {/* ── WALL / SCREEN ── */}
            <div
                className="relative w-[82%] mx-auto"
                style={{
                    aspectRatio: "16 / 10",
                    marginBottom: "0",
                }}
            >
                {/* Screen border — dashed neon frame */}
                <motion.div
                    className="absolute inset-0 rounded-sm pointer-events-none"
                    animate={{
                        borderColor: `${c}60`,
                        boxShadow: `0 0 30px ${c}18, inset 0 0 40px ${c}08`,
                    }}
                    transition={{ duration: 0.6 }}
                    style={{
                        border: "1.5px dashed",
                    }}
                />

                {/* Dark screen interior */}
                <div
                    className="absolute inset-[2px] overflow-hidden"
                    style={{
                        background: "linear-gradient(180deg, #0a0b0f 0%, #0d0e13 100%)",
                    }}
                >
                    {/* Subtle corner markers */}
                    <div className="absolute top-2 left-2 w-3 h-3 border-t border-l" style={{ borderColor: `${c}40` }} />
                    <div className="absolute top-2 right-2 w-3 h-3 border-t border-r" style={{ borderColor: `${c}40` }} />
                    <div className="absolute bottom-2 left-2 w-3 h-3 border-b border-l" style={{ borderColor: `${c}40` }} />
                    <div className="absolute bottom-2 right-2 w-3 h-3 border-b border-r" style={{ borderColor: `${c}40` }} />

                    {/* Certificate image — actual projection */}
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={active.id}
                            initial={{ opacity: 0, scale: 1.03 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.97 }}
                            transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
                            className="absolute inset-0 flex items-center justify-center p-[6%]"
                        >
                            {active.certificateImage ? (
                                <img
                                    src={active.certificateImage}
                                    alt={`${active.company} certificate`}
                                    className="w-full h-full object-contain"
                                    style={{
                                        filter: `drop-shadow(0 0 20px ${c}44)`,
                                    }}
                                />
                            ) : (
                                /* Text-based fallback when no certificate image */
                                <div className="w-full h-full flex flex-col items-center justify-center gap-3 text-center">
                                    <span
                                        className="font-mono text-[10px] tracking-[0.3em] uppercase"
                                        style={{ color: `${c}88` }}
                                    >
                                        {active.company}
                                    </span>
                                    <h4
                                        className="text-display text-[#e8e8ea] uppercase"
                                        style={{
                                            fontSize: "clamp(14px, 2.2vw, 28px)",
                                            letterSpacing: "-0.01em",
                                        }}
                                    >
                                        {active.role}
                                    </h4>
                                    <div
                                        className="w-[60%] h-px mt-1 mb-1"
                                        style={{ background: `linear-gradient(90deg, transparent, ${c}66, transparent)` }}
                                    />
                                    <span className="font-mono text-[10px] text-[#6b6b6b]">
                                        {active.year} · {active.duration} · {active.mode}
                                    </span>
                                    <motion.span
                                        className="mt-2 font-mono text-[9px] tracking-[0.2em] uppercase px-3 py-1 rounded-sm border"
                                        style={{
                                            borderColor: `${c}55`,
                                            color: c,
                                            background: `${c}10`,
                                        }}
                                        animate={{ opacity: [0.5, 1, 0.5] }}
                                        transition={{ duration: 2.5, repeat: Infinity }}
                                    >
                                        [COMPLETED]
                                    </motion.span>
                                </div>
                            )}
                        </motion.div>
                    </AnimatePresence>

                    {/* Scanline sweep effect */}
                    <div
                        aria-hidden
                        className="absolute inset-0 pointer-events-none scanline-sweep"
                        style={{
                            background: `linear-gradient(180deg, transparent 0%, ${c}08 50%, transparent 100%)`,
                            backgroundSize: "100% 4px",
                        }}
                    />

                    {/* Horizontal scanlines texture */}
                    <div
                        aria-hidden
                        className="absolute inset-0 pointer-events-none opacity-[0.04]"
                        style={{
                            backgroundImage: "repeating-linear-gradient(0deg, transparent, transparent 2px, #fff 2px, #fff 3px)",
                        }}
                    />
                </div>

                {/* Bottom label bar */}
                <div
                    className="absolute -bottom-6 left-0 right-0 flex items-center justify-between font-mono text-[9px] tracking-[0.15em] uppercase px-1"
                    style={{ color: `${c}55` }}
                >
                    <span>◆ R·E·C LIVE AT° {active.company}</span>
                    <span>{active.credential}</span>
                </div>
            </div>

            {/* ── LIGHT CONE ── */}
            <div className="relative w-[82%] flex justify-center" style={{ height: "80px" }}>
                <motion.div
                    aria-hidden
                    className="absolute top-0 w-full h-full pointer-events-none"
                    animate={{
                        background: `linear-gradient(180deg, ${c}12 0%, ${c}04 60%, transparent 100%)`,
                    }}
                    transition={{ duration: 0.6 }}
                    style={{
                        clipPath: "polygon(30% 0%, 70% 0%, 55% 100%, 45% 100%)",
                    }}
                />
                {/* Center beam highlight */}
                <motion.div
                    aria-hidden
                    className="absolute top-0 left-1/2 -translate-x-1/2 w-[2px] h-full pointer-events-none"
                    animate={{ background: `linear-gradient(180deg, ${c}30, transparent)` }}
                    transition={{ duration: 0.6 }}
                />
            </div>

            {/* ── DUST PARTICLES in beam ── */}
            <div aria-hidden className="absolute bottom-[15%] left-1/2 -translate-x-1/2 w-[30%] h-[55%] pointer-events-none overflow-hidden">
                {[0, 1, 2, 3, 4, 5, 6].map((i) => (
                    <motion.span
                        key={i}
                        className="absolute rounded-full"
                        style={{
                            width: `${1.5 + (i % 3)}px`,
                            height: `${1.5 + (i % 3)}px`,
                            left: `${10 + i * 12}%`,
                            bottom: `${5 + (i * 7) % 30}%`,
                        }}
                        animate={{
                            y: [0, -(60 + i * 20), 0],
                            opacity: [0.1, 0.7, 0.1],
                            background: c,
                        }}
                        transition={{
                            duration: 3.5 + i * 0.5,
                            repeat: Infinity,
                            delay: i * 0.4,
                            ease: "easeInOut",
                        }}
                    />
                ))}
            </div>

            {/* ── PROJECTOR DEVICE ── */}
            <div className="relative z-10 flex flex-col items-center" style={{ marginTop: "-4px" }}>
                {/* Projector body */}
                <div
                    className="relative flex items-center justify-center"
                    style={{
                        width: "110px",
                        height: "44px",
                        background: "linear-gradient(180deg, #2a2a30 0%, #18181c 40%, #111114 100%)",
                        borderRadius: "6px 6px 4px 4px",
                        border: "1px solid #2f2f35",
                        boxShadow: `0 4px 20px #00000066, 0 0 15px ${c}15`,
                    }}
                >
                    {/* Vent lines on left */}
                    <div className="absolute left-2 top-1/2 -translate-y-1/2 flex flex-col gap-[2px]">
                        {[0, 1, 2, 3].map((i) => (
                            <div key={i} className="w-4 h-[1px] bg-[#3a3a40]" />
                        ))}
                    </div>

                    {/* Lens — centered */}
                    <motion.div
                        className="relative w-8 h-8 rounded-full flex items-center justify-center"
                        style={{
                            background: "radial-gradient(circle, #1a1a20 40%, #0f0f14 100%)",
                            border: "2px solid #3a3a42",
                        }}
                    >
                        {/* Lens inner glow */}
                        <motion.div
                            className="w-4 h-4 rounded-full"
                            animate={{
                                background: `radial-gradient(circle, ${c} 0%, ${c}44 50%, transparent 100%)`,
                                boxShadow: `0 0 12px ${c}88, 0 0 24px ${c}44`,
                            }}
                            transition={{ duration: 0.5 }}
                        />
                        {/* Lens ring reflection */}
                        <div
                            className="absolute inset-0 rounded-full"
                            style={{
                                background: "linear-gradient(135deg, #ffffff15 0%, transparent 50%)",
                            }}
                        />
                    </motion.div>

                    {/* Status LED — right side */}
                    <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-1.5">
                        <motion.div
                            className="w-[5px] h-[5px] rounded-full"
                            animate={{
                                background: c,
                                boxShadow: `0 0 6px ${c}`,
                            }}
                            transition={{ duration: 0.5 }}
                        />
                        <div className="w-[4px] h-[4px] rounded-full bg-[#ff3333]" style={{ boxShadow: "0 0 4px #ff3333" }} />
                    </div>

                    {/* Bottom edge detail */}
                    <div className="absolute bottom-0 inset-x-0 h-[2px] bg-[#0a0a0e] rounded-b" />
                </div>

                {/* Table / stand surface */}
                <div
                    className="w-[130px] h-[6px] rounded-b-md"
                    style={{
                        background: "linear-gradient(180deg, #1a1a1e 0%, #111114 100%)",
                        borderLeft: "1px solid #2a2a2e",
                        borderRight: "1px solid #2a2a2e",
                        borderBottom: "1px solid #2a2a2e",
                    }}
                />
            </div>

            {/* ── GLITCH FLASH overlay (on key change) ── */}
            <AnimatePresence>
                <motion.div
                    key={`glitch-${active.id}`}
                    className="absolute inset-0 pointer-events-none z-50"
                    initial={{ opacity: 0.6 }}
                    animate={{ opacity: 0 }}
                    transition={{ duration: 0.12 }}
                    style={{
                        background: `${c}08`,
                        mixBlendMode: "overlay",
                    }}
                />
            </AnimatePresence>
        </div>
    );
}
