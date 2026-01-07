"use client";

import { m, useScroll, useTransform, useSpring, useInView, useMotionValue, animate } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight, ChevronDown } from "lucide-react";

// --- PARALLAX WRAPPER ---
export function HeroAnimator({ children, className }: { children: React.ReactNode; className?: string }) {
    const ref = useRef(null);
    const { scrollY } = useScroll();

    // Parallax logic: slightly slower scroll for content
    const y = useTransform(scrollY, [0, 800], [0, 150]); // 150px parallax shift
    const opacity = useTransform(scrollY, [0, 400], [1, 0]);

    const springConfig = { stiffness: 100, damping: 30, mass: 1 };
    const ySpring = useSpring(y, springConfig);

    return (
        <m.div
            ref={ref}
            style={{ y: ySpring, opacity }}
            className={className}
        >
            {children}
        </m.div>
    );
}

// --- STAGGERED TITLE ---
export function HeroTitle({ children }: { children: React.ReactNode }) {
    return (
        <m.div
            initial="hidden"
            animate="visible"
            variants={{
                hidden: {},
                visible: {
                    transition: {
                        staggerChildren: 0.1,
                        delayChildren: 0.2
                    }
                }
            }}
        >
            {children}
        </m.div>
    );
}

export function TitleWord({ children, className }: { children: React.ReactNode, className?: string }) {
    return (
        <m.span
            className={className}
            variants={{
                hidden: { opacity: 0, y: 40, filter: "blur(4px)" },
                visible: {
                    opacity: 1,
                    y: 0,
                    filter: "blur(0px)",
                    transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] }
                }
            }}
            style={{ display: "inline-block", marginRight: "0.25em" }}
        >
            {children}
        </m.span>
    )
}

// --- FADE UP SUBTITLE ---
export function HeroSubtitle({ children }: { children: React.ReactNode }) {
    return (
        <m.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8, ease: "easeOut" }}
        >
            {children}
        </m.div>
    );
}

// --- BUTTONS ---
export function HeroActions() {
    return (
        <m.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 1.0, ease: "easeOut" }}
            className="flex flex-col sm:flex-row gap-6 items-start"
        >
            {/* Shining Border Button */}
            <div className="relative group">
                <div className="absolute -inset-0.5 bg-gradient-to-r from-[hsl(var(--primary))] to-blue-600 rounded-full opacity-60 blur-sm group-hover:opacity-100 transition duration-1000 group-hover:duration-200 animate-tilt"></div>
                <Button
                    size="lg"
                    className="relative px-8 text-base bg-black text-white hover:bg-black/90 border border-white/10 overflow-hidden"
                >
                    <span className="relative z-10 flex items-center">
                        Book a Consultation
                        <ArrowRight className="ml-2 w-4 h-4" />
                    </span>
                    {/* Shine effect */}
                    <div className="absolute top-0 -inset-full h-full w-1/2 z-5 block transform -skew-x-12 bg-gradient-to-r from-transparent to-white opacity-20 group-hover:animate-shine" />
                </Button>
            </div>

            <Button variant="outline" size="lg" className="px-8 text-base text-white border-white/20 hover:bg-white/10 backdrop-blur-md">
                View Projects
            </Button>
        </m.div>
    )
}

// --- ANIMATED STATS ---
function Counter({ value, suffix = "", duration = 2 }: { value: number, suffix?: string, duration?: number }) {
    const nodeRef = useRef<HTMLSpanElement>(null);
    const inView = useInView(nodeRef, { once: true, margin: "-100px" });

    useEffect(() => {
        if (inView && nodeRef.current) {
            const node = nodeRef.current;
            const controls = animate(0, value, {
                duration: duration,
                ease: "easeOut",
                onUpdate: (latest) => {
                    node.textContent = Math.round(latest).toString() + suffix;
                }
            });
            return controls.stop;
        }
    }, [inView, value, suffix, duration]);

    return <span ref={nodeRef} className="stat-value opacity-0 animate-fade-in">{0 + suffix}</span>;
}

export function HeroFacts({ children }: { children: React.ReactNode }) {
    return (
        <m.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 1.2, ease: "easeOut" }}
            className="hidden md:block"
        >
            {children}
        </m.div>
    )
}

// Expose Counter for usage in index
export { Counter };

// --- SCROLL CUE ---
export function HeroScrollCue() {
    return (
        <m.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2, duration: 1 }}
            className="absolute bottom-10 left-1/2 -translate-x-1/2 text-white/50 flex flex-col items-center gap-2"
        >
            <span className="text-[10px] uppercase tracking-[0.2em]">Scroll</span>
            <m.div
                animate={{ y: [0, 8, 0] }}
                transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
            >
                <ChevronDown className="w-4 h-4" />
            </m.div>
        </m.div>
    )
}
