export const API_URL = "https://api.api-store.workers.dev/api/bazardor";

export type Product = {
  id: number | string;
  slug?: string;
  name: string;
  title?: string;
  category?: string;
  categoryName?: string;
  unit?: string;
  price?: number;
  currentPrice?: number;
  minPrice?: number;
  maxPrice?: number;
  averagePrice?: number;
  change?: number;
  changePercent?: number;
  emoji?: string;
  description?: string;
  markets?: Array<{ name?: string; bazar?: string; price?: number; minPrice?: number; maxPrice?: number }>;
  [key:string]: unknown;
};

async function getJson(path:string){
  const res=await fetch(API_URL+path,{cache:"no-store"});
  if(!res.ok) throw new Error("API request failed");
  return res.json();
}

export async function getProducts(category?:string):Promise<Product[]>{
  const data=await getJson(category?"/products?category="+encodeURIComponent(category):"/products");
  return Array.isArray(data)?data:(data.products||data.data||[]);
}
export async function getCategories():Promise<any[]>{
  const data=await getJson("/categories");
  return Array.isArray(data)?data:(data.categories||data.data||[]);
}
export async function getProduct(id:string):Promise<Product>{
  const data=await getJson("/products/"+id);
  return data.product||data.data||data;
}
export function numberValue(value:unknown){
  if(typeof value==="number") return value;
  const text=String(value??"").replace(/[০-৯]/g,d=>String("০১২৩৪৫৬৭৮৯".indexOf(d))).replace(/[^0-9.-]/g,"");
  return Number(text)||0;
}
export function bn(value:unknown){return new Intl.NumberFormat("bn-BD").format(numberValue(value));}
export function productPrice(p:Product){return numberValue(p.price??p.currentPrice??p.averagePrice);}
export function productChange(p:Product){return numberValue(p.changePercent??p.change??0);}
export function productSlug(p:Product){return String(p.slug??p.id);}
