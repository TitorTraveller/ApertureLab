# Semana 1 — JavaScript Core + Setup del repositorio

## Objetivo de la semana

Al finalizar esta semana deberías poder:

1. Explicar con tus palabras qué es un closure y dar un ejemplo práctico
2. Construir y encadenar Promises sin ayuda de documentación
3. Usar `async/await` con manejo correcto de errores
4. Entender el event loop y predecir el orden de ejecución de código asíncrono
5. Tener el repositorio ApertureLab corriendo localmente con la estructura completa

---

## Estructura de ejercicios

Cada día tiene tres bloques:

| Bloque | Duración | Propósito |
|--------|----------|-----------|
| Warm-up | 20 min | Ejercicio corto de activación. ES6 + variante TypeScript |
| Concepto | 30 min | Teoría aplicada con ejemplos comentados |
| Build | 40 min | Construcción de una pieza real en ApertureLab |

---

## Día 1 — Closures en profundidad

### Warm-up (20 min)

**Ejercicio:** `exercises/01-js-fundamentals/day-01/warmup.js`

### Concepto (30 min)

**Ejercicio:** `exercises/01-js-fundamentals/day-01/concept.js`

### Build (40 min)

**Tarea en ApertureLab:** Setup del monorepo
- Inicializar el repo con `npm init`
- Instalar Turborepo
- Crear la estructura de carpetas de `apps/` y `packages/`
- Verificar que `npm run dev` no arroja errores

---

## Día 2 — Promises: construcción y encadenamiento

Ver: `exercises/01-js-fundamentals/day-02/`

---

## Día 3 — async/await y manejo de errores

Ver: `exercises/01-js-fundamentals/day-03/`

---

## Día 4 — Event loop: call stack, task queue, microtask queue

Ver: `exercises/01-js-fundamentals/day-04/`

---

## Día 5 — Integración semanal

**Tarea:** Construir el módulo `apps/web/src/lib/env.ts` completo
y el `cn.ts` utility desde cero, con todos los conceptos de la semana aplicados.

---

## Recursos de referencia

- MDN: [Closures](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Closures)
- MDN: [Promise](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise)
- Jake Archibald: [Tasks, microtasks, queues and schedules](https://jakearchibald.com/2015/tasks-microtasks-queues-and-schedules/)
- Dan Abramov: [A Complete Guide to useEffect](https://overreacted.io/a-complete-guide-to-useeffect/) ← leer al final de la semana
