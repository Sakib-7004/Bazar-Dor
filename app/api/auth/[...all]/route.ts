import { toNextJsHandler } from "better-auth/next-js";
import { auth } from "@/lib/auth";
import { ensureAuthSchema } from "@/lib/auth-db";

const handlers = toNextJsHandler(auth);

export async function GET(request: Request) {
  await ensureAuthSchema();
  return handlers.GET(request);
}

export async function POST(request: Request) {
  await ensureAuthSchema();
  return handlers.POST(request);
}
