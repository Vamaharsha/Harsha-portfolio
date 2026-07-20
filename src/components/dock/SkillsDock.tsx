/**
 * SkillsDock — macOS-style dock with magnification effect and real PNG icons.
 *
 * Hover magnification:
 *   - Track mouseX relative to the dock
 *   - Each icon scales based on its distance from the cursor
 *   - Closest icon scales to ~1.5x, neighbors scale proportionally
 *
 * Icon styling:
 *   - macOS "squircle" shape (border-radius: 22.37%)
 *   - Subtle gradient background behind each icon
 *   - Shadow and glass reflection
 *
 * Click:
 *   - Opens DockDetail panel above the dock
 */

import { useState, useRef, useCallback } from "react";
import {
    motion,
    useMotionValue,
    useSpring,
    useTransform,
    AnimatePresence,
} from "framer-motion";
import { DOCK_ITEMS, DOCK_CATEGORIES } from "./DockData";
import type { DockCategory, DockItem } from "./DockData";
import DockDetail from "./DockDetail";

/* ────────────────────────────────────────────────────────── */
/*  Individual dock icon with macOS magnification             */
/* ────────────────────────────────────────────────────────── */

function DockIcon({
    item,
    mouseX,
    isActive,
    onClick,
}: {
    item: DockItem;
    mouseX: ReturnType<typeof useMotionValue<number>>;
    isActive: boolean;
    onClick: () => void;
}) {
    const ref = useRef<HTMLButtonElement>(null);

    const distance = useTransform(mouseX, (val: number) => {
        const rect = ref.current?.getBoundingClientRect();
        if (!rect || val === -1) return 200;
        return val - (rect.left + rect.width / 2);
    });

    const baseSize = 52;
    const magnifiedSize = 78;
    const magnetRange = 140;

    const size = useSpring(
        useTransform(
            distance,
            [-magnetRange, 0, magnetRange],
            [baseSize, magnifiedSize, baseSize]
        ),
        { stiffness: 280, damping: 22 }
    );

    /* Subtle lift on magnify */
    const y = useSpring(
        useTransform(
            distance,
            [-magnetRange, 0, magnetRange],
            [0, -8, 0]
        ),
        { stiffness: 280, damping: 22 }
    );

    return (
        <motion.button
            ref={ref}
            onClick={onClick}
            className="relative flex flex-col items-center shrink-0 group outline-none"
            style={{ width: size, height: size, y }}
            whileTap={{ scale: 0.9 }}
        >
            {/* ── macOS squircle icon container ── */}
            <motion.div
                className="relative w-full h-full overflow-hidden cursor-pointer"
                style={{
                    width: size,
                    height: size,
                    borderRadius: "22.37%",   /* Apple squircle */
                }}
            >
                {/* Background */}
                <div
                    className="absolute inset-0 transition-all duration-300"
                    style={{
                        background: isActive
                            ? "linear-gradient(145deg, #ffffff 0%, #eaeaea 100%)"
                            : "linear-gradient(145deg, #ffffff 0%, #f4f4f6 60%, #e2e2e8 100%)",
                        boxShadow: isActive
                            ? "0 6px 20px rgba(0,0,0,0.6), 0 0 0 2px #ff3d2e, inset 0 1px 0 rgba(255,255,255,0.8)"
                            : "0 3px 10px rgba(0,0,0,0.4), 0 0 0 1px rgba(255,255,255,0.1), inset 0 1px 0 rgba(255,255,255,0.9)",
                    }}
                />

                {/* Glass highlight (top-left) */}
                <div
                    className="absolute inset-0 pointer-events-none"
                    style={{
                        background: "linear-gradient(135deg, rgba(255,255,255,0.7) 0%, rgba(255,255,255,0.15) 30%, transparent 60%)",
                        borderRadius: "22.37%",
                    }}
                />

                {/* Icon image */}
                <img
                    src={item.icon}
                    alt={item.name}
                    className="absolute inset-0 w-full h-full object-contain p-[20%] pointer-events-none select-none"
                    draggable={false}
                    style={{
                        filter: isActive ? "brightness(1.05) contrast(1.05)" : "none",
                        transition: "filter 0.3s ease",
                    }}
                />
            </motion.div>

            {/* Active indicator dot (macOS-style) */}
            {isActive && (
                <motion.div
                    layoutId="dock-active-dot"
                    className="absolute -bottom-2.5 w-[5px] h-[5px] rounded-full bg-[#ff3d2e]"
                    style={{
                        boxShadow: "0 0 6px rgba(255,61,46,0.6)",
                    }}
                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                />
            )}

            {/* Tooltip (macOS style) */}
            <div
                className="absolute -top-10 left-1/2 -translate-x-1/2 px-3 py-1.5 rounded-md whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none z-50"
                style={{
                    background: "rgba(30, 30, 36, 0.95)",
                    backdropFilter: "blur(12px)",
                    WebkitBackdropFilter: "blur(12px)",
                    border: "1px solid rgba(255,255,255,0.08)",
                    boxShadow: "0 4px 12px rgba(0,0,0,0.4)",
                }}
            >
                <span className="text-[11px] font-medium text-[#e0e0e0] tracking-wide">
                    {item.name}
                </span>
                {/* Tooltip arrow */}
                <div
                    className="absolute top-full left-1/2 -translate-x-1/2"
                    style={{
                        width: 0,
                        height: 0,
                        borderLeft: "5px solid transparent",
                        borderRight: "5px solid transparent",
                        borderTop: "5px solid rgba(30, 30, 36, 0.95)",
                    }}
                />
            </div>
        </motion.button>
    );
}

/* ────────────────────────────────────────────────────────── */
/*  Category separator (macOS dock divider)                    */
/* ────────────────────────────────────────────────────────── */

function DockDivider() {
    return (
        <div className="flex items-center self-stretch mx-1.5">
            <div className="w-[1px] h-[60%] rounded-full bg-white/[0.08]" />
        </div>
    );
}

/* ────────────────────────────────────────────────────────── */
/*  Main SkillsDock section                                   */
/* ────────────────────────────────────────────────────────── */

export default function SkillsDock() {
    const [activeCat, setActiveCat] = useState<DockCategory>("All");
    const [selectedItem, setSelectedItem] = useState<DockItem | null>(null);
    const mouseX = useMotionValue(-1);

    const filtered =
        activeCat === "All"
            ? DOCK_ITEMS
            : DOCK_ITEMS.filter((i) => i.category === activeCat);

    /* Group items by category for "All" view with dividers */
    const groupedItems: (DockItem | "divider")[] = [];
    if (activeCat === "All") {
        let lastCat = "";
        DOCK_ITEMS.forEach((item) => {
            if (item.category !== lastCat && lastCat !== "") {
                groupedItems.push("divider");
            }
            groupedItems.push(item);
            lastCat = item.category;
        });
    }

    const displayItems = activeCat === "All" ? groupedItems : filtered;

    const handleMouseMove = useCallback(
        (e: React.MouseEvent) => {
            mouseX.set(e.clientX);
        },
        [mouseX]
    );

    const handleMouseLeave = useCallback(() => {
        mouseX.set(-1);
    }, [mouseX]);

    return (
        <section
            id="skills"
            className="bg-[#0a0a0a] text-[#f5f5f5] hairline-b-dark"
        >
            {/* Section label bar */}
            <div className="mx-auto max-w-[1400px] px-8 py-6 hairline-b-dark">
                <span className="text-[#ff3d2e] font-mono text-[11px] tracking-[0.15em] uppercase">
                    // Skills & Tools
                </span>
            </div>

            <div className="mx-auto max-w-[1400px] px-8 py-16 md:py-20">
                {/* Section header */}
                <div className="text-center mb-12">
                    <h2
                        className="text-display text-[#f5f5f5]"
                        style={{
                            fontSize: "clamp(36px, 5vw, 64px)",
                            lineHeight: 1,
                            letterSpacing: "-0.03em",
                        }}
                    >
                        My <span className="text-[#ff3d2e]">Toolbox</span>
                    </h2>
                    <p className="mt-3 text-[14px] text-[#6b6b6b] max-w-lg mx-auto">
                        Hover to explore, click to see where each tool lives in my
                        work.
                    </p>
                </div>

                {/* Category tabs */}
                <div className="flex flex-wrap justify-center gap-2 mb-10">
                    {DOCK_CATEGORIES.map((cat) => {
                        const isActive = activeCat === cat;
                        return (
                            <button
                                key={cat}
                                onClick={() => {
                                    setActiveCat(cat);
                                    setSelectedItem(null);
                                }}
                                className="font-mono text-[11px] tracking-[0.1em] px-4 py-2 rounded-sm border transition-all duration-300"
                                style={{
                                    borderColor: isActive ? "#ff3d2e80" : "#1f1f1f",
                                    color: isActive ? "#ff3d2e" : "#6b6b6b",
                                    background: isActive
                                        ? "#ff3d2e10"
                                        : "transparent",
                                }}
                            >
                                {cat}
                            </button>
                        );
                    })}
                </div>

                {/* Detail panel — above dock */}
                <div className="mb-8 min-h-[40px]">
                    <AnimatePresence mode="wait">
                        {selectedItem && (
                            <DockDetail
                                key={selectedItem.id}
                                item={selectedItem}
                                onClose={() => setSelectedItem(null)}
                            />
                        )}
                    </AnimatePresence>
                </div>

                {/* ── The macOS Dock ── */}
                <div className="flex justify-center overflow-x-auto pb-4 -mb-4 scrollbar-none">
                    <div
                        onMouseMove={handleMouseMove}
                        onMouseLeave={handleMouseLeave}
                        className="inline-flex items-end gap-[6px] px-3 py-2.5 rounded-2xl relative"
                        style={{
                            background:
                                "linear-gradient(180deg, rgba(40,40,48,0.55) 0%, rgba(20,20,26,0.65) 100%)",
                            backdropFilter: "blur(20px)",
                            WebkitBackdropFilter: "blur(20px)",
                            border: "1px solid rgba(255,255,255,0.06)",
                            boxShadow:
                                "0 12px 40px rgba(0,0,0,0.5), 0 2px 8px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.04)",
                        }}
                    >
                        {/* Top shelf highlight */}
                        <div
                            className="absolute top-0 left-4 right-4 h-[1px] pointer-events-none"
                            style={{
                                background:
                                    "linear-gradient(90deg, transparent, rgba(255,255,255,0.07), transparent)",
                            }}
                        />

                        {/* Bottom shelf reflection */}
                        <div
                            className="absolute -bottom-[1px] left-6 right-6 h-[1px] pointer-events-none"
                            style={{
                                background:
                                    "linear-gradient(90deg, transparent, rgba(255,255,255,0.04), transparent)",
                            }}
                        />

                        <AnimatePresence mode="popLayout">
                            {displayItems.map((item, i) => {
                                if (item === "divider") {
                                    return (
                                        <DockDivider
                                            key={`divider-${i}`}
                                        />
                                    );
                                }
                                return (
                                    <motion.div
                                        key={item.id}
                                        layout
                                        initial={{ opacity: 0, scale: 0.5 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        exit={{ opacity: 0, scale: 0.5 }}
                                        transition={{ duration: 0.25 }}
                                    >
                                        <DockIcon
                                            item={item}
                                            mouseX={mouseX}
                                            isActive={
                                                selectedItem?.id === item.id
                                            }
                                            onClick={() =>
                                                setSelectedItem((prev) =>
                                                    prev?.id === item.id
                                                        ? null
                                                        : item
                                                )
                                            }
                                        />
                                    </motion.div>
                                );
                            })}
                        </AnimatePresence>
                    </div>
                </div>

                {/* Instruction hint */}
                <div className="text-center mt-6">
                    <span className="font-mono text-[10px] text-[#3a3a3a] tracking-[0.15em] uppercase hidden md:inline">
                        {selectedItem
                            ? `Viewing: ${selectedItem.name}`
                            : "← Hover to magnify · Click to explore →"}
                    </span>
                    <span className="font-mono text-[10px] text-[#3a3a3a] tracking-[0.15em] uppercase md:hidden">
                        {selectedItem
                            ? `Viewing: ${selectedItem.name}`
                            : "← Scroll · Tap to explore →"}
                    </span>
                </div>
            </div>
        </section>
    );
}
