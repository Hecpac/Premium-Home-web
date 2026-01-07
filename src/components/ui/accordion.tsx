"use client";

import * as React from "react";
import { m, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

const AccordionContext = React.createContext<{
    activeItem: string | null;
    setActiveItem: (id: string | null) => void;
}>({
    activeItem: null,
    setActiveItem: () => { },
});

export function Accordion({
    children,
    className,
    type,
    collapsible,
}: {
    children: React.ReactNode;
    className?: string;
    type?: "single" | "multiple";
    collapsible?: boolean;
}) {
    const [activeItem, setActiveItem] = React.useState<string | null>(null);

    return (
        <AccordionContext.Provider value={{ activeItem, setActiveItem }}>
            <div className={cn("space-y-4", className)}>{children}</div>
        </AccordionContext.Provider>
    );
}

export function AccordionItem({
    value,
    children,
    className,
}: {
    value: string;
    children: React.ReactNode;
    className?: string;
}) {
    return (
        <div className={cn("border-b border-white/10", className)}>
            {React.Children.map(children, (child) => {
                if (React.isValidElement(child)) {
                    // @ts-expect-error - Cloning element to pass value
                    return React.cloneElement(child, { value });
                }
                return child;
            })}
        </div>
    );
}

export function AccordionTrigger({
    children,
    className,
    value, // Injected by parent
}: {
    children: React.ReactNode;
    className?: string;
    value?: string;
}) {
    const { activeItem, setActiveItem } = React.useContext(AccordionContext);
    const isOpen = activeItem === value;

    return (
        <button
            onClick={() => setActiveItem(isOpen ? null : value!)}
            className={cn(
                "flex flex-1 items-center justify-between py-6 font-medium transition-all hover:text-[hsl(var(--primary))] text-left w-full group",
                className
            )}
        >
            <span className={cn("font-[family-name:var(--font-playfair)] text-xl md:text-2xl transition-colors", isOpen ? "text-[hsl(var(--primary))]" : "text-white")}>
                {children}
            </span>
            <ChevronDown
                className={cn(
                    "h-5 w-5 shrink-0 transition-transform duration-300 text-zinc-500 group-hover:text-white",
                    isOpen && "rotate-180 text-white"
                )}
            />
        </button>
    );
}

export function AccordionContent({
    children,
    className,
    value, // Injected by parent
}: {
    children: React.ReactNode;
    className?: string;
    value?: string;
}) {
    const { activeItem } = React.useContext(AccordionContext);
    const isOpen = activeItem === value;

    return (
        <AnimatePresence initial={false}>
            {isOpen && (
                <m.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: [0.04, 0.62, 0.23, 0.98] }}
                    className="overflow-hidden"
                >
                    <div className={cn("pb-6 pt-0 text-zinc-400 font-light leading-relaxed max-w-3xl", className)}>
                        {children}
                    </div>
                </m.div>
            )}
        </AnimatePresence>
    );
}
