import Image from "next/image";
import { HeroAnimator, HeroTitle, HeroSubtitle, HeroActions } from "./HeroAnimations";

export function HeroScene() {
    return (
        <div className="relative min-h-[95vh] flex flex-col items-center justify-center overflow-hidden w-full">
            {/* 
        CRITICAL LCP ELEMENT
        - Priority: true (Preloads image)
        - Sizes: 100vw (Full width)
        - Placeholder: blur (Simulated via props if we had blurDataURL, otherwise rely on priority)
        - RSC: No hydration needed for this visual.
      */}
            <div className="absolute inset-0 z-0 select-none pointer-events-none">
                <Image
                    src="/images/hero-twilight.png"
                    alt="Luxury Villa Twilight - Architectural Design in Dallas"
                    fill
                    priority
                    quality={90}
                    className="object-cover"
                    sizes="100vw"
                />
                {/* Dark Overlay for Text Legibility - Pure CSS, no JS */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-black/30" />
            </div>

            {/* 
        CLIENT INTERACTIVITY
        - Wrapped in LazyMotion for reduced bundle size.
        - Text is passed as children (RSC) where possible, or structured components.
      */}
            <HeroAnimator>
                <HeroTitle>
                    <h1 className="text-balance text-white mb-8 font-[family-name:var(--font-playfair)] text-7xl md:text-9xl tracking-[-0.05em] leading-[1.1] drop-shadow-2xl">
                        Luxury Living,
                        <br />
                        <span className="text-[hsl(var(--primary))] italic relative inline-block">
                            Redefined.
                        </span>
                    </h1>
                </HeroTitle>

                <HeroSubtitle>
                    <p className="max-w-xl mx-auto text-zinc-200 text-lg md:text-xl font-light mb-12 tracking-wide leading-relaxed drop-shadow-md">
                        Diseño arquitectónico premium en Dallas y Las Colinas.
                        <br className="hidden md:block" />
                        Transparencia radical, tecnología de construcción avanzada.
                    </p>
                </HeroSubtitle>

                <HeroActions />
            </HeroAnimator>
        </div>
    );
}
