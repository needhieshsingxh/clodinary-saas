import { SignedIn, SignedOut } from "@clerk/nextjs";
import Link from "next/link";

export default function LandingPage() {
  return (
    <main className="relative mx-auto flex min-h-[calc(100vh-4rem)] w-full max-w-5xl items-center justify-center overflow-hidden px-6 py-12">
      <div className="pointer-events-none absolute -top-24 left-1/2 h-72 w-72 -translate-x-1/2 rounded-full bg-blue-500/25 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-24 right-0 h-72 w-72 rounded-full bg-cyan-400/20 blur-3xl" />

      <section className="relative w-full max-w-3xl rounded-2xl border border-white/15 bg-white/5 px-6 py-10 text-center backdrop-blur-md sm:px-10 sm:py-12">
        <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
          Cloudinary SaaS Toolkit
        </h1>
        <p className="mx-auto mt-4 max-w-xl text-base text-slate-300 sm:text-lg">
          Resize images for social media and optimize video uploads in one
          place.
        </p>

        <SignedOut>
          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Link
              href="/sign-in"
              className="w-full rounded-lg bg-white px-5 py-2.5 text-sm font-semibold text-slate-900 transition hover:bg-slate-200 sm:w-auto"
            >
              Sign In
            </Link>
            <Link
              href="/sign-up"
              className="w-full rounded-lg border border-white/30 px-5 py-2.5 text-sm font-semibold text-white transition hover:border-white hover:bg-white/10 sm:w-auto"
            >
              Sign Up
            </Link>
          </div>
        </SignedOut>

        <SignedIn>
          <Link
            href="/dashboard"
            className="mt-8 inline-flex rounded-lg bg-white px-5 py-2.5 text-sm font-semibold text-slate-900 transition hover:bg-slate-200"
          >
            Go to Dashboard
          </Link>
        </SignedIn>
      </section>
    </main>
  );
}
