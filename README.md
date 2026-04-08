# ApertureLab

![Node](https://img.shields.io/badge/node-%3E%3D20.0.0-brightgreen?style=flat-square)
![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blue?style=flat-square)
![License](https://img.shields.io/badge/license-MIT-green?style=flat-square)
![WCAG](https://img.shields.io/badge/accessibility-WCAG%202.1%20AA-blueviolet?style=flat-square)

A full-stack monorepo platform built with a modern TypeScript-first stack. ApertureLab serves as a production-grade reference for scalable frontend architecture, reusable design systems, and cross-platform development across web and mobile.

---

## Architecture decisions

### Why a monorepo with Turborepo?

Managing web and mobile as separate repositories introduces duplication of shared types, utilities, and business logic. Turborepo solves this by providing a task pipeline with intelligent caching — only rebuilding what has actually changed. This means shared packages like `@aperturelab/ui` and `@aperturelab/types` are compiled once and consumed by both `apps/web` and `apps/mobile` without redundant builds.

Alternative considered: independent repositories with a published npm package for shared code. Rejected because it introduces a publish/version cycle that slows down iteration during active development.

### Why Tailwind CSS + shadcn/ui?

shadcn/ui provides unstyled, accessible components built on Radix UI primitives. Unlike traditional component libraries (MUI, Chakra), components are copied into the codebase rather than installed as a dependency — which means full ownership over markup and behaviour. Tailwind CSS handles styling through utility classes driven by semantic design tokens defined in `tailwind.config.ts`.

This combination allows the design system to evolve independently from component behaviour: changing a token value in the config propagates across all components without touching a single component file.

### Why TanStack Query for server state and Zustand for client state?

These two libraries address fundamentally different problems. TanStack Query manages server state: data that lives on the server, needs to be fetched, cached, revalidated, and kept in sync. Zustand manages client state: ephemeral UI state that doesn't need to be persisted or synced with a server (active filters, modal visibility, user preferences).

Mixing both concerns into a single store (as Redux encourages) creates complexity where none is needed. The boundary between the two is explicit and intentional throughout this codebase.

### Why Vite over Next.js for web?

ApertureLab's web frontend is a client-side SPA. Next.js introduces SSR and file-based routing complexity that adds value for SEO-sensitive public pages, not for authenticated application interfaces. Vite provides near-instant dev server startup, HMR under 50ms, and full control over the bundle without framework opinions on routing or data fetching.

---

## Project structure

```
aperturelab/
├── apps/
│   ├── web/                        # Vite + React + TypeScript
│   │   ├── src/
│   │   │   ├── app/                # Root providers, router, global config
│   │   │   ├── modules/            # Feature modules (auth, rolls, albums)
│   │   │   │   └── [module]/
│   │   │   │       ├── components/ # Module-specific components
│   │   │   │       ├── hooks/      # Custom hooks for this module
│   │   │   │       ├── services/   # API calls for this module
│   │   │   │       ├── store/      # Zustand slice for this module
│   │   │   │       └── types/      # Module-specific TypeScript types
│   │   │   ├── shared/             # Cross-module shared code
│   │   │   │   ├── components/     # Reusable UI components
│   │   │   │   ├── hooks/          # Shared custom hooks
│   │   │   │   └── lib/            # Utilities, helpers, constants
│   │   │   └── main.tsx
│   │   ├── .env.development
│   │   ├── .env.production
│   │   ├── tailwind.config.ts
│   │   └── vite.config.ts
│   │
│   └── mobile/                     # Expo SDK + React Native + TypeScript
│       ├── src/
│       │   ├── app/                # Expo Router layout files
│       │   ├── modules/            # Feature modules (mirrors web structure)
│       │   └── shared/
│       ├── app.json
│       └── babel.config.js
│
├── packages/
│   ├── ui/                         # Shared component library
│   │   ├── src/
│   │   │   ├── components/         # shadcn/ui + custom components
│   │   │   └── index.ts
│   │   └── package.json
│   │
│   ├── types/                      # Shared TypeScript types and interfaces
│   │   ├── src/
│   │   │   ├── api/                # API request/response types
│   │   │   ├── domain/             # Domain entity types
│   │   │   └── index.ts
│   │   └── package.json
│   │
│   └── config/                     # Shared config (ESLint, TypeScript, Tailwind base)
│       ├── eslint/
│       ├── typescript/
│       └── tailwind/
│
├── exercises/                      # Technical exercises (private reference)
│   ├── 00-diagnostics/
│   ├── 01-js-fundamentals/
│   ├── 02-react-core/
│   ├── 03-typescript/
│   ├── 04-state-management/
│   ├── 05-design-system/
│   ├── 06-testing/
│   └── 07-performance/
│
├── turbo.json
├── package.json
└── README.md
```

---

## Getting started

### Prerequisites

- Node.js >= 20.0.0
- npm >= 10.0.0
- For mobile: Expo Go app installed on your device or an iOS/Android simulator

### Installation

```bash
# Clone the repository
git clone https://github.com/tu-usuario/aperturelab.git
cd aperturelab

# Install all dependencies across the monorepo
npm install

# Verify Turborepo is working
npx turbo --version
```

### Running the applications

```bash
# Run web and mobile simultaneously
npm run dev

# Run only web
npm run dev --filter=web

# Run only mobile
npm run dev --filter=mobile

# Build all apps
npm run build

# Run all tests
npm run test
```

### Environment variables

Copy the example files and populate your values:

```bash
cp apps/web/.env.example apps/web/.env.development
cp apps/mobile/.env.example apps/mobile/.env.development
```

See [Environment setup](#environment-setup) for required variables and validation schema.

---

## Design system

The design system is built on three layers:

**1. Design tokens** — defined in `apps/web/tailwind.config.ts` and `packages/config/tailwind/`. Tokens are semantic, not presentational: `color.surface.primary` rather than `color.white`. This allows theming without touching component code.

**2. Primitive components** — base components from shadcn/ui, installed directly into `packages/ui/src/components/`. Each component is self-contained with its accessibility behaviour handled by the underlying Radix UI primitive.

**3. Variant system** — component variants are defined using `class-variance-authority` (CVA). Each component exposes a typed `variants` prop rather than accepting arbitrary className strings. This enforces the design system boundaries at the type level.

Example of adding a new component variant:

```typescript
// packages/ui/src/components/Button/Button.tsx
const buttonVariants = cva(baseStyles, {
	variants: {
		intent: {
			primary: "bg-surface-brand text-content-inverse",
			secondary: "bg-surface-secondary text-content-primary",
			ghost: "bg-transparent text-content-primary hover:bg-surface-hover",
		},
		size: {
			sm: "h-8 px-3 text-sm",
			md: "h-10 px-4 text-base",
			lg: "h-12 px-6 text-lg",
		},
	},
	defaultVariants: {
		intent: "primary",
		size: "md",
	},
});
```

---

## Testing strategy

Tests are colocated with the code they test. The convention is `[filename].test.ts` or `[filename].test.tsx`.

**What is tested:**

- Custom hooks: logic, side effects, and state transitions using `renderHook`
- Utility functions: pure function behaviour and edge cases
- Components: user interactions and visible output, not implementation details
- API services: request construction and response handling with mocked fetch

**What is not tested:**

- shadcn/ui internals — accessibility behaviour is covered by Radix UI's own test suite
- TypeScript types — type correctness is verified at compile time, not at runtime
- Styling — visual regression is out of scope for this project

Run tests:

```bash
npm run test              # All tests
npm run test:watch        # Watch mode
npm run test:coverage     # With coverage report
```

---

## Accessibility

All components target **WCAG 2.1 AA** compliance. Radix UI primitives handle keyboard navigation, focus management, and ARIA attributes for interactive components. Custom components follow the same conventions.

Verification tools used:

- `axe-core` via `@axe-core/react` in development
- Manual keyboard navigation testing
- VoiceOver (macOS) for screen reader testing

---

## Development workflow

### Branch naming

```
feat/[short-description]     # New feature
fix/[short-description]      # Bug fix
refactor/[short-description] # Refactor without behaviour change
test/[short-description]     # Adding or fixing tests
docs/[short-description]     # Documentation only
```

### Commit convention

This project follows [Conventional Commits](https://www.conventionalcommits.org/):

```
feat(auth): add JWT refresh token rotation
fix(ui): correct focus ring on Button in dark mode
refactor(hooks): extract useDebounce from SearchInput
test(rolls): add unit tests for useRollStore
docs(readme): update environment setup section
```

### Pull request checklist

- [ ] Tests pass locally (`npm run test`)
- [ ] No TypeScript errors (`npm run typecheck`)
- [ ] No lint errors (`npm run lint`)
- [ ] Accessibility verified for new components
- [ ] README updated if architecture changes

---

## Environment setup

Environment variables are validated at startup using `zod`. If a required variable is missing or has an incorrect type, the application throws an explicit error rather than failing silently at runtime.

Schema is defined in `apps/web/src/lib/env.ts`:

```typescript
import { z } from "zod";

const envSchema = z.object({
	VITE_API_URL: z.string().url(),
	VITE_APP_ENV: z.enum(["development", "staging", "production"]),
});

export const env = envSchema.parse(import.meta.env);
```

---

## License

MIT
