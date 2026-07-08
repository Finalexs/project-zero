"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";

export default function LoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [isSignup, setIsSignup] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState("");

  async function handleAuth(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setIsLoading(true);
    setMessage("");

    const authAction = isSignup
      ? supabase.auth.signUp({
          email,
          password,
        })
      : supabase.auth.signInWithPassword({
          email,
          password,
        });

    const { error } = await authAction;

    if (error) {
      setMessage(error.message);
      setIsLoading(false);
      return;
    }

    if (isSignup) {
      setMessage("Account created. Check your email if confirmation is required, then log in.");
      setIsLoading(false);
      return;
    }

    router.push("/dashboard");
    router.refresh();
  }

  return (
    <main className="min-h-screen bg-black px-6 py-8 text-white">
      <div className="mx-auto flex min-h-[80vh] max-w-md items-center">
        <section className="w-full rounded-3xl border border-white/10 bg-white/[0.03] p-6">
          <p className="text-sm text-blue-300/70">Project Zero</p>

          <h1 className="mt-2 text-3xl font-bold">
            {isSignup ? "Create your account." : "Log in to your AI company."}
          </h1>

          <p className="mt-3 text-sm leading-6 text-white/50">
            Access your dashboard, tasks, outputs, and AI company workspace.
          </p>

          <form onSubmit={handleAuth} className="mt-6 space-y-4">
            <div>
              <label className="text-xs text-white/40">Email</label>
              <input
                type="email"
                required
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                placeholder="you@example.com"
                className="mt-2 w-full rounded-2xl border border-white/10 bg-black/40 px-4 py-3 text-sm text-white outline-none placeholder:text-white/30 focus:border-blue-400/40"
              />
            </div>

            <div>
              <label className="text-xs text-white/40">Password</label>
              <input
                type="password"
                required
                minLength={6}
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                placeholder="Minimum 6 characters"
                className="mt-2 w-full rounded-2xl border border-white/10 bg-black/40 px-4 py-3 text-sm text-white outline-none placeholder:text-white/30 focus:border-blue-400/40"
              />
            </div>

            {message && (
              <div className="rounded-2xl border border-white/10 bg-black/40 p-4 text-sm text-white/60">
                {message}
              </div>
            )}

            <button
              type="submit"
              disabled={isLoading}
              className="w-full rounded-2xl bg-white px-4 py-3 text-sm font-bold text-black hover:bg-blue-100 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {isLoading
                ? "Please wait..."
                : isSignup
                  ? "Create account"
                  : "Log in"}
            </button>
          </form>

          <button
            type="button"
            onClick={() => {
              setIsSignup(!isSignup);
              setMessage("");
            }}
            className="mt-5 w-full text-center text-sm text-white/50 hover:text-white"
          >
            {isSignup
              ? "Already have an account? Log in"
              : "No account yet? Create one"}
          </button>
        </section>
      </div>
    </main>
  );
}