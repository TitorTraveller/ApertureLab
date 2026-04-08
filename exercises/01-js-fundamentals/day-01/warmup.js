/**
 * Warm-up — Día 1: Closures
 * Tiempo estimado: 20 minutos
 *
 * HABILIDADES QUE DESARROLLAS:
 * - Entender qué es un closure y cuándo se forma
 * - Diferenciar entre scope léxico (donde se DEFINE la función)
 *   y scope de ejecución (donde se LLAMA la función)
 * - Construir funciones que encapsulan estado sin usar clases
 *
 * Por qué importa para ApertureLab:
 * Los custom hooks de React son closures. Cuando escribes:
 *   const [count, setCount] = useState(0)
 * El hook "recuerda" el valor de `count` entre renders gracias a closures.
 * Entender closures explica por qué los hooks funcionan como funcionan.
 *
 * Instrucciones:
 * Completa cada función. No uses clases ni variables globales.
 * Toda la "memoria" de las funciones debe vivir en closures.
 */

// =============================================================================
// Ejercicio 1: Contador con estado encapsulado
// =============================================================================

/**
 * Crea una función `createCounter` que retorne un objeto con tres métodos.
 * El estado (count) debe ser privado — no accesible desde afuera del closure.
 *
 * Ejemplo de uso:
 *   const counter = createCounter(5)
 *   counter.increment()   // count interno: 6
 *   counter.increment()   // count interno: 7
 *   counter.decrement()   // count interno: 6
 *   counter.reset()       // count interno: 5 (vuelve al valor inicial)
 *   counter.getValue()    // retorna 5
 */

function createCounter(initialValue) {
  // COMPLETA AQUÍ
  // Pista: declara `count` en este scope. Los métodos que retornes
  // formarán closures sobre esta variable.
}

// --- Tests manuales (descomenta para probar) ---
// const c = createCounter(0)
// c.increment()
// c.increment()
// console.log(c.getValue()) // → 2
// c.reset()
// console.log(c.getValue()) // → 0

// =============================================================================
// Ejercicio 2: Memoización simple
// =============================================================================

/**
 * CONCEPTO: Memoización
 * Una función "memoizada" recuerda los resultados de llamadas anteriores.
 * Si se llama con los mismos argumentos, retorna el resultado cacheado
 * en lugar de recalcular. Es un trade-off: más memoria a cambio de menos CPU.
 *
 * React.useMemo y React.useCallback son implementaciones de este concepto.
 *
 * Crea una función `memoize` que reciba cualquier función y retorne
 * una versión memoizada de ella.
 *
 * Ejemplo de uso:
 *   const expensiveAdd = (a, b) => {
 *     console.log("calculating...") // solo debería verse la primera vez
 *     return a + b
 *   }
 *
 *   const memoizedAdd = memoize(expensiveAdd)
 *   memoizedAdd(2, 3) // → "calculating..." → 5
 *   memoizedAdd(2, 3) // → 5 (sin "calculating...", usó el cache)
 *   memoizedAdd(4, 5) // → "calculating..." → 9 (diferentes args, recalcula)
 */

function memoize(fn) {
  // COMPLETA AQUÍ
  // Pista: necesitas un Map o un objeto para almacenar los resultados.
  // La key del cache puede ser JSON.stringify(arguments) para simplificar.
  // El Map debe vivir en el closure, no en el scope global.
}

// =============================================================================
// Ejercicio 3: Función con límite de ejecución (once)
// =============================================================================

/**
 * Crea una función `once` que reciba cualquier función y retorne una versión
 * que solo puede ejecutarse UNA vez. Las llamadas posteriores retornan
 * el resultado de la primera ejecución sin volver a llamar a la función original.
 *
 * Este patrón aparece en inicialización de SDKs, event listeners únicos,
 * y en librerías como lodash.
 *
 * Ejemplo de uso:
 *   const initialize = once(() => {
 *     console.log("SDK initialized")
 *     return { ready: true }
 *   })
 *
 *   initialize() // → "SDK initialized" → { ready: true }
 *   initialize() // → { ready: true } (sin "SDK initialized")
 *   initialize() // → { ready: true } (sin "SDK initialized")
 */

function once(fn) {
  // COMPLETA AQUÍ
}

// =============================================================================
// Variante TypeScript
// =============================================================================

/**
 * Tipa las tres funciones anteriores en TypeScript.
 * El desafío está en `memoize` y `once` porque deben preservar
 * el tipo de la función que reciben (generics).
 */

// createCounter tipado
// (el tipo de retorno es un objeto — defínelo tú)

// memoize tipado
// Pista: usa generics para preservar el tipo de `fn`
// La firma debería ser algo como:
//   function memoize<TArgs extends unknown[], TReturn>(
//     fn: (...args: TArgs) => TReturn
//   ): (...args: TArgs) => TReturn

// once tipado
// Misma idea que memoize con generics
