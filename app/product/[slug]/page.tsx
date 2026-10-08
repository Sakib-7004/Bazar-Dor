import {notFound} from "next/navigation";
import AuthGuard from "@/components/AuthGuard";
import {getProduct,getProducts,bn,productPrice,Product,numberValue,productSlug} from "@/lib/api";

export const dynamicParams = false;\n\nexport async function generateStaticParams(){
  try{
    const products=await getProducts();
    return products.map((p:Product)=>({slug:productSlug(p)}));
  }catch{return []}
}

export default async function ProductPage({params}:{params:Promise<{slug:string}>}){
 const {slug}=await params; let p:Product;
 try{p=await getProduct(slug)}catch{return notFound()}
 if(!p||!p.name)return notFound();
 const price=productPrice(p), min=numberValue(p.minPrice??price), max=numberValue(p.maxPrice??price), avg=numberValue(p.averagePrice??price), markets=p.markets||[];
 return <AuthGuard><main className="max-w-5xl mx-auto px-4 py-12"><div className="bg-white rounded-3xl border p-7 shadow-sm"><div className="flex flex-col md:flex-row gap-6 items-start"><div className="w-32 h-32 rounded-2xl bg-[#f4f7ef] flex items-center justify-center text-7xl">{p.emoji||"🛒"}</div><div><h1 className="text-4xl font-black">{p.name}</h1><p className="text-gray-600 mt-2">{p.description||"আজকের বাজারের সংক্ষিপ্ত তথ্য।"}</p><div className="flex flex-wrap gap-2 mt-4"><span className="bg-green-50 text-green-700 px-3 py-1 rounded-full">{p.category||p.categoryName||"পণ্য"}</span><span className="bg-gray-100 px-3 py-1 rounded-full">{p.unit||"প্রতি কেজি"}</span></div></div></div><div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-8"><PriceBox title="সর্বনিম্ন দাম" value={min}/><PriceBox title="সর্বোচ্চ দাম" value={max}/><PriceBox title="গড় দাম" value={avg}/></div></div><section className="mt-8"><h2 className="text-2xl font-black mb-4">বাজারভিত্তিক আজকের দাম</h2><div className="bg-white rounded-2xl border overflow-hidden">{markets.length?markets.map((m:any,i:number)=><div key={i} className="flex justify-between p-4 border-b last:border-0"><span>{m.name||m.bazar||"স্থানীয় বাজার"}</span><b>{bn(m.price??m.averagePrice??price)} টাকা</b></div>):<div className="p-6 text-gray-500">এই মুহূর্তে বাজারভিত্তিক আলাদা তথ্য নেই। গড় দাম: {bn(price)} টাকা</div>}</div></section></main></AuthGuard>
}
function PriceBox({title,value}:{title:string,value:number}){return <div className="bg-[#f7faf5] rounded-2xl p-5"><p className="text-gray-500">{title}</p><p className="text-2xl font-black text-[#0f7a4b] mt-2">{bn(value)} টাকা</p></div>}
