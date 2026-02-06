# 🏙️ Civic Reporting System 

A modern, scalable frontend application built with Next.js 15 (App Router, TypeScript)
for the Civic Reporting System.

It empowers citizens to report civic issues, track their resolution, and view community
activity, while enabling administrators to manage submissions efficiently.

The application communicates with a backend REST API over HTTP using secure
cookie-based authentication.

# ✨ What Makes This Project Unique

- Built on Next.js 15 App Router for future-proof routing
- Clean, accessible UI using Radix UI primitives
- Optimized performance with modular architecture
- Secure auth handling via cookies and middleware
- Scalable codebase suitable for real-world civic platforms

# 👤 Citizen Features

- Report civic issues with structured forms
- Track issue status (Reported → In Progress → Resolved)
- Browse publicly reported issues
- View leaderboards & achievement badges (UI-ready)

# 🛠️ Admin Capabilities

- Review and manage reported issues
- Update issue statuses
- Moderate submissions (planned)
- Dashboard-ready architecture

# 🧰 Tech Stack

## Frontend
- Next.js 15 (App Router)
- React 18
- TypeScript

## Styling & UI
- Tailwind CSS v4
- PostCSS
- Radix UI primitives
- Custom reusable UI components

## Networking & Data
- Axios for API communication
- Cookie-based authentication

## Tooling
- pnpm / npm
- ESLint
- Git & GitHub

# 📋 Prerequisites

- Node.js 18+ (Node 20+ recommended)
- pnpm (preferred) or npm / yarn
- A running backend API

# 🚀 Quick Start

Install dependencies  
pnpm install  
or  
npm install  

Environment configuration  
Create a .env.local file in the project root:

NEXT_PUBLIC_API_URL=http://localhost:5000/api

If not provided, the app defaults to:  
http://localhost:5000/api  
(see lib/api.ts)

Run the development server  
pnpm dev  
or  
npm run dev  

Open in browser  
http://localhost:3000

## Project Structure

```text
Civic_Reporting_System/
├── app/                # App Router pages & layouts
├── components/         # Reusable UI components
│   └── ui/             # Radix / ShadCN-style primitives
├── hooks/              # Custom React hooks
├── lib/                # API clients, utils, auth helpers
├── public/             # Static assets
├── styles/             # Global styles
├── middleware.ts       # Auth & route protection
├── next.config.mjs
├── package.json
├── tsconfig.json
└── README.md
```
## 🔐 Authentication Model
- Cookie-based authentication
-Credentials automatically included with API requests
- Secure auth flow handled via:
- lib/api.ts
- middleware.ts

## Available Scripts
- start development server
- create production build
- run production server
- lint the codebase

## Roadmap & Future Enhancements
- Authentication pages (login / register)
- Role-based access control (RBAC)
- Location-based issue mapping
- Notification system (email / push)
- Admin analytics dashboard
- Automated testing & CI/CD pipelines
