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

## Contact delivery

The server route validates submissions, enforces same-origin requests, throttles repeated attempts, and applies timing and honeypot checks before relaying valid messages through FormSubmit. If delivery fails, the browser opens a prefilled email draft.

Rate limiting is process-local. For a high-traffic or multi-region deployment, replace it with a shared store such as Netlify Blobs, Redis, or an edge rate-limiting service.

## Deployment

The included `netlify.toml` uses npm and the official Netlify Next.js plugin. The canonical production URL is configured in `src/lib/content.ts`; update it there before deploying to a different domain.

## Content

Shared profile, experience, projects, navigation, and career-world content lives in `src/lib/content.ts`. Keep professional role metadata separate from demographic hero text so page titles and social previews remain descriptive.
