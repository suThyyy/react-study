import { Link } from "react-router-dom";

function NotFoundPage() {
  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <section className="mx-auto flex min-h-[calc(100vh-65px)] max-w-6xl items-center justify-center px-6">
        <div className="text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-cyan-400">
            Error 404
          </p>

          <h1 className="mt-4 text-6xl font-bold text-white md:text-7xl">
            Page Not Found
          </h1>

          <p className="mx-auto mt-5 max-w-xl text-lg leading-8 text-slate-400">
            The page you are looking for does not exist or may have been moved.
          </p>

          <div className="mt-8">
            <Link
              to="/"
              className="inline-block rounded-xl bg-cyan-400 px-6 py-3 font-semibold text-slate-950 transition hover:-translate-y-0.5 hover:bg-cyan-300"
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
