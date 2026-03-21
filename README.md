# Cloudinary SaaS Toolkit

A Next.js 16 SaaS-style media app with Clerk authentication, Cloudinary image/video processing, and Prisma + PostgreSQL persistence for uploaded video metadata.

## What This Project Is

This app provides:

- Public landing page with Sign In and Sign Up actions.
- Protected dashboard after login.
- Social Share tool to upload and resize images for social media formats.
- Video Upload tool to upload/compress videos and store metadata in PostgreSQL.
- Video listing endpoint for fetched uploads.

## Tech Stack

- Next.js 16 (App Router) + React 19 + TypeScript
- Clerk for authentication
- Cloudinary for media upload/transformation
- Prisma ORM with PostgreSQL
- Tailwind CSS v4 + DaisyUI

## Project Structure

```text
.
|-- app/
|   |-- page.tsx                         # Landing page
|   |-- layout.tsx                       # Root layout + ClerkProvider + header
|   |-- (auth)/
|   |   |-- sign-in/[[...sign-in]]/page.tsx
|   |   `-- sign-up/[[...sign-up]]/page.tsx
|   |-- (app)/
|   |   |-- dashboard/page.tsx           # Authenticated dashboard
|   |   |-- social-share/page.tsx        # Image resize tool
|   |   |-- video-upload/page.tsx        # Video upload/compress tool
|   |   `-- home/page.tsx                # Video listing UI
|   |-- api/
|   |   |-- image-upload/route.ts        # Image upload endpoint
|   |   |-- video-upload/route.ts        # Video upload endpoint
|   |   `-- videos/route.ts              # List videos endpoint
|   `-- generated/prisma/                # Generated Prisma client output
|-- components/
|   `-- VideoCard.tsx
|-- lib/
|   `-- prisma.ts                        # Prisma client singleton
|-- prisma/
|   |-- schema.prisma
|   `-- migrations/
|-- proxy.ts                             # Clerk middleware + route protection
`-- README.md
```

## Authentication and Routing Flow

- Public routes: `/`, `/sign-in`, `/sign-up`
- Protected app routes: `/dashboard`, `/social-share`, `/video-upload`, `/home`
- If not signed in and visiting a protected page route, user is redirected to `/sign-in`.
- If signed in and visiting public auth pages, user is redirected to `/dashboard`.

## Environment Variables

Create a `.env.local` file in the project root and add:

```bash
# Clerk
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=
CLERK_SECRET_KEY=

# Database
DATABASE_URL=

# Cloudinary
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=
CLOUDINARY_API_KEY=
CLOUDINARY_API_SECRET=
```

Notes:

- `DATABASE_URL` must point to a PostgreSQL database.
- Clerk keys come from your Clerk dashboard.
- Cloudinary keys come from your Cloudinary console.

## How To Run Locally

1. Install dependencies:

```bash
npm install
```

2. Configure environment variables in `.env.local`.

3. Run database migrations:

```bash
npx prisma migrate dev
```

4. (Optional) regenerate Prisma client if needed:

```bash
npx prisma generate
```

5. Start development server:

```bash
npm run dev
```

6. Open:

```text
http://localhost:3000
```

## Useful Scripts

- `npm run dev` - start local dev server
- `npm run build` - production build
- `npm run start` - run production build locally
- `npm run lint` - run ESLint

## API Endpoints (Current)

- `POST /api/image-upload` - upload image to Cloudinary (auth required)
- `POST /api/video-upload` - upload/compress video + save metadata (currently protected by middleware)
- `GET /api/videos` - fetch stored videos (public)

## Troubleshooting

- If auth redirects do not behave as expected, verify Clerk keys and middleware settings in `proxy.ts`.
- If uploads fail, verify all Cloudinary env variables are set.
- If Prisma errors occur, verify `DATABASE_URL` and rerun `npx prisma migrate dev`.
