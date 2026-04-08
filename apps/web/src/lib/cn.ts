/**
 * cn.ts — apps/web/src/lib/cn.ts
 *
 * Utility para combinar clases de Tailwind de forma segura.
 *
 * El problema que resuelve:
 * Tailwind genera CSS con clases atómicas. Si tienes dos clases que afectan
 * la misma propiedad CSS, la que "gana" depende del orden en el CSS generado,
 * NO del orden en que las escribes en el HTML.
 *
 * Ejemplo del problema:
 *   <div className="bg-red-500 bg-blue-500">  ← ¿cuál color aplica?
 *
 * La respuesta depende del orden en el CSS compilado, que es impredecible.
 *
 * clsx:          combina clases condicionalmente, elimina duplicados triviales
 * tailwind-merge: detecta conflictos de Tailwind y deja solo la última clase ganadora
 *
 * Ejemplo con cn():
 *   cn("bg-red-500", "bg-blue-500")
 *   → "bg-blue-500"   (tailwind-merge resuelve el conflicto)
 *
 *   cn("px-4", condition && "px-8")
 *   → "px-8" si condition es true (clsx maneja el condicional)
 *   → "px-4" si condition es false
 *
 * Esta función aparece en prácticamente todos los componentes.
 * Es el building block del sistema de variantes con CVA.
 */

import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]): string {
  // 1. clsx combina los inputs (strings, objetos, arrays, condicionales)
  //    en un único string de clases
  // 2. twMerge resuelve conflictos entre clases de Tailwind
  return twMerge(clsx(inputs))
}

// Ejemplos de uso en componentes:
//
// cn("base-class", isActive && "active-class", isDisabled && "disabled-class")
//
// cn(
//   "flex items-center",
//   variant === "primary" && "bg-surface-brand text-content-inverse",
//   variant === "ghost"   && "bg-transparent text-content-primary",
//   className  // permite override desde el padre
// )
