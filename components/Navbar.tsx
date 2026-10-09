"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import { getProducts, Product, productChange, productPrice, bn } from "@/lib/api";
import toast from "react-hot-toast";

const categories = [
  { href: "/", label: "সব পণ্য" },
  { href: "/category/chal", label: "চাল" },
  { href: "/category/vegetables", label: "সবজি" },
  { href: "/category/fish", label: "মাছ" },
  { href: "/category/meat", label: "মাংস" },
  { href: "/category/oil", label: "তেল" },
];

export default function Navbar() {
  const [products, setProducts] = useState<Product[]>([]);
  const [session, setSession] = useState<any>(null);
  const [today, setToday] = useState("");
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    getProducts().then(setProducts).catch(() => {});
    authClient.getSession().then((result) => setSession(result.data));
    setToday(new Intl.DateTimeFormat("bn-BD", {
      day: "numeric", month: "long", year: "numeric",
    }).format(new Date()));
  }, []);

  const logout = async () => {
    const { error } = await authClient.signOut();
    if (error) {
      toast.error(error.message || "সাইন আউট করা যায়নি");
      return;
    }
    setSession(null);
    toast.success("সাইন আউট হয়েছে");
    router.push("/");
    router.refresh();
  };

  const ticker = products.length ? [...products, ...products] : [];
  return (
    <header className="sticky top-0 z-40 bg-white shadow-sm">
      <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-3 px-4 py-3 sm:py-4">
        <Link href="/" className="flex min-w-0 items-center gap-2">
          <span className="text-3xl sm:text-4xl" aria-hidden="true">🛒</span>
          <span>
            <b className="block text-xl font-black text-[#0f7a4b] sm:text-2xl">বাজার দর</b>
            <small className="block text-xs text-gray-500">{today || "আজকের বাজারের তথ্য"}</small>
          </span>
        </Link>
        <div className="flex shrink-0 items-center gap-1 sm:gap-2">
          {session ? (
            <>
              <Link href="/profile" className="rounded-full bg-green-50 px-3 py-2 text-sm font-semibold sm:px-4">{session.user?.name || "প্রোফাইল"}</Link>
              <button onClick={logout} className="rounded-full bg-gray-900 px-3 py-2 text-sm text-white sm:px-4">সাইন আউট</button>
            </>
          ) : (
            <>
              <Link href="/signin" className="rounded-full px-3 py-2 text-sm font-semibold sm:px-4">সাইন ইন</Link>
              <Link href="/signup" className="rounded-full bg-[#0f7a4b] px-3 py-2 text-sm text-white sm:px-4">সাইন আপ</Link>
            </>
          )}
        </div>
      </div>
      <nav className="border-y border-gray-100" aria-label="পণ্যের ক্যাটাগরি">
        <div className="mx-auto flex max-w-6xl gap-2 overflow-x-auto px-4 py-2 text-sm font-semibold sm:gap-3 sm:py-3">
          {categories.map((category) => {
            const active = category.href === "/" ? pathname === "/" : pathname.startsWith(category.href);
            return <Link key={category.href} href={category.href} aria-current={active ? "page" : undefined}
              className={`shrink-0 rounded-full px-3 py-2 ${active ? "bg-green-100 text-[#0f7a4b]" : "text-gray-600 hover:bg-gray-100"}`}>
              {category.label}
            </Link>;
          })}
        </div>
      </nav>
      <div className="overflow-hidden bg-[#0f7a4b] text-sm text-white" aria-label="দামের পরিবর্তন">
        <div className="ticker-track">
          {(ticker.length ? ticker : [{ id: "loading", name: "আজকের বাজারদর লোড হচ্ছে", emoji: "🛒" } as Product, { id: "loading-2", name: "আজকের বাজারদর লোড হচ্ছে", emoji: "🛒" } as Product]).map((product, index) => {
            const change = productChange(product);
            return <span key={String(product.id) + index} className="whitespace-nowrap px-5 py-2">
              {product.emoji || "🛒"} {product.name || product.title} · {bn(productPrice(product))} টাকা/একক · {change > 0 ? "▲" : change < 0 ? "▼" : "—"} {bn(Math.abs(change))}%
            </span>;
          })}
        </div>
      </div>
    </header>
  );
}
