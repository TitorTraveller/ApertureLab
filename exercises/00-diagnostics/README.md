# Ejercicio 00 — Diagnóstico Técnico

## Propósito académico

Este ejercicio no tiene respuesta correcta o incorrecta en términos de aprobar o reprobar.
Su objetivo es mapear con precisión tu nivel real en las áreas fundamentales que cubrirá
el plan de 8 semanas, para que los ejercicios posteriores partan desde donde realmente estás
y no desde donde crees estar.

Las áreas evaluadas son:

1. **JavaScript asíncrono** — Promises, async/await, manejo de errores asíncronos
2. **Closures y scope** — Cómo JavaScript gestiona el acceso a variables en distintos contextos
3. **Array methods funcionales** — map, filter, reduce y su composición
4. **React Hooks básicos** — useState, useEffect y su ciclo de vida
5. **TypeScript básico** — Tipado de funciones, interfaces, y tipos union

Cada sección tiene una variante en ES6 puro y una variante en TypeScript.
Intenta completar ambas. Si la variante TypeScript te bloquea, completa solo la ES6
y anota qué fue lo que no supiste tipar — esa anotación es información valiosa.

**Tiempo estimado: 60 minutos**
No busques respuestas. El diagnóstico solo funciona si refleja tu estado actual.

---

## Sección 1 — JavaScript asíncrono

### Contexto

En ApertureLab, cada vez que un usuario carga su galería, la aplicación necesita
obtener datos desde una API. Entender cómo JavaScript maneja operaciones asíncronas
es la base para construir cualquier llamada a la API sin bugs difíciles de diagnosticar.

### Tarea ES6

Completa la función `fetchUserGallery` para que:

1. Llame a `getUserData` y `getGalleryItems` en **paralelo** (no una después de la otra)
2. Retorne un objeto con la forma `{ user, items }`
3. Si cualquiera de las dos llamadas falla, retorne `null` y loguee el error en consola

```javascript
// --- Funciones simuladas de API (no las modifiques) ---

// Simula un fetch que puede fallar
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

// --- Tu implementación ---

async function fetchUserGallery(userId) {
  // COMPLETA AQUÍ
  // Pista: considera qué método de Promise permite ejecutar
  // múltiples promesas en paralelo y esperar a que todas terminen
}

// --- Para probar tu implementación ---
fetchUserGallery("user-123").then(console.log)
fetchUserGallery(null).then(console.log)
```

### Tarea TypeScript

Misma lógica, pero tipada correctamente.

```typescript
// --- Tipos (defínelos tú) ---

// Define los tipos para User y GalleryItem
// basándote en lo que retornan las funciones simuladas arriba

type User = {
  // COMPLETA AQUÍ
}

type GalleryItem = {
  // COMPLETA AQUÍ
}

type GalleryResult = {
  // COMPLETA AQUÍ
}

// --- Funciones simuladas tipadas ---

const getUserData = (userId: string): Promise<User> =>
  new Promise((resolve, reject) => {
    setTimeout(() => {
      if (!userId) reject(new Error("userId is required"))
      else resolve({ id: userId, name: "Matías", plan: "pro" })
    }, 300)
  })

const getGalleryItems = (userId: string): Promise<GalleryItem[]> =>
  new Promise((resolve, reject) => {
    setTimeout(() => {
      if (!userId) reject(new Error("userId is required"))
      else resolve([{ id: 1, url: "photo-1.jpg" }, { id: 2, url: "photo-2.jpg" }])
    }, 200)
  })

// --- Tu implementación ---

async function fetchUserGallery(userId: string): Promise<GalleryResult | null> {
  // COMPLETA AQUÍ
}
```

---

## Sección 2 — Closures y scope

### Contexto

Los closures son el mecanismo que permite a React hooks "recordar" valores entre renders.
Entender closures explica por qué `useState` funciona, por qué `useEffect` puede capturar
valores "viejos", y cómo construir custom hooks que encapsulan lógica stateful.

### Tarea ES6

Analiza el siguiente código e indica **qué imprime cada `console.log`** y **por qué**.
No ejecutes el código. Razona desde los principios de scope y closures.

```javascript
// Ejemplo 1: closure básico
function makeCounter(initialValue) {
  let count = initialValue

  return {
    increment() { count++ },
    decrement() { count-- },
    getCount() { return count },
  }
}

const counterA = makeCounter(0)
const counterB = makeCounter(10)

counterA.increment()
counterA.increment()
counterB.decrement()

console.log(counterA.getCount()) // ¿Qué imprime? ¿Por qué?
console.log(counterB.getCount()) // ¿Qué imprime? ¿Por qué?
```

```javascript
// Ejemplo 2: closure en loop (problema clásico)
const actions = []

for (var i = 0; i < 3; i++) {
  actions.push(function() {
    console.log(i)
  })
}

actions[0]() // ¿Qué imprime? ¿Por qué?
actions[1]() // ¿Qué imprime? ¿Por qué?
actions[2]() // ¿Qué imprime? ¿Por qué?

// Ahora cambia `var` por `let` en el for loop.
// ¿Qué imprime ahora? ¿Por qué cambia el comportamiento?
```

```javascript
// Ejemplo 3: closure y estado asíncrono
// Este patrón aparece frecuentemente como bug en useEffect

function createDelayedLogger(value) {
  setTimeout(function() {
    console.log(value) // ¿Qué imprime?
  }, 1000)
}

let message = "hello"
createDelayedLogger(message)
message = "world"

// Escribe tu respuesta y explicación abajo:
// R:
```

### Tarea TypeScript

Tipea correctamente la función `makeCounter` del Ejemplo 1.

```typescript
// Define el tipo de retorno de makeCounter
// El objeto retornado tiene tres métodos: increment, decrement, getCount
// ¿Qué tipo tiene cada uno?

type Counter = {
  // COMPLETA AQUÍ
}

function makeCounter(initialValue: number): Counter {
  // COMPLETA AQUÍ — misma lógica que el ES6, ahora tipada
}
```

---

## Sección 3 — Array methods funcionales

### Contexto

En ApertureLab, los datos de la API llegan como arrays que necesitan ser filtrados,
transformados, y agrupados antes de ser renderizados. Dominar `map`, `filter`, y `reduce`
sin mutar el array original es fundamental para trabajar con React, donde la inmutabilidad
de state es un requisito, no una convención.

### Tarea ES6

Dado el siguiente array de items de una galería, completa cada función
**sin usar loops (`for`, `while`, `forEach`)** y **sin mutar el array original**.

```javascript
const galleryItems = [
  { id: 1, url: "photo-1.jpg", filmStock: "portra400", likes: 24, published: true },
  { id: 2, url: "photo-2.jpg", filmStock: "hp5",       likes: 8,  published: false },
  { id: 3, url: "photo-3.jpg", filmStock: "portra400", likes: 51, published: true },
  { id: 4, url: "photo-4.jpg", filmStock: "velvia50",  likes: 3,  published: true },
  { id: 5, url: "photo-5.jpg", filmStock: "hp5",       likes: 17, published: false },
]

// 1. Retorna solo los items publicados
function getPublishedItems(items) {
  // COMPLETA AQUÍ
}

// 2. Retorna un array con solo las URLs de los items publicados
function getPublishedUrls(items) {
  // COMPLETA AQUÍ
}

// 3. Retorna el total de likes de todos los items publicados
function getTotalLikesForPublished(items) {
  // COMPLETA AQUÍ
}

// 4. Retorna un objeto agrupado por filmStock.
// Resultado esperado:
// {
//   portra400: [{ id: 1, ... }, { id: 3, ... }],
//   hp5:       [{ id: 2, ... }, { id: 5, ... }],
//   velvia50:  [{ id: 4, ... }],
// }
function groupByFilmStock(items) {
  // COMPLETA AQUÍ
  // Pista: reduce puede construir un objeto, no solo un valor escalar
}
```

### Tarea TypeScript

Tipa las funciones anteriores. Presta atención al tipo de retorno de `groupByFilmStock`.

```typescript
type GalleryItem = {
  id: number
  url: string
  filmStock: string
  likes: number
  published: boolean
}

// COMPLETA los tipos de retorno de cada función

function getPublishedItems(items: GalleryItem[]): /* tipo de retorno */ {
  // misma lógica
}

function getPublishedUrls(items: GalleryItem[]): /* tipo de retorno */ {
  // misma lógica
}

function getTotalLikesForPublished(items: GalleryItem[]): /* tipo de retorno */ {
  // misma lógica
}

// Este es el más desafiante: ¿cómo tipas un objeto cuyas keys
// son los valores posibles de filmStock?
function groupByFilmStock(items: GalleryItem[]): /* tipo de retorno */ {
  // misma lógica
}
```

---

## Sección 4 — React Hooks básicos

### Contexto

`useState` y `useEffect` son la base de cualquier componente interactivo en React.
Pero usarlos sin entender qué pasa internamente genera bugs que son difíciles de encontrar:
estado que no se actualiza cuando esperamos, effects que se ejecutan en loop infinito,
o memory leaks por no limpiar suscripciones.

### Tarea

Analiza el siguiente componente e identifica **tres problemas** en él.
Para cada problema: describe qué hace mal, qué consecuencia tiene en el browser,
y cómo lo corregirías.

```jsx
import { useState, useEffect } from "react"

function GalleryLoader({ userId }) {
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(false)

  // Problema 1: ¿qué está mal aquí?
  useEffect(() => {
    setLoading(true)
    fetch(`/api/gallery/${userId}`)
      .then(res => res.json())
      .then(data => {
        setItems(data)
        setLoading(false)
      })
  })

  // Problema 2: ¿qué está mal en esta función?
  function handleLike(itemId) {
    items.find(item => item.id === itemId).likes++
    setItems(items)
  }

  // Problema 3: ¿qué podría fallar aquí cuando el componente se desmonta?
  useEffect(() => {
    const interval = setInterval(() => {
      fetch(`/api/gallery/${userId}/updates`)
        .then(res => res.json())
        .then(updates => setItems(prev => [...prev, ...updates]))
    }, 5000)
  }, [userId])

  if (loading) return <p>Loading...</p>

  return (
    <ul>
      {items.map(item => (
        <li key={item.id}>
          {item.url} — {item.likes} likes
          <button onClick={() => handleLike(item.id)}>Like</button>
        </li>
      ))}
    </ul>
  )
}
```

Escribe tus respuestas como comentarios en el código o debajo de cada sección marcada.

---

## Sección 5 — TypeScript básico

### Contexto

TypeScript no es solo "JavaScript con tipos". Es un sistema que te permite modelar
el dominio de tu aplicación de forma que los errores se detecten en el editor,
no en producción. Esta sección evalúa si puedes tipar código real, no ejercicios de academia.

### Tarea

Dado el siguiente código JavaScript sin tipar, agrega los tipos correctos en TypeScript.
No cambies la lógica, solo agrega tipos.

```typescript
// Este módulo maneja el estado de un rollo fotográfico en ApertureLab

// 1. Define el type para FilmStock
// Los valores posibles son exactamente: "portra400", "hp5", "velvia50", "gold200"
// (no cualquier string)
type FilmStock = // COMPLETA AQUÍ

// 2. Define el type para RollStatus
// Los valores posibles son: "shooting", "developing", "developed"
type RollStatus = // COMPLETA AQUÍ

// 3. Define la interface para Roll
interface Roll {
  // COMPLETA AQUÍ — infiere los campos desde el objeto de ejemplo abajo
}

// Objeto de ejemplo del que debes inferir los campos:
// {
//   id: "roll-abc-123",
//   userId: "user-xyz",
//   filmStock: "portra400",
//   format: 36,
//   exposuresUsed: 12,
//   status: "shooting",
//   createdAt: Date,
//   developedAt: Date | null,
// }

// 4. Tipa esta función
// Recibe un Roll y retorna true si el rollo puede seguir recibiendo fotos
function canTakePhoto(roll) {
  return roll.status === "shooting" && roll.exposuresUsed < roll.format
}

// 5. Tipa esta función
// Recibe un array de Rolls y un FilmStock
// Retorna solo los rolls que usan ese film stock y que están en estado "shooting"
function getActiveRollsByFilmStock(rolls, filmStock) {
  return rolls.filter(
    roll => roll.filmStock === filmStock && roll.status === "shooting"
  )
}
```

---

## Cómo auto-evaluar tus respuestas

Una vez que termines, revisa estas preguntas:

**Sección 1 — Async:**
- ¿Usaste `Promise.all` o `Promise.allSettled`? ¿Sabes la diferencia entre los dos?
- ¿Tu manejo de error captura el caso donde `userId` es `null`?
- ¿Sabes qué pasa si no usas `await` dentro de un `try/catch`?

**Sección 2 — Closures:**
- ¿Pudiste predecir los valores sin ejecutar el código?
- ¿Sabes explicar con tus palabras qué es un closure?
- ¿Entiendes por qué `var` y `let` se comportan diferente en el loop?

**Sección 3 — Array methods:**
- ¿Lograste no usar ningún loop imperativo?
- ¿Tu `groupByFilmStock` no muta el array de entrada?
- ¿Pudiste tipar el retorno de `groupByFilmStock` en TypeScript?

**Sección 4 — React Hooks:**
- ¿Identificaste los tres problemas?
- ¿Reconociste el memory leak del `setInterval`?
- ¿Sabes qué es el cleanup function de `useEffect` y cuándo usarla?

**Sección 5 — TypeScript:**
- ¿Usaste union types para `FilmStock` y `RollStatus`?
- ¿Usaste `Date | null` para `developedAt`?
- ¿Pudiste tipar el retorno de `getActiveRollsByFilmStock`?

Anota honestamente qué secciones te costaron más.
Esa es la información que define el énfasis de las semanas 1 y 2.
