import { toNextJsHandler } from "better-auth/next-js";
import { auth } from "@/lib/auth";

// Better Auth handles sign-in, sign-up, sessions, and social login here.
export const { GET, POST } = toNextJsHandler(auth);
