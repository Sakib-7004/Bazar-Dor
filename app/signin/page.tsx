"use client";
import Link from "next/link";
import {useState} from "react";
import {useRouter} from "next/navigation";
import {authClient} from "@/lib/auth-client";
import toast from "react-hot-toast";

export default function SignIn(){
 const [email,setEmail]=useState(""),[password,setPassword]=useState(""),[loading,setLoading]=useState(false);
 const router=useRouter(), next="/";
 const submit=async(e:React.FormEvent)=>{e.preventDefault();setLoading(true);const {error}=await authClient.signIn.email({email,password});setLoading(false);if(error){toast.error(error.message||"লগইন করা যায়নি");return}toast.success("সফলভাবে সাইন ইন হয়েছে");router.push(next);router.refresh()};
 const social=async(provider:"google"|"github")=>{setLoading(true);const {error}=await authClient.signIn.social({provider,callbackURL:next});if(error){toast.error(error.message||"সোশ্যাল লগইন ব্যর্থ হয়েছে");setLoading(false)}};
 return <main className="min-h-[70vh] flex items-center justify-center px-4 py-12"><div className="w-full max-w-md bg-white rounded-3xl border p-7 shadow-sm"><h1 className="text-3xl font-black">সাইন ইন</h1><p className="text-gray-500 mt-2">আপনার বাজার দর অ্যাকাউন্টে প্রবেশ করুন।</p><form onSubmit={submit} className="space-y-4 mt-7"><input required type="email" placeholder="ইমেইল" value={email} onChange={e=>setEmail(e.target.value)} className="w-full border rounded-xl px-4 py-3"/><input required type="password" placeholder="পাসওয়ার্ড" value={password} onChange={e=>setPassword(e.target.value)} className="w-full border rounded-xl px-4 py-3"/><button disabled={loading} className="w-full bg-[#0f7a4b] text-white py-3 rounded-xl font-bold disabled:opacity-50">{loading?"লোড হচ্ছে...":"সাইন ইন"}</button></form><div className="grid grid-cols-2 gap-3 mt-4"><button onClick={()=>social("google")} className="border rounded-xl py-3">Google</button><button onClick={()=>social("github")} className="border rounded-xl py-3">GitHub</button></div><p className="text-center text-sm mt-6">অ্যাকাউন্ট নেই? <Link href="/signup" className="text-[#0f7a4b] font-bold">সাইন আপ করুন</Link></p></div></main>
}