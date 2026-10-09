import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import { ensureAuthSchema } from "@/lib/auth-db";

export default async function ProtectedProductLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ slug: string }>;
}) {
  await ensureAuthSchema();
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session) {
    const { slug } = await params;
    redirect("/signin?next=" + encodeURIComponent("/product/" + slug));
  }
  return children;
}
