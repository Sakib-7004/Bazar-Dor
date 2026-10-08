"use client";
import Link from "next/link";
import { Product,bn,productChange,productPrice,productSlug } from "@/lib/api";
export default function ProductCard({product}:{product:Product}){
 const change=productChange(product); const up=change>0; const flat=change===0;
 return <Link href={"/product/"+productSlug(product)} className="block bg-white rounded-2xl border border-gray-100 p-5 shadow-sm hover:-translate-y-1 hover:shadow-lg">
  <div className="h-32 rounded-xl bg-[#f4f7ef] flex items-center justify-center text-6xl">{product.emoji||"🛒"}</div>
  <div className="pt-4"><h3 className="text-xl font-bold">{product.name||product.title||"পণ্য"}</h3><p className="text-sm text-gray-500 mt-1">{product.unit||"প্রতি কেজি"}</p>
  <div className="flex items-center justify-between mt-5"><div><p className="text-xs text-gray-500">আজকের দাম</p><p className="text-xl font-extrabold text-[#0f7a4b]">{bn(productPrice(product))} টাকা</p></div>
  <span className={"px-3 py-1 rounded-full text-sm font-bold "+(flat?"bg-gray-100 text-gray-500":up?"bg-green-50 text-green-600":"bg-red-50 text-red-600")}>{flat?"—০.০%":up?"▲ ":"▼ "}{bn(Math.abs(change))}%</span></div></div>
 </Link>;
}