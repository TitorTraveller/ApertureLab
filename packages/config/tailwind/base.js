/**
 * Base Tailwind configuration — ApertureLab design tokens
 *
 * Este archivo define los design tokens del sistema de diseño como
 * variables semánticas. "Semántico" significa que el nombre describe
 * el PROPÓSITO del token, no su valor visual.
 *
 * Ejemplo:
 *   MAL:  color.gray[100]     → describe el color
 *   BIEN: color.surface.base  → describe el rol (superficie base)
 *
 * Ventaja: cuando cambia el sistema de diseño (un rebrand, un tema oscuro),
 * solo cambias los valores aquí. Los componentes no necesitan modificarse
 * porque siguen usando los mismos nombres semánticos.
 */

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [],
  theme: {
    extend: {
      colors: {
        // --- Superficies (backgrounds) ---
        surface: {
          base:      "hsl(var(--surface-base))",
          elevated:  "hsl(var(--surface-elevated))",
          overlay:   "hsl(var(--surface-overlay))",
          brand:     "hsl(var(--surface-brand))",
          "brand-hover": "hsl(var(--surface-brand-hover))",
          danger:    "hsl(var(--surface-danger))",
          success:   "hsl(var(--surface-success))",
          warning:   "hsl(var(--surface-warning))",
        },

        // --- Contenido (texto e iconos) ---
        content: {
          primary:   "hsl(var(--content-primary))",
          secondary: "hsl(var(--content-secondary))",
          tertiary:  "hsl(var(--content-tertiary))",
          disabled:  "hsl(var(--content-disabled))",
          inverse:   "hsl(var(--content-inverse))",
          brand:     "hsl(var(--content-brand))",
          danger:    "hsl(var(--content-danger))",
          success:   "hsl(var(--content-success))",
        },

        // --- Bordes ---
        border: {
          subtle:   "hsl(var(--border-subtle))",
          default:  "hsl(var(--border-default))",
          strong:   "hsl(var(--border-strong))",
          brand:    "hsl(var(--border-brand))",
          danger:   "hsl(var(--border-danger))",
        },
      },

      // --- Tipografía ---
      fontFamily: {
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
        mono: ["var(--font-mono)", "monospace"],
      },

      fontSize: {
        // Escala tipográfica con line-height incluido
        xs:   ["0.75rem",  { lineHeight: "1rem" }],
        sm:   ["0.875rem", { lineHeight: "1.25rem" }],
        base: ["1rem",     { lineHeight: "1.5rem" }],
        lg:   ["1.125rem", { lineHeight: "1.75rem" }],
        xl:   ["1.25rem",  { lineHeight: "1.75rem" }],
        "2xl":["1.5rem",   { lineHeight: "2rem" }],
        "3xl":["1.875rem", { lineHeight: "2.25rem" }],
        "4xl":["2.25rem",  { lineHeight: "2.5rem" }],
      },

      // --- Espaciado y radios ---
      // Tailwind ya incluye una escala de spacing completa.
      // Solo extendemos con valores que no están en el default.
      borderRadius: {
        none:  "0",
        sm:    "0.25rem",   // 4px
        md:    "0.375rem",  // 6px
        DEFAULT:"0.5rem",   // 8px
        lg:    "0.75rem",   // 12px
        xl:    "1rem",      // 16px
        "2xl": "1.5rem",    // 24px
        full:  "9999px",
      },

      // --- Sombras (usadas con moderación) ---
      boxShadow: {
        sm:  "0 1px 2px 0 rgb(0 0 0 / 0.05)",
        md:  "0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)",
        lg:  "0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)",
        none:"none",
      },

      // --- Transiciones ---
      transitionDuration: {
        fast:   "100ms",
        normal: "200ms",
        slow:   "300ms",
      },
    },
  },
  plugins: [],
}
