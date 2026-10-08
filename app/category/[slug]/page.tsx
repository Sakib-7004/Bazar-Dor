import Link from "next/link"; import SortProducts from "@/components/SortProducts"; import {getProducts,getCategories,Product,productSlug} from "@/lib/api";

export async function generateStaticParams(){
 try{const categories:any[]=await getCategories();return categories.map(c=>({slug:String(c.slug??c.id??c.name)}));}catch{return []}
}
export default async function CategoryPage({params}:{params:Promise<{slug:string}>}){
 const {slug}=await params;let products:Product[]=[];let categories:any[]=[];
 try{products=await getProducts(slug);categories=await getCategories()}catch{}
 const category=categories.find((c:any)=>String(c.slug??c.id??c.name).toLowerCase()===slug.toLowerCase());
 if(!products.length&&!category)return <main className="min-h-[60vh] flex items-center justify-center text-center"><div><h1 className="text-4xl font-black">এই ক্যাটাগরি পাওয়া যায়নি</h1><Link href="/" className="inline-block mt-5 bg-[#0f7a4b] text-white px-5 py-3 rounded-xl">হোম পেজে ফিরে যান</Link></div></main>;
 return <main className="max-w-6xl mx-auto px-4 py-12"><div className="mb-8"><p className="text-5xl">{category?.emoji||"🛒"}</p><h1 className="text-4xl font-black mt-3">{category?.name||slug}</h1><p className="text-gray-500 mt-2">এই ক্যাটাগরির পণ্য ও আজকের দাম।</p></div><SortProducts products={products}/></main>
}