import { Link } from "react-router-dom";

function HomePage() {
  return (
    <main className="min-h-[calc(100vh-65px)] bg-white text-slate-900 transition-colors duration-300 dark:bg-slate-950 dark:text-white">
      <section className="mx-auto grid min-h-screen max-w-6xl items-center gap-12 px-6 py-16 md:grid-cols-2">
        <div>
          <p className="mb-4 text-sm font-semibold uppercase tracking-[0.25em] text-cyan-600 dark:text-cyan-400">
            React Task Manager
          </p>

          <h1 className="text-5xl font-bold leading-tight md:text-6xl">
            Organize your tasks.
            <span className="mt-2 block text-slate-500 dark:text-slate-400">
              Focus on what matters.
            </span>
          </h1>

          <p className="mt-6 max-w-xl text-lg leading-8 text-slate-600 dark:text-slate-400">
            A simple task management application built with React, React Router
            and Tailwind CSS.
          </p>

          <div className="mt-8 flex items-center gap-4">
            <Link
              to="/tasks"
              className="inline-block rounded-xl bg-cyan-500 px-6 py-3 font-semibold text-white transition hover:-translate-y-0.5 hover:bg-cyan-600 dark:bg-cyan-400 dark:text-slate-950 dark:hover:bg-cyan-300"
            >
              View Tasks
            </Link>

            <span className="text-sm text-slate-500 dark:text-slate-500">
              Simple. Fast. Focused.
            </span>
          </div>
        </div>
      </section>
    </main>
  );
}

export default HomePage;
