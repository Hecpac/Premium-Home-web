"use client";

import * as React from "react";
import { m, type HTMLMotionProps } from "framer-motion";
import { cn } from "@/lib/utils";

export interface ButtonProps extends HTMLMotionProps<"button"> {
    variant?: "default" | "outline" | "ghost";
    size?: "default" | "sm" | "lg" | "icon";
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
    ({ className, variant = "default", size = "default", ...props }, ref) => {
        return (
            <m.button
                ref={ref}
                whileTap={{ scale: 0.95 }}
                transition={{ duration: 0.1, ease: "easeOut" }}
                className={cn(
                    // Base styles
                    "inline-flex items-center justify-center gap-2 whitespace-nowrap font-medium",
                    "transition-colors focus-visible:outline-none focus-visible:ring-2",
                    "focus-visible:ring-[hsl(var(--ring))] focus-visible:ring-offset-2",
                    "disabled:pointer-events-none disabled:opacity-50",
                    "cursor-pointer",
                    // Variants
                    {
                        // Default: Accent gold background
                        "bg-[hsl(var(--primary))] text-[hsl(var(--primary-foreground))] rounded-full hover:bg-[hsl(var(--primary)/0.9)]":
                            variant === "default",
                        // Outline: Glassmorphism effect
                        "border border-white/20 bg-white/5 backdrop-blur-md text-[hsl(var(--foreground))] rounded-full hover:bg-white/10 hover:border-white/30":
                            variant === "outline",
                        // Ghost: Minimal
                        "hover:bg-white/10 text-[hsl(var(--foreground))] rounded-md":
                            variant === "ghost",
                    },
                    // Sizes
                    {
                        "h-10 px-6 text-sm": size === "default",
                        "h-8 px-4 text-xs": size === "sm",
                        "h-12 px-8 text-base": size === "lg",
                        "h-10 w-10 p-0": size === "icon",
                    },
                    className
                )}
                {...props}
            />
        );
    }
);

Button.displayName = "Button";

export { Button };
