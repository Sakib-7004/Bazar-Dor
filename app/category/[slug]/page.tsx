import Link from "next/link";
import SortProducts from "@/components/SortProducts";
import {getProducts,getCategories,Product} from "@/lib/api";

export const dynamicParams = false;

export async function generateStaticParams(){
 return [{slug:"chal"},{slug:"vegetables"},{slug:"fish"},{slug:"meat"},{slug:"oil"}];
}

export default async function CategoryPage({params}:{params:Promise<{slug:string}>}){
 const {slug}=await params;let products:Product[]=[];let categories:any[]=[];
 try{products=await getProducts(slug);categories=await getCategories()}catch{}
 const category=categories.find((c:any)=>String(c.slug??c.id??c.name).toLowerCase()===slug.toLowerCase());
 return <main className="max-w-6xl mx-auto px-4 py-12"><div className="mb-8"><p className="text-5xl">{category?.emoji||"🛒"}</p><h1 className="text-4xl font-black mt-3">{category?.name||slug}</h1><p className="text-gray-500 mt-2">এই ক্যাটাগরির পণ্য ও আজকের দাম।</p></div>{products.length?<SortProducts products={products}/>:<div className="py-16 text-center bg-white rounded-2xl border"><div className="text-5xl">📦</div><h2 className="text-2xl font-bold mt-3">এই মুহূর্তে পণ্য পাওয়া যায়নি</h2><Link href="/" className="inline-block mt-5 bg-[#0f7a4b] text-white px-5 py-3 rounded-xl">হোম পেজে ফিরে যান</Link></div>}</main>
}