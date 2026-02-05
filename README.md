# Civic Reporting System — Frontend

A Next.js 15 (App Router, TypeScript) frontend for the Civic Reporting System. Citizens can report issues, track status, view leaderboards/achievements, and admins can manage submissions. The app communicates with the backend API over HTTP using cookie-based auth.

---

## Tech Stack

- Next.js 15 (App Router)
- React 18
- TypeScript
- Tailwind CSS v4 + PostCSS
- Radix UI primitives and custom UI components
- Axios (HTTP client)

---

## Prerequisites

- Node.js 18+ (recommend 20+)
- pnpm (preferred) or npm/yarn
- Running backend API (see sibling `civic-backend`) or a reachable public API URL

---

## Quick Start

1. Install dependencies

```bash
pnpm install
# or
npm install
```

2. Configure environment
   Create `.env.local` in the project root and set the API URL:

```bash
# Base URL of the backend API
NEXT_PUBLIC_API_URL=http://localhost:5000/api
```

If omitted, the app defaults to `http://localhost:5000/api` (see `lib/api.ts`).

3. Run the dev server

```bash
pnpm dev
# or
npm run dev
```

Then open http://localhost:3000.

---

## Scripts

- `pnpm dev` — Start development server
- `pnpm build` — Build for production
- `pnpm start` — Start production server (after build)
- `pnpm lint` — Run Next.js lint (build ignores lint/type errors per config)

---

## Environment Variables

- `NEXT_PUBLIC_API_URL` — Base URL for API calls (e.g., `http://localhost:5000/api`). Defaults to that value if unset.

Axios is configured in `lib/api.ts` with `withCredentials: true` so auth cookies are sent/received automatically.

---

## Authentication & Routing

- Backend issues a JWT in an `access_token` cookie.
- `middleware.ts` enforces access and role-based redirects:
  - Unauthenticated users accessing protected routes are redirected to `/`.
  - Authenticated users on `/` are redirected to `/admin` (ADMIN) or `/dashboard` (USER).
  - Non-admin users are blocked from `/admin/*`.
- Client-side `AuthProvider` in `lib/auth.tsx` exposes `login`, `logout`, `user`, and performs role-based redirects after login.

---

## Project Structure (high-level)

```
app/
  page.tsx
  dashboard/
  admin/
  issue/[id]/
  map/
  my-reports/
  profile/
  report/
  achievements/
  leaderboard/
components/
  admin/ auth/ dashboard/ gamification/ issue-reporting/ navigation/ tracking/ ui/
lib/
  api.ts      # axios instance (uses NEXT_PUBLIC_API_URL, sends cookies)
  auth.tsx    # AuthProvider and hook
middleware.ts # route guards and role-based redirects
styles/
```

---

## UI/Styling

- Tailwind CSS v4 with PostCSS
- Radix primitives and custom components under `components/ui/*`

---

## Deployment

Works on Vercel or any Node host.

Vercel (recommended):

- Configure `NEXT_PUBLIC_API_URL` in Project → Settings → Environment Variables
- Build: `pnpm build` (or `npm run build`)
- Output: Next.js default

Self-host:

```bash
pnpm build
pnpm start
# Listens on PORT (default 3000)
```

Ensure the API is reachable and configured for CORS with credentials.

---

## Notes

- If the frontend and backend are on different domains, configure backend cookies for cross-site usage (e.g., `SameSite=None; Secure`) and enable CORS with credentials.
- `next.config.mjs` is set to ignore lint/type errors during build; consider tightening for production.

---


