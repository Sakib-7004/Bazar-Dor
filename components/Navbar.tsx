"use client";
import Link from "next/link";
import {useEffect,useState} from "react";
import {authClient} from "@/lib/auth-client";
import {getProducts,Product,productChange,productPrice,bn} from "@/lib/api";
import {useRouter} from "next/navigation";
import toast from "react-hot-toast";
export default function Navbar(){
 const [products,setProducts]=useState<Product[]>([]); const [session,setSession]=useState<any>(null); const router=useRouter();
 useEffect(()=>{getProducts().then(setProducts).catch(()=>{}); authClient.getSession().then(r=>setSession(r.data));},[]);
 const logout=async()=>{await authClient.signOut();toast.success("সাইন আউট হয়েছে");router.push("/");router.refresh()};
 const ticker=[...products,...products];
 return <header className="bg-white sticky top-0 z-40 shadow-sm">
  <div className="max-w-6xl mx-auto px-4 py-4 flex flex-wrap items-center justify-between gap-3"><Link href="/" className="flex items-center gap-2"><span className="text-3xl">🛒</span><span><b className="text-2xl text-[#0f7a4b]">বাজার দর</b><small className="block text-xs text-gray-500">আজকের বাজারের তথ্য</small></span></Link>
  <div className="flex items-center gap-2">{session?<><Link href="/profile" className="rounded-full bg-green-50 px-4 py-2 font-semibold">{session.user?.name||"প্রোফাইল"}</Link><button onClick={logout} className="rounded-full bg-gray-900 text-white px-4 py-2">সাইন আউট</button></>:<><Link href="/signin" className="px-4 py-2 font-semibold">সাইন ইন</Link><Link href="/signup" className="px-4 py-2 rounded-full bg-[#0f7a4b] text-white">সাইন আপ</Link></>}</div></div>
  <nav className="border-y"><div className="max-w-6xl mx-auto px-4 py-3 flex gap-5 overflow-x-auto text-sm font-semibold"><Link href="/" className="text-[#0f7a4b]">সব পণ্য</Link><Link href="/category/chal">চাল</Link><Link href="/category/vegetables">সবজি</Link><Link href="/category/fish">মাছ</Link><Link href="/category/meat">মাংস</Link><Link href="/category/oil">তেল</Link></div></nav>
  <div className="overflow-hidden bg-[#0f7a4b] text-white text-sm"><div className="ticker-track">{ticker.map((p,i)=>{const c=productChange(p);return <span key={i} className="px-5 py-2 whitespace-nowrap">{p.emoji||"🛒"} {p.name||p.title} · {bn(productPrice(p))} টাকা/একক · {c>=0?"▲":"▼"} {bn(Math.abs(c))}%</span>})}</div></div>
 </header>
}