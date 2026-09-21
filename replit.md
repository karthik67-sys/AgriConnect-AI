# AgriConnect AI

AgriConnect AI is a responsive frontend prototype connecting farmers, consumers, delivery partners, and volunteers with demo market intelligence and support workflows.

## Run & Operate

- `pnpm --filter @workspace/api-server run dev` — run the API server (port 5000)
- `pnpm run typecheck` — full typecheck across all packages
- `pnpm run build` — typecheck + build all packages
- `pnpm --filter @workspace/api-spec run codegen` — regenerate API hooks and Zod schemas from the OpenAPI spec
- `pnpm --filter @workspace/db run push` — push DB schema changes (dev only)
- Required env: `DATABASE_URL` — Postgres connection string

## Stack

- pnpm workspaces, Node.js 24, TypeScript 5.9
- API: Express 5
- DB: PostgreSQL + Drizzle ORM
- Validation: Zod (`zod/v4`), `drizzle-zod`
- API codegen: Orval (from OpenAPI spec)
- Build: esbuild (CJS bundle)

## Where things live

- `artifacts/agri-connect-ai/src/data/mockData.ts` — local demo data for users, crops, orders, prices, demand, and role navigation
- `artifacts/agri-connect-ai/src/components/agri-components.tsx` — shared shell, charts, tracking, AI assistant, and dashboard primitives
- `artifacts/agri-connect-ai/src/pages/Entry.tsx` — welcome and role-selection entry flow
- `artifacts/agri-connect-ai/src/pages/RolePage.tsx` — role-aware page content and demo interactions
- `artifacts/agri-connect-ai/src/index.css` — shared visual theme and responsive utility styles
- `artifacts/agri-connect-ai/README.md` — app-specific setup, demo roles, features, and project structure

## Architecture decisions

- The first release is frontend-only and uses local mock state so college demonstrations work without external services or API keys.
- A shared role-aware shell keeps the five user journeys consistent while allowing each role to have its own navigation and accent treatment.
- AI predictions, market values, delivery locations, trust scores, and payments are deliberately labeled or described as simulated demo data.

## Product

The prototype includes demo login entry for five roles, farmer crop selling and market intelligence, individual and bulk buying flows, simulated payments, delivery tracking, quality verification, ratings, rewards, volunteer support, responsive charts, and AgriBot chat/voice assistance.

## User preferences

- Keep the AgriConnect demo suitable for a college project presentation with no real payments or paid APIs.

## Gotchas

- The app's payment, prediction, market, route, and trust data are simulated; do not present them as live production values.
- The root app is the deployable web artifact; the existing API and canvas artifacts are not required for the frontend demo.

## Pointers

- See the `pnpm-workspace` skill for workspace structure, TypeScript setup, and package details
