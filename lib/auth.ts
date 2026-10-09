import { betterAuth } from "better-auth";
import Database from "better-sqlite3";
import path from "node:path";

const databasePath = process.env.DATABASE_PATH || path.join(process.cwd(), "database.sqlite");
const database = new Database(databasePath);
database.pragma("journal_mode = WAL");

const googleCredentials =
  process.env.GOOGLE_CLIENT_ID && process.env.GOOGLE_CLIENT_SECRET
    ? {
        google: {
          clientId: process.env.GOOGLE_CLIENT_ID,
          clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        },
      }
    : {};

const githubCredentials =
  process.env.GITHUB_CLIENT_ID && process.env.GITHUB_CLIENT_SECRET
    ? {
        github: {
          clientId: process.env.GITHUB_CLIENT_ID,
          clientSecret: process.env.GITHUB_CLIENT_SECRET,
        },
      }
    : {};

export const auth = betterAuth({
  appName: "BazarDor",
  baseURL: process.env.BETTER_AUTH_URL || "http://localhost:3000",
  // Local development fallback only. Always set BETTER_AUTH_SECRET in production.
  secret:
    process.env.BETTER_AUTH_SECRET ||
    (process.env.NODE_ENV !== "production"
      ? "bazar-dor-local-development-secret-change-before-deploy-123"
      : undefined),
  database,
  emailAndPassword: {
    enabled: true,
    minPasswordLength: 8,
  },
  socialProviders: {
    ...googleCredentials,
    ...githubCredentials,
  },
  user: {
    changeEmail: { enabled: false },
  },
});
