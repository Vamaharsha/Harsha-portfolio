/**
 * Experience — Vertical timeline section showcasing professional experience.
 * Matches the portfolio's dark theme with accent colors, grid backgrounds,
 * and Framer Motion animations.
 */

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { EXPERIENCES, type Experience as ExperienceType } from "./ExperienceData";

/* ── Timeline Card ── */
function ExperienceCard({
    exp,
    index,
    isLast,
}: {
    exp: ExperienceType;
    index: number;
    isLast: boolean;
}) {
    const cardRef = useRef<HTMLDivElement>(null);
    const inView = useInView(cardRef, { once: true, margin: "-60px" });
    const c = exp.color;

    return (
        <div ref={cardRef} className="relative flex gap-6 md:gap-10">
            {/* ── Timeline spine ── */}
            <div className="relative flex flex-col items-center shrink-0">
                {/* Connector line (top) — hidden for first item */}
                {index > 0 && (
                    <div className="w-px flex-1 bg-gradient-to-b from-[#1f1f1f] to-[#2f2f35]" />
                )}

                {/* Node dot */}
                <motion.div
                    className="relative z-10 flex items-center justify-center"
                    initial={{ scale: 0, opacity: 0 }}
                    animate={inView ? { scale: 1, opacity: 1 } : {}}
                    transition={{
                        delay: index * 0.15,
                        type: "spring",
                        stiffness: 200,
                        damping: 15,
                    }}
                >
                    {/* Outer glow ring */}
                    <div
                        className="absolute w-12 h-12 rounded-full opacity-20 blur-md"
                        style={{ background: c }}
                    />
                    {/* Pulsing ring for current role */}
                    {exp.status === "current" && (
                        <motion.div
                            className="absolute w-10 h-10 rounded-full border"
                            style={{ borderColor: c }}
                            animate={{ scale: [1, 1.5, 1], opacity: [0.5, 0, 0.5] }}
                            transition={{ duration: 2.5, repeat: Infinity }}
                        />
                    )}
                    {/* Icon circle */}
                    <div
                        className="w-10 h-10 rounded-full border flex items-center justify-center bg-[#0a0a0a]"
                        style={{ borderColor: `${c}66` }}
                    >
                        {exp.icon === "sparkles" ? (
                            <svg
                                className="w-4 h-4"
                                fill="none"
                                stroke={c}
                                viewBox="0 0 24 24"
                                strokeWidth="1.5"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.455 2.456L21.75 6l-1.036.259a3.375 3.375 0 00-2.455 2.456z"
                                />
                            </svg>
                        ) : (
                            <svg
                                className="w-4 h-4"
                                fill="none"
                                stroke={c}
                                viewBox="0 0 24 24"
                                strokeWidth="1.5"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z"
                                />
                            </svg>
                        )}
                    </div>
                </motion.div>

                {/* Connector line (bottom) — hidden for last item */}
                {!isLast && (
                    <div className="w-px flex-1 bg-gradient-to-b from-[#2f2f35] to-[#1f1f1f]" />
                )}
            </div>

            {/* ── Content card ── */}
            <motion.div
                className="flex-1 pb-14"
                initial={{ opacity: 0, x: 30 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{
                    delay: index * 0.15 + 0.1,
                    duration: 0.7,
                    ease: [0.22, 1, 0.36, 1],
                }}
            >
                <div
                    className="relative group rounded-lg border bg-[#0c0d10]/80 backdrop-blur-sm overflow-hidden transition-all duration-500 hover:border-opacity-60"
                    style={{
                        borderColor: `${c}22`,
                        boxShadow: `0 0 0 0 ${c}00`,
                    }}
                    onMouseEnter={(e) => {
                        (e.currentTarget as HTMLDivElement).style.boxShadow = `0 0 30px ${c}12, inset 0 0 20px ${c}05`;
                        (e.currentTarget as HTMLDivElement).style.borderColor = `${c}44`;
                    }}
                    onMouseLeave={(e) => {
                        (e.currentTarget as HTMLDivElement).style.boxShadow = `0 0 0 0 ${c}00`;
                        (e.currentTarget as HTMLDivElement).style.borderColor = `${c}22`;
                    }}
                >
                    {/* Top-left corner accent */}
                    <div
                        className="absolute top-0 left-0 w-12 h-12 opacity-30"
                        style={{
                            background: `linear-gradient(135deg, ${c}25 0%, transparent 60%)`,
                        }}
                    />

                    <div className="p-6 md:p-8">
                        {/* Header row */}
                        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 mb-5">
                            <div>
                                {/* Type badge + Status */}
                                <div className="flex items-center gap-3 mb-2">
                                    <span
                                        className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[9px] font-mono tracking-[0.15em] uppercase border"
                                        style={{
                                            color: c,
                                            borderColor: `${c}33`,
                                            background: `${c}0a`,
                                        }}
                                    >
                                        {exp.type === "freelance" ? "◈ Freelance" : "◉ Internship"}
                                    </span>
                                    {exp.status === "current" && (
                                        <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full text-[9px] font-mono tracking-wider uppercase text-green-400 border border-green-400/20 bg-green-400/5">
                                            <span className="relative flex h-1.5 w-1.5">
                                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
                                                <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-green-400" />
                                            </span>
                                            Active
                                        </span>
                                    )}
                                </div>

                                {/* Company name */}
                                <h3
                                    className="text-display text-[22px] md:text-[28px] text-white tracking-wide"
                                    style={{
                                        lineHeight: 1.1,
                                    }}
                                >
                                    {exp.company}
                                </h3>

                                {/* Role */}
                                <p className="mt-1.5 text-[14px] text-[#b0b0b5] font-medium">
                                    {exp.role}
                                </p>
                            </div>

                            {/* Duration pill */}
                            <div className="shrink-0">
                                <span className="inline-block px-3 py-1.5 rounded border border-[#2f2f35] bg-[#0a0a0a] text-[10px] font-mono text-[#8a8a8f] tracking-wide">
                                    {exp.duration}
                                </span>
                            </div>
                        </div>

                        {/* Domain tag */}
                        <div className="mb-5">
                            <span
                                className="font-mono text-[10px] tracking-[0.15em] uppercase"
                                style={{ color: `${c}bb` }}
                            >
                                ⌁ {exp.domain}
                            </span>
                        </div>

                        {/* Description */}
                        <p className="text-[14px] leading-relaxed text-[#8a8a8f] mb-6">
                            {exp.description}
                        </p>

                        {/* Highlights */}
                        <div className="mb-6">
                            <div className="font-mono text-[9px] tracking-[0.2em] uppercase text-[#5a5a5f] mb-3">
                                Key Contributions
                            </div>
                            <ul className="space-y-2">
                                {exp.highlights.map((h, i) => (
                                    <motion.li
                                        key={i}
                                        className="flex items-start gap-2.5 text-[13px] text-[#9a9a9f]"
                                        initial={{ opacity: 0, x: 10 }}
                                        animate={inView ? { opacity: 1, x: 0 } : {}}
                                        transition={{
                                            delay: index * 0.15 + 0.2 + i * 0.06,
                                            duration: 0.5,
                                        }}
                                    >
                                        <span
                                            className="mt-1.5 w-1.5 h-1.5 rounded-full shrink-0"
                                            style={{ background: c }}
                                        />
                                        {h}
                                    </motion.li>
                                ))}
                            </ul>
                        </div>

                        {/* Skills */}
                        <div className="flex flex-wrap gap-2">
                            {exp.skills.map((skill) => (
                                <span
                                    key={skill}
                                    className="px-2.5 py-1 rounded text-[10px] font-mono border transition-all duration-300"
                                    style={{
                                        color: `${c}cc`,
                                        borderColor: `${c}18`,
                                        background: `${c}08`,
                                    }}
                                >
                                    {skill}
                                </span>
                            ))}
                        </div>
                    </div>
                </div>
            </motion.div>
        </div>
    );
}

/* ── Main Experience Section ── */
export default function Experience() {
    const sectionRef = useRef<HTMLDivElement>(null);
    const inView = useInView(sectionRef, { once: true, margin: "-80px" });

    return (
        <section
            id="experience"
            ref={sectionRef}
            className="relative bg-[#070707] text-[#f5f5f5] hairline-b-dark overflow-hidden"
        >
            {/* ── Background grid pattern ── */}
            <div
                aria-hidden
                className="absolute inset-0 opacity-[0.08] pointer-events-none"
                style={{
                    backgroundImage:
                        "linear-gradient(to right, #ffffff08 1px, transparent 1px), linear-gradient(to bottom, #ffffff08 1px, transparent 1px)",
                    backgroundSize: "72px 72px",
                    maskImage:
                        "radial-gradient(ellipse at 30% 50%, #000 30%, transparent 75%)",
                }}
            />

            {/* ── Ambient gradient ── */}
            <div
                aria-hidden
                className="absolute inset-0 pointer-events-none"
                style={{
                    background:
                        "radial-gradient(55% 50% at 35% 55%, rgba(168, 85, 247, 0.06) 0%, transparent 70%), radial-gradient(40% 35% at 65% 40%, rgba(0, 229, 255, 0.04) 0%, transparent 60%)",
                }}
            />

            {/* ── Section header ── */}
            <div className="relative mx-auto max-w-[1400px] px-4 sm:px-8 py-6 hairline-b-dark">
                <span className="section-label">// Experience</span>
            </div>

            {/* ── Main content ── */}
            <div className="relative mx-auto max-w-[1400px] px-4 sm:px-8 pt-8 md:pt-10 pb-16 md:pb-24">
                <motion.div
                    className="grid md:grid-cols-[1fr_1.8fr] gap-10 lg:gap-20 items-start"
                    initial={{ opacity: 0, y: 30 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                >
                    {/* LEFT — Section title */}
                    <div className="md:sticky md:top-32 self-start">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={inView ? { opacity: 1, y: 0 } : {}}
                            transition={{ delay: 0.1, duration: 0.7 }}
                        >
                            <div
                                className="text-display text-transparent"
                                style={{
                                    fontSize: "clamp(100px, 14vw, 180px)",
                                    WebkitTextStroke: "1.5px #f5f5f5",
                                }}
                            >
                                XP
                            </div>
                            <h2
                                className="text-display text-[#f5f5f5] mt-4"
                                style={{ fontSize: "clamp(28px, 3.5vw, 44px)" }}
                            >
                                Professional
                                <br />
                                <span className="text-[#ff3d2e]">Experience</span>
                            </h2>
                            <p className="mt-5 text-[14px] leading-relaxed text-[#6b6b6b] max-w-sm">
                                From interning at Ethara AI on LLM post-training
                                pipelines to freelancing at Outlier on the same domain
                                — prompt engineering, model evaluation, and AI quality
                                assurance.
                            </p>

                            {/* Stats mini-block */}
                            <div className="mt-8 flex gap-8">
                                <div className="border-l border-[#1f1f1f] pl-4">
                                    <div className="text-display text-[32px] text-[#f5f5f5]">
                                        02
                                    </div>
                                    <div className="mt-1 font-mono text-[9px] tracking-[0.15em] uppercase text-[#5a5a5f]">
                                        Roles
                                    </div>
                                </div>
                                <div className="border-l border-[#1f1f1f] pl-4">
                                    <div className="text-display text-[32px] text-[#a855f7]">
                                        AI
                                    </div>
                                    <div className="mt-1 font-mono text-[9px] tracking-[0.15em] uppercase text-[#5a5a5f]">
                                        Domain
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </div>

                    {/* RIGHT — Timeline */}
                    <div className="relative">
                        {EXPERIENCES.map((exp, i) => (
                            <ExperienceCard
                                key={exp.id}
                                exp={exp}
                                index={i}
                                isLast={i === EXPERIENCES.length - 1}
                            />
                        ))}
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
