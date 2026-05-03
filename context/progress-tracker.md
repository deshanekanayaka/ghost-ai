# Progress Tracker

Update this file whenever the current phase, active feature, or implementation state changes.

## Current Phase

- Database

## Current Goal

- Prisma schema, client singleton, and first migration applied.

## Completed

- `01-system-design`: Installed and configured shadcn/ui (Nova preset, Radix base, Tailwind v4). Added Button, Card, Dialog, Input, Tabs, Textarea, ScrollArea components to `components/ui/`. Installed `lucide-react`. Created `lib/utils.ts` with `cn()` helper. Configured `globals.css` with project dark theme CSS custom properties and `@theme inline` mappings. All shadcn semantic tokens mapped to project palette (dark-only, no `.dark` toggle).
- `02-editor`: Created `components/editor/editor-navbar.tsx` — fixed top bar (h-12, z-40) with left/center/right sections; sidebar toggle uses `PanelLeftOpen`/`PanelLeftClose` based on `isSidebarOpen` prop. Created `components/editor/project-sidebar.tsx` — fixed full-height floating overlay (z-50, w-72) that slides in from the left via `translate-x`; accepts `isOpen`/`onClose` props; "Projects" header with close button; shadcn Tabs ("My Projects" / "Shared") with empty placeholder states; full-width "New Project" button at bottom. Dialog pattern is ready for future use via the existing shadcn Dialog component and project color tokens.
- `03-auth`: Wired Clerk into the app. `ClerkProvider` in root layout uses `dark` theme from `@clerk/ui/themes` with CSS variable overrides (no hardcoded colors). `proxy.ts` at project root uses `clerkMiddleware` to protect all routes except `/sign-in` and `/sign-up`. Root page redirects authenticated users to `/editor` and unauthenticated to `/sign-in`. Sign-in and sign-up pages use a two-panel layout (logo/tagline left, Clerk form right; form-only on small screens). `UserButton` added to editor navbar right section. Editor layout marked `force-dynamic` to prevent static prerendering of auth-gated routes. `npm run build` passes.
- `04-project-dialogs`: Editor home screen with heading, description, and New Project button. `useProjectDialogs` hook + `ProjectDialogContext` in `hooks/use-project-dialogs.ts`. Create (name + live slug preview), Rename (prefilled, auto-focus, Enter submits), and Delete (destructive confirm) dialogs in `components/editor/project-dialogs.tsx`. `ProjectSidebar` updated with mock project items, hover-reveal rename/delete actions for owned projects only, mobile backdrop scrim. `EditorShell` provides context and renders dialogs. Mock data in `types/project.ts`.
- `05-prisma`: `Project` and `ProjectCollaborator` models in `prisma/models/project.prisma`. `lib/prisma.ts` exports a cached `PrismaClient` singleton using `@prisma/adapter-pg` (branches on `prisma+postgres://` for future Accelerate support). Migration `20260503211948_init_project_models` applied. Client generated to `app/generated/prisma/`. TypeScript passes; the pre-existing `/_global-error` prerender failure (Clerk/Next.js 16) is unrelated.

## In Progress

- None.

## Next Up

- API routes: project CRUD endpoints using the Prisma client.

## Open Questions

- Add unresolved product or implementation questions here.

## Architecture Decisions

- Dark-only theme: all CSS custom property tokens are set on `:root` permanently. No `.dark` class toggle is used.
- shadcn/ui semantic variables (`--background`, `--foreground`, `--card`, etc.) are set directly to the project's dark hex values on `:root`, and then re-mapped through `@theme inline` so Tailwind utilities resolve to project tokens.
- `components/ui/*` files are generated and must not be modified. Project-specific styles go in app-level components.

## Session Notes

- Using Next.js 16.2.4, Tailwind v4, TypeScript strict mode.
- shadcn/ui v4 (Nova preset) initialised. `components.json` is in the project root.
- `shadcn/tailwind.css` and `tw-animate-css` are imported in `globals.css`.
- `lib/utils.ts` provides `cn()` via `clsx` + `tailwind-merge`.
- Shell env has `NODE_ENV=production` set. Run `NODE_ENV=development npm ci` before building to ensure dev dependencies (tailwindcss, @tailwindcss/postcss) are installed.
