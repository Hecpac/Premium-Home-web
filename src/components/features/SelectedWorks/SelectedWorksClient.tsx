"use client";

import { useState, useRef, useEffect } from "react";
import { m, AnimatePresence, useMotionValue, useSpring } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import Image from "next/image";
import { cn } from "@/lib/utils";

export interface WorkItem {
    id: string;
    title: string;
    category: "Residences" | "Estates" | "Interiors" | "Renovation";
    location: string;
    image: string;
    year: string;
    size?: "large" | "regular"; // Featured item is large
}

interface SelectedWorksClientProps {
    items: WorkItem[];
}

const FILTERS = ["All", "Residences", "Estates", "Interiors"];

export function SelectedWorksClient({ items }: SelectedWorksClientProps) {
    const [activeFilter, setActiveFilter] = useState("All");
    const [hoveredItem, setHoveredItem] = useState<string | null>(null);

    // Filter logic
    const filteredItems = activeFilter === "All"
        ? items
        : items.filter(item => item.category === activeFilter);

    // Grid layout calculation
    // We want a varied grid. On desktop: 2 columns.
    // Index 0 is often full width or large.

    return (
        <section className="py-24 w-full relative" id="selected-works">
            <div className="max-w-[1400px] mx-auto px-6">
                {/* Header & Filters */}
                <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
                    <div>
                        <h2 className="font-[family-name:var(--font-playfair)] text-5xl md:text-7xl text-white mb-6">
                            Selected Works
                        </h2>
                        {/* Filter Chips */}
                        <div className="flex flex-wrap gap-2">
                            {FILTERS.map((filter) => (
                                <button
                                    key={filter}
                                    onClick={() => setActiveFilter(filter)}
                                    className={cn(
                                        "px-4 py-1.5 rounded-full text-sm uppercase tracking-wider transition-all duration-300 border",
                                        activeFilter === filter
                                            ? "bg-white text-black border-white"
                                            : "bg-transparent text-zinc-500 border-white/10 hover:border-white/30 hover:text-white"
                                    )}
                                >
                                    {filter}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="text-right hidden md:block">
                        <span className="text-label block text-zinc-500 mb-1">(2024 — 2026)</span>
                        <span className="text-label block text-[hsl(var(--primary))]">FEATURED PORTFOLIO</span>
                    </div>
                </div>

                {/* Grid */}
                <m.div
                    layout
                    className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-12 md:gap-y-20"
                >
                    <AnimatePresence mode="popLayout">
                        {filteredItems.map((item, index) => {
                            const isLarge = item.size === "large" && activeFilter === "All"; // Only large in "All" view to maintain grid sanity

                            return (
                                <m.div
                                    key={item.id}
                                    layout
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, scale: 0.95 }}
                                    transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                                    className={cn(
                                        "relative group cursor-pointer",
                                        isLarge ? "md:col-span-2" : "md:col-span-1"
                                    )}
                                    onMouseEnter={() => setHoveredItem(item.id)}
                                    onMouseLeave={() => setHoveredItem(null)}
                                >
                                    {/* Image Container */}
                                    <div className="relative w-full overflow-hidden rounded-sm bg-zinc-900 aspect-[4/3] md:aspect-[3/2]">
                                        <Image
                                            src={item.image}
                                            alt={item.title}
                                            fill
                                            className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                                            sizes={isLarge ? "90vw" : "(max-width: 768px) 100vw, 45vw"}
                                        />
                                        {/* Overlay */}
                                        <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors duration-500" />

                                        {/* Floating Icon */}
                                        <div className="absolute top-6 right-6 bg-white/10 backdrop-blur-md p-3 rounded-full opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
                                            <ArrowUpRight className="text-white w-5 h-5" />
                                        </div>
                                    </div>

                                    {/* Info */}
                                    <div className="mt-6 flex justify-between items-start">
                                        <div className="group-hover:-translate-y-1 transition-transform duration-300">
                                            <span className="text-xs font-mono text-[hsl(var(--primary))] mb-2 block uppercase tracking-widest">
                                                {item.category} — {item.location}
                                            </span>
                                            <h3 className="font-[family-name:var(--font-playfair)] text-3xl text-white group-hover:text-zinc-200 transition-colors">
                                                {item.title}
                                            </h3>
                                        </div>
                                        <span className="text-zinc-600 font-mono text-sm hidden md:block">
                                            {item.year}
                                        </span>
                                    </div>
                                </m.div>
                            );
                        })}
                    </AnimatePresence>
                </m.div>

                {/* Empty State */}
                {filteredItems.length === 0 && (
                    <div className="py-20 text-center text-zinc-500">
                        No projects found in this category.
                    </div>
                )}
            </div>
        </section>
    );
}
