import { Link } from "react-router-dom";

function NotFoundPage() {
  return (
    <main className="min-h-screen bg-white text-slate-900 transition-colors duration-300 dark:bg-slate-950 dark:text-white">
      <section className="mx-auto flex min-h-[calc(100vh-65px)] max-w-6xl items-center justify-center px-6">
        <div className="text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-cyan-600 dark:text-cyan-400">
            Error 404
          </p>

          <h1 className="mt-4 text-6xl font-bold text-slate-900 md:text-7xl dark:text-white">
            Page Not Found
          </h1>

          <p className="mx-auto mt-5 max-w-xl text-lg leading-8 text-slate-600 dark:text-slate-400">
            The page you are looking for does not exist or may have been moved.
          </p>

          <div className="mt-8">
            <Link
              to="/"
              className="inline-block rounded-xl bg-cyan-500 px-6 py-3 font-semibold text-white transition hover:-translate-y-0.5 hover:bg-cyan-600 dark:bg-cyan-400 dark:text-slate-950 dark:hover:bg-cyan-300"
            >
              Back to Home
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}

export default NotFoundPage;
