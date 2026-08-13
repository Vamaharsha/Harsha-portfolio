import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState, memo, useCallback } from "react";
import { createPortal } from "react-dom";
import { motion, useInView, AnimatePresence, useScroll, useTransform } from "framer-motion";
import Internships from "@/components/internships/Internships";
import Experience from "@/components/experience/Experience";
import Projects from "@/components/projects/Projects";
import SkillsDock from "@/components/dock/SkillsDock";
import portrait from "@/assets/portrait.png";
import { MeshGradientSVG } from "@/components/ui/shader-svg";
import certCharacter from "@/assets/cert-character.png";
import cert_cs50 from "@/assets/CS50.png";
import cert_nptel from "@/assets/nptel.png";
import cert_infosys from "@/assets/infosys.png";
import cert_nvidia from "@/assets/nvidia.png";
import cert_data from "@/assets/tata.png";
import cert_aws from "@/assets/aws.png";
import cert_oracle from "@/assets/oracle.png";
import cert_gets from "@/assets/gets.png";
import cert_skill from "@/assets/skill.png";
export const Route = createFileRoute("/")({
    component: Home,
});

/* ---------- shared ---------- */

function Reveal({ children, className = "", delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
    const ref = useRef<HTMLDivElement>(null);
    const inView = useInView(ref, { once: true, margin: "-80px" });
    return (
        <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 24 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
            className={className}
        >
            {children}
        </motion.div>
    );
}

function SectionLabel({ children }: { children: React.ReactNode }) {
    return <span className="section-label">// {children}</span>;
}

/* ---------- NAV ---------- */

const NAV_LINKS = [
    ["About", "#about"],
    ["Projects", "#projects"],
    ["Credentials", "#certificates"],
    ["Internships", "#internships"],
    ["Experience", "#experience"],
    ["Tools", "#skills-dock"],
    ["Contact", "#contact"],
];

function Nav({ theme }: { theme: "light" | "dark" }) {
    const isLight = theme === "light";
    const [mobileOpen, setMobileOpen] = useState(false);

    // Lock body scroll when mobile nav is open
    useEffect(() => {
        if (mobileOpen) {
            document.body.classList.add("nav-open");
        } else {
            document.body.classList.remove("nav-open");
        }
        return () => document.body.classList.remove("nav-open");
    }, [mobileOpen]);

    const closeAndScroll = useCallback(() => {
        setMobileOpen(false);
    }, []);

    return (
        <>
            <header className={`fixed top-0 inset-x-0 z-50 transition-colors duration-500 ${isLight ? "text-[#0a0a0a]" : "text-[#f5f5f5]"}`}>
                <nav className="mx-auto max-w-[1400px] px-5 sm:px-8 py-5 md:py-6 flex items-center justify-between text-[13px]">
                    <a href="#top" className="font-mono opacity-80 text-[12px] sm:text-[13px]">© Harsha Mahadeva</a>

                    {/* Desktop nav links */}
                    <ul className="hidden md:flex items-center gap-10 lg:gap-12">
                        {NAV_LINKS.map(([l, h]) => (
                            <li key={h}>
                                <a href={h} className="hover:text-[#ff3d2e] transition-colors">{l}</a>
                            </li>
                        ))}
                    </ul>
                    <a href="#contact" className="hidden md:block hover:text-[#ff3d2e] transition-colors">Let's talk →</a>

                    {/* Mobile hamburger */}
                    <button
                        onClick={() => setMobileOpen((o) => !o)}
                        className="md:hidden flex flex-col justify-center items-center w-10 h-10 gap-[5px] z-[51] relative"
                        aria-label={mobileOpen ? "Close menu" : "Open menu"}
                        aria-expanded={mobileOpen}
                    >
                        <motion.span
                            className="block w-6 h-[1.5px] origin-center"
                            style={{ background: isLight && !mobileOpen ? "#0a0a0a" : "#f5f5f5" }}
                            animate={mobileOpen ? { rotate: 45, y: 6.5 } : { rotate: 0, y: 0 }}
                            transition={{ duration: 0.25 }}
                        />
                        <motion.span
                            className="block w-6 h-[1.5px]"
                            style={{ background: isLight && !mobileOpen ? "#0a0a0a" : "#f5f5f5" }}
                            animate={mobileOpen ? { opacity: 0, scaleX: 0 } : { opacity: 1, scaleX: 1 }}
                            transition={{ duration: 0.2 }}
                        />
                        <motion.span
                            className="block w-6 h-[1.5px] origin-center"
                            style={{ background: isLight && !mobileOpen ? "#0a0a0a" : "#f5f5f5" }}
                            animate={mobileOpen ? { rotate: -45, y: -6.5 } : { rotate: 0, y: 0 }}
                            transition={{ duration: 0.25 }}
                        />
                    </button>
                </nav>
            </header>

            {/* Mobile nav overlay */}
            <AnimatePresence>
                {mobileOpen && (
                    <motion.div
                        className="mobile-nav-overlay md:hidden"
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                    >
                        {/* Close tap area */}
                        <div className="absolute inset-0" onClick={closeAndScroll} />

                        {/* Links */}
                        <nav className="relative z-10 flex flex-col items-center gap-8">
                            {NAV_LINKS.map(([l, h], i) => (
                                <motion.a
                                    key={h}
                                    href={h}
                                    onClick={closeAndScroll}
                                    className="text-[#f5f5f5] font-mono text-[13px] tracking-[0.2em] uppercase hover:text-[#ff3d2e] transition-colors"
                                    initial={{ opacity: 0, y: 12 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: i * 0.05 + 0.1 }}
                                >
                                    {l}
                                </motion.a>
                            ))}
                            <motion.a
                                href="#contact"
                                onClick={closeAndScroll}
                                className="mt-4 px-8 py-3 border border-[#ff3d2e] text-[#ff3d2e] font-mono text-[11px] tracking-[0.25em] uppercase hover:bg-[#ff3d2e] hover:text-white transition-all duration-300"
                                initial={{ opacity: 0, y: 12 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.45 }}
                            >
                                Let's talk →
                            </motion.a>
                        </nav>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}

/* ---------- HERO ---------- */

const Hero = memo(function Hero() {
    const sectionRef = useRef<HTMLDivElement>(null);

    // Scroll-driven photo zoom + fade
    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: ["start start", "end start"],
    });
    const photoScale = useTransform(scrollYProgress, [0, 1], [1, 1.3]);
    const photoOpacity = useTransform(scrollYProgress, [0, 1], [1, 0.4]);

    return (
        <section
            ref={sectionRef}
            id="top"
            className="relative h-screen bg-[#e8e6e1] text-[#0a0a0a] overflow-hidden"
        >
            {/* Portrait — zooms in + fades on scroll */}
            <motion.div
                className="absolute inset-0 flex items-end justify-center pointer-events-none z-10"
                style={{ scale: photoScale, opacity: photoOpacity }}
            >
                <img
                    src={portrait}
                    alt="Vamaharsha Mahadeva"
                    width={800}
                    height={1200}
                    fetchPriority="high"
                    decoding="async"
                    className="h-[92vh] w-auto object-contain object-bottom select-none"
                    style={{ filter: "grayscale(100%) contrast(1.05)" }}
                />
            </motion.div>

            {/* Name — scale-in on load, then infinite marquee */}
            <div
                className="absolute inset-0 flex items-center pointer-events-none overflow-hidden z-20"
                style={{ mixBlendMode: "difference" }}
            >
                {/* Outer: handles scale-in animation */}
                <motion.div
                    initial={{ scale: 0.1, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
                    className="w-full"
                >
                    {/* Inner: handles infinite horizontal scroll using pure CSS animation */}
                    <div className="hero-marquee">
                        {[0, 1].map((i) => (
                            <span
                                key={i}
                                className="text-display font-black select-none shrink-0"
                                aria-hidden={i > 0 || undefined}
                                role={i === 0 ? "heading" : undefined}
                                aria-level={i === 0 ? 1 : undefined}
                                style={{
                                    fontSize: "clamp(80px, 14vw, 220px)",
                                    color: "#ffffff",
                                    whiteSpace: "nowrap",
                                    letterSpacing: "0.05em",
                                    lineHeight: 1,
                                    paddingRight: "1em",
                                    fontFamily: "'Orbitron', sans-serif",
                                }}
                            >
                                VAMAHARSHA MAHADEVA
                            </span>
                        ))}
                    </div>
                </motion.div>
            </div>

            {/* bottom-left socials — hidden on very small screens */}
            <div className="absolute left-4 sm:left-8 bottom-16 sm:bottom-24 z-30 font-mono text-[11px] sm:text-[12px] space-y-1.5">
                <a href="https://www.linkedin.com/in/vamaharsha-mahadeva/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 sm:gap-3 hover:text-[#ff3d2e] transition-colors">
                    <span className="w-4 h-4 sm:w-5 sm:h-5 flex items-center justify-center">
                        <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" /></svg>
                    </span>
                    <span className="hidden xs:inline">LinkedIn</span>
                </a>
                <a href="https://github.com/Vamaharsha" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 sm:gap-3 hover:text-[#ff3d2e] transition-colors">
                    <span className="w-4 h-4 sm:w-5 sm:h-5 flex items-center justify-center">
                        <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4" viewBox="0 0 24 24" fill="currentColor"><path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" /></svg>
                    </span>
                    <span className="hidden xs:inline">GitHub</span>
                </a>
            </div>

            {/* bottom-right title */}
            <div className="absolute right-4 sm:right-8 bottom-16 sm:bottom-24 z-30 text-right">
                <p className="text-[20px] sm:text-[28px] md:text-[40px] leading-[1.05] font-medium">
                    <span className="text-[#ff3d2e] font-mono text-[14px] sm:text-[18px] align-top mr-1 sm:mr-2">//</span>
                    ECE Graduate
                </p>
            </div>

            {/* footer strip */}
            <div className="absolute inset-x-0 bottom-0 z-30 bg-[#0a0a0a] text-[#ff3d2e] py-3 px-5 sm:px-8 font-mono text-[11px] flex items-center gap-2">
                <span>// Intro</span>
            </div>
        </section>
    );
});


/* ---------- STATS ---------- */

function Stats() {
    const items = [
        { v: "10+", l: "Projects built" },
        { v: "01", l: "Publication" },
        { v: "04", l: "Internships" },
        { v: "26'", l: "Graduating SVEC" },
    ];
    return (
        <section className="bg-[#0a0a0a] hairline-b-dark">
            <div className="mx-auto max-w-[1400px] px-5 sm:px-8 py-14 sm:py-20 grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8">
                {items.map((it, i) => (
                    <Reveal key={it.l} delay={i * 0.08}>
                        <div className="border-l border-[#1f1f1f] pl-4 sm:pl-6">
                            <div className="text-display text-[#f5f5f5]" style={{ fontSize: "clamp(44px, 10vw, 72px)" }}>{it.v}</div>
                            <div className="mt-3 text-[11px] font-mono text-[#6b6b6b] uppercase tracking-wider">{it.l}</div>
                        </div>
                    </Reveal>
                ))}
            </div>
        </section>
    );
}

/* ---------- SERVICES ---------- */

const SERVICES = [
    "AI / Machine Learning Engineering",
    "RF & Microwave Filter Design",
    "Full-Stack Web Development",
    "LLM Post-Training & Pipelines",
    "Embedded Systems & IoT",
    "RTL & Digital Design",
];

function Services() {
    return (
        <section id="services" className="bg-[#0a0a0a] text-[#f5f5f5] hairline-b-dark">
            <div className="mx-auto max-w-[1400px] px-5 sm:px-8 py-6 hairline-b-dark">
                <SectionLabel>Services</SectionLabel>
            </div>
            <div className="mx-auto max-w-[1400px] px-5 sm:px-8 py-12 sm:py-20 grid md:grid-cols-[1fr_2fr] gap-8 md:gap-16 items-start">
                {/* Outline number — hidden on mobile to save space */}
                <Reveal>
                    <div
                        className="hidden md:block text-display text-transparent"
                        style={{
                            fontSize: "clamp(140px, 18vw, 240px)",
                            WebkitTextStroke: "1.5px #f5f5f5",
                        }}
                    >
                        01
                    </div>
                </Reveal>
                <div>
                    {SERVICES.map((s, i) => (
                        <Reveal key={s} delay={i * 0.05}>
                            <div className="group flex items-center justify-between py-4 sm:py-5 border-b border-[#1f1f1f] hover:pl-3 transition-all duration-500 cursor-pointer">
                                <span className="text-[17px] sm:text-[20px] md:text-[22px] font-medium group-hover:text-[#ff3d2e] transition-colors pr-4">
                                    {s}
                                </span>
                                <span className="font-mono text-[12px] text-[#6b6b6b] shrink-0">0{i + 1}</span>
                            </div>
                        </Reveal>
                    ))}
                </div>
            </div>
        </section>
    );
}

/* ---------- PROJECTS ---------- */
// Projects section is imported from @/components/projects/Projects

/* ---------- SKILLS DOCK ---------- */
// SkillsDock section is imported from @/components/dock/SkillsDock

/* ---------- INTERNSHIPS ---------- */
// The Internships section is imported from @/components/internships/Internships

/* ---------- ABOUT ---------- */

function About() {
    return (
        <section id="about" className="bg-[#0a0a0a] text-[#f5f5f5] hairline-b-dark">
            <div className="mx-auto max-w-[1400px] px-5 sm:px-8 py-6 hairline-b-dark">
                <SectionLabel>About</SectionLabel>
            </div>
            <div className="mx-auto max-w-[1400px] px-5 sm:px-8 py-14 sm:py-24 grid md:grid-cols-[1.5fr_1fr] gap-10 md:gap-16">
                <Reveal>
                    <h2 className="text-display text-[#f5f5f5]" style={{ fontSize: "clamp(36px, 5.5vw, 88px)" }}>
                        Engineer by training,<br />
                        <span className="text-[#ff3d2e]">builder</span> by instinct.
                    </h2>
                    <div className="mt-8 sm:mt-12 space-y-5 text-[14px] sm:text-[15px] leading-relaxed text-[#9a9a9a] max-w-xl">
                        <p>
                            I'm Harsha — a 2026 Electronics & Communication graduate from Sri Vasavi
                            Engineering College, Tadepalligudem. My work spans AI model evaluation,
                            embedded systems, RTL design, RF simulation, and machine learning.
                        </p>
                        <p>
                            I've built ML-integrated platforms for RF filter optimization, designed
                            substrate-integrated waveguide filters tuned with ANN, and worked on LLM
                            post-training pipelines as an intern at Ethara AI.
                        </p>
                    </div>
                </Reveal>
                <div className="space-y-4 sm:space-y-6">
                    {[
                        ["Based in", "Andhra Pradesh, India"],
                        ["Graduating", "2026 · SVEC Tadepalligudem"],
                        ["Focus", "AI · RF · Embedded"],
                        ["Status", "Open to roles"],
                    ].map(([k, v]) => (
                        <div key={k} className="flex justify-between py-3 sm:py-4 border-b border-[#1f1f1f]">
                            <span className="font-mono text-[10px] sm:text-[11px] text-[#6b6b6b] uppercase tracking-wider">{k}</span>
                            <span className="text-[13px] sm:text-[14px]">{v}</span>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

/* ---------- CONTACT ---------- */

function Contact() {
    const contactRef = useRef<HTMLDivElement>(null);
    const contactInView = useInView(contactRef, { once: true, margin: "-80px" });

    const SOCIALS = [
        { label: "LinkedIn", abbr: "in", href: "https://www.linkedin.com/in/vamaharsha-mahadeva/" },
        { label: "GitHub", abbr: "GH", href: "https://github.com/Vamaharsha" },
    ];

    return (
        <section id="contact" className="relative bg-[#0a0a0a] text-[#e8e6e1] overflow-hidden">
            {/* Subtle ambient gradient behind */}
            <div
                className="absolute inset-0 pointer-events-none opacity-30"
                style={{
                    background: "radial-gradient(ellipse 60% 50% at 70% 50%, #4A90E220 0%, transparent 70%), radial-gradient(ellipse 50% 40% at 30% 60%, #FFB3D910 0%, transparent 70%)",
                }}
            />

            {/* Section label bar */}
            <div className="mx-auto max-w-[1400px] px-5 sm:px-8 py-6 border-b border-white/5">
                <span className="text-[#ff3d2e] font-mono text-[11px] tracking-[0.15em] uppercase">// Contact</span>
            </div>

            {/* Main content */}
            <div
                ref={contactRef}
                className="mx-auto max-w-[1400px] px-5 sm:px-8 py-12 md:py-24"
            >
                <motion.div
                    className="grid grid-cols-1 lg:grid-cols-[1.1fr_0.9fr] gap-12 lg:gap-16 items-center"
                    initial={{ opacity: 0, y: 30 }}
                    animate={contactInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                >
                    {/* ── LEFT COLUMN — Info ── */}
                    <div className="space-y-8">
                        {/* Eyebrow */}
                        <motion.div
                            className="flex items-center gap-3"
                            initial={{ opacity: 0, x: -20 }}
                            animate={contactInView ? { opacity: 1, x: 0 } : {}}
                            transition={{ delay: 0.2, duration: 0.6 }}
                        >
                            <div className="w-8 h-px bg-[#ff3d2e]" />
                            <span className="font-mono text-[10px] tracking-[0.25em] uppercase text-[#ff3d2e]">
                                Available for Work
                            </span>
                        </motion.div>

                        {/* Heading */}
                        <motion.h2
                            className="text-display text-[#e8e6e1]"
                            style={{
                                fontSize: "clamp(36px, 5.5vw, 72px)",
                                lineHeight: 1,
                                letterSpacing: "-0.03em",
                            }}
                            initial={{ opacity: 0, y: 20 }}
                            animate={contactInView ? { opacity: 1, y: 0 } : {}}
                            transition={{ delay: 0.3, duration: 0.7 }}
                        >
                            Let's Build
                            <br />
                            <span className="text-[#ff3d2e]">Something</span> Great
                        </motion.h2>

                        {/* Description */}
                        <motion.p
                            className="text-[15px] md:text-[16px] leading-relaxed text-[#8a8a8a] max-w-[520px]"
                            initial={{ opacity: 0, y: 15 }}
                            animate={contactInView ? { opacity: 1, y: 0 } : {}}
                            transition={{ delay: 0.4, duration: 0.6 }}
                        >
                            I'm passionate about AI, embedded systems, and VLSI design.
                            Whether you have a project idea, job opportunity, or just want
                            to collaborate on something meaningful — I'd love to hear from you.
                        </motion.p>

                        {/* Contact Details Grid */}
                        <motion.div
                            className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-2 gap-4 sm:gap-5 pt-2"
                            initial={{ opacity: 0, y: 15 }}
                            animate={contactInView ? { opacity: 1, y: 0 } : {}}
                            transition={{ delay: 0.5, duration: 0.6 }}
                        >
                            {/* Location */}
                            <div className="group flex items-start gap-3">
                                <div className="w-9 h-9 rounded-md border border-white/10 flex items-center justify-center shrink-0 bg-white/[0.03] group-hover:border-[#ff3d2e]/40 group-hover:bg-[#ff3d2e]/[0.05] transition-all duration-300">
                                    <svg className="w-4 h-4 text-white/50 group-hover:text-[#ff3d2e] transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                    </svg>
                                </div>
                                <div>
                                    <div className="font-mono text-[9px] tracking-[0.2em] uppercase text-[#666]">Location</div>
                                    <div className="mt-1 text-[13px] font-medium text-[#e8e6e1]">Vijayawada, Andhra Pradesh</div>
                                </div>
                            </div>

                            {/* Email */}
                            <a href="mailto:vamaharsha.m@gmail.com" className="group flex items-start gap-3">
                                <div className="w-9 h-9 rounded-md border border-white/10 flex items-center justify-center shrink-0 bg-white/[0.03] group-hover:border-[#ff3d2e]/40 group-hover:bg-[#ff3d2e]/[0.05] transition-all duration-300">
                                    <svg className="w-4 h-4 text-white/50 group-hover:text-[#ff3d2e] transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                    </svg>
                                </div>
                                <div>
                                    <div className="font-mono text-[9px] tracking-[0.2em] uppercase text-[#666]">Email</div>
                                    <div className="mt-1 text-[13px] font-medium text-[#e8e6e1] group-hover:text-[#ff3d2e] transition-colors">vamaharsha.m@gmail.com</div>
                                </div>
                            </a>

                            {/* Phone */}
                            <a href="tel:+919392849219" className="group flex items-start gap-3">
                                <div className="w-9 h-9 rounded-md border border-white/10 flex items-center justify-center shrink-0 bg-white/[0.03] group-hover:border-[#ff3d2e]/40 group-hover:bg-[#ff3d2e]/[0.05] transition-all duration-300">
                                    <svg className="w-4 h-4 text-white/50 group-hover:text-[#ff3d2e] transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                                    </svg>
                                </div>
                                <div>
                                    <div className="font-mono text-[9px] tracking-[0.2em] uppercase text-[#666]">Phone</div>
                                    <div className="mt-1 text-[13px] font-medium text-[#e8e6e1] group-hover:text-[#ff3d2e] transition-colors">+91 93928 49219</div>
                                </div>
                            </a>

                            {/* Availability */}
                            <div className="group flex items-start gap-3">
                                <div className="w-9 h-9 rounded-md border border-white/10 flex items-center justify-center shrink-0 bg-white/[0.03] group-hover:border-[#ff3d2e]/40 group-hover:bg-[#ff3d2e]/[0.05] transition-all duration-300">
                                    <svg className="w-4 h-4 text-white/50 group-hover:text-[#ff3d2e] transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                </div>
                                <div>
                                    <div className="font-mono text-[9px] tracking-[0.2em] uppercase text-[#666]">Availability</div>
                                    <div className="mt-1 text-[13px] font-medium text-[#e8e6e1] flex items-center gap-2">
                                        Open to Opportunities
                                        <span className="relative flex h-2 w-2">
                                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-500 opacity-75" />
                                            <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500" />
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </motion.div>

                        {/* Social Links */}
                        <motion.div
                            className="flex items-center gap-3 pt-2"
                            initial={{ opacity: 0, y: 10 }}
                            animate={contactInView ? { opacity: 1, y: 0 } : {}}
                            transition={{ delay: 0.6, duration: 0.5 }}
                        >
                            {SOCIALS.map((s) => (
                                <a
                                    key={s.label}
                                    href={s.href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="group flex items-center gap-2.5 px-4 py-2.5 border border-white/10 rounded-md font-mono text-[11px] tracking-[0.1em] text-white/60 hover:border-[#ff3d2e] hover:text-[#ff3d2e] hover:bg-[#ff3d2e]/[0.04] transition-all duration-300"
                                >
                                    <span className="w-5 h-5 flex items-center justify-center">
                                        {s.label === "LinkedIn" ? (
                                            <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" /></svg>
                                        ) : (
                                            <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="currentColor"><path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" /></svg>
                                        )}
                                    </span>
                                    {s.label}
                                </a>
                            ))}
                        </motion.div>

                        {/* CTA Button */}
                        <motion.a
                            href="mailto:vamaharsha.m@gmail.com"
                            className="inline-flex items-center gap-3 px-8 py-4 bg-[#e8e6e1] text-[#0a0a0a] font-mono text-[11px] tracking-[0.25em] uppercase rounded-sm hover:bg-[#ff3d2e] hover:text-white transition-all duration-400 group"
                            initial={{ opacity: 0, y: 10 }}
                            animate={contactInView ? { opacity: 1, y: 0 } : {}}
                            transition={{ delay: 0.7, duration: 0.5 }}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                        >
                            Send me an email
                            <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                            </svg>
                        </motion.a>
                    </div>

                    {/* ── RIGHT COLUMN — Ghost Character ── */}
                    <motion.div
                        className="relative flex flex-col items-center justify-center text-white py-4"
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={contactInView ? { opacity: 1, scale: 1 } : {}}
                        transition={{ delay: 0.4, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                    >
                        {/* Glow behind ghost */}
                        <div
                            className="absolute inset-0 pointer-events-none"
                            style={{
                                background: "radial-gradient(circle at 50% 45%, rgba(74, 144, 226, 0.25) 0%, rgba(135, 206, 235, 0.12) 35%, transparent 70%)",
                                filter: "blur(40px)",
                            }}
                        />

                        {/* Interactive Ghost SVG */}
                        <MeshGradientSVG className="relative z-10" />

                        {/* Name caption below ghost */}
                        <div className="mt-4 text-center z-10">
                            <span className="font-mono text-[10px] tracking-[0.3em] uppercase text-white/40">
                                Vamaharsha Mahadeva
                            </span>
                        </div>
                    </motion.div>
                </motion.div>

                {/* Back to top */}
                <div className="flex justify-end mt-12">
                    <a
                        href="#top"
                        className="w-11 h-11 rounded-full border border-white/15 flex items-center justify-center hover:bg-white hover:text-[#0a0a0a] hover:border-white transition-all duration-300 text-[14px] text-white/50"
                        aria-label="Back to top"
                    >
                        ↑
                    </a>
                </div>
            </div>

            {/* Footer */}
            <footer className="bg-[#050505] text-[#6b6b6b] py-4 px-5 sm:px-8 flex flex-col sm:flex-row items-center sm:justify-between gap-1 font-mono text-[10px] sm:text-[11px] text-center sm:text-left">
                <span>© 2026 Vamaharsha Mahadeva</span>
                <span>Built with care · TanStack + Motion</span>
            </footer>
        </section>
    );
}

/* ---------- CERTIFICATES ---------- */

const CERTS = [
    {
        id: "cs50",
        name: "CS50x Certificate",
        issuer: "Harvard University",
        date: "2025",
        credential: "e995b9b7-b605-48bd-a454-b82086a7be24",
        credentialLink: "https://certificates.cs50.io/e995b9b7-b605-48bd-a454-b82086a7be24.pdf?size=letter",
        category: "Computer Science",
        color: "#a51c30",
        description:
            "Completion of CS50x including ten problem sets and one final project. Awarded by Harvard University, Cambridge, Massachusetts.",
        image: cert_cs50,
    },
    {
        id: "nptel",
        name: "Introduction to Internet of Things",
        issuer: "NPTEL — IIT Kharagpur",
        date: "Jul–Oct 2025",
        credential: "NPTEL25CS147S769600083",
        credentialLink: "",
        category: "Embedded / IoT",
        color: "#00aaff",
        description:
            "Elite certification for successfully completing the 12-week IoT course with a consolidated score of 78%. Funded by MoE, Govt. of India.",
        image: cert_nptel,
    },
    {
        id: "infosys",
        name: "Prompt Engineering",
        issuer: "Infosys Springboard",
        date: "September 7, 2025",
        credential: "Infosys-PE-2025",
        credentialLink: "",
        category: "AI / LLM",
        color: "#007cc2",
        description:
            "Course completion certificate for Prompt Engineering awarded by Infosys Springboard.",
        image: cert_infosys,
    },
    {
        id: "nvidia",
        name: "Building LLM Applications With Prompt Engineering",
        issuer: "NVIDIA",
        date: "September 14, 2025",
        credential: "Nx9IZW8fSBuFh97VbFVo4Q",
        credentialLink: "",
        category: "AI / ML",
        color: "#76b900",
        description:
            "Certificate of Competency for demonstrating competence in building LLM applications with prompt engineering. Signed by Greg Estes, VP NVIDIA.",
        image: cert_nvidia,
    },
    {
        id: "tata",
        name: "GenAI Powered Data Analytics Job Simulation",
        issuer: "TATA — Forage",
        date: "August 23, 2025",
        credential: "Rf9d2qjvrfd2BRWKP",
        credentialLink: "https://forage-uploads-prod.s3.amazonaws.com/completion-certificates/ifobHAoMjQs9s6bKS/gMTdCXwDdLYoXZ3wG_ifobHAoMjQs9s6bKS_mKW9YuePmj5M3pHbu_1755957372781_completion_certificate.pdf",
        category: "Data Science",
        color: "#1a5ca8",
        description:
            "Completed practical tasks in exploratory data analysis, risk profiling, predicting delinquency with AI, and implementing AI-driven collections strategy.",
        image: cert_data,
    },
    {
        id: "aws",
        name: "Foundations of Prompt Engineering",
        issuer: "Amazon Web Services",
        date: "August 12, 2025",
        credential: "AWS-PE-MAHADEVA-2025",
        credentialLink: "",
        category: "Cloud / AI",
        color: "#ff9900",
        description:
            "AWS Training & Certification completion certificate for Foundations of Prompt Engineering.",
        image: cert_aws,
    },
    {
        id: "oracle",
        name: "Oracle Fusion Cloud HCM Process Essentials",
        issuer: "Oracle University",
        date: "June 25, 2025",
        credential: "Oracle-HCM-Essentials-Rel1",
        credentialLink: "",
        category: "Cloud / ERP",
        color: "#f80000",
        description:
            "Oracle Certified — Certificate of Recognition for Oracle Fusion Cloud Applications HCM Process Essentials Certified - Rel 1.",
        image: cert_oracle,
    },
    {
        id: "gets",
        name: "GETS Higher English Test",
        issuer: "GETS — QAI",
        date: "September 20, 2023",
        credential: "GHE23004411IN00800672",
        credentialLink: "",
        category: "Language",
        color: "#f5a800",
        description:
            "CEFR B2 level English proficiency. Overall 72%, GETS Score 79, GETS Level 6. Assessed by UK NARIC against the Common European Framework of Reference.",
        image: cert_gets,
    },
    {
        id: "skill",
        name: "Job Skills Online Course",
        issuer: "CSC — Skill India / NSDC",
        date: "January–July 2023",
        credential: "CSC-SKILL-MAHADEVA-2023",
        credentialLink: "",
        category: "Skill Development",
        color: "#0066cc",
        description:
            "Course Completion Certificate for Job Skills online course. Certified by CSC e-Governance Services India Limited and National Skill Development Corporation.",
        image: cert_skill,
    },
];

const getCertificateIcon = (id: string, color: string) => {
    switch (id) {
        case "tf": // TensorFlow / Google (Neural Net / AI)
            return (
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5">
                    <circle cx="12" cy="5" r="2" fill={`${color}20`} />
                    <circle cx="6" cy="14" r="2" fill={`${color}20`} />
                    <circle cx="18" cy="14" r="2" fill={`${color}20`} />
                    <line x1="12" y1="7" x2="6.5" y2="12" stroke={color} strokeWidth="1.5" />
                    <line x1="12" y1="7" x2="17.5" y2="12" stroke={color} strokeWidth="1.5" />
                    <line x1="8" y1="14" x2="16" y2="14" stroke={color} strokeWidth="1.5" />
                </svg>
            );
        case "emb": // Embedded Systems / IoT (Chip / CPU)
            return (
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5">
                    <rect x="5" y="5" width="14" height="14" rx="1" fill={`${color}20`} />
                    <line x1="9" y1="2" x2="9" y2="5" stroke={color} strokeWidth="1.5" />
                    <line x1="15" y1="2" x2="15" y2="5" stroke={color} strokeWidth="1.5" />
                    <line x1="9" y1="19" x2="9" y2="22" stroke={color} strokeWidth="1.5" />
                    <line x1="15" y1="19" x2="15" y2="22" stroke={color} strokeWidth="1.5" />
                    <line x1="2" y1="9" x2="5" y2="9" stroke={color} strokeWidth="1.5" />
                    <line x1="2" y1="15" x2="5" y2="15" stroke={color} strokeWidth="1.5" />
                    <line x1="19" y1="9" x2="22" y2="9" stroke={color} strokeWidth="1.5" />
                    <line x1="19" y1="15" x2="22" y2="15" stroke={color} strokeWidth="1.5" />
                    <rect x="9" y="9" width="6" height="6" rx="0.5" stroke={color} fill="none" />
                </svg>
            );
        case "react": // React Developer (Atom symbol)
            return (
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5">
                    <ellipse cx="12" cy="12" rx="10" ry="3" transform="rotate(30 12 12)" />
                    <ellipse cx="12" cy="12" rx="10" ry="3" transform="rotate(90 12 12)" />
                    <ellipse cx="12" cy="12" rx="10" ry="3" transform="rotate(150 12 12)" />
                    <circle cx="12" cy="12" r="1.5" fill={color} />
                </svg>
            );
        case "ieee": // IEEE Research (Academic Book/Scroll)
            return (
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5">
                    <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" fill={`${color}10`} />
                    <path d="M8 14H16M8 10H16M8 7H13" stroke={color} strokeLinecap="round" />
                    <rect x="6" y="4" width="12" height="16" rx="1" stroke={color} fill="none" />
                </svg>
            );
        case "py": // Python for Data Science (Data/Graph/Python snake representation)
            return (
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5">
                    <path d="M3 3V21H21" stroke={color} strokeLinecap="round" />
                    <path d="M7 16L11 11L15 13L20 7" stroke={color} strokeLinecap="round" strokeLinejoin="round" />
                    <circle cx="7" cy="16" r="1" fill={color} />
                    <circle cx="11" cy="11" r="1" fill={color} />
                    <circle cx="15" cy="13" r="1" fill={color} />
                    <circle cx="20" cy="7" r="1" fill={color} />
                </svg>
            );
        default:
            return (
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5">
                    <path d="M12 2L15 8L22 9L17 14L18 21L12 18L6 21L7 14L2 9L9 8L12 2Z" fill={`${color}10`} />
                </svg>
            );
    }
};

export const CertificateCard = ({ cert }: { cert: typeof CERTS[0] }) => {
    const c = cert.color;
    return (
        <div
            className="w-full h-full p-[3%] flex flex-col justify-between text-left select-none relative overflow-hidden bg-[#0d0d0f] border border-[#2c2c2f]"
            style={{
                fontFamily: '"Inter", sans-serif',
                boxShadow: `inset 0 0 20px ${c}15`,
            }}
        >
            {/* Elegant grid background pattern */}
            <div
                className="absolute inset-0 opacity-[0.03] pointer-events-none"
                style={{
                    backgroundImage: "linear-gradient(to right, white 1px, transparent 1px), linear-gradient(to bottom, white 1px, transparent 1px)",
                    backgroundSize: "6% 6%",
                }}
            />
            {/* Corner decorations */}
            <div className="absolute top-1 left-1 w-1.5 h-1.5 border-t border-l border-white/20" />
            <div className="absolute top-1 right-1 w-1.5 h-1.5 border-t border-r border-white/20" />
            <div className="absolute bottom-1 left-1 w-1.5 h-1.5 border-b border-l border-white/20" />
            <div className="absolute bottom-1 right-1 w-1.5 h-1.5 border-b border-r border-white/20" />

            <div className="flex items-center gap-3 h-full z-10">
                {/* Visual Seal / Badge container */}
                <div
                    className="w-8 h-8 rounded-full flex items-center justify-center shrink-0 border relative"
                    style={{
                        borderColor: `${c}40`,
                        background: `radial-gradient(circle, ${c}18 0%, transparent 80%)`,
                        boxShadow: `0 0 10px ${c}20`
                    }}
                >
                    {getCertificateIcon(cert.id, c)}
                    {/* Tiny seal ribbon simulation */}
                    <div className="absolute -bottom-1.5 w-3 h-3 flex justify-between gap-[2px]">
                        <div className="w-[3px] h-[6px]" style={{ backgroundColor: c, transform: 'rotate(15deg)', opacity: 0.8 }} />
                        <div className="w-[3px] h-[6px]" style={{ backgroundColor: c, transform: 'rotate(-15deg)', opacity: 0.8 }} />
                    </div>
                </div>

                {/* Main info panel */}
                <div className="flex-1 min-w-0 flex flex-col justify-center h-full">
                    {/* Top line: Issuer & Date */}
                    <div className="flex justify-between items-center w-full">
                        <span className="text-[5px] tracking-[0.25em] font-mono font-bold uppercase text-[#88888b]">
                            {cert.issuer}
                        </span>
                        <span className="text-[4px] font-mono text-[#5a5a5f] font-medium">
                            {cert.date}
                        </span>
                    </div>

                    {/* Middle: Certificate Name */}
                    <h4
                        className="text-[7.5px] md:text-[8.5px] font-black tracking-tight text-white mt-0.5 leading-tight truncate uppercase"
                        style={{ fontFamily: '"Archivo", sans-serif', letterSpacing: "-0.01em" }}
                    >
                        {cert.name}
                    </h4>

                    {/* Recipient Line */}
                    <p className="text-[5.5px] md:text-[6.5px] font-medium italic mt-0.5 text-[#a0a0a5]">
                        Awarded to: <span className="font-bold not-italic" style={{ color: c }}>Vamaharsha Mahadeva</span>
                    </p>

                    {/* Bottom strip: ID & category */}
                    <div className="mt-1 flex justify-between items-center w-full border-t border-white/5 pt-0.5">
                        <span className="text-[4.5px] font-mono text-[#5a5a5f] tracking-widest font-semibold uppercase">
                            ID: {cert.credential}
                        </span>
                        <span
                            className="text-[4px] font-mono font-bold uppercase px-1 py-[0.5px] rounded-[1px]"
                            style={{
                                color: c,
                                backgroundColor: `${c}15`,
                                border: `1px solid ${c}25`
                            }}
                        >
                            {cert.category}
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
};

function Certificates() {
    const [active, setActive] = useState(0);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const cert = CERTS[active];
    const c = cert.color;

    // ESC key to close modal
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === "Escape") setIsModalOpen(false);
        };
        if (isModalOpen) window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, [isModalOpen]);

    return (
        <section
            id="certificates"
            className="relative bg-[#070707] text-[#f5f5f5] hairline-b-dark overflow-hidden"
        >
            {/* grid background */}
            <div
                aria-hidden
                className="absolute inset-0 opacity-[0.18] pointer-events-none"
                style={{
                    backgroundImage:
                        "linear-gradient(to right, #ffffff10 1px, transparent 1px), linear-gradient(to bottom, #ffffff10 1px, transparent 1px)",
                    backgroundSize: "72px 72px",
                    maskImage:
                        "radial-gradient(ellipse at 50% 55%, #000 40%, transparent 85%)",
                }}
            />
            {/* ambient color glow follows active cert */}
            <motion.div
                aria-hidden
                className="absolute inset-0 pointer-events-none"
                animate={{ background: `radial-gradient(60% 55% at 50% 60%, ${c}22 0%, transparent 70%)` }}
                transition={{ duration: 0.8 }}
            />

            <div className="relative mx-auto max-w-[1400px] px-4 sm:px-8 py-6 hairline-b-dark">
                <SectionLabel>Credentials</SectionLabel>
            </div>

            <div className="relative mx-auto max-w-[1400px] px-4 sm:px-8 pt-10 sm:pt-16 pb-14 sm:pb-28">
                {/* Title */}
                <Reveal>
                    <h2
                        className="text-display text-center mx-auto"
                        style={{
                            fontSize: "clamp(38px, 9vw, 144px)",
                            lineHeight: 0.9,
                            letterSpacing: "-0.03em",
                        }}
                    >
                        CERTIFI
                        <motion.span
                            animate={{ color: c }}
                            transition={{ duration: 0.6 }}
                            style={{ color: c }}
                        >
                            CATIONS
                        </motion.span>
                    </h2>
                </Reveal>

                {/* ══ MOBILE: pill tabs + stacked details (< lg) ══ */}
                <div className="lg:hidden mt-8 space-y-6">
                    {/* Horizontal scrollable pill tabs */}
                    <div className="flex gap-2 overflow-x-auto scrollbar-none pb-2 -mx-1 px-1">
                        {CERTS.map((ct, i) => {
                            const isActive = i === active;
                            return (
                                <button
                                    key={ct.id}
                                    onClick={() => setActive(i)}
                                    className="shrink-0 flex items-center gap-2 px-4 py-2.5 rounded-full border font-mono text-[11px] tracking-wide transition-all duration-300 cursor-pointer"
                                    style={{
                                        borderColor: isActive ? ct.color : "#2a2a2a",
                                        color: isActive ? ct.color : "#6b6b6b",
                                        background: isActive ? `${ct.color}12` : "transparent",
                                        boxShadow: isActive ? `0 0 12px ${ct.color}22` : "none",
                                    }}
                                >
                                    <span className="w-1.5 h-1.5 rounded-full shrink-0" style={{ background: isActive ? ct.color : "#4a4a4a" }} />
                                    {ct.name.length > 20 ? ct.name.slice(0, 20) + "…" : ct.name}
                                </button>
                            );
                        })}
                    </div>

                    {/* Active cert details — mobile */}
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={cert.id}
                            initial={{ opacity: 0, y: 12 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -8 }}
                            transition={{ duration: 0.4 }}
                            className="border border-[#1c1c1c] rounded-md p-5 space-y-5"
                            style={{ background: `linear-gradient(160deg, ${c}08, transparent)` }}
                        >
                            <div className="flex items-start justify-between gap-3">
                                <div>
                                    <span
                                        className="inline-block px-3 py-1 border font-mono text-[9px] tracking-[0.2em] uppercase rounded-sm mb-3"
                                        style={{ borderColor: c, color: c }}
                                    >
                                        {cert.category}
                                    </span>
                                    <h3
                                        className="text-display text-[#f5f5f5]"
                                        style={{ fontSize: "clamp(20px, 5vw, 32px)", lineHeight: 1.1, letterSpacing: "-0.02em", textTransform: "uppercase" }}
                                    >
                                        {cert.name}
                                    </h3>
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <div className="font-mono text-[9px] tracking-[0.2em] uppercase text-[#5a5a5a]">Issued By</div>
                                    <div className="mt-1.5 text-[13px] font-medium" style={{ color: c }}>{cert.issuer}</div>
                                </div>
                                <div>
                                    <div className="font-mono text-[9px] tracking-[0.2em] uppercase text-[#5a5a5a]">Date</div>
                                    <div className="mt-1.5 text-[13px] font-medium text-[#f0f0f0]">{cert.date}</div>
                                </div>
                            </div>

                            <p className="text-[13px] leading-relaxed text-[#9a9a9a] border-l pl-4" style={{ borderColor: c }}>
                                {cert.description}
                            </p>

                            <div className="rounded-sm border px-3 py-2.5" style={{ borderColor: "#1f1f1f", background: "#0d0d0d" }}>
                                <div className="font-mono text-[9px] tracking-[0.2em] uppercase text-[#5a5a5a]">Credential ID</div>
                                <div className="mt-1 font-mono text-[11px] truncate" style={{ color: c }}>{cert.credential}</div>
                            </div>

                            <button
                                onClick={() => setIsModalOpen(true)}
                                className="block w-full text-center border px-5 py-4 font-mono text-[10px] tracking-[0.25em] uppercase transition-all cursor-pointer"
                                style={{ borderColor: c, color: c, background: "transparent" }}
                            >
                                View Certificate ↗
                            </button>
                        </motion.div>
                    </AnimatePresence>
                </div>

                {/* ══ DESKTOP: 3-column layout (lg+) ══ */}
                <div className="hidden lg:grid mt-20 grid-cols-1 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.2fr)_minmax(0,1fr)] gap-10 lg:gap-12 items-start">
                    {/* LEFT — list */}
                    <ul className="space-y-4">
                        {CERTS.map((ct, i) => {
                            const isActive = i === active;
                            return (
                                <li key={ct.id}>
                                    <button
                                        onClick={() => setActive(i)}
                                        className="relative w-full text-left rounded-md border px-5 py-4 flex items-start gap-5 transition-all duration-300 overflow-hidden group"
                                        style={{
                                            borderColor: isActive ? ct.color : "#1c1c1c",
                                            background: isActive
                                                ? `linear-gradient(180deg, ${ct.color}10, transparent)`
                                                : "transparent",
                                            boxShadow: isActive
                                                ? `0 0 0 1px ${ct.color}55, 0 8px 40px -10px ${ct.color}55`
                                                : "none",
                                        }}
                                        onMouseEnter={(e) => {
                                            if (!isActive) {
                                                e.currentTarget.style.borderColor = `${ct.color}55`;
                                                e.currentTarget.style.boxShadow = `0 0 20px ${ct.color}15`;
                                            }
                                        }}
                                        onMouseLeave={(e) => {
                                            if (!isActive) {
                                                e.currentTarget.style.borderColor = "#1c1c1c";
                                                e.currentTarget.style.boxShadow = "none";
                                            }
                                        }}
                                    >
                                        {/* Animated active indicator bar */}
                                        <motion.div
                                            className="absolute left-0 top-0 bottom-0 w-[3px] rounded-r-full"
                                            initial={false}
                                            animate={{
                                                scaleY: isActive ? 1 : 0,
                                                opacity: isActive ? 1 : 0,
                                                background: ct.color,
                                                boxShadow: isActive ? `0 0 8px ${ct.color}88` : `0 0 0px transparent`,
                                            }}
                                            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                                        />
                                        <span
                                            className="font-mono text-[11px] tabular-nums pt-1 shrink-0"
                                            style={{ color: isActive ? ct.color : "#5a5a5a" }}
                                        >
                                            0{i + 1}
                                        </span>
                                        <span className="min-w-0">
                                            <span
                                                className="block text-[16px] font-semibold leading-tight transition-colors duration-300"
                                                style={{ color: isActive ? "#fff" : "#7a7a7a" }}
                                            >
                                                {ct.name}
                                            </span>
                                            <span
                                                className="block mt-2 font-mono text-[10px] tracking-[0.18em] uppercase transition-colors duration-300"
                                                style={{ color: isActive ? ct.color : "#3f3f3f" }}
                                            >
                                                {ct.category}
                                            </span>
                                        </span>
                                    </button>
                                </li>
                            );
                        })}
                    </ul>

                    {/* CENTER — character with dynamic certificate */}
                    <div className="relative flex items-end justify-center min-h-[520px] lg:min-h-[640px]">
                        {/* floor glow */}
                        <motion.div
                            aria-hidden
                            className="absolute bottom-6 left-1/2 -translate-x-1/2 w-[70%] h-12 rounded-[50%] blur-2xl"
                            animate={{ background: `radial-gradient(ellipse, ${c}66 0%, transparent 70%)` }}
                            transition={{ duration: 0.6 }}
                        />
                        {/* drifting particles */}
                        {[0, 1, 2, 3, 4].map((i) => (
                            <motion.span
                                key={i}
                                className="absolute w-1 h-1 rounded-full"
                                style={{ background: c, left: `${20 + i * 14}%`, top: `${30 + (i % 3) * 18}%` }}
                                animate={{ y: [0, -14, 0], opacity: [0.2, 0.9, 0.2] }}
                                transition={{ duration: 3 + i * 0.4, repeat: Infinity, delay: i * 0.3 }}
                            />
                        ))}

                        <div className="relative w-full max-w-[460px] aspect-[2/3]">
                            {/* glow ring behind character */}
                            <motion.div
                                aria-hidden
                                className="absolute inset-0 -z-0"
                                animate={{
                                    background: `radial-gradient(closest-side, ${c}33 0%, transparent 70%)`,
                                    filter: `drop-shadow(0 0 40px ${c}66)`,
                                }}
                                transition={{ duration: 0.6 }}
                            />

                            {/* Floating wrapper */}
                            <motion.div
                                className="relative w-full h-full"
                                animate={{ y: [0, -6, 0] }}
                                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                            >
                                {/* certificate overlay */}
                                <div
                                    className="absolute pointer-events-none overflow-hidden rounded-[2px]"
                                    style={{
                                        top: "32.5%", left: "32.5%", right: "32.5%",
                                        width: "37%", aspectRatio: "3/2", height: "auto",
                                        zIndex: 1, position: "absolute",
                                        boxShadow: `0 0 30px ${c}77`,
                                    }}
                                >
                                    <AnimatePresence mode="wait">
                                        <motion.img
                                            key={cert.id}
                                            src={cert.image}
                                            alt={cert.name}
                                            initial={{ opacity: 0, scale: 1.05 }}
                                            animate={{ opacity: 1, scale: 1 }}
                                            exit={{ opacity: 0, scale: 0.98 }}
                                            transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
                                            className="absolute inset-0 w-full h-full object-cover"
                                        />
                                    </AnimatePresence>
                                </div>

                                {/* character on top */}
                                <img
                                    src={certCharacter}
                                    alt="Harsha holding a certificate"
                                    loading="lazy"
                                    decoding="async"
                                    width={1024}
                                    height={1536}
                                    className="relative z-10 w-full h-full object-contain select-none pointer-events-none"
                                    style={{
                                        filter: `drop-shadow(0 24px 40px ${c}55)`,
                                        mixBlendMode: "multiply"
                                    }}
                                />
                            </motion.div>
                        </div>
                    </div>

                    {/* RIGHT — detail panel */}
                    <div className="relative">
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={cert.id}
                                initial={{ opacity: 0, y: 12 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -8 }}
                                transition={{ duration: 0.45 }}
                                className="space-y-7"
                            >
                                <span
                                    className="inline-block px-3 py-1.5 border font-mono text-[10px] tracking-[0.22em] uppercase rounded-sm"
                                    style={{ borderColor: c, color: c }}
                                >
                                    {cert.category}
                                </span>

                                <h3
                                    className="text-display"
                                    style={{
                                        fontSize: "clamp(32px, 3.4vw, 52px)",
                                        lineHeight: 1,
                                        letterSpacing: "-0.02em",
                                        textTransform: "uppercase",
                                    }}
                                >
                                    {cert.name}
                                </h3>

                                <div className="grid grid-cols-2 gap-6 pt-2">
                                    <div>
                                        <div className="font-mono text-[10px] tracking-[0.22em] uppercase text-[#5a5a5a]">Issued By</div>
                                        <div className="mt-2 text-[15px] font-medium" style={{ color: c }}>{cert.issuer}</div>
                                    </div>
                                    <div>
                                        <div className="font-mono text-[10px] tracking-[0.22em] uppercase text-[#5a5a5a]">Date</div>
                                        <div className="mt-2 text-[15px] font-medium text-[#f0f0f0]">{cert.date}</div>
                                    </div>
                                </div>

                                <p className="text-[14px] leading-relaxed text-[#9a9a9a] border-l pl-5" style={{ borderColor: c }}>
                                    {cert.description}
                                </p>

                                <div className="rounded-sm border px-4 py-3" style={{ borderColor: "#1f1f1f", background: "#0d0d0d" }}>
                                    <div className="font-mono text-[10px] tracking-[0.22em] uppercase text-[#5a5a5a]">Credential ID</div>
                                    <div className="mt-1.5 font-mono text-[13px] truncate" style={{ color: c }}>{cert.credential}</div>
                                </div>

                                <button
                                    onClick={() => setIsModalOpen(true)}
                                    className="group block w-full text-center border px-6 py-5 font-mono text-[11px] tracking-[0.28em] uppercase transition-all cursor-pointer"
                                    style={{
                                        borderColor: c,
                                        color: c,
                                        background: "transparent",
                                        boxShadow: `inset 0 0 0 0 ${c}`,
                                    }}
                                    onMouseEnter={(e) => {
                                        (e.currentTarget as HTMLButtonElement).style.background = `${c}18`;
                                    }}
                                    onMouseLeave={(e) => {
                                        (e.currentTarget as HTMLButtonElement).style.background = "transparent";
                                    }}
                                >
                                    View Certificate
                                    <span className="block mt-1">↗</span>
                                </button>
                            </motion.div>
                        </AnimatePresence>
                    </div>
                </div>
            </div>

            {/* ── Certificate Viewer Modal (portaled to body to escape stacking context) ── */}
            {typeof document !== "undefined" && createPortal(
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
                                className="absolute inset-0 bg-black/90 cursor-pointer"
                                onClick={() => setIsModalOpen(false)}
                            />

                            {/* Modal */}
                            <motion.div
                                className="relative w-full max-w-[900px] rounded-lg overflow-hidden border border-[#2f2f35] bg-[#0c0d10] flex flex-col p-4 md:p-6"
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
                                            {cert.category}
                                        </span>
                                        <h4 className="text-display text-[14px] md:text-[20px] text-white tracking-wide uppercase mt-1">
                                            {cert.name}
                                        </h4>
                                        <span className="font-mono text-[9px] text-[#6a6a6f] mt-0.5 block">
                                            Issued by {cert.issuer} — {cert.date}
                                        </span>
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
                                    <AnimatePresence mode="wait">
                                        <motion.img
                                            key={cert.id}
                                            src={cert.image}
                                            alt={`${cert.name} Certificate`}
                                            className="max-w-full max-h-[65vh] object-contain"
                                            style={{ filter: `drop-shadow(0 0 15px ${c}22)` }}
                                            initial={{ opacity: 0, scale: 0.95 }}
                                            animate={{ opacity: 1, scale: 1 }}
                                            exit={{ opacity: 0, scale: 0.95 }}
                                            transition={{ duration: 0.4 }}
                                        />
                                    </AnimatePresence>
                                </div>

                                {/* Footer */}
                                <div className="w-full flex justify-between items-center mt-3 font-mono text-[9px] text-[#5a5a5f]">
                                    <span className="truncate">Credential: {cert.credential}</span>
                                    <div className="flex items-center gap-4 shrink-0">
                                        {cert.credentialLink && (
                                            <a
                                                href={cert.credentialLink}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="transition-colors duration-200 hover:underline"
                                                style={{ color: c }}
                                            >
                                                Open Original ↗
                                            </a>
                                        )}
                                        <span className="hidden sm:block">Press ESC to close</span>
                                    </div>
                                </div>
                            </motion.div>
                        </motion.div>
                    )}
                </AnimatePresence>,
                document.body
            )}
        </section>
    );
}




function Home() {
    const [theme, setTheme] = useState<"light" | "dark">("light");
    useEffect(() => {
        const onScroll = () => {
            const y = window.scrollY;
            const vh = window.innerHeight;
            // Light at very top (hero) and at contact section (bottom)
            const doc = document.documentElement.scrollHeight;
            const fromBottom = doc - (y + vh);
            setTheme(y < vh * 0.7 || fromBottom < vh * 0.7 ? "light" : "dark");
        };
        onScroll();
        window.addEventListener("scroll", onScroll, { passive: true });
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    return (
        <main className="bg-[#0a0a0a]">
            <Nav theme={theme} />
            <Hero />
            <Stats />
            <About />
            <Projects />
            <Certificates />
            <Internships />
            <Experience />
            <SkillsDock />
            <Contact />
        </main>
    );
}
