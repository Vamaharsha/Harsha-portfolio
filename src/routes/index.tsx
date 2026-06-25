import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState, memo } from "react";
import { motion, useInView, AnimatePresence, useScroll, useTransform } from "framer-motion";
import portrait from "@/assets/portrait.png";
import project1 from "@/assets/project-1.png";
import project2 from "@/assets/image copy.png";
import project3 from "@/assets/image.png";
import certCharacter from "@/assets/cert-character.png";
import cert1 from "@/assets/image copy 2.png";
import cert2 from "@/assets/image copy 3.png";
import cert3 from "@/assets/image copy 4.png";
import cert4 from "@/assets/image copy 5.png";

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

function Nav({ theme }: { theme: "light" | "dark" }) {
    const isLight = theme === "light";
    return (
        <header className={`fixed top-0 inset-x-0 z-50 transition-colors duration-500 ${isLight ? "text-[#0a0a0a]" : "text-[#f5f5f5]"}`}>
            <nav className="mx-auto max-w-[1400px] px-8 py-6 flex items-center justify-between text-[13px]">
                <a href="#top" className="font-mono opacity-80">© Harsha Mahadeva</a>
                <ul className="hidden md:flex items-center gap-12">
                    {[
                        ["Projects", "#projects"],
                        ["Services", "#services"],
                        ["Certificates", "#certificates"],
                        ["About", "#about"],
                        ["Contact", "#contact"],
                    ].map(([l, h]) => (
                        <li key={h}>
                            <a href={h} className="hover:text-[#ff3d2e] transition-colors">{l}</a>
                        </li>
                    ))}
                </ul>
                <a href="#contact" className="hidden md:block hover:text-[#ff3d2e] transition-colors">Let's talk →</a>
            </nav>
        </header>
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
                                    letterSpacing: "-0.02em",
                                    lineHeight: 1,
                                    paddingRight: "1em",
                                }}
                            >
                                Vamaharsha Mahadeva
                            </span>
                        ))}
                    </div>
                </motion.div>
            </div>

            {/* bottom-left socials */}
            <div className="absolute left-8 bottom-24 z-30 font-mono text-[12px] space-y-1.5">
                {[
                    ["in", "Linkedin"],
                    ["X", "Twitter"],
                    ["ig", "Instagram"],
                ].map(([k, l]) => (
                    <a key={l} href="#" className="flex items-center gap-3 hover:text-[#ff3d2e] transition-colors">
                        <span className="w-5 h-5 flex items-center justify-center border border-[#0a0a0a]/30 text-[10px]">{k}</span>
                        <span>{l}</span>
                    </a>
                ))}
            </div>

            {/* bottom-right title */}
            <div className="absolute right-8 bottom-24 z-30 text-right">
                <p className="text-[28px] md:text-[40px] leading-[1.05] font-medium">
                    <span className="text-[#ff3d2e] font-mono text-[18px] align-top mr-2">//</span>
                    Web Designer<br />
                    Art Director
                </p>
            </div>

            {/* footer strip */}
            <div className="absolute inset-x-0 bottom-0 z-30 bg-[#0a0a0a] text-[#ff3d2e] py-3 px-8 font-mono text-[11px] flex items-center gap-2">
                <span>// Intro</span>
            </div>
        </section>
    );
});

/* ---------- STATS ---------- */

function Stats() {
    const items = [
        { v: "12+", l: "Projects shipped" },
        { v: "03", l: "Research papers" },
        { v: "02", l: "Internships" },
        { v: "26'", l: "Graduating SVEC" },
    ];
    return (
        <section className="bg-[#0a0a0a] hairline-b-dark">
            <div className="mx-auto max-w-[1400px] px-8 py-20 grid grid-cols-2 md:grid-cols-4 gap-8">
                {items.map((it, i) => (
                    <Reveal key={it.l} delay={i * 0.08}>
                        <div className="border-l border-[#1f1f1f] pl-6">
                            <div className="text-display text-[#f5f5f5]" style={{ fontSize: "72px" }}>{it.v}</div>
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
    "Computer Vision Research",
];

function Services() {
    return (
        <section id="services" className="bg-[#0a0a0a] text-[#f5f5f5] hairline-b-dark">
            <div className="mx-auto max-w-[1400px] px-8 py-6 hairline-b-dark">
                <SectionLabel>Services</SectionLabel>
            </div>
            <div className="mx-auto max-w-[1400px] px-8 py-20 grid md:grid-cols-[1fr_2fr] gap-16 items-start">
                <Reveal>
                    <div
                        className="text-display text-transparent"
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
                            <div className="group flex items-center justify-between py-5 border-b border-[#1f1f1f] hover:pl-3 transition-all duration-500 cursor-pointer">
                                <span className="text-[20px] md:text-[22px] font-medium group-hover:text-[#ff3d2e] transition-colors">
                                    {s}
                                </span>
                                <span className="font-mono text-[12px] text-[#6b6b6b]">0{i + 1}</span>
                            </div>
                        </Reveal>
                    ))}
                </div>
            </div>
        </section>
    );
}

/* ---------- PROJECTS ---------- */

const PROJECTS = [
    {
        year: "2025",
        title: "Mango Leaf\nSCANNEX PRO",
        desc: "A deep-learning leaf disease classifier with a real-time scanning interface for field deployment. Custom CNN, augmented dataset, on-device inference — built to help farmers diagnose crop disease in under two seconds.",
        image: project2,
        tags: ["AI / ML", "Mobile App", "Research"],
    },
    {
        year: "2024",
        title: "HM-SIW\nFilter ML",
        desc: "Half-mode substrate-integrated waveguide bandpass filter optimised through an artificial neural network surrogate model. Validated in HFSS, published as IEEE conference paper.",
        image: project3,
        tags: ["RF Design", "HFSS", "ANN"],
    },
    {
        year: "2024",
        title: "Formula\nVintage",
        desc: "Brand and product identity for an automotive collectors' platform. Combining timeless elegance with sleek, contemporary elements — an experience that appeals to enthusiasts and newcomers alike.",
        image: project1,
        tags: ["Landing Page", "Branding", "Redesign"],
    },
];

function Projects() {
    return (
        <section id="projects" className="bg-[#0a0a0a] text-[#f5f5f5] hairline-b-dark">
            <div className="mx-auto max-w-[1400px] px-8 py-6 hairline-b-dark">
                <SectionLabel>Projects</SectionLabel>
            </div>
            <div className="mx-auto max-w-[1400px] px-8 py-20 space-y-10">
                {PROJECTS.map((p, i) => (
                    <Reveal key={p.title} delay={i * 0.05}>
                        <article className="grid md:grid-cols-[1.4fr_1fr] gap-0 border border-[#1f1f1f]">
                            {/* image */}
                            <div className="relative group overflow-hidden bg-[#111] aspect-[4/3] md:aspect-auto">
                                <img
                                    src={p.image}
                                    alt={p.title}
                                    loading="lazy"
                                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-105"
                                />
                                <a
                                    href="#"
                                    className="absolute inset-0 flex items-center justify-center"
                                    aria-label="View project"
                                >
                                    <span className="w-20 h-20 rounded-full bg-[#ff3d2e] text-white flex items-center justify-center text-[13px] font-medium transition-transform duration-300 group-hover:scale-110">
                                        View
                                    </span>
                                </a>
                            </div>

                            {/* content */}
                            <div className="p-10 flex flex-col">
                                <p className="font-mono text-[11px] text-[#6b6b6b]">( {p.year} )</p>
                                <h3 className="text-display mt-6 whitespace-pre-line" style={{ fontSize: "clamp(40px, 4vw, 56px)" }}>
                                    {p.title}
                                </h3>
                                <p className="mt-6 text-[14px] leading-relaxed text-[#9a9a9a] max-w-md">{p.desc}</p>
                                <div className="mt-auto pt-10 border-t border-[#1f1f1f] -mx-10 px-10">
                                    {p.tags.map((t) => (
                                        <div key={t} className="flex items-center justify-between py-2.5 text-[13px] border-b border-[#1f1f1f] last:border-0">
                                            <span>{t}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </article>
                    </Reveal>
                ))}
            </div>
        </section>
    );
}

/* ---------- TESTIMONIALS ---------- */

const QUOTES = [
    {
        text: ["His keen eye for detail and innovative approach", "impressed our team, turning challenges into creative", "solutions that set him apart."],
        name: "Dr. R. Sai Kiran",
        role: "Faculty Mentor, SVEC",
    },
    {
        text: ["Harsha shipped the ML pipeline two weeks ahead of", "schedule and the model still beats the baseline. Rare", "combination of speed and rigor."],
        name: "Aarav Mehta",
        role: "Lead Engineer, Ethara AI",
    },
    {
        text: ["The RF filter design was elegant — clean math, clean", "layout, and the measured response matched simulation", "almost perfectly. Strong researcher."],
        name: "Prof. Lakshmi Devi",
        role: "ECE Department, SVEC",
    },
];

function Testimonials() {
    const [i, setI] = useState(0);
    useEffect(() => {
        const t = setInterval(() => setI((p) => (p + 1) % QUOTES.length), 5000);
        return () => clearInterval(t);
    }, []);
    const q = QUOTES[i];

    return (
        <section className="bg-[#0a0a0a] text-[#f5f5f5] hairline-b-dark">
            <div className="mx-auto max-w-[1400px] px-8 py-6 hairline-b-dark">
                <SectionLabel>Testimonials</SectionLabel>
            </div>
            <div className="mx-auto max-w-[1400px] px-8 py-24 grid md:grid-cols-[1fr_auto] gap-12 items-center">
                <div>
                    <div className="font-mono text-[11px] text-[#6b6b6b] mb-6">
                        <span className="text-[#ff3d2e]">0{i + 1}</span> / 0{QUOTES.length}
                    </div>
                    <AnimatePresence mode="wait">
                        <motion.blockquote
                            key={i}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                            className="text-display text-[#f5f5f5] max-w-[900px]"
                            style={{ fontSize: "clamp(28px, 3.4vw, 48px)", lineHeight: 1.15, letterSpacing: "-0.02em" }}
                        >
                            <span className="text-[#f5f5f5]">"{q.text[0]} </span>
                            <span className="text-[#ff3d2e]">{q.text[1]} {q.text[2]}"</span>
                        </motion.blockquote>
                    </AnimatePresence>
                    <div className="mt-10 font-mono text-[12px]">
                        <p className="text-[#f5f5f5]">// {q.name}</p>
                        <p className="text-[#6b6b6b] mt-1">{q.role}</p>
                    </div>
                </div>

                <div className="flex md:flex-col gap-3">
                    {QUOTES.map((_, idx) => (
                        <button
                            key={idx}
                            onClick={() => setI(idx)}
                            className={`w-12 h-12 rounded-full border flex items-center justify-center text-[10px] font-mono transition-all ${idx === i ? "border-[#ff3d2e] text-[#ff3d2e] scale-110" : "border-[#1f1f1f] text-[#6b6b6b]"
                                }`}
                        >
                            0{idx + 1}
                        </button>
                    ))}
                </div>
            </div>
        </section>
    );
}

/* ---------- ABOUT ---------- */

function About() {
    return (
        <section id="about" className="bg-[#0a0a0a] text-[#f5f5f5] hairline-b-dark">
            <div className="mx-auto max-w-[1400px] px-8 py-6 hairline-b-dark">
                <SectionLabel>About</SectionLabel>
            </div>
            <div className="mx-auto max-w-[1400px] px-8 py-24 grid md:grid-cols-[1.5fr_1fr] gap-16">
                <Reveal>
                    <h2 className="text-display text-[#f5f5f5]" style={{ fontSize: "clamp(40px, 5.5vw, 88px)" }}>
                        Engineer by training,<br />
                        <span className="text-[#ff3d2e]">builder</span> by instinct.
                    </h2>
                    <div className="mt-12 space-y-5 text-[15px] leading-relaxed text-[#9a9a9a] max-w-xl">
                        <p>
                            I'm Harsha — a final-year Electronics & Communication engineer at Sri Vasavi
                            Engineering College, Vijayawada. My work lives in the overlap of signal processing,
                            machine learning, and RF design.
                        </p>
                        <p>
                            I've shipped AI products end-to-end, designed substrate-integrated waveguide filters
                            tuned with ANN, and worked on LLM post-training pipelines as an intern at Ethara AI.
                        </p>
                    </div>
                </Reveal>
                <div className="space-y-6">
                    {[
                        ["Based in", "Vijayawada, India"],
                        ["Graduating", "2026"],
                        ["Focus", "AI · RF · Web"],
                        ["Status", "Open to roles"],
                    ].map(([k, v]) => (
                        <div key={k} className="flex justify-between py-4 border-b border-[#1f1f1f]">
                            <span className="font-mono text-[11px] text-[#6b6b6b] uppercase tracking-wider">{k}</span>
                            <span className="text-[14px]">{v}</span>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

/* ---------- CONTACT ---------- */

function Contact() {
    return (
        <section id="contact" className="relative bg-[#e8e6e1] text-[#0a0a0a] overflow-hidden min-h-[90vh]">
            <div className="mx-auto max-w-[1400px] px-8 py-6 hairline-b-light text-[#ff3d2e] font-mono text-[11px]">
        // Contact
            </div>

            <div className="relative">
                <div className="absolute inset-0 flex items-end justify-center pointer-events-none">
                    <img
                        src={portrait}
                        alt=""
                        className="h-[80vh] w-auto object-contain object-bottom select-none"
                        style={{ filter: "grayscale(100%) contrast(1.05)" }}
                    />
                </div>

                <div className="relative z-10 pt-32 pb-40 px-8">
                    <motion.h2
                        initial={{ opacity: 0, y: 40 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
                        className="text-display text-[#0a0a0a] text-center whitespace-nowrap"
                        style={{ fontSize: "clamp(80px, 17vw, 280px)" }}
                    >
                        Out — Reach
                    </motion.h2>
                </div>

                <div className="absolute left-8 bottom-32 z-20 font-mono text-[12px] space-y-1">
                    <p><span className="font-semibold">Office:</span> Vijayawada, Andhra Pradesh, India</p>
                    <p><span className="font-semibold">Mail:</span> vamaharsha.m@gmail.com</p>
                    <p><span className="font-semibold">Phone:</span> +91 9392849219</p>
                    <div className="flex gap-4 pt-3">
                        {["Linkedin", "Github", "Instagram"].map((s) => (
                            <a key={s} href="#" className="hover:text-[#ff3d2e] transition-colors">{s}</a>
                        ))}
                    </div>
                </div>

                <a
                    href="#top"
                    className="absolute right-8 top-16 z-20 w-12 h-12 rounded-full border border-[#0a0a0a] flex items-center justify-center hover:bg-[#0a0a0a] hover:text-[#e8e6e1] transition-colors"
                    aria-label="Back to top"
                >
                    ↑
                </a>
            </div>

            <footer className="absolute bottom-0 inset-x-0 bg-[#0a0a0a] text-[#6b6b6b] py-4 px-8 flex items-center justify-between font-mono text-[11px]">
                <span>© 2026 Vamaharsha Mahadeva</span>
                <span>Built with care · TanStack + Motion</span>
            </footer>
        </section>
    );
}

/* ---------- CERTIFICATES ---------- */

const CERTS = [
    {
        id: "tf",
        name: "TensorFlow Developer Certificate",
        issuer: "Google",
        date: "March 2024",
        credential: "TF-2024-HARSHA-001",
        category: "AI / ML",
        color: "#ff6b00",
        description:
            "Proficiency in building and training neural networks using TensorFlow for real-world ML applications.",
        image: cert1,
    },
    {
        id: "emb",
        name: "Embedded Systems Internship",
        issuer: "Ethara AI",
        date: "June 2024",
        credential: "ETHARA-INT-2024",
        category: "Embedded / IoT",
        color: "#00ff88",
        description:
            "Advanced internship in embedded systems design, firmware development, and hardware-software co-design.",
        image: cert2,
    },
    {
        id: "react",
        name: "React Developer Certification",
        issuer: "Meta / Coursera",
        date: "January 2024",
        credential: "META-REACT-2024",
        category: "Frontend",
        color: "#61dafb",
        description:
            "Advanced React — hooks, context, performance optimization, and modern composition patterns.",
        image: cert3,
    },
    {
        id: "ieee",
        name: "IEEE Paper Publication",
        issuer: "IEEE Xplore",
        date: "2025",
        credential: "IEEE-DOI-10.1109/XX",
        category: "Research",
        color: "#ffd700",
        description:
            "Published research on HM-SIW bandpass filter design optimization using ANN and Grey Wolf Optimizer.",
        image: cert4,
    },
    {
        id: "py",
        name: "Python for Data Science",
        issuer: "IBM / Coursera",
        date: "November 2023",
        credential: "IBM-PY-DS-2023",
        category: "Data Science",
        color: "#a855f7",
        description:
            "Comprehensive Python for data analysis, visualization, and end-to-end machine learning pipelines.",
        image: cert1,
    },
];

function Certificates() {
    const [active, setActive] = useState(0);
    const cert = CERTS[active];
    const c = cert.color;

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

            <div className="relative mx-auto max-w-[1400px] px-8 py-6 hairline-b-dark">
                <SectionLabel>Credentials</SectionLabel>
            </div>

            <div className="relative mx-auto max-w-[1400px] px-8 pt-16 pb-28">
                {/* Title */}
                <Reveal>
                    <h2
                        className="text-display text-center mx-auto"
                        style={{
                            fontSize: "clamp(56px, 9vw, 144px)",
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

                {/* 3 column layout */}
                <div className="mt-20 grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.2fr)_minmax(0,1fr)] gap-10 lg:gap-12 items-start">
                    {/* LEFT — list */}
                    <ul className="space-y-4">
                        {CERTS.map((ct, i) => {
                            const isActive = i === active;
                            return (
                                <li key={ct.id}>
                                    <button
                                        onClick={() => setActive(i)}
                                        className="w-full text-left rounded-md border px-5 py-4 flex items-start gap-5 transition-all duration-300"
                                        style={{
                                            borderColor: isActive ? ct.color : "#1c1c1c",
                                            background: isActive
                                                ? `linear-gradient(180deg, ${ct.color}10, transparent)`
                                                : "transparent",
                                            boxShadow: isActive ? `0 0 0 1px ${ct.color}55, 0 8px 40px -10px ${ct.color}55` : "none",
                                        }}
                                    >
                                        <span
                                            className="font-mono text-[11px] tabular-nums pt-1 shrink-0"
                                            style={{ color: isActive ? ct.color : "#5a5a5a" }}
                                        >
                                            0{i + 1}
                                        </span>
                                        <span className="min-w-0">
                                            <span
                                                className="block text-[16px] font-semibold leading-tight"
                                                style={{ color: isActive ? "#fff" : "#7a7a7a" }}
                                            >
                                                {ct.name}
                                            </span>
                                            <span
                                                className="block mt-2 font-mono text-[10px] tracking-[0.18em] uppercase"
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

                            {/* certificate overlay INSIDE frame, behind character image */}
                            <div
                                className="absolute pointer-events-none overflow-hidden rounded-[2px]"
                                style={{
                                    top: "34.2%",
                                    left: "29.8%",
                                    width: "42.5%",
                                    height: "15.3%",
                                    zIndex: 1,
                                    boxShadow: `0 0 30px ${c}77`,
                                }}
                            >
                                <AnimatePresence mode="wait">
                                    <motion.img
                                        key={cert.id}
                                        src={cert.image}
                                        alt={cert.name}
                                        loading="lazy"
                                        initial={{ opacity: 0, scale: 1.05 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        exit={{ opacity: 0, scale: 0.98 }}
                                        transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
                                        className="absolute inset-0 w-full h-full object-cover"
                                    />
                                </AnimatePresence>
                                <div
                                    className="absolute inset-0"
                                    style={{
                                        background: `linear-gradient(180deg, ${c}10, transparent 30%, transparent 70%, ${c}20)`,
                                    }}
                                />
                            </div>

                            {/* character on top */}
                            <motion.img
                                src={certCharacter}
                                alt="Harsha holding a certificate"
                                loading="lazy"
                                width={1024}
                                height={1536}
                                className="relative z-10 w-full h-full object-contain select-none pointer-events-none"
                                style={{ filter: `drop-shadow(0 24px 40px ${c}55)` }}
                                animate={{ y: [0, -6, 0] }}
                                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                            />
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
                                        <div className="font-mono text-[10px] tracking-[0.22em] uppercase text-[#5a5a5a]">
                                            Issued By
                                        </div>
                                        <div className="mt-2 text-[15px] font-medium" style={{ color: c }}>
                                            {cert.issuer}
                                        </div>
                                    </div>
                                    <div>
                                        <div className="font-mono text-[10px] tracking-[0.22em] uppercase text-[#5a5a5a]">
                                            Date
                                        </div>
                                        <div className="mt-2 text-[15px] font-medium text-[#f0f0f0]">
                                            {cert.date}
                                        </div>
                                    </div>
                                </div>

                                <p
                                    className="text-[14px] leading-relaxed text-[#9a9a9a] border-l pl-5"
                                    style={{ borderColor: c }}
                                >
                                    {cert.description}
                                </p>

                                <div
                                    className="rounded-sm border px-4 py-3"
                                    style={{ borderColor: "#1f1f1f", background: "#0d0d0d" }}
                                >
                                    <div className="font-mono text-[10px] tracking-[0.22em] uppercase text-[#5a5a5a]">
                                        Credential ID
                                    </div>
                                    <div className="mt-1.5 font-mono text-[13px]" style={{ color: c }}>
                                        {cert.credential}
                                    </div>
                                </div>

                                <a
                                    href="#"
                                    className="group block text-center border px-6 py-5 font-mono text-[11px] tracking-[0.28em] uppercase transition-all"
                                    style={{
                                        borderColor: c,
                                        color: c,
                                        boxShadow: `inset 0 0 0 0 ${c}`,
                                    }}
                                    onMouseEnter={(e) => {
                                        (e.currentTarget as HTMLAnchorElement).style.background = `${c}18`;
                                    }}
                                    onMouseLeave={(e) => {
                                        (e.currentTarget as HTMLAnchorElement).style.background = "transparent";
                                    }}
                                >
                                    Verify Certificate
                                    <span className="block mt-1">→</span>
                                </a>
                            </motion.div>
                        </AnimatePresence>
                    </div>
                </div>
            </div>
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
            <Services />
            <Projects />
            <Certificates />
            <Testimonials />
            <About />
            <Contact />
        </main>
    );
}
