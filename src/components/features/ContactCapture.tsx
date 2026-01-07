"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { AnimatePresence, m } from "framer-motion";

const formSchema = z.object({
    name: z.string().min(2, { message: "Name is required." }),
    email: z.string().email({ message: "Invalid email address." }),
    intent: z.string().refine((val) => ["new-build", "renovation", "investment"].includes(val), {
        message: "Please select an interest.",
    }),
});

type FormData = z.infer<typeof formSchema>;

export function ContactCapture() {
    const [isSubmitted, setIsSubmitted] = useState(false);

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
        setValue,
        watch,
    } = useForm<FormData>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            intent: "new-build",
        },
    });

    const selectedIntent = watch("intent");

    const onSubmit = async (data: FormData) => {
        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 1000));
        console.log("Form Data:", data);
        setIsSubmitted(true);
    };

    if (isSubmitted) {
        return (
            <m.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="w-full max-w-xl mx-auto text-center p-12 border border-white/10 bg-white/5 backdrop-blur-md rounded-sm"
            >
                <h3 className="text-3xl font-[family-name:var(--font-playfair)] text-white mb-4">Message Received.</h3>
                <p className="text-zinc-400">We will be in touch strictly within 24 hours.</p>
                <Button
                    variant="outline"
                    className="mt-8"
                    onClick={() => setIsSubmitted(false)}
                >
                    Send another
                </Button>
            </m.div>
        );
    }

    return (
        <section className="w-full max-w-2xl mx-auto px-6 py-24">
            <div className="text-center mb-16">
                <span className="text-label block mb-4">Contact</span>
                <h2 className="text-white mb-6">Let's Build.</h2>
                <p className="text-lead text-base max-w-md mx-auto">
                    Begin the conversation. No obligations, just clarity.
                </p>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-12">
                {/* Name Input - Editorial Style (Underline only) */}
                <div className="relative group">
                    <input
                        {...register("name")}
                        type="text"
                        placeholder="Your Name"
                        className="w-full bg-transparent border-b border-white/20 py-4 text-2xl md:text-3xl text-white placeholder:text-zinc-700 outline-none focus:border-[hsl(var(--primary))] transition-colors"
                    />
                    {errors.name && (
                        <span className="text-red-500 text-xs mt-2 block tracking-widest uppercase">{errors.name.message}</span>
                    )}
                </div>

                {/* Email Input */}
                <div className="relative group">
                    <input
                        {...register("email")}
                        type="email"
                        placeholder="Email Address"
                        className="w-full bg-transparent border-b border-white/20 py-4 text-2xl md:text-3xl text-white placeholder:text-zinc-700 outline-none focus:border-[hsl(var(--primary))] transition-colors"
                    />
                    {errors.email && (
                        <span className="text-red-500 text-xs mt-2 block tracking-widest uppercase">{errors.email.message}</span>
                    )}
                </div>

                {/* Intent Selection (Segmented Control) */}
                <div className="space-y-4">
                    <span className="text-label text-zinc-500">I am interested in:</span>
                    <div className="flex flex-wrap gap-4">
                        {["new-build", "renovation", "investment"].map((intent) => (
                            <button
                                key={intent}
                                type="button"
                                onClick={() => setValue("intent", intent as any)}
                                className={`px-6 py-3 rounded-full border text-sm tracking-wider uppercase transition-all duration-300 ${selectedIntent === intent
                                    ? "bg-white text-black border-white"
                                    : "bg-transparent text-zinc-500 border-white/10 hover:border-white/40"
                                    }`}
                            >
                                {intent.replace("-", " ")}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Submit Button */}
                <div className="pt-8 text-center">
                    <Button
                        type="submit"
                        size="lg"
                        className="w-full md:w-auto px-12 py-8 text-lg bg-[hsl(var(--primary))] text-black hover:bg-[hsl(var(--primary))/0.9] rounded-sm transition-all"
                        disabled={isSubmitting}
                    >
                        {isSubmitting ? "Processing..." : "Initiate Request"}
                    </Button>
                    <p className="mt-4 text-xs text-zinc-600">Privacy protected. Zero spam.</p>
                </div>
            </form>
        </section>
    );
}
