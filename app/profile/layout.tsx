import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import { ensureAuthSchema } from "@/lib/auth-db";

export default async function ProtectedProfileLayout({ children }: { children: React.ReactNode }) {
  await ensureAuthSchema();
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session) redirect("/signin?next=%2Fprofile");
  return children;
}
