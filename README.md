# Raza Ali — Portfolio

A Next.js portfolio with an interactive canvas-based career atlas, project case studies, experience timeline, and contact form.

## Requirements

- Node.js 20 or newer
- npm 10 or newer



Run the complete verification pipeline with `npm run check`.

## Main routes

- `/` — portfolio overview
- `/about` — profile and technical stack
- `/experience` — employment history
- `/work` — selected projects
- `/career` — interactive career atlas
- `/contact` — contact form
- `/privacy` — data-handling policy
- `/studio/login` — assistant training desk (private)

## Site assistant

The **Ask** control opens a Q&A widget on every page except `/career` and `/studio`. It matches questions against Prisma-stored pairs (services, stack, projects, pricing, timelines, working style). Unmatched questions ask for email and phone as a fallback lead.

### Vercel + Prisma Postgres (free)

1. In the Vercel project, **Storage → Create Database → Prisma Postgres**, region closest to the app (e.g. Washington, D.C. East), **Free** plan.
2. **Connect** the database to the project. Vercel sets `DATABASE_URL` (`postgres://…` with pooling).
3. Add environment variables:
   - `CHAT_ADMIN_PASSWORD` — studio login
   - `CHAT_ADMIN_SECRET` — cookie signing secret (long random string)
4. Redeploy so `prisma migrate deploy` can run during `npm run build`.
5. Sign in at `https://razaali.vercel.app/studio/login`, open **Training**, click **Seed defaults**.

Locally: copy `.env.example` to `.env`, pull env with `vercel env pull` if the integration is connected, then `npx prisma migrate deploy` and `npm run db:seed`.

Free-tier notes: FAQ rows are cached in memory for two minutes; each user message writes one compact `ConversationLog` row; leads store only contact fields plus the last few lines. Stay inside 100K operations / 500MB by not logging full transcripts.

### API

- `POST /api/chat` — match a message
- `POST /api/chat/lead` — store a fallback lead
- `GET|POST /api/studio/questions` and `PATCH|DELETE /api/studio/questions/:id`
- `GET|PATCH /api/studio/leads`
- `GET /api/studio/analytics`
- `POST /api/studio/seed`

## Contact delivery

## Contact delivery

The server route validates submissions, enforces same-origin requests, throttles repeated attempts, and applies timing and honeypot checks before relaying valid messages through FormSubmit. If delivery fails, the browser opens a prefilled email draft.

Rate limiting is process-local. For a high-traffic or multi-region deployment, replace it with a shared store such as Netlify Blobs, Redis, or an edge rate-limiting service.

## Deployment

The included `netlify.toml` uses npm and the official Netlify Next.js plugin. The canonical production URL is configured in `src/lib/content.ts`; update it there before deploying to a different domain.

## Content

Shared profile, experience, projects, navigation, and career-world content lives in `src/lib/content.ts`. Keep professional role metadata separate from demographic hero text so page titles and social previews remain descriptive.
