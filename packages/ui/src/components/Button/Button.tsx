/**
 * Button.tsx — packages/ui/src/components/Button/Button.tsx
 *
 * Componente base del sistema de diseño.
 * Demuestra el patrón completo de componentes en ApertureLab:
 *
 * 1. Radix UI Slot para composición flexible (asChild pattern)
 * 2. class-variance-authority (CVA) para variantes tipadas
 * 3. cn() para merge seguro de clases
 * 4. Accesibilidad: focus-visible, disabled states, aria attributes
 * 5. Forwarded ref para interop con librerías externas
 */

import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "../../lib/cn"

/**
 * buttonVariants define las clases de Tailwind para cada combinación
 * de variantes. CVA garantiza que solo exista UNA clase por propiedad CSS
 * en cada combinación, eliminando los conflictos que resuelve tailwind-merge.
 *
 * Por qué CVA en lugar de condicionales inline:
 *
 * SIN CVA (difícil de mantener):
 *   className={`base-styles ${variant === 'primary' ? 'bg-blue-500' : ''} ...`}
 *
 * CON CVA (declarativo, tipado, sin errores):
 *   className={buttonVariants({ intent: "primary", size: "md" })}
 */
const buttonVariants = cva(
  // Clases base: aplican en TODAS las variantes
  [
    "inline-flex items-center justify-center gap-2",
    "whitespace-nowrap rounded-md text-sm font-medium",
    "ring-offset-surface-base",
    "transition-colors duration-normal",
    // Focus accesible: solo visible cuando se navega con teclado
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-border-brand focus-visible:ring-offset-2",
    // Estado disabled: reduce opacidad y bloquea interacción
    "disabled:pointer-events-none disabled:opacity-50",
  ],
  {
    variants: {
      /**
       * `intent` describe el propósito semántico del botón.
       * Usa nombres semánticos (primary, destructive) no visuales (blue, red).
       * Esto desacopla el diseño de la implementación.
       */
      intent: {
        primary: [
          "bg-surface-brand text-content-inverse",
          "hover:bg-surface-brand-hover",
        ],
        secondary: [
          "bg-surface-elevated text-content-primary",
          "border border-border-default",
          "hover:bg-surface-overlay",
        ],
        ghost: [
          "text-content-primary",
          "hover:bg-surface-elevated hover:text-content-primary",
        ],
        destructive: [
          "bg-surface-danger text-content-inverse",
          "hover:bg-surface-danger/90",
        ],
        link: [
          "text-content-brand underline-offset-4",
          "hover:underline",
          "p-0 h-auto",
        ],
      },

      size: {
        sm: "h-8 rounded-md px-3 text-xs",
        md: "h-10 px-4 py-2",
        lg: "h-12 rounded-md px-8 text-base",
        // icon: botón cuadrado para íconos sin texto
        icon: "h-10 w-10",
      },
    },

    // defaultVariants: qué variante usar cuando no se especifica ninguna
    defaultVariants: {
      intent: "primary",
      size: "md",
    },
  }
)

/**
 * ButtonProps extiende los atributos nativos del elemento <button>.
 * VariantProps<typeof buttonVariants> agrega las props de variantes
 * como tipos TypeScript, incluyendo autocompletion en el editor.
 */
export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  /**
   * asChild: patrón de Radix UI para composición.
   * Cuando es true, el componente no renderiza un <button> sino que
   * "presta" sus estilos y comportamiento al hijo directo.
   *
   * Ejemplo: <Button asChild><a href="/home">Go home</a></Button>
   * Renderiza: <a href="/home" class="...estilos del Button...">Go home</a>
   *
   * Útil para: links que deben verse como botones, integración con React Router.
   */
  asChild?: boolean
}

/**
 * forwardRef permite que componentes padres accedan al nodo DOM del Button.
 * Necesario para librerías que requieren una ref (tooltips, popovers, etc.)
 *
 * Sin forwardRef:
 *   <Tooltip> necesita la ref del botón para posicionarse → no funciona
 *
 * Con forwardRef:
 *   <Tooltip><Button ref={...}>Click</Button></Tooltip> → funciona
 */
const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, intent, size, asChild = false, ...props }, ref) => {
    // Slot de Radix: si asChild es true, renderiza el children en lugar de <button>
    // Si asChild es false, renderiza un <button> normal
    const Comp = asChild ? Slot : "button"

    return (
      <Comp
        // cn() combina las clases de CVA con cualquier className pasado como prop
        // Si el padre pasa className, tiene prioridad (tailwind-merge resuelve conflictos)
        className={cn(buttonVariants({ intent, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)

// displayName es necesario para que React DevTools muestre el nombre correcto
// Sin esto, aparece como "ForwardRef" en el panel de componentes
Button.displayName = "Button"

export { Button, buttonVariants }
