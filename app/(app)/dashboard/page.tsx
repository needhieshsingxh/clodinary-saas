import Link from "next/link";

const tools = [
  {
    title: "Social Share",
    description: "Resize images for social media formats.",
    href: "/social-share",
  },
  {
    title: "Video Upload",
    description: "Upload and resize videos.",
    href: "/video-upload",
  },
];

export default function DashboardPage() {
  return (
    <main className="mx-auto w-full max-w-5xl px-6 py-10">
      <section className="rounded-2xl bg-linear-to-r from-slate-900 to-slate-700 px-6 py-8 text-white sm:px-8">
        <p className="text-xs uppercase tracking-[0.2em] text-slate-300">
          Workspace
        </p>
        <h1 className="mt-2 text-3xl font-bold sm:text-4xl">Dashboard</h1>
        <p className="mt-2 text-sm text-slate-200 sm:text-base">
          Pick a tool and continue editing your media.
        </p>
      </section>

      <section className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2">
        {tools.map((tool) => (
          <Link
            key={tool.href}
            href={tool.href}
            className="group rounded-xl border border-slate-700 bg-slate-900/70 p-6 text-slate-100 transition hover:-translate-y-0.5 hover:border-slate-500 hover:bg-slate-900 hover:shadow-md"
          >
            <h2 className="text-xl font-semibold">{tool.title}</h2>
            <p className="mt-2 text-sm text-slate-300">{tool.description}</p>
            <span className="mt-4 inline-block rounded-full border border-slate-600 px-3 py-1 text-sm font-medium text-slate-200 transition group-hover:border-slate-400 group-hover:text-white">
              Open tool {"->"}
            </span>
          </Link>
        ))}
      </section>
    </main>
  );
}
