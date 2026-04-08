/**
 * SOLUCIONES — Ejercicio 00: Diagnóstico Técnico
 *
 * Lee las soluciones DESPUÉS de haber intentado los ejercicios por tu cuenta.
 * Cada solución incluye explicación académica del concepto que demuestra.
 * El código está en inglés. Los comentarios explicativos están en español.
 */

// =============================================================================
// SECCIÓN 1 — JavaScript asíncrono
// =============================================================================

/**
 * CONCEPTO: Promise.all vs ejecución secuencial
 *
 * El error más común al trabajar con múltiples Promises es ejecutarlas
 * de forma secuencial cuando podrían ejecutarse en paralelo.
 *
 * Ejecución secuencial (LENTA):
 *   const user  = await getUserData(userId)     // espera 300ms
 *   const items = await getGalleryItems(userId)  // espera otros 200ms
 *   // tiempo total: 500ms
 *
 * Ejecución en paralelo (ÓPTIMA):
 *   const [user, items] = await Promise.all([...])
 *   // tiempo total: 300ms (el más lento de los dos)
 *
 * Promise.all inicia ambas Promises al mismo tiempo y espera a que
 * TODAS completen. Si cualquiera rechaza, Promise.all rechaza inmediatamente.
 */

// --- Solución ES6 ---

const getUserData = (userId) =>
  new Promise((resolve, reject) => {
    setTimeout(() => {
      if (!userId) reject(new Error("userId is required"))
      else resolve({ id: userId, name: "Matías", plan: "pro" })
    }, 300)
  })

const getGalleryItems = (userId) =>
  new Promise((resolve, reject) => {
    setTimeout(() => {
      if (!userId) reject(new Error("userId is required"))
      else resolve([{ id: 1, url: "photo-1.jpg" }, { id: 2, url: "photo-2.jpg" }])
    }, 200)
  })

async function fetchUserGallery(userId) {
  try {
    // Promise.all recibe un array de Promises y las ejecuta en paralelo.
    // Retorna una Promise que resuelve con un array de resultados
    // en el mismo orden que el array de entrada.
    const [user, items] = await Promise.all([
      getUserData(userId),
      getGalleryItems(userId),
    ])

    // Destructuring del array retornado por Promise.all:
    // - `user`  recibe el resultado de getUserData
    // - `items` recibe el resultado de getGalleryItems
    return { user, items }

  } catch (error) {
    // Si CUALQUIERA de las Promises rechaza, la ejecución salta
    // directamente al catch. El error contiene el motivo del rechazo.
    console.error("Failed to fetch gallery:", error.message)
    return null
  }
}

// --- Solución TypeScript ---

type User = {
  id: string
  name: string
  plan: string
}

type GalleryItem = {
  id: number
  url: string
}

// El tipo de retorno usa `| null` (union type) para modelar
// que la función puede retornar un resultado válido O null en caso de error.
// Esto fuerza al código que llama a esta función a manejar ambos casos.
type GalleryResult = {
  user: User
  items: GalleryItem[]
}

async function fetchUserGalleryTyped(userId: string): Promise<GalleryResult | null> {
  try {
    const [user, items] = await Promise.all([
      getUserData(userId),
      getGalleryItems(userId),
    ])
    return { user, items }
  } catch (error) {
    console.error("Failed to fetch gallery:", error instanceof Error ? error.message : error)
    return null
  }
}

// =============================================================================
// SECCIÓN 2 — Closures y scope
// =============================================================================

/**
 * CONCEPTO: Closure
 *
 * Un closure es una función que "recuerda" las variables del scope
 * en el que fue creada, incluso después de que ese scope haya terminado de ejecutarse.
 *
 * En el Ejemplo 1:
 * - makeCounter crea un scope local con la variable `count`
 * - Los tres métodos retornados (increment, decrement, getCount) forman closures
 *   sobre esa variable `count`
 * - Cada llamada a makeCounter crea un scope independiente con su propio `count`
 * - counterA y counterB tienen closures sobre `count` values DISTINTOS
 */

// Ejemplo 1 — respuestas:
// console.log(counterA.getCount()) → imprime 2
//   Porque counterA.increment() se llamó dos veces sobre su propio `count`
//   que empezó en 0. 0 + 1 + 1 = 2.
//
// console.log(counterB.getCount()) → imprime 9
//   Porque counterB.decrement() se llamó una vez sobre su propio `count`
//   que empezó en 10. 10 - 1 = 9.
//   La operación sobre counterA no afecta a counterB porque son scopes distintos.

/**
 * CONCEPTO: var vs let en loops
 *
 * `var` tiene function scope (o global scope si está fuera de una función).
 * `let` tiene block scope (el bloque {} más cercano).
 *
 * Con `var`:
 * - Existe UNA sola variable `i` compartida por todo el loop
 * - Cuando las funciones del array se ejecutan DESPUÉS del loop,
 *   `i` ya vale 3 (el valor final tras las tres iteraciones)
 * - Las tres funciones cierran sobre la MISMA variable `i`
 *
 * Con `let`:
 * - En cada iteración se crea una NUEVA variable `i` con block scope
 * - Cada función cierra sobre su propia copia de `i`
 * - Los valores son 0, 1, 2 respectivamente
 */

// Ejemplo 2 — respuestas con `var`:
// actions[0]() → imprime 3 (no 0)
// actions[1]() → imprime 3 (no 1)
// actions[2]() → imprime 3 (no 2)
// Las tres funciones cierran sobre la misma variable `i` que ya vale 3.

// Con `let`:
// actions[0]() → imprime 0
// actions[1]() → imprime 1
// actions[2]() → imprime 2

// Ejemplo 3 — closure y estado asíncrono:
// Imprime: "hello"
//
// La función createDelayedLogger recibe `value` como parámetro.
// En JavaScript, los primitivos (strings, numbers) se pasan POR VALOR,
// no por referencia. El closure captura el valor "hello" en el momento
// de la llamada. Cambiar `message` después no afecta lo que ya fue capturado.
//
// IMPORTANTE para React: este mismo principio explica el "stale closure" bug
// en useEffect. Si capturas una variable de estado en un effect, el effect
// "recuerda" el valor que tenía en el render donde fue creado, no el valor actual.

// --- Solución TypeScript ---

type Counter = {
  increment: () => void   // función sin parámetros ni retorno
  decrement: () => void
  getCount: () => number  // función que retorna un number
}

function makeCounterTyped(initialValue: number): Counter {
  let count = initialValue

  return {
    increment() { count++ },
    decrement() { count-- },
    getCount() { return count },
  }
}

// =============================================================================
// SECCIÓN 3 — Array methods funcionales
// =============================================================================

/**
 * CONCEPTO: Inmutabilidad en funciones de array
 *
 * map, filter, y reduce NO mutan el array original.
 * Retornan un NUEVO array (o valor) basado en el original.
 * Este principio es fundamental en React: nunca mutar state directamente.
 *
 * forEach SÍ puede mutar si lo usas para asignar a variables externas.
 * Por eso en código funcional se prefieren map/filter/reduce.
 */

const galleryItems = [
  { id: 1, url: "photo-1.jpg", filmStock: "portra400", likes: 24, published: true },
  { id: 2, url: "photo-2.jpg", filmStock: "hp5",       likes: 8,  published: false },
  { id: 3, url: "photo-3.jpg", filmStock: "portra400", likes: 51, published: true },
  { id: 4, url: "photo-4.jpg", filmStock: "velvia50",  likes: 3,  published: true },
  { id: 5, url: "photo-5.jpg", filmStock: "hp5",       likes: 17, published: false },
]

// filter retorna un nuevo array con los elementos que pasan el predicado
function getPublishedItems(items) {
  return items.filter(item => item.published)
}

// Composición de filter + map:
// Primero filtra los publicados, luego extrae solo la URL de cada uno
function getPublishedUrls(items) {
  return items
    .filter(item => item.published)
    .map(item => item.url)
}

// reduce acumula un valor a partir del array.
// El segundo argumento (0) es el valor inicial del acumulador.
// En cada iteración, `acc` es el total acumulado hasta ese punto.
function getTotalLikesForPublished(items) {
  return items
    .filter(item => item.published)
    .reduce((acc, item) => acc + item.likes, 0)
}

// reduce puede construir cualquier estructura, no solo valores escalares.
// Aquí construye un objeto donde cada key es un filmStock
// y cada value es un array de items con ese filmStock.
function groupByFilmStock(items) {
  return items.reduce((groups, item) => {
    // Si no existe la key para este filmStock, inicializa con array vacío
    // El operador || asegura que siempre tengamos un array para hacer push
    const group = groups[item.filmStock] || []

    return {
      ...groups,                              // mantiene los grupos existentes
      [item.filmStock]: [...group, item],     // agrega el item al grupo correcto
    }
  }, {}) // el acumulador inicial es un objeto vacío
}

// --- Solución TypeScript ---

type GalleryItemTyped = {
  id: number
  url: string
  filmStock: string
  likes: number
  published: boolean
}

function getPublishedItemsTyped(items: GalleryItemTyped[]): GalleryItemTyped[] {
  return items.filter(item => item.published)
}

function getPublishedUrlsTyped(items: GalleryItemTyped[]): string[] {
  return items
    .filter(item => item.published)
    .map(item => item.url)
}

function getTotalLikesForPublishedTyped(items: GalleryItemTyped[]): number {
  return items
    .filter(item => item.published)
    .reduce((acc, item) => acc + item.likes, 0)
}

// Record<string, GalleryItem[]> es un utility type de TypeScript.
// Significa: "un objeto cuyas keys son strings y cuyos values son GalleryItem[]"
// Es equivalente a escribir: { [key: string]: GalleryItemTyped[] }
function groupByFilmStockTyped(items: GalleryItemTyped[]): Record<string, GalleryItemTyped[]> {
  return items.reduce<Record<string, GalleryItemTyped[]>>((groups, item) => {
    const group = groups[item.filmStock] || []
    return {
      ...groups,
      [item.filmStock]: [...group, item],
    }
  }, {})
}

// =============================================================================
// SECCIÓN 4 — React Hooks básicos
// =============================================================================

/**
 * PROBLEMA 1: useEffect sin dependency array
 *
 * useEffect(() => { ... })          → se ejecuta en CADA render
 * useEffect(() => { ... }, [])      → se ejecuta solo en el PRIMER render (mount)
 * useEffect(() => { ... }, [userId]) → se ejecuta cuando `userId` cambia
 *
 * Sin el dependency array, el effect hace un fetch, actualiza state con setLoading
 * y setItems, lo cual causa un nuevo render, lo cual ejecuta el effect otra vez...
 * Loop infinito que satura la API.
 *
 * CORRECCIÓN: agregar [userId] como dependency array
 */

/**
 * PROBLEMA 2: Mutación directa del state
 *
 * item.likes++ muta el objeto directamente en el array de state.
 * React compara referencias de objetos para detectar cambios.
 * Si mutas el objeto pero mantienes la misma referencia del array,
 * React no detecta el cambio y no re-renderiza el componente.
 *
 * CORRECCIÓN: crear un nuevo array con el item actualizado usando map()
 *
 * function handleLike(itemId) {
 *   setItems(prevItems =>
 *     prevItems.map(item =>
 *       item.id === itemId
 *         ? { ...item, likes: item.likes + 1 }  // nuevo objeto, nueva referencia
 *         : item
 *     )
 *   )
 * }
 */

/**
 * PROBLEMA 3: Memory leak — setInterval sin cleanup
 *
 * Cuando un componente se desmonta (el usuario navega a otra página,
 * el componente desaparece del DOM), los setInterval siguen corriendo
 * en background intentando actualizar state de un componente que ya no existe.
 * React muestra un warning y puede causar comportamiento inesperado.
 *
 * useEffect puede retornar una "cleanup function" que React ejecuta
 * cuando el componente se desmonta o antes de re-ejecutar el effect.
 *
 * CORRECCIÓN:
 * useEffect(() => {
 *   const interval = setInterval(() => { ... }, 5000)
 *
 *   // cleanup function: se ejecuta al desmontar el componente
 *   return () => clearInterval(interval)
 * }, [userId])
 */

// =============================================================================
// SECCIÓN 5 — TypeScript básico
// =============================================================================

/**
 * CONCEPTO: Union types para valores discretos
 *
 * En lugar de usar `string` (que acepta cualquier valor),
 * un union type define exactamente qué valores son válidos.
 * TypeScript mostrará un error si intentas asignar un valor fuera del set.
 *
 * Esto es fundamental para modelar estados en una aplicación:
 * el compilador garantiza que no puedes llegar a un estado imposible.
 */

// Union type: solo estos cuatro valores exactos son válidos
type FilmStock = "portra400" | "hp5" | "velvia50" | "gold200"

// Union type para los estados posibles de un rollo
type RollStatus = "shooting" | "developing" | "developed"

interface Roll {
  id: string
  userId: string
  filmStock: FilmStock      // usa el union type, no `string`
  format: number            // 12, 24, o 36 (podría ser otro union type)
  exposuresUsed: number
  status: RollStatus        // usa el union type
  createdAt: Date
  developedAt: Date | null  // `null` cuando el rollo no ha sido revelado aún
}

// TypeScript infiere el tipo de retorno como `boolean` desde la expresión
function canTakePhoto(roll: Roll): boolean {
  return roll.status === "shooting" && roll.exposuresUsed < roll.format
}

// El tipo de retorno es Roll[] (array de Roll)
// TypeScript podría inferirlo, pero es buena práctica ser explícito
function getActiveRollsByFilmStock(rolls: Roll[], filmStock: FilmStock): Roll[] {
  return rolls.filter(
    roll => roll.filmStock === filmStock && roll.status === "shooting"
  )
}
