import Link from "next/link";
import { notFound } from "next/navigation";
import SortProducts from "@/components/SortProducts";
import { getProducts, getCategories, Product } from "@/lib/api";

const validCategories = ["chal", "vegetables", "fish", "meat", "oil"];

export default async function CategoryPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  if (!validCategories.includes(slug.toLowerCase())) notFound();

  let products: Product[] = [];
  let categories: any[] = [];
  let failed = false;
  try {
    [products, categories] = await Promise.all([getProducts(slug), getCategories()]);
  } catch {
    failed = true;
  }

  const category = categories.find((item: any) =>
    String(item.slug ?? item.id ?? item.name).toLowerCase() === slug.toLowerCase()
  );
  const title = category?.name || ({
    chal: "চাল",
    vegetables: "সবজি",
    fish: "মাছ",
    meat: "মাংস",
    oil: "তেল",
  } as Record<string, string>)[slug];

  return (
    <main className="max-w-6xl mx-auto px-4 py-8 sm:py-12">
      <div className="mb-8">
        <p className="text-5xl">{category?.emoji || "🛒"}</p>
        <h1 className="text-3xl sm:text-4xl font-black mt-3">{title}</h1>
        <p className="text-gray-500 mt-2">এই ক্যাটাগরির পণ্য ও আজকের দাম।</p>
      </div>
      {failed ? (
        <div className="rounded-2xl border bg-white p-8 text-center">
          <p className="text-xl font-bold">পণ্যের তথ্য লোড করা যায়নি</p>
          <p className="text-gray-500 mt-2">ইন্টারনেট সংযোগ পরীক্ষা করে আবার চেষ্টা করুন।</p>
          <Link href="/" className="inline-block mt-5 rounded-xl bg-[#0f7a4b] px-5 py-3 text-white">হোম পেজে ফিরে যান</Link>
        </div>
      ) : products.length ? (
        <SortProducts products={products} />
      ) : (
        <div className="py-16 text-center bg-white rounded-2xl border">
          <div className="text-5xl">📦</div>
          <h2 className="text-2xl font-bold mt-3">এই মুহূর্তে পণ্য পাওয়া যায়নি</h2>
          <Link href="/" className="inline-block mt-5 bg-[#0f7a4b] text-white px-5 py-3 rounded-xl">হোম পেজে ফিরে যান</Link>
        </div>
      )}
    </main>
  );
}
