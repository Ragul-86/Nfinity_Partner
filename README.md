# Nfinity Partner — Website (MVP)

Full-stack MERN site for Nfinity Partner: React + Tailwind frontend wired to a Node/Express/MongoDB backend. 11 public pages, a working contact/lead form, and a seeded content API (services, case studies, blog, testimonials).

This is the **public-site MVP** — no admin/CMS panel or auth yet (planned for a follow-up phase; the backend already reserves the routes for it).

## Stack

- **Frontend:** React 18 (Vite), React Router v6, Tailwind CSS, lucide-react icons, zod (client-side validation helpers)
- **Backend:** Node.js, Express, MongoDB + Mongoose, zod (request validation), JWT/bcrypt (wired for Phase 2 auth), Helmet, CORS, rate limiting, Winston logging
- No Framer Motion / React Query / Axios / Cloudinary / Puppeteer — deliberately kept dependency-light for this MVP (see "Notes & known trade-offs" below).

## Project structure

```
nfinity-website/
├── client/        React frontend (Vite)
└── server/        Express API + MongoDB models
```

## Prerequisites

- Node.js 18+
- A MongoDB connection string (a free MongoDB Atlas cluster works fine)

## 1. Backend setup

```bash
cd server
npm install
cp .env.example .env
```

Edit `.env` and set at minimum:

- `MONGO_URI` — your MongoDB connection string
- `INTERNAL_API_KEY` — any long random string (protects the lead-read endpoints until the admin panel exists)
- `JWT_SECRET` — any long random string (reserved for Phase 2)

Seed the database with services, case studies, testimonials, and sample blog posts:

```bash
npm run seed
```

This is safe to re-run — it only inserts content into empty collections and never touches real lead submissions. To wipe and re-seed sample content (leads are never deleted by this script):

```bash
npm run seed:destroy
npm run seed
```

Start the API:

```bash
npm run dev       # http://localhost:5000, auto-restarts on changes
# or
npm start         # production mode
```

## 2. Frontend setup

In a new terminal:

```bash
cd client
npm install
cp .env.example .env
npm run dev       # http://localhost:5173
```

The Vite dev server proxies `/api` to `http://localhost:5000`, so the frontend talks to your local backend automatically. Open `http://localhost:5173`.

## 3. Build for production

```bash
cd client
npm run build     # outputs client/dist
```

Serve `client/dist` from any static host (Vercel, Netlify, Nginx, S3 + CloudFront, etc.) and deploy `server/` to any Node host (Render, Railway, Fly.io, EC2, etc.) — point `VITE_API_BASE_URL` at the deployed API URL and `CLIENT_ORIGIN` (server `.env`) at the deployed frontend URL.

## API overview

Base path: `/api/v1`

| Method | Path | Notes |
|---|---|---|
| GET | `/services` | All published services |
| GET | `/services/:slug` | One service |
| GET | `/case-studies` | Supports `?industry=`, `?featured=true`, `?page=`, `?limit=` |
| GET | `/case-studies/:slug` | One case study |
| GET | `/blog` | Supports `?category=`, `?featured=true`, `?page=`, `?limit=` |
| GET | `/blog/:slug` | One post (full content) |
| GET | `/testimonials` | Supports `?featured=true` |
| POST | `/leads` | Public — the Contact page form posts here |
| GET/PATCH | `/leads`, `/leads/:id` | Internal only — requires `x-internal-key` header matching `INTERNAL_API_KEY` |

## Notes & known trade-offs (MVP scope)

- **No admin/CMS panel yet.** Content (services, case studies, blog, testimonials) lives in MongoDB and is managed via the seed script for now. Leads submitted through the Contact page are stored in the `leads` collection and can be read via the internal-key-protected endpoints above (e.g. with Postman/Insomnia) until a proper dashboard is built.
- **Client-side rendering only** — no build-time prerendering yet, so meta tags update after JS executes (fine for browsers and most social crawlers, a known limitation for very basic crawlers). Each page sets its own title/description via a lightweight `useSEO` hook.
- **Plain `fetch` instead of Axios/React Query**, and a couple of small custom hooks (`useFetch`, `useCountUp`, `useScrollReveal`) instead of heavier libraries — kept the dependency surface small and easy to audit for a first MVP pass.
- Images are not yet wired to a CDN (Cloudinary) — add real photography/screenshots to `client/public` or a CDN of choice as content comes in.

## Troubleshooting

- **Frontend shows "Couldn't load..." everywhere:** the backend isn't running, isn't seeded, or `VITE_API_BASE_URL`/`CLIENT_ORIGIN` don't match. Confirm `npm run dev` is running in `server/` and that you ran `npm run seed`.
- **Contact form submits but nothing appears in your database:** check `MONGO_URI` is correct and the server logs (`server/` terminal) for connection errors.
