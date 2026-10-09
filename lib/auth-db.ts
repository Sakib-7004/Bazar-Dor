import { getMigrations } from "better-auth/db/migration";
import { auth } from "@/lib/auth";

let migrationPromise: Promise<void> | undefined;

export async function ensureAuthSchema() {
  if (!migrationPromise) {
    migrationPromise = (async () => {
      const { runMigrations } = await getMigrations(auth.options);
      await runMigrations();
    })();
  }

  try {
    await migrationPromise;
  } catch (error) {
    migrationPromise = undefined;
    console.error("Better Auth database initialization failed:", error);
    throw error;
  }
}
