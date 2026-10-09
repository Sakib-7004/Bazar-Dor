# 🛒 বাজার দর (BazarDor)

**বাজার দর** is a beginner-friendly Bangladeshi market-price tracker. It helps people browse everyday products, compare price changes, sort products by price, and view market-by-market price information.

## ✨ Key features

1. **Price movement highlights** — see products whose prices have increased or decreased.
2. **Responsive product grid** — product cards adapt to mobile, tablet, laptop, and desktop screens.
3. **Category browsing and sorting** — browse চাল, সবজি, মাছ, মাংস, and তেল; sort by lowest or highest price.
4. **Product details** — view minimum, maximum, average, and bazar-wise prices on a dynamic product page.
5. **Authentication** — Better Auth email/password sign-up and sign-in, plus Google and GitHub sign-in.
6. **Protected pages** — product details and profile pages require an authenticated session.
7. **Profile updates** — signed-in users can update their name.
8. **Helpful feedback** — loading skeletons, Bengali-friendly price formatting, toast notifications, and a custom 404 page.
9. **Bengali-first interface** — Bengali labels, currency display, and a continuously scrolling price ticker.

## 🧰 Technologies used

- **Next.js 15** — App Router, pages, and server rendering
- **React 19** — reusable UI components and client-side state
- **TypeScript** — types for product and application data
- **Tailwind CSS 4** — responsive styling
- **Better Auth** — sessions, email/password authentication, and social login
- **better-sqlite3** — local database adapter for Better Auth
- **react-hot-toast** — success and error notifications
- **BazarDor REST API** — product, category, and price information

## 🚀 Run locally

### 1. Requirements

Install Node.js (LTS) and Git.

### 2. Install dependencies

```bash
npm install
```

### 3. Configure environment variables

Create `.env.local` in the project root. Never commit real secrets.

```env
BETTER_AUTH_SECRET=replace-with-a-long-random-secret
BETTER_AUTH_URL=http://localhost:3000
GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=
GITHUB_CLIENT_ID=
GITHUB_CLIENT_SECRET=
```

Google and GitHub sign-in require OAuth applications and their matching client IDs/secrets. Register these local callback URLs with the providers:

- Google: `http://localhost:3000/api/auth/callback/google`
- GitHub: `http://localhost:3000/api/auth/callback/github`

### 4. Start the development server

```bash
npm run dev
```

Open `http://localhost:3000`.

> If your Better Auth version requires database migrations, follow its current setup guide before testing sign-up. Keep `.env.local` and the generated SQLite database private.

## 🌐 Deployment notes

- **Full application:** deploy the Next.js app to a Node.js-capable host such as Vercel. Configure all environment variables there. This is required for Better Auth, protected routes, and dynamic product pages.
- **GitHub Pages:** the repository also contains a static demo in `public/index.html`. GitHub Pages is static hosting, so it cannot run the Better Auth server or server-rendered dynamic routes. The static demo and full app do not have identical features.

## 📁 Beginner-friendly project structure

- `app/` — home page, category pages, product details, authentication, profile, and API routes
- `components/` — navbar, product cards, loading UI, footer, and shared components
- `lib/api.ts` — product API requests and Bengali number helpers
- `lib/auth.ts` — Better Auth server configuration
- `lib/auth-client.ts` — Better Auth browser client
- `public/` — static assets and the GitHub Pages demo

## ℹ️ Assignment notes

Email verification and forgot-password are intentionally not implemented, as requested. Never add real API keys, OAuth secrets, or production credentials to GitHub.

## Repository

[https://github.com/Sakib-7004/Bazar-Dor](https://github.com/Sakib-7004/Bazar-Dor)
