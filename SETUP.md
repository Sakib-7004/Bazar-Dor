# Setup checklist

1. Run `npm install`.
2. Copy `.env.example` to `.env.local`.
3. Add a 32+ character `BETTER_AUTH_SECRET`.
4. Add Google and GitHub OAuth credentials if social login is required.
5. Run `npx auth@latest migrate` to create the Better Auth SQLite tables.
6. Run `npm run dev`.
7. Test sign up, sign in, social login, protected product details, sign out and profile update.
8. For production, use a persistent database such as PostgreSQL instead of the local SQLite file and update the Better Auth database configuration before deploying to Vercel.
