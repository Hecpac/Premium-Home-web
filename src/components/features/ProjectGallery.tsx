"use client";

import { useState, useRef } from "react";
import { m, AnimatePresence } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import Image from "next/image";
import { cn } from "@/lib/utils";

interface Project {
    id: string;
    title: string;
    category: string;
    image: string;
    year: string;
}

const projects: Project[] = [
    {
        id: "01",
        title: "The Midnight Villa",
        category: "Residential",
        image: "/images/hero-twilight.png",
        year: "2025"
    },
    {
        id: "02",
        title: "Brutalist Cliff",
        category: "Architecture",
        image: "/images/parallax-mansion.png",
        year: "2024"
    },
    {
        id: "03",
        title: "Carbon & Gold",
        category: "Interior",
        image: "/images/bento-concrete.png",
        year: "2025"
    },
    {
        id: "04",
        title: "Azure Smart Home",
        category: "Technology",
        image: "/images/bento-thermostat.png",
        year: "2024"
    }
];

export function ProjectGallery() {
    const [activeProject, setActiveProject] = useState<Project | null>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const [cursor, setCursor] = useState({ x: 0, y: 0 });

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (containerRef.current) {
            const rect = containerRef.current.getBoundingClientRect();
            setCursor({
                x: e.clientX - rect.left,
                y: e.clientY - rect.top,
            });
        }
    };

    return (
        <div
            ref={containerRef}
            onMouseMove={handleMouseMove}
            className="relative w-full py-20 overflow-hidden"
        >
            <div className="max-w-7xl mx-auto px-6">
                <h2 className="font-[family-name:var(--font-playfair)] text-4xl md:text-6xl text-[hsl(var(--foreground))] mb-16 text-center md:text-left">
                    Selected Works
                </h2>

                <div className="flex flex-col">
                    {projects.map((project) => (
                        <m.div
                            key={project.id}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }} // Only animate once to maintain list stability
                            className="group relative border-t border-white/10 py-12 md:py-16 transition-colors hover:bg-white/5 cursor-none"
                            onMouseEnter={() => setActiveProject(project)}
                            onMouseLeave={() => setActiveProject(null)}
                        >
                            <div className="flex flex-col md:flex-row items-baseline justify-between gap-4 z-10 relative">
                                <span className="text-[hsl(var(--primary))] font-mono text-sm tracking-widest">
                                    {project.id}
                                </span>

                                <h3 className="flex-1 font-[family-name:var(--font-playfair)] text-3xl md:text-5xl text-[hsl(var(--foreground))] group-hover:text-[hsl(var(--primary))] transition-colors duration-300">
                                    {project.title}
                                </h3>

                                <span className="text-zinc-500 font-light text-sm md:text-base uppercase tracking-wider group-hover:text-white transition-colors">
                                    {project.category} — {project.year}
                                </span>

                                <ArrowUpRight className="text-[hsl(var(--primary))] opacity-0 group-hover:opacity-100 transition-opacity transform group-hover:translate-x-1 group-hover:-translate-y-1 w-6 h-6" />
                            </div>
                        </m.div>
                    ))}

                    {/* Bottom border for last item */}
                    <div className="border-t border-white/10" />
                </div>
            </div>

            {/* Floating Image Portal */}
            <AnimatePresence>
                {activeProject && (
                    <m.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{
                            opacity: 1,
                            scale: 1,
                            x: cursor.x - 200, // Center the 400px image
                            y: cursor.y - 150, // Center vertically
                        }}
                        exit={{ opacity: 0, scale: 0.8 }}
                        transition={{ type: "spring", stiffness: 150, damping: 15, mass: 0.1 }}
                        className="pointer-events-none absolute top-0 left-0 z-50 w-[400px] h-[300px] hidden md:block rounded-lg overflow-hidden shadow-2xl border border-white/20"
                    >
                        <Image
                            src={activeProject.image}
                            alt={activeProject.title}
                            fill
                            className="object-cover"
                            sizes="400px" // Optimized size
                        />
                        {/* Overlay for depth */}
                        <div className="absolute inset-0 bg-black/10 mix-blend-overlay" />
                    </m.div>
                )}
            </AnimatePresence>
        </div>
    );
}
