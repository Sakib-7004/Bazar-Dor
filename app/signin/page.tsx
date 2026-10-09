"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import toast from "react-hot-toast";

type SocialProvider = "google" | "github";

export default function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();
  const requestedNext = searchParams.get("next") || "/";
  const next = requestedNext.startsWith("/") && !requestedNext.startsWith("//") ? requestedNext : "/";

  const submit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    try {
      const { error } = await authClient.signIn.email({ email: email.trim(), password });
      if (error) {
        toast.error(error.message || "লগইন করা যায়নি। ইমেইল ও পাসওয়ার্ড পরীক্ষা করুন।");
        return;
      }
      toast.success("সফলভাবে সাইন ইন হয়েছে");
      router.push(next);
      router.refresh();
    } catch (error) {
      console.error("Sign-in request failed:", error);
      toast.error("সার্ভারে লগইন করা যায়নি। সার্ভার চালু আছে এবং .env.local সেট করা আছে কি না দেখুন।");
    } finally {
      setLoading(false);
    }
  };

  const social = async (provider: SocialProvider) => {
    setLoading(true);
    try {
      const response = await fetch("/api/auth/providers", { cache: "no-store" });
      const providers = await response.json();
      if (!providers[provider]) {
        toast.error(`${provider === "google" ? "Google" : "GitHub"} লগইনের জন্য OAuth Client ID ও Client Secret .env.local-এ সেট করতে হবে।`);
        return;
      }
      const { error } = await authClient.signIn.social({ provider, callbackURL: next });
      if (error) toast.error(error.message || "সোশ্যাল লগইন ব্যর্থ হয়েছে");
    } catch (error) {
      console.error(`${provider} sign-in failed:`, error);
      toast.error("সোশ্যাল লগইন শুরু করা যায়নি। OAuth credentials ও callback URL পরীক্ষা করুন।");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-[70vh] flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md bg-white rounded-3xl border p-7 shadow-sm">
        <h1 className="text-3xl font-black">সাইন ইন</h1>
        <p className="text-gray-500 mt-2">আপনার বাজার দর অ্যাকাউন্টে প্রবেশ করুন।</p>
        <form onSubmit={submit} className="space-y-4 mt-7">
          <input required type="email" autoComplete="email" placeholder="ইমেইল" value={email} onChange={event => setEmail(event.target.value)} className="w-full border rounded-xl px-4 py-3" />
          <input required type="password" autoComplete="current-password" placeholder="পাসওয়ার্ড" value={password} onChange={event => setPassword(event.target.value)} className="w-full border rounded-xl px-4 py-3" />
          <button disabled={loading} className="w-full bg-[#0f7a4b] text-white py-3 rounded-xl font-bold disabled:opacity-50">{loading ? "লোড হচ্ছে..." : "সাইন ইন"}</button>
        </form>
        <div className="grid grid-cols-2 gap-3 mt-4">
          <button type="button" disabled={loading} onClick={() => social("google")} className="border rounded-xl py-3 disabled:opacity-50">Google</button>
          <button type="button" disabled={loading} onClick={() => social("github")} className="border rounded-xl py-3 disabled:opacity-50">GitHub</button>
        </div>
        <p className="text-center text-sm mt-6">অ্যাকাউন্ট নেই? <Link href="/signup" className="text-[#0f7a4b] font-bold">সাইন আপ করুন</Link></p>
      </div>
    </main>
  );
}
