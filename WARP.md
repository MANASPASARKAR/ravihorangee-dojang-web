# WARP.md

This file provides guidance to WARP (warp.dev) when working with code in this repository.

## Project Overview

This is a Taekwondo academy website built with React, TypeScript, Vite, and shadcn/ui. The design system uses a martial arts aesthetic with branded red and blue color schemes.

## Common Commands

### Development
```powershell
npm run dev
```
Starts the development server on port 8080 (accessible at http://localhost:8080)

### Build
```powershell
npm run build
```
Creates production build using Vite. Output goes to `dist/` directory. The build is configured for Netlify deployment with `base: './'`.

### Preview
```powershell
npm run preview
```
Preview the production build locally before deployment.

### Linting
Note: This project uses ESLint but does not have a lint script defined. To manually lint:
```powershell
npx eslint "**/*.{ts,tsx}"
```

## Architecture

### Tech Stack
- **Framework**: React 18 with TypeScript
- **Build Tool**: Vite 5 with SWC plugin for fast compilation
- **Styling**: TailwindCSS with custom martial arts design system
- **UI Components**: shadcn/ui (Radix UI primitives)
- **Routing**: React Router v6
- **State Management**: TanStack Query (React Query) for server state
- **Forms**: React Hook Form with Zod validation

### Directory Structure
```
src/
├── assets/          # Static assets (images, fonts, etc.)
├── components/      # React components
│   ├── ui/          # shadcn/ui components (Radix UI wrappers)
│   └── *.tsx        # Custom components (Navigation, BookingModal, etc.)
├── hooks/           # Custom React hooks (use-mobile, use-toast)
├── lib/             # Utility functions (cn helper for class merging)
├── pages/           # Route pages (Index, About, Achievements, NotFound)
├── App.tsx          # App root with routing setup
├── main.tsx         # React entry point
└── index.css        # Global styles and design system tokens
```

### Key Architectural Patterns

**Design System**: Custom CSS variables in `src/index.css` define the martial arts theme:
- Primary color: Red (`--primary`) for martial arts energy
- Secondary color: Blue (`--secondary`) for royal/discipline theme
- Custom gradients, shadows, and animations optimized for martial arts aesthetic
- Dark mode support with adjusted color values
- Utility classes like `.martial-card`, `.btn-power`, `.power-pulse`

**Import Aliases**: Use `@/` prefix for all src imports (configured in vite.config.ts):
```typescript
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
```

**Component Conventions**:
- UI primitives live in `components/ui/` (from shadcn/ui)
- Page components in `pages/` (one per route)
- Custom shared components directly in `components/`
- Use `cn()` utility from `@/lib/utils` for conditional class merging

**Routing**: All routes defined in `App.tsx`:
- `/` → Index (home page)
- `/about` → About page
- `/achievements` → Achievements page
- `*` → NotFound (404 catch-all)
- New routes MUST be added BEFORE the `*` catch-all route

**State Management**:
- React Query configured at app root for async state
- Toast notifications via sonner + shadcn toast
- Tooltips wrapped with TooltipProvider at app level

### Configuration Notes

**TypeScript**: Relaxed type checking enabled (noImplicitAny: false, strictNullChecks: false). Be mindful when making changes that strict TypeScript errors are suppressed.

**ESLint**: Configured to ignore unused variables (`@typescript-eslint/no-unused-vars: off`) and only warn on component export issues.

**Vite**: 
- Dev server runs on port 8080 with IPv6 host (`::`).
- Uses `lovable-tagger` plugin in development mode.
- Base path set to `./` for Netlify compatibility.

### Styling Approach

Use Tailwind utility classes combined with design system tokens. For complex components, prefer utility classes over custom CSS. Use the provided martial arts utility classes:
- `.martial-card` for content cards
- `.btn-power` for primary CTAs
- `.btn-secondary-power` for secondary CTAs
- `.nav-link` for navigation items
- `.power-pulse` for animated effects

Always use the `cn()` helper for conditional classes and merging.

### Adding New shadcn/ui Components

When adding new shadcn/ui components, they should be placed in `components/ui/` and use the project's design tokens from `index.css`.

### Mobile Responsiveness

The project includes mobile-specific components (`MobileNavigation.tsx`, `MobileSectionCards.tsx`) and a `use-mobile` hook for responsive behavior detection.
