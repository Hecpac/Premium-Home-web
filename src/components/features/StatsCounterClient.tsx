"use client";

import { useInView, useMotionValue, useReducedMotion, animate, m } from "framer-motion";
import { useEffect, useRef, useState } from "react";

/**
 * StatsCounterClient - Performance Engineering Requirements:
 * 1. Zero CLS: Uses min-width based on final value character count
 * 2. prefers-reduced-motion: Respects user accessibility preferences
 * 3. Viewport-triggered: Only animates when entering viewport (useInView)
 * 4. Efficient: Uses Framer Motion's useMotionValue + animate (no heavy libs)
 */
export function StatsCounterClient({
    value,
    prefix = "",
    suffix = "",
    duration = 2
}: {
    value: number;
    prefix?: string;
    suffix?: string;
    duration?: number;
}) {
    const nodeRef = useRef<HTMLSpanElement>(null);
    const inView = useInView(nodeRef, { once: true, margin: "-10%" }); // Trigger when 10% in view
    const motionValue = useMotionValue(0);
    const [hasAnimated, setHasAnimated] = useState(false);

    // Respect prefers-reduced-motion
    const prefersReducedMotion = useReducedMotion();

    // Calculate min-width to prevent CLS (ch unit = width of "0" character)
    const finalText = `${prefix}${value}${suffix}`;
    const minWidth = `${finalText.length}ch`;

    useEffect(() => {
        if (!inView || hasAnimated) return;

        // If user prefers reduced motion, show final value immediately
        if (prefersReducedMotion) {
            if (nodeRef.current) {
                nodeRef.current.textContent = finalText;
            }
            setHasAnimated(true);
            return;
        }

        // Animate using Framer Motion's performant animate function
        const controls = animate(motionValue, value, {
            duration: duration,
            ease: [0.22, 1, 0.36, 1], // Custom easeOutExpo for premium feel
            onUpdate: (latest) => {
                if (nodeRef.current) {
                    nodeRef.current.textContent = `${prefix}${Math.round(latest)}${suffix}`;
                }
            },
            onComplete: () => {
                setHasAnimated(true);
                if (nodeRef.current) nodeRef.current.textContent = finalText; // Ensure exact final value
            }
        });

        return () => controls.stop();
    }, [inView, hasAnimated, prefersReducedMotion, motionValue, value, duration, prefix, suffix, finalText]);

    // Render 0 initially (or final if reduced motion) but reserve space for final value
    return (
        <span
            ref={nodeRef}
            className="stat-value tabular-nums font-feature-settings-tnum"
            style={{
                minWidth,
                display: "inline-block",
                textAlign: "left"
            }}
            aria-label={finalText}
        >
            {prefersReducedMotion ? finalText : `${prefix}0${suffix}`}
        </span>
    );
}
