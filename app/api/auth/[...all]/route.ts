import { toNextJsHandler } from "better-auth/next-js";
import { getMigrations } from "better-auth/db/migration";
import { auth } from "@/lib/auth";

const handlers = toNextJsHandler(auth);

let migrationPromise: Promise<void> | undefined;

async function ensureAuthSchema() {
  if (!migrationPromise) {
    migrationPromise = (async () => {
      const { runMigrations } = await getMigrations(auth.options);
      await runMigrations();
    })();
  }

  try {
    await migrationPromise;
  } catch (error) {
    // Allow the next request to retry if the database was temporarily unavailable.
    migrationPromise = undefined;
    console.error("Better Auth database initialization failed:", error);
    throw error;
  }
}

export async function GET(request: Request) {
  await ensureAuthSchema();
  return handlers.GET(request);
}

export async function POST(request: Request) {
  await ensureAuthSchema();
  return handlers.POST(request);
}
