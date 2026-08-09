import { MeshGradient } from "@paper-design/shaders-react";
import { motion } from "framer-motion";
import { useState, useEffect, useRef, useCallback } from "react";

const GHOST_PATH =
    "M230.809 115.385V249.411C230.809 269.923 214.985 287.282 194.495 288.411C184.544 288.949 175.364 285.718 168.26 280C159.746 273.154 147.769 273.461 139.178 280.23C132.638 285.384 124.381 288.462 115.379 288.462C106.377 288.462 98.1451 285.384 91.6055 280.23C82.912 273.385 70.9353 273.385 62.2415 280.23C55.7532 285.334 47.598 288.411 38.7246 288.462C17.4132 288.615 0 270.667 0 249.359V115.385C0 51.6667 51.6756 0 115.404 0C179.134 0 230.809 51.6667 230.809 115.385Z";

export function MeshGradientSVG({ className = "" }: { className?: string }) {
    const colors: [string, string, string, string, string] = [
        "#FFB3D9",
        "#87CEEB",
        "#4A90E2",
        "#2C3E50",
        "#1A1A2E",
    ];

    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    const [eyeOffset, setEyeOffset] = useState({ x: 0, y: 0 });
    const containerRef = useRef<HTMLDivElement>(null);

    const handleMouseMove = useCallback((e: MouseEvent) => {
        setMousePosition({ x: e.clientX, y: e.clientY });
    }, []);

    useEffect(() => {
        window.addEventListener("mousemove", handleMouseMove);
        return () => window.removeEventListener("mousemove", handleMouseMove);
    }, [handleMouseMove]);

    useEffect(() => {
        const el = containerRef.current;
        if (!el) return;
        const rect = el.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height * 0.42;

        const deltaX = (mousePosition.x - centerX) * 0.08;
        const deltaY = (mousePosition.y - centerY) * 0.08;

        const maxOffset = 8;
        setEyeOffset({
            x: Math.max(-maxOffset, Math.min(maxOffset, deltaX)),
            y: Math.max(-maxOffset, Math.min(maxOffset, deltaY)),
        });
    }, [mousePosition]);

    return (
        <motion.div
            ref={containerRef}
            className={`relative mx-auto ${className}`}
            animate={{
                y: [0, -8, 0],
                scaleY: [1, 1.08, 1],
            }}
            transition={{
                duration: 2.8,
                repeat: Number.POSITIVE_INFINITY,
                ease: "easeInOut",
            }}
            style={{
                transformOrigin: "top center",
                /* Fixed size matching the SVG path coordinate space */
                width: "231px",
                height: "289px",
            }}
        >
            {/*
              Layer 1: MeshGradient clipped to ghost shape using CSS clip-path.
              CSS clip-path: path() works on WebGL canvas in ALL browsers
              (Safari, Chrome, Firefox) unlike SVG clipPath on foreignObject.
            */}
            <div
                style={{
                    position: "absolute",
                    inset: 0,
                    width: "231px",
                    height: "289px",
                    clipPath: `path('${GHOST_PATH}')`,
                    WebkitClipPath: `path('${GHOST_PATH}')`,
                }}
            >
                <MeshGradient
                    colors={colors}
                    speed={1}
                    style={{ width: "231px", height: "289px" }}
                />
            </div>

            {/*
              Layer 2: Eyes SVG overlay — same viewBox as ghost path coords.
              Positioned absolutely on top of the clipped gradient.
            */}
            <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 231 289"
                style={{
                    position: "absolute",
                    inset: 0,
                    width: "231px",
                    height: "289px",
                    pointerEvents: "none",
                    zIndex: 10,
                }}
            >
                {/* Left Eye */}
                <motion.ellipse
                    rx="20"
                    ry="30"
                    fill="white"
                    className="ghost-eye"
                    animate={{
                        cx: 80 + eyeOffset.x,
                        cy: 120 + eyeOffset.y,
                    }}
                    transition={{ type: "spring", stiffness: 150, damping: 15 }}
                />

                {/* Right Eye */}
                <motion.ellipse
                    rx="20"
                    ry="30"
                    fill="white"
                    className="ghost-eye"
                    animate={{
                        cx: 150 + eyeOffset.x,
                        cy: 120 + eyeOffset.y,
                    }}
                    transition={{ type: "spring", stiffness: 150, damping: 15 }}
                />
            </svg>
        </motion.div>
    );
}
