import { Link } from "react-router-dom";
import { useTheme } from "../context/ThemeContext";

function Navbar() {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === "dark";

  return (
    <nav
      className={`border-b transition-colors duration-300 ${
        isDark
          ? "border-slate-800 bg-slate-950 text-white"
          : "border-slate-200 bg-white text-slate-900"
      }`}
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <Link to="/" className="text-xl font-bold text-cyan-500">
          TaskFlow
        </Link>

        <div className="flex items-center gap-6">
          <Link
            to="/"
            className={`text-sm font-medium transition ${
              isDark
                ? "text-slate-300 hover:text-cyan-400"
                : "text-slate-600 hover:text-cyan-600"
            }`}
          >
            Home
          </Link>

          <Link
            to="/tasks"
            className={`text-sm font-medium transition ${
              isDark
                ? "text-slate-300 hover:text-cyan-400"
                : "text-slate-600 hover:text-cyan-600"
            }`}
          >
            Tasks
          </Link>

          <button
            type="button"
            onClick={toggleTheme}
            className={`rounded-lg border px-4 py-2 text-sm font-medium transition ${
              isDark
                ? "border-slate-700 bg-slate-800 text-white hover:bg-slate-700"
                : "border-slate-200 bg-slate-100 text-slate-800 hover:bg-slate-200"
            }`}
          >
            {isDark ? "☀️ Light" : "🌙 Dark"}
          </button>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
