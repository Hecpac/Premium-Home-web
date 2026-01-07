import Script from "next/script";
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";

interface FAQItem {
    question: string;
    answer: string;
}

const faqs: FAQItem[] = [
    {
        question: "¿Cómo es el proceso de consulta inicial?",
        answer:
            "Comenzamos con una sesión de descubrimiento de 90 minutos para analizar su visión, terreno y presupuesto preliminar. No es una simple venta; es una consultoría de factibilidad donde revisamos zonificación, topografía y expectativas de diseño antes de firmar cualquier contrato. Salimos de esta reunión con una hoja de ruta clara.",
    },
    {
        question: "¿Cuál es el tiempo promedio de construcción?",
        answer:
            "Para residencias de lujo (4,000 - 12,000 sqft), el ciclo completo oscila entre 14 y 20 meses. Esto incluye 3-5 meses de diseño arquitectónico y permisos, y 11-15 meses de construcción física. Nuestro software de gestión nos permite mitigar retrasos por clima o cadena de suministro con proyecciones precisas.",
    },
    {
        question: "¿Cómo garantizan la transparencia en el presupuesto?",
        answer:
            "Eliminamos el misterio financiero. Operamos bajo un modelo de 'Cost-Plus' o 'Fixed Fee' transparente. Usted tiene acceso 24/7 a nuestro dashboard financiero donde ve cada factura, recibo y costo de mano de obra en tiempo real. Definimos 'allowances' realistas desde el día 1 para evitar sorpresas en acabados.",
    },
    {
        question: "¿Se encargan de los permisos y regulaciones locales?",
        answer:
            "Absolutamente. Tenemos amplia experiencia navegando la burocracia de Dallas, Highland Park, University Park, Westlake y Southlake. Gestionamos todas las inspecciones, ingeniería civil, estudios de suelo y aprobaciones de HOAs estrictas para que usted no tenga que lidiar con el ayuntamiento.",
    },
    {
        question: "¿Qué tipo de materiales y artesanía utilizan?",
        answer:
            "Solo especificamos materiales de grado arquitectónico. Desde piedra caliza Lueders cortada a medida hasta carpintería de nogal sólido y sistemas de ventanas de perfil ultra-delgado. Nuestros artesanos son equipos dedicados que llevan años trabajando con nosotros, no subcontratistas rotativos de baja calidad.",
    },
    {
        question: "¿Pueden integrar tecnología Smart Home avanzada?",
        answer:
            "Es nuestro estándar. Diseñamos la infraestructura de bajo voltaje desde los planos. Integramos iluminación Lutron Ketra, control climático Savant/Crestron, seguridad biométrica y audio distribuido invisible. Su casa no solo será inteligente, será intuitiva y a prueba de futuro.",
    },
    {
        question: "¿Qué garantía y soporte ofrecen post-entrega?",
        answer:
            "Ofrecemos una garantía estructural de 10 años líder en la industria, más 2 años completos en instalaciones (el doble del estándar de 1 año). Además, incluimos un programa de 'Concierge' durante los primeros 12 meses para ajustes estacionales y mantenimiento preventivo sin costo adicional.",
    },
    {
        question: "¿Cómo manejan los cambios de diseño durante la obra?",
        answer:
            "Los cambios son naturales en proyectos custom. Utilizamos un proceso formal de 'Change Order' digital. Antes de ejecutar cualquier cambio, usted recibe un desglose exacto del impacto en costo y tiempo para su aprobación inmediata en su teléfono. Nada se hace sin su autorización explícita.",
    },
    {
        question: "¿Cuál es la frecuencia de comunicación durante el proyecto?",
        answer:
            "Comunicación obsesiva. Recibirá un reporte ejecutivo cada viernes con fotos de progreso, hitos alcanzados y plan para la siguiente semana. Además, tendrá reuniones quincenales en sitio (o por Zoom) con su Project Manager dedicado para decisiones críticas.",
    },
    {
        question: "¿Qué diferencia a Premium Home Design de otros constructores?",
        answer:
            "Unimos la disciplina de la ingeniería comercial con la estética del diseño de lujo. Donde otros ven 'caos de construcción', nosotros vemos logística de precisión. Nuestro enfoque en 'Confianza Operacional' significa que nunca tendrá que adivinar dónde está su dinero o cuándo terminará su casa.",
    },
    {
        question: "¿En qué áreas específicas de Dallas construyen?",
        answer:
            "Nos enfocamos en el corredor inmobilario prime: Preston Hollow, Park Cities (Highland Park/University Park), Lakewood, Midway Hollow, y hacia el norte en Las Colinas, Southlake y Westlake. Conocemos los micro-mercados y regulaciones de cada uno de estos distritos exclusivos.",
    },
    {
        question: "¿Qué incluye la visita agendada desde la web?",
        answer:
            "La visita 'Book a Visit' no es un tour de ventas. Es un recorrido privado por una de nuestras obras activas o recién terminadas. Verá lo que hay detrás de las paredes: la calidad del aislamiento, la limpieza del sitio, la organización del cableado y los detalles que las fotos no pueden mostrar.",
    },
];

// Generate FAQPage JSON-LD
const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
        "@type": "Question",
        name: faq.question,
        acceptedAnswer: {
            "@type": "Answer",
            text: faq.answer,
        },
    })),
};

export function FAQSection() {
    return (
        <section
            className="max-w-4xl mx-auto py-24 px-6 relative"
            aria-labelledby="faq-heading"
        >
            {/* FAQPage JSON-LD */}
            <Script
                id="faq-jsonld"
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
            />

            <h2
                id="faq-heading"
                className="font-[family-name:var(--font-playfair)] text-4xl md:text-5xl text-[hsl(var(--foreground))] mb-16 text-center"
            >
                Preguntas Frecuentes
            </h2>

            <Accordion type="single" collapsible className="w-full">
                {faqs.map((faq, index) => (
                    <AccordionItem key={index} value={`item-${index}`}>
                        <AccordionTrigger>{faq.question}</AccordionTrigger>
                        <AccordionContent>{faq.answer}</AccordionContent>
                    </AccordionItem>
                ))}
            </Accordion>
        </section>
    );
}
