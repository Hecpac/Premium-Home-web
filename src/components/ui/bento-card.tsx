"use client";

import * as React from "react";
import { m, type HTMLMotionProps } from "framer-motion";
import { cn } from "@/lib/utils";

export interface BentoCardProps extends HTMLMotionProps<"div"> {
    children: React.ReactNode;
}

const BentoCard = React.forwardRef<HTMLDivElement, BentoCardProps>(
    ({ className, children, ...props }, ref) => {
        return (
            <m.div
                ref={ref}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                whileHover={{
                    borderColor: "rgba(198, 168, 124, 0.4)",
                    transition: { duration: 0.2 }
                }}
                className={cn(
                    // Base glassmorphism styles
                    "relative overflow-hidden rounded-2xl",
                    "bg-white/5 backdrop-blur-sm",
                    "border border-white/10",
                    // Subtle noise texture via gradient
                    "before:absolute before:inset-0 before:bg-gradient-to-br before:from-white/5 before:via-transparent before:to-transparent before:pointer-events-none",
                    // Padding
                    "p-6",
                    className
                )}
                {...props}
            >
                {children}
            </m.div>
        );
    }
);

BentoCard.displayName = "BentoCard";

export { BentoCard };
