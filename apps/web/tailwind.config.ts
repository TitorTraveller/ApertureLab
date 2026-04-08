/**
 * tailwind.config.ts — apps/web
 *
 * Extiende la configuración base con los valores concretos de los tokens
 * y el CSS custom properties (variables CSS) que los definen.
 *
 * La separación base/app permite que el package `packages/ui` comparta
 * los mismos tokens sin duplicar la definición.
 */

import type { Config } from "tailwindcss"
import baseConfig from "../../packages/config/tailwind/base.js"

export default {
  content: [
    "./index.html",
    "./src/**/*.{ts,tsx}",
    "../../packages/ui/src/**/*.{ts,tsx}",
  ],
  presets: [baseConfig],
  theme: {
    extend: {
      // Aquí agregas tokens específicos de la app web que no van en el base
    },
  },
  plugins: [
    require("tailwindcss-animate"),
  ],
} satisfies Config
