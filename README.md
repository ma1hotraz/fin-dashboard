# Fin Dashboard

Portfolio dashboard built with Next.js (App Router) and TypeScript.

## Run locally

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

| Field    | Value             |
|----------|-------------------|
| Email    | `test@finapp.com` |
| Password | `123456`          |

```bash
npm run build
npm start
```

## Architectural decisions

- **App Router** with Server Components for SSR and `revalidate` for ISR.
- **Portfolio data** comes from `/api/portfolio`; the dashboard page fetches it on the server with `cache: "no-store"`.
- **News data** is loaded in the `/news` server component with `export const revalidate = 30`.
- **Live prices** run in a client component (`LivePrices`) with `useState` and `useEffect`.
- **`getBaseUrl()`** builds the request origin from headers for server-side portfolio fetches.

## Rendering strategies

| Route        | Strategy | How |
|--------------|----------|-----|
| `/dashboard` | SSR      | Server Component fetches `/api/portfolio` on each request |
| Live prices  | CSR      | Client interval updates prices and P/L |
| `/news`      | ISR      | `revalidate = 30` on the page |
| `/login`     | CSR      | Client form posts to `/api/login` |

## Security

- Auth token (`userId`, `exp`) stored in an **HTTP-only** cookie.
- No `localStorage` or `sessionStorage` for tokens.
- **Middleware** protects `/dashboard` and `/news` (missing, invalid, expired tokens redirect to `/login`).
- Login validated on **client and server**.
- Cookie flags: `httpOnly`, `sameSite: "strict"`, `secure` in production.

## Observability

`src/lib/logger.ts` logs login success/failure, unauthorized access, and API errors.
