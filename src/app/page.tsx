import { Navbar, BentoCard, Button } from "@/components/ui";
import { HeroScene } from "@/components/features/HeroScene";
import { ProjectGallery } from "@/components/features/ProjectGallery";
import Image from "next/image";

export default function Home() {
  return (
    <div className="min-h-screen bg-[hsl(var(--background))]">
      {/* Frosty Navbar */}
      <Navbar brandName="Premium Home" />

      <main className="px-0">
        {/* Hero Section (Stygian Luxury) */}
        <HeroScene />

        <div className="max-w-7xl mx-auto px-6">
          {/* Bento Grid (Tactile Textures) */}
          <section className="py-32">
            <div className="mb-16 text-center">
              <h2 className="font-[family-name:var(--font-playfair)] text-4xl md:text-5xl text-[hsl(var(--foreground))] mb-4">
                The Details Matter
              </h2>
              <p className="text-[hsl(var(--muted-foreground))] max-w-2xl mx-auto">
                Precision engineering meets artisanal craftsmanship.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-12 gap-6 auto-rows-[300px]">

              {/* Card A: Engineering/Structure - Concrete Macro (4:5 aspect ratio feel) */}
              <BentoCard className="md:col-span-5 md:row-span-2 relative group">
                <Image
                  src="/images/bento-concrete.png"
                  alt="Raw concrete texture details"
                  fill
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent p-6 flex flex-col justify-end z-10">
                  <h3 className="font-[family-name:var(--font-playfair)] text-3xl text-white mb-2">Structure</h3>
                  <p className="text-zinc-300 text-sm">Raw concrete meeting brushed bronze. The foundation of luxury.</p>
                </div>
              </BentoCard>

              {/* Card B: Design - Blueprints (Square) */}
              <BentoCard className="md:col-span-7 md:row-span-1 relative group">
                <Image
                  src="/images/bento-blueprints.png"
                  alt="Architectural blueprints"
                  fill
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
                <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors duration-500 p-6 flex flex-col justify-end z-10">
                  <h3 className="font-[family-name:var(--font-playfair)] text-3xl text-white">Design Phase</h3>
                  <p className="text-zinc-300 text-sm">Every millimeter planned.</p>
                </div>
              </BentoCard>

              {/* Card C: Smart Home - Thermostat (Square) */}
              <BentoCard className="md:col-span-7 md:row-span-1 relative group">
                <Image
                  src="/images/bento-thermostat.png"
                  alt="Smart home interface"
                  fill
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
                <div className="absolute inset-0 bg-gradient-to-l from-black/80 via-transparent to-transparent p-6 flex flex-col justify-center items-end text-right z-10">
                  <h3 className="font-[family-name:var(--font-playfair)] text-3xl text-white">Domotics</h3>
                  <p className="text-zinc-300 text-sm">Seamless technology integration.</p>
                </div>
              </BentoCard>
            </div>
          </section>
        </div>

        {/* Protocol 3: Magnetic Gallery */}
        <ProjectGallery />

        {/* Parallax Section (Transition) */}
        <section className="relative w-full h-[60vh] md:h-[80vh] overflow-hidden my-20">
          <Image
            src="/images/parallax-mansion.png"
            alt="Brutalist Mansion Facade"
            fill
            className="object-cover"
            sizes="100vw"
            quality={90}
          />
          <div className="absolute inset-0 bg-black/20" /> {/* Subtle tint */}
          <div className="absolute inset-0 flex items-center justify-center">
            <h2 className="font-[family-name:var(--font-playfair)] text-5xl md:text-8xl text-white/90 tracking-widest uppercase text-center mix-blend-overlay">
              Monumental
            </h2>
          </div>
        </section>

        {/* Footer Placeholder */}
        <footer className="py-20 text-center text-zinc-500">
          <p>© 2026 Premium Home Design. Dallas, TX.</p>
        </footer>
      </main>
    </div>
  );
}
