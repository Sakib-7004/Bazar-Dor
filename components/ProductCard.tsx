"use client";

import Link from "next/link";
import { Product, bn, productChange, productPrice, productSlug } from "@/lib/api";

// Product-specific photos. Prices still come from the live product API.
const productPhotos: Array<{ words: string[]; image: string }> = [
  { words: ["rice", "chal", "চাল"], image: "https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&w=800&q=80" },
  { words: ["lentil", "dal", "ডাল"], image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=800&q=80" },
  { words: ["onion", "পেঁয়াজ", "পিয়াজ"], image: "https://images.unsplash.com/photo-1508747703725-719777637510?auto=format&fit=crop&w=800&q=80" },
  { words: ["potato", "আলু"], image: "https://images.unsplash.com/photo-1518977676601-b53f82aba655?auto=format&fit=crop&w=800&q=80" },
  { words: ["tomato", "টমেটো"], image: "https://images.unsplash.com/photo-1546094096-0df4bcaaa337?auto=format&fit=crop&w=800&q=80" },
  { words: ["chili", "chilli", "মরিচ", "কাঁচামরিচ"], image: "https://images.unsplash.com/photo-1588252303782-cb80119abd6?auto=format&fit=crop&w=800&q=80" },
  { words: ["fish", "মাছ", "ইলিশ", "রুই", "পাঙ্গাস"], image: "https://images.unsplash.com/photo-1510130387422-82bed34b37e9?auto=format&fit=crop&w=800&q=80" },
  { words: ["chicken", "meat", "মাংস", "মুরগি", "গরু"], image: "https://images.unsplash.com/photo-1604503468506-a8da13d82791?auto=format&fit=crop&w=800&q=80" },
  { words: ["egg", "ডিম"], image: "https://images.unsplash.com/photo-1506976785307-8732e854ad03?auto=format&fit=crop&w=800&q=80" },
  { words: ["oil", "তেল"], image: "https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?auto=format&fit=crop&w=800&q=80" },
  { words: ["garlic", "রসুন"], image: "https://images.unsplash.com/photo-1615477550927-6ec8445f4d7e?auto=format&fit=crop&w=800&q=80" },
  { words: ["ginger", "আদা"], image: "https://images.unsplash.com/photo-1615485500704-8e990f9900f2?auto=format&fit=crop&w=800&q=80" },
];

function getProductImage(product: Product) {
  const text = `${product.name || ""} ${product.title || ""} ${product.category || ""}`.toLowerCase();
  return productPhotos.find((item) => item.words.some((word) => text.includes(word.toLowerCase())))?.image;
}

export default function ProductCard({ product }: { product: Product }) {
  const change = productChange(product);
  const up = change > 0;
  const flat = change === 0;
  const image = getProductImage(product);
  const price = productPrice(product);

  return (
    <Link
      href={"/product/" + productSlug(product)}
      className="block overflow-hidden rounded-2xl border border-gray-100 bg-white p-3 shadow-sm transition hover:-translate-y-1 hover:shadow-lg sm:p-5"
    >
      <div className="relative flex h-36 items-center justify-center overflow-hidden rounded-xl bg-[#f4f7ef] sm:h-44">
        {image ? (
          <img
            src={image}
            alt={String(product.name || product.title || "বাজারের পণ্য")}
            loading="lazy"
            className="h-full w-full object-cover"
            onError={(event) => {
              event.currentTarget.style.display = "none";
            }}
          />
        ) : (
          <span className="text-6xl" aria-hidden="true">{product.emoji || "🛒"}</span>
        )}
        <span className="absolute bottom-2 left-2 rounded-full bg-white/90 px-3 py-1 text-xs font-bold text-gray-700">
          {product.category || product.categoryName || "দৈনন্দিন পণ্য"}
        </span>
      </div>
      <div className="pt-4">
        <h3 className="text-lg font-bold sm:text-xl">{product.name || product.title || "পণ্য"}</h3>
        <p className="mt-1 text-sm text-gray-500">{product.unit || "প্রতি কেজি"}</p>
        <div className="mt-4 flex flex-wrap items-end justify-between gap-3">
          <div>
            <p className="text-xs text-gray-500">আজকের দাম</p>
            <p className="text-xl font-extrabold text-[#0f7a4b] sm:text-2xl">
              {price > 0 ? `${bn(price)} টাকা` : "দাম পাওয়া যায়নি"}
            </p>
          </div>
          <span className={"rounded-full px-3 py-1 text-sm font-bold " + (flat ? "bg-gray-100 text-gray-500" : up ? "bg-green-50 text-green-600" : "bg-red-50 text-red-600")}>
            {flat ? "—০.০%" : up ? "▲ " : "▼ "}{bn(Math.abs(change))}%
          </span>
        </div>
        <p className="mt-3 text-xs text-gray-400">বাজারদরের তথ্য API থেকে</p>
      </div>
    </Link>
  );
}
