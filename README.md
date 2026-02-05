# 🏙️ Civic Reporting System 

A **modern, scalable frontend application** built with **Next.js 15 (App Router, TypeScript)** for the Civic Reporting System.  
It empowers citizens to report civic issues, track their resolution, and view community activity, while enabling administrators to manage submissions efficiently.

The application communicates with a backend REST API over **HTTP using secure cookie-based authentication**.

---

## ✨ What Makes This Project Unique

- 🚀 Built on **Next.js 15 App Router** for future-proof routing
- 🎨 Clean, accessible UI using **Radix UI primitives**
- ⚡ Optimized performance with modular architecture
- 🔐 Secure auth handling via cookies and middleware
- 🧱 Scalable codebase suitable for real-world civic platforms

---

## 👤 Citizen Features

- Report civic issues with structured forms
- Track issue status (Reported → In Progress → Resolved)
- Browse publicly reported issues
- View leaderboards & achievement badges *(UI-ready)*

---

## 🛠️ Admin Capabilities

- Review and manage reported issues
- Update issue statuses
- Moderate submissions *(planned)*
- Dashboard-ready architecture

---

## 🧰 Tech Stack

### Frontend
- **Next.js 15** (App Router)
- **React 18**
- **TypeScript**

### Styling & UI
- **Tailwind CSS v4**
- **PostCSS**
- **Radix UI primitives**
- Custom reusable UI components

### Networking & Data
- **Axios** for API communication
- Cookie-based authentication

### Tooling
- **pnpm / npm**
- **ESLint**
- **Git & GitHub**

---

## 📋 Prerequisites

- **Node.js 18+** (Node 20+ recommended)
- **pnpm** (preferred) or **npm / yarn**
- A running backend API  
  - Local: `civic-backend`  
  - OR a reachable public API endpoint

---

## 🚀 Quick Start

### Install Dependencies
```bash
pnpm install
# or
npm install
---
⚙️ Environment Configuration

Create a .env.local file in the project root:

# Base URL of the backend API
NEXT_PUBLIC_API_URL=http://localhost:5000/api


📌 If not provided, the app defaults to:

http://localhost:5000/api


(see lib/api.ts)

⚠️ Never commit .env.local to version control.

▶️ Run the Development Server
pnpm dev
# or
npm run dev


Open your browser at:
👉 http://localhost:3000

📂 Project Structure
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
---
🔐 Authentication Model

Cookie-based authentication

Credentials automatically included with requests

Auth flow handled via:

lib/api.ts

middleware.ts

🧪 Available Scripts
pnpm dev        # Start development server
pnpm build      # Create production build
pnpm start      # Run production server
pnpm lint       # Lint the codebase

🌐 Deployment

This frontend is deployment-ready and works best with:

Vercel ✅ (recommended)

Netlify

Any Node.js-compatible hosting provider

Vercel Deployment Steps

Import the GitHub repository

Add required environment variables

Deploy 🚀

🧠 Roadmap & Future Enhancements

Authentication pages (login / register)

Role-based access control (RBAC)

Location-based issue mapping

Notification system (email / push)

Admin analytics dashboard

Automated testing & CI/CD pipelines
