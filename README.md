# বাজার দর (BazarDor)

A beginner-friendly real-life Bangladeshi price tracking website built with Next.js. It reads product and category data from the BazarDor API and provides price-change sections, category filtering, sorting, protected product details, and Better Auth authentication.

## Technologies
- Next.js App Router
- React + TypeScript
- Tailwind CSS
- Better Auth
- better-sqlite3
- react-hot-toast
- BazarDor REST API

## Features
1. আজ দাম বেড়েছে / কমেছে price sections.
2. Category filtering and Bengali-numeral-safe price sorting.
3. Dynamic `/product/[slug]` pages protected by login.
4. Better Auth email/password, Google and GitHub social login.
5. Profile information update.
6. Loading skeletons, toast notifications and friendly 404 pages.
7. Responsive mobile, tablet and desktop layout.
8. Real API data with category and product detail fetching.

## Run locally

```bash
npm install
npx auth@latest migrate
npm run dev
```

Create `.env.local` from `.env.example`.

### Better Auth environment variables
- `BETTER_AUTH_SECRET`
- `BETTER_AUTH_URL`
- `GOOGLE_CLIENT_ID`
- `GOOGLE_CLIENT_SECRET`
- `GITHUB_CLIENT_ID`
- `GITHUB_CLIENT_SECRET`

Google callback: `http://localhost:3000/api/auth/callback/google`

GitHub callback: `http://localhost:3000/api/auth/callback/github`

For production, replace the localhost URL with the deployed domain.

## Important
Email verification and forgot-password are intentionally not implemented, as requested by the assignment instructions.

## Project
GitHub: https://github.com/Sakib-7004/Bazar-Dor
