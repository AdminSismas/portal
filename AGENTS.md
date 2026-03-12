# AGENTS.md - Portal Sismas Development Guide

## Overview

This is a **Next.js 16** project with **App Router**, **TypeScript**, **Tailwind CSS v4**, and **shadcn/ui** components. The application is a Colombian catastro (property registry) portal.

---

## Build, Lint & Test Commands

### Development
```bash
pnpm dev        # Start dev server on port 4200
pnpm build      # Production build
pnpm start      # Start production server on port 4200
pnpm lint       # Run ESLint
```

### Running Single Tests
This project does **not** have a test framework configured. If you add tests:
```bash
# Vitest (recommended for this stack)
pnpm vitest run src/components/home/__tests__/banner.test.tsx

# Or with file pattern
pnpm vitest run --testNamePattern="Banner"
```

---

## Code Style Guidelines

### General Conventions

- **Language**: TypeScript with strict mode enabled
- **Framework**: Next.js 16 App Router
- **Styling**: Tailwind CSS v4 with shadcn/ui (new-york style)
- **Icons**: lucide-react
- **Package Manager**: pnpm

### File Naming

- **Components/UI**: `kebab-case.tsx` (e.g., `banner.tsx`, `table-cadastral-search.tsx`)
- **Interfaces/Types**: `kebab-case.interface.ts` or `kebab-case.ts` (e.g., `details-cadastral.ts`, `npn-like-inputs.interface.ts`)
- **Constants**: `kebab-case.constant.ts` (e.g., `table-cadastral-search.constant.ts`)
- **Hooks**: `use-kebab-case.tsx` (e.g., `use-cadastral-search.tsx`)

### Component Structure

```typescript
"use client";  // Only for client components

import { Component } from "@/components/ui/component";
import { useHook } from "@/hooks/use-hook";
import { Type } from "@/types/type";

export function ComponentName() {
  // Hooks first
  const { data } = useHook();

  // Early returns for loading/error states
  if (isLoading) return <Loading />;
  if (error) return <Error error={error} />;

  // Render
  return (
    <div>
      {/* JSX */}
    </div>
  );
}
```

### Naming Conventions

| Type | Convention | Example |
|------|------------|---------|
| Components | PascalCase | `Banner`, `TableCadastralSearch` |
| Hooks | camelCase + `use` prefix | `useCadastralSearch`, `useGeographicViewer` |
| Interfaces | PascalCase | `DetailsCadastral`, `TableCadastralData` |
| Functions | camelCase | `filterCadastralData`, `textCenter` |
| Constants | UPPER_SNAKE_CASE | `TABLE_CADASTRAL_COLUMNS`, `URL_ENVIRONMENTS` |
| CSS Classes | kebab-case (Tailwind) | `text-center`, `flex justify-center` |

### Import Order

1. Next.js/React imports
2. Third-party UI components (shadcn/ui)
3. Internal UI components
4. Hooks
5. Interfaces/Types
6. Constants
7. Utils

```typescript
// 1. Next.js/React
import { use, useState, useCallback } from "react";
import Link from "next/link";

// 2. Third-party UI
import { Table, TableBody, TableCell } from "@/components/ui/table";
import { Button } from "@/components/ui/button";

// 3. Internal components
import { ImageCarousel } from "../shared/carousel/image-carousel";

// 4. Hooks
import { useCadastralSearchContext } from "@/src/components/services/hooks/cadastral-search-context";

// 5. Interfaces/Types
import { TableCadastralData } from "@/src/components/services/interfaces/cadastral-search/table-cadastral-columns";

// 6. Constants
import { TABLE_CADASTRAL_COLUMNS } from "@/src/components/services/cadastral-search/table-cadastral-search.constant";

// 7. Utils (if needed)
import { cn } from "@/lib/utils";
```

### Import Aliases

```typescript
@/*         → project root (e.g., @/components, @/app)
@/src/*     → src directory (for legacy src folder components)
@/components → components folder
@/lib       → lib folder (utils)
@/hooks     → hooks folder (if created)
@/components/ui → shadcn/ui components
```

### TypeScript Guidelines

- Always define explicit return types for functions when non-trivial
- Use `interface` for public API types, `type` for unions/intersections
- Prefer `| null` over optional properties for explicit nullable fields
- Use `Promise<>` for async function returns

```typescript
// Good
interface UseCadastralSearchProps {
  npn?: string;
  matricula?: string;
  page: number;
  size: number;
  baseUrl: string;
}

export function useCadastralSearch({
  npn,
  matricula,
  page,
  size,
  baseUrl,
}: UseCadastralSearchProps): {
  data: TableCadastralData[];
  isLoading: boolean;
  error: string | null;
} {
  // ...
}
```

### Error Handling

- Use try/catch for all async operations
- Set error state with user-friendly Spanish messages
- Return early on error conditions

```typescript
try {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error("Error al obtener datos detallados");
  }
  const result = await response.json();
  // handle result
} catch (err) {
  setError(err instanceof Error ? err.message : "Error desconocido");
  setData([]);
} finally {
  setIsLoading(false);
}
```

### Server vs Client Components

- Default to **Server Components** (no "use client" directive)
- Add "use client" only when:
  - Using React hooks (useState, useEffect, useCallback, etc.)
  - Using event handlers (onClick, onChange, etc.)
  - Using browser-only APIs

### Tailwind CSS

- Use Tailwind utility classes directly in JSX
- Use `cn()` utility from `@/lib/utils` for conditional classes
- Follow shadcn/ui class patterns

```typescript
import { cn } from "@/lib/utils";

<div className={cn(
  "flex justify-between items-center",
  isActive && "bg-green-500",
  className
)} />
```

### Page Structure (App Router)

```typescript
// app/[env]/page.tsx
export default function Page({ params }: { params: Promise<{ env: string }> }) {
  const { env } = use(params) as { env: string };
  return <Component env={env} />;
}
```

---

## Common Patterns

### Context Pattern for Shared State
```typescript
// context file
"use client";
import { createContext, useContext, ReactNode } from "react";

interface ContextType { /* ... */ }

const Context = createContext<ContextType | undefined>(undefined);

export function Provider({ children }: { children: ReactNode }) {
  // state and logic
  return <Context.Provider value={value}>{children}</Context.Provider>;
}

export function useContext() {
  const context = useContext(Context);
  if (!context) throw new Error("useContext must be used within Provider");
  return context;
}
```

### Fetch with URLSearchParams
```typescript
const params = new URLSearchParams();
params.append("npnlike", npn);
params.append("page", (page - 1).toString());
params.append("size", size.toString());
const urlWithParams = `${url}?${params.toString()}`;
```

---

## Project Structure

```
portal-sismas/
├── app/                    # Next.js App Router pages
│   ├── [env]/             # Dynamic environment routes
│   │   ├── page.tsx
│   │   ├── layout.tsx
│   │   └── services/
│   └── layout.tsx         # Root layout
├── src/
│   ├── components/        # React components
│   │   ├── home/
│   │   ├── services/
│   │   └── shared/
│   ├── config/            # Configuration files
│   └── constants/         # App constants
├── components/            # shadcn/ui components
├── lib/                   # Utilities (utils.ts)
├── public/                # Static assets
└── package.json
```

---

## Linting

The project uses ESLint with Next.js core web vitals and TypeScript rules from `eslint-config-next`. Run:
```bash
pnpm lint
```

---

## Notes

- All user-facing text should be in **Spanish**
- The portal uses a green color scheme (#10b981 / green-500)
- Port 4200 is used for dev/prod servers (not default 3000)
- This is a Colombian government catastro (property registry) system
