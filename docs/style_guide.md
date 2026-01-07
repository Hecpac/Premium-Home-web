# GUÍA DE ESTILO: Premium Home Design

## 1. Filosofía de Diseño [11]
*   **Tema:** Dark Mode predominante (evoca tecnología y exclusividad). Fondos oscuros profundos, no negro puro (#000000), para reducir fatiga visual.
*   **Vibe:** "Ingeniería Militar meets Hotel de Lujo". Líneas limpias, tipografía sans-serif técnica, espacios negativos amplios.
*   **Referencias:** Palantir (densidad de información), Linear (micro-interacciones), Stripe (legibilidad) [12].

## 2. Paleta de Colores (Tailwind Config)
*   **Primary (Brand):** `hsl(215, 100%, 50%)` (Deep Royal Blue). El azul evoca confianza y seguridad en el sector construcción [11].
*   **Background:** `hsl(224, 71%, 4%)` (Midnight Blue/Black).
*   **Surface/Card:** `hsl(224, 71%, 10%)` con bordes sutiles `hsl(215, 20%, 20%)`.
*   **Accent/Action:** `hsl(35, 100%, 55%)` (Gold/Amber) - Usar EXCLUSIVAMENTE para CTAs primarios ("Solicitar Cotización").

## 3. Tipografía [13]
*   **Font Family:** `Geist Sans` o `Inter` (Optimized for UI).
*   **Escala:**
    *   H1 Hero: 48px (Mobile) / 72px (Desktop) - Tight tracking (-0.02em).
    *   Body: 16px (Base) - Previene auto-zoom en iOS [13].
    *   Micro-copy: 14px (Captions, legales).

## 4. Sistema de Componentes (Shadcn UI + Motion) [14, 15]
*   **Botones:** Pill-shaped (redondeados completos), con efecto sutil de "glow" en hover.
*   **Tarjetas (Bento Grid):** Bordes translúcidos (Glassmorphism), fondo con ruido sutil (noise texture) para evitar banding.
*   **Animaciones:**
    *   *Entradas:* Staggered fade-in para listas y grids.
    *   *Interacciones:* Escala al 98% en click (active), escala al 102% en hover.
    *   *Física:* Usar `type: "spring", stiffness: 300, damping: 30` en Framer Motion. Nada de curvas Bézier lineales aburridas.

## 5. Reglas de Imágenes [16]
*   **Formato:** WebP/AVIF obligatorio.
*   **Componente:** Siempre usar `<Image />` de Next.js con `placeholder="blur"`.
*   **Estilo:** Bordes redondeados `rounded-xl` en todas las fotos de portafolio.

## 6. Accesibilidad (WCAG 2.1 AA) [17]
*   **Contraste:** Texto secundario debe tener ratio 4.5:1 mínimo sobre el fondo oscuro.
*   **Foco:** Anillos de foco visibles en navegación por teclado (outline-primary).
