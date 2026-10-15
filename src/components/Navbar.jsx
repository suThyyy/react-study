import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="border-b border-slate-800 bg-slate-950 text-white">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <Link to="/" className="text-xl font-bold text-cyan-400">
          TaskFlow
        </Link>

        <div className="flex items-center gap-6">
          <Link
            to="/"
            className="text-sm font-medium text-slate-300 transition hover:text-cyan-400"
          >
            Home
          </Link>

          <Link
            to="/tasks"
            className="text-sm font-medium text-slate-300 transition hover:text-cyan-400"
          >
            Tasks
          </Link>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
