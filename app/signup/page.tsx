"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import toast from "react-hot-toast";

type SocialProvider = "google" | "github";

export default function SignUp() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const submit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (password.length < 8) {
      toast.error("পাসওয়ার্ড কমপক্ষে ৮ অক্ষরের হতে হবে");
      return;
    }

    setLoading(true);
    try {
      const { error } = await authClient.signUp.email({
        name: name.trim(),
        email: email.trim(),
        password,
      });
      if (error) {
        toast.error(error.message || "রেজিস্ট্রেশন করা যায়নি। ইমেইলটি আগে ব্যবহার করা হয়েছে কি না দেখুন।");
        return;
      }
      toast.success("রেজিস্ট্রেশন সফল হয়েছে");
      router.push("/signin");
      router.refresh();
    } catch (error) {
      console.error("Sign-up request failed:", error);
      toast.error("সার্ভারে অ্যাকাউন্ট তৈরি করা যায়নি। সার্ভার ও .env.local সেটিংস পরীক্ষা করুন।");
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
      const { error } = await authClient.signIn.social({ provider, callbackURL: "/" });
      if (error) toast.error(error.message || "সোশ্যাল লগইন ব্যর্থ হয়েছে");
    } catch (error) {
      console.error(`${provider} sign-up failed:`, error);
      toast.error("সোশ্যাল লগইন শুরু করা যায়নি। OAuth credentials ও callback URL পরীক্ষা করুন।");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-[70vh] flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md bg-white rounded-3xl border p-7 shadow-sm">
        <h1 className="text-3xl font-black">সাইন আপ</h1>
        <p className="text-gray-500 mt-2">নতুন বাজার দর অ্যাকাউন্ট তৈরি করুন।</p>
        <form onSubmit={submit} className="space-y-4 mt-7">
          <input required autoComplete="name" placeholder="নাম" value={name} onChange={event => setName(event.target.value)} className="w-full border rounded-xl px-4 py-3" />
          <input required type="email" autoComplete="email" placeholder="ইমেইল" value={email} onChange={event => setEmail(event.target.value)} className="w-full border rounded-xl px-4 py-3" />
          <input required minLength={8} type="password" autoComplete="new-password" placeholder="পাসওয়ার্ড (কমপক্ষে ৮ অক্ষর)" value={password} onChange={event => setPassword(event.target.value)} className="w-full border rounded-xl px-4 py-3" />
          <button disabled={loading} className="w-full bg-[#0f7a4b] text-white py-3 rounded-xl font-bold disabled:opacity-50">{loading ? "লোড হচ্ছে..." : "সাইন আপ"}</button>
        </form>
        <div className="grid grid-cols-2 gap-3 mt-4">
          <button type="button" disabled={loading} onClick={() => social("google")} className="border rounded-xl py-3 disabled:opacity-50">Google</button>
          <button type="button" disabled={loading} onClick={() => social("github")} className="border rounded-xl py-3 disabled:opacity-50">GitHub</button>
        </div>
        <p className="text-center text-sm mt-6">আগেই অ্যাকাউন্ট আছে? <Link href="/signin" className="text-[#0f7a4b] font-bold">সাইন ইন করুন</Link></p>
      </div>
    </main>
  );
}
