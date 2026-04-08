/**
 * env.ts — apps/web/src/lib/env.ts
 *
 * Validación de variables de entorno en startup usando Zod.
 *
 * Por qué validar variables de entorno:
 * - Sin validación, un valor faltante se convierte en `undefined` silenciosamente
 * - El error aparece tarde: cuando la app ya está corriendo y ejecuta la llamada
 * - Con Zod, el error aparece al iniciar la app, con un mensaje claro
 *
 * Convención de Vite:
 * - Solo variables con prefijo VITE_ son accesibles en el browser
 * - Variables sin prefijo solo existen en el proceso de build (Node.js)
 * - import.meta.env es el equivalente de process.env en Vite
 */

import { z } from "zod"

// Schema de validación: define qué variables son requeridas y sus tipos
const envSchema = z.object({
  // z.string().url() valida que sea una URL válida, no solo un string
  VITE_API_URL: z.string().url({
    message: "VITE_API_URL must be a valid URL (e.g. http://localhost:4000)",
  }),

  // z.enum() valida que el valor sea exactamente uno de los definidos
  VITE_APP_ENV: z.enum(["development", "staging", "production"], {
    errorMap: () => ({
      message: "VITE_APP_ENV must be 'development', 'staging', or 'production'",
    }),
  }),

  // .default() provee un valor si la variable no está definida
  VITE_APP_NAME: z.string().default("ApertureLab"),
})

// Infiere el tipo TypeScript desde el schema de Zod
// Esto garantiza que `env` está perfectamente tipado sin repetir los tipos manualmente
type Env = z.infer<typeof envSchema>

// Parsea y valida las variables al importar este módulo
// Si la validación falla, lanza un error detallado con exactamente qué falta
function createEnv(): Env {
  const result = envSchema.safeParse(import.meta.env)

  if (!result.success) {
    // ZodError.flatten() produce un objeto legible con los errores por campo
    console.error("❌ Invalid environment variables:")
    console.error(result.error.flatten().fieldErrors)
    throw new Error("Invalid environment variables — check the console for details")
  }

  return result.data
}

// Singleton: se valida una sola vez cuando se importa el módulo
export const env = createEnv()
