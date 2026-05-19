"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginForm() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  function validate(): string | null {
    if (!email || !password) return "All fields are required.";
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) return "Enter a valid email address.";
    if (password.length < 4) return "Password is too short.";
    return null;
  }

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setError("");

    const validationError = validate();
    if (validationError) {
      setError(validationError);
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      if (res.ok) {
        router.push("/dashboard");
      } else {
        const data = await res.json();
        setError(data.message || "Invalid credentials");
      }
    } catch {
      setError("Something went wrong. Try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form
      onSubmit={handleLogin}
      className="w-full max-w-sm rounded-lg border border-zinc-200/80 bg-white p-8"
    >
      <p className="text-xs font-medium uppercase tracking-widest text-zinc-400">
        Fin Dashboard
      </p>
      <h1 className="mt-1 text-xl font-semibold tracking-tight text-zinc-900">
        Sign in
      </h1>
      <p className="mt-1 text-sm text-zinc-500">Enter your credentials to continue.</p>
      <p className="mt-3 rounded-md border border-zinc-100 bg-zinc-50 px-3 py-2 text-xs text-zinc-500">
        Demo: <span className="font-medium text-zinc-700">test@finapp.com</span> /{" "}
        <span className="font-medium text-zinc-700">123456</span>
      </p>

      <div className="mt-6 flex flex-col gap-4">
        {error && (
          <p className="rounded-md border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">
            {error}
          </p>
        )}

        <label className="flex flex-col gap-1.5">
          <span className="text-xs font-medium text-zinc-600">Email</span>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="rounded-md border border-zinc-200 bg-zinc-50/50 px-3 py-2 text-sm text-zinc-900 outline-none transition focus:border-zinc-400 focus:bg-white"
            required
          />
        </label>

        <label className="flex flex-col gap-1.5">
          <span className="text-xs font-medium text-zinc-600">Password</span>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="rounded-md border border-zinc-200 bg-zinc-50/50 px-3 py-2 text-sm text-zinc-900 outline-none transition focus:border-zinc-400 focus:bg-white"
            required
          />
        </label>

        <button
          type="submit"
          disabled={loading}
          className="mt-2 rounded-md bg-zinc-900 py-2.5 text-sm font-medium text-white transition hover:bg-zinc-800 disabled:opacity-50"
        >
          {loading ? "Signing in…" : "Sign in"}
        </button>
      </div>
    </form>
  );
}
