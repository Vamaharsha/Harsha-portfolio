/**
 * ProjectorScene — Cinematic projector using real projector.png asset.
 *
 * Visual stack (bottom to top):
 *   1. Perspective floor grid
 *   2. Real projector image (back-view, transparent PNG)
 *   3. Light cone (clip-path trapezoid)
 *   4. Dust particles floating through beam
 *   5. Wall / screen with dashed border
 *   6. Certificate image projected onto the wall
 *   7. Scanline sweep overlay
 */

import { motion, AnimatePresence } from "framer-motion";
import type { Internship } from "./InternshipData";
import projectorImg from "@/assets/projector.png";

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
                className="absolute bottom-[6%] left-1/2 -translate-x-1/2 w-[55%] h-12 rounded-[50%] blur-2xl pointer-events-none"
                animate={{
                    background: `radial-gradient(ellipse, ${c}55 0%, transparent 70%)`,
                }}
                transition={{ duration: 0.6 }}
            />

            {/* ── REALISTIC PROJECTOR SCREEN ── */}
            <div
                className="relative w-[82%] mx-auto"
                style={{
                    aspectRatio: "16 / 10",
                    marginBottom: "0",
                }}
            >
                {/* Outer frame — dark beveled edge like a real screen housing */}
                <div
                    className="absolute inset-0 rounded-[3px] pointer-events-none"
                    style={{
                        background: "linear-gradient(180deg, #1a1a1e 0%, #111114 50%, #0a0a0d 100%)",
                        boxShadow: "0 2px 12px #00000066, inset 0 1px 0 #2a2a30",
                    }}
                />
                {/* Inner frame bevel */}
                <div
                    className="absolute inset-[3px] rounded-[2px] pointer-events-none"
                    style={{
                        boxShadow: "inset 0 1px 3px #00000088, inset 0 -1px 2px #ffffff08",
                    }}
                />

                {/* Screen surface — off-white matte like a real projection screen */}
                <div
                    className="absolute inset-[4px] overflow-hidden rounded-[1px]"
                    style={{
                        background: "linear-gradient(175deg, #e8e6e1 0%, #dfdcd6 35%, #d8d5cf 65%, #d0cdc7 100%)",
                    }}
                >
                    {/* Projector hotspot — brighter in center, dimmer at edges (realistic) */}
                    <div
                        aria-hidden
                        className="absolute inset-0 pointer-events-none"
                        style={{
                            background: "radial-gradient(ellipse 70% 65% at 50% 48%, rgba(255,255,255,0.25) 0%, rgba(255,255,255,0.08) 40%, transparent 75%)",
                        }}
                    />

                    {/* Edge vignette — projector light falls off at screen edges */}
                    <div
                        aria-hidden
                        className="absolute inset-0 pointer-events-none"
                        style={{
                            boxShadow: "inset 0 0 60px rgba(0,0,0,0.18), inset 0 0 120px rgba(0,0,0,0.08)",
                        }}
                    />

                    {/* Faint canvas/fabric texture — extremely subtle */}
                    <div
                        aria-hidden
                        className="absolute inset-0 pointer-events-none opacity-[0.03]"
                        style={{
                            backgroundImage: `
                                repeating-linear-gradient(0deg, transparent, transparent 1px, rgba(0,0,0,0.15) 1px, transparent 2px),
                                repeating-linear-gradient(90deg, transparent, transparent 1px, rgba(0,0,0,0.15) 1px, transparent 2px)
                            `,
                            backgroundSize: "3px 3px",
                        }}
                    />

                    {/* Certificate image — projected onto the screen */}
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={active.id}
                            initial={{ opacity: 0, scale: 1.02 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.98 }}
                            transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
                            className="absolute inset-0 flex items-center justify-center p-[5%]"
                        >
                            {active.certificateImage ? (
                                <img
                                    src={active.certificateImage}
                                    alt={`${active.company} certificate`}
                                    className="w-full h-full object-contain"
                                    style={{
                                        filter: "drop-shadow(0 2px 8px rgba(0,0,0,0.15))",
                                    }}
                                />
                            ) : (
                                /* Text-based fallback when no certificate image */
                                <div className="w-full h-full flex flex-col items-center justify-center gap-3 text-center">
                                    <span
                                        className="font-mono text-[10px] tracking-[0.3em] uppercase"
                                        style={{ color: "#555550" }}
                                    >
                                        {active.company}
                                    </span>
                                    <h4
                                        className="text-display text-[#2a2a28] uppercase"
                                        style={{
                                            fontSize: "clamp(14px, 2.2vw, 28px)",
                                            letterSpacing: "-0.01em",
                                        }}
                                    >
                                        {active.role}
                                    </h4>
                                    <div
                                        className="w-[60%] h-px mt-1 mb-1"
                                        style={{ background: "linear-gradient(90deg, transparent, #88888866, transparent)" }}
                                    />
                                    <span className="font-mono text-[10px] text-[#777774]">
                                        {active.year} · {active.duration} · {active.mode}
                                    </span>
                                </div>
                            )}
                        </motion.div>
                    </AnimatePresence>

                    {/* Subtle warm color wash from projector light — very faint */}
                    <motion.div
                        aria-hidden
                        className="absolute inset-0 pointer-events-none opacity-[0.04]"
                        animate={{
                            background: `radial-gradient(ellipse 80% 70% at 50% 55%, ${c} 0%, transparent 70%)`,
                        }}
                        transition={{ duration: 0.8 }}
                    />

                    {/* Scanline sweep effect — very subtle on light screen */}
                    <div
                        aria-hidden
                        className="absolute inset-0 pointer-events-none scanline-sweep opacity-[0.06]"
                        style={{
                            background: "linear-gradient(180deg, transparent 0%, rgba(0,0,0,0.08) 50%, transparent 100%)",
                        }}
                    />

                    {/* Horizontal scanlines — barely visible on light surface */}
                    <div
                        aria-hidden
                        className="absolute inset-0 pointer-events-none opacity-[0.02]"
                        style={{
                            backgroundImage: "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.2) 2px, rgba(0,0,0,0.2) 3px)",
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

            {/* ── LIGHT CONE — connects screen bottom to projector top ── */}
            <div className="relative w-[82%] flex justify-center" style={{ height: "90px" }}>
                {/* Main light cone */}
                <motion.div
                    aria-hidden
                    className="absolute top-0 w-full h-full pointer-events-none"
                    animate={{
                        background: `linear-gradient(180deg, ${c}10 0%, ${c}06 40%, ${c}03 70%, transparent 100%)`,
                    }}
                    transition={{ duration: 0.6 }}
                    style={{
                        clipPath: "polygon(25% 0%, 75% 0%, 56% 100%, 44% 100%)",
                    }}
                />
                {/* Center beam highlight */}
                <motion.div
                    aria-hidden
                    className="absolute top-0 left-1/2 -translate-x-1/2 w-[2px] h-full pointer-events-none"
                    animate={{ background: `linear-gradient(180deg, ${c}25, transparent)` }}
                    transition={{ duration: 0.6 }}
                />
                {/* Wider secondary glow */}
                <motion.div
                    aria-hidden
                    className="absolute top-0 left-1/2 -translate-x-1/2 w-[40%] h-full pointer-events-none opacity-40 blur-sm"
                    animate={{
                        background: `linear-gradient(180deg, ${c}15 0%, transparent 80%)`,
                    }}
                    transition={{ duration: 0.6 }}
                    style={{
                        clipPath: "polygon(20% 0%, 80% 0%, 60% 100%, 40% 100%)",
                    }}
                />
            </div>

            {/* ── DUST PARTICLES in beam ── */}
            <div aria-hidden className="absolute bottom-[18%] left-1/2 -translate-x-1/2 w-[30%] h-[50%] pointer-events-none overflow-hidden">
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

            {/* ── REAL PROJECTOR IMAGE ── */}
            <div className="relative z-10 flex flex-col items-center" style={{ marginTop: "-8px" }}>
                {/* Lens glow — positioned at top-center of the projector (where the lens faces up) */}
                <motion.div
                    aria-hidden
                    className="absolute -top-3 left-1/2 -translate-x-1/2 w-16 h-6 rounded-[50%] blur-lg pointer-events-none z-20"
                    animate={{
                        background: `radial-gradient(ellipse, ${c}88 0%, ${c}44 40%, transparent 80%)`,
                        boxShadow: `0 0 20px ${c}66`,
                    }}
                    transition={{ duration: 0.5 }}
                />

                {/* Projector PNG */}
                <motion.img
                    src={projectorImg}
                    alt="Projector"
                    className="w-[140px] md:w-[170px] lg:w-[190px] h-auto relative z-10 drop-shadow-2xl"
                    style={{
                        filter: `drop-shadow(0 6px 20px #00000088) drop-shadow(0 0 12px ${c}22)`,
                    }}
                    animate={{
                        filter: `drop-shadow(0 6px 20px #00000088) drop-shadow(0 0 12px ${c}33)`,
                    }}
                    transition={{ duration: 0.6 }}
                />

                {/* Status LED overlay on the projector body */}
                <motion.div
                    aria-hidden
                    className="absolute bottom-[38%] right-[18%] w-[5px] h-[5px] rounded-full z-20"
                    animate={{
                        background: c,
                        boxShadow: `0 0 6px ${c}, 0 0 12px ${c}66`,
                        opacity: [0.6, 1, 0.6],
                    }}
                    transition={{ duration: 2, repeat: Infinity }}
                />

                {/* Surface shadow beneath projector */}
                <div
                    className="w-[200px] md:w-[220px] h-[8px] rounded-[50%] blur-md -mt-1"
                    style={{
                        background: `radial-gradient(ellipse, ${c}30 0%, #00000044 40%, transparent 80%)`,
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
