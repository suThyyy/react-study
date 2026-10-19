import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getTaskById } from "../services/taskService";

function TaskDetailPage() {
  const { id } = useParams();

  const [task, setTask] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let ignore = false;

    async function loadTask() {
      setLoading(true);
      setError("");
      setTask(null);

      try {
        const data = await getTaskById(id);

        if (!ignore) {
          setTask(data);
        }
      } catch (error) {
        if (!ignore) {
          setError(error.message);
        }
      } finally {
        if (!ignore) {
          setLoading(false);
        }
      }
    }

    loadTask();

    return () => {
      ignore = true;
    };
  }, [id]);

  return (
    <main className="min-h-screen bg-white text-slate-900 transition-colors duration-300 dark:bg-slate-950 dark:text-white">
      <section className="mx-auto max-w-3xl px-6 py-12">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-cyan-600 dark:text-cyan-400">
          Task Detail
        </p>

        {loading ? (
          <p className="mt-6 text-slate-500 dark:text-slate-400">
            Loading task...
          </p>
        ) : error ? (
          <p className="mt-6 text-red-600 dark:text-red-400">Error: {error}</p>
        ) : !task ? (
          <p className="mt-6 text-slate-500 dark:text-slate-400">
            Task not found.
          </p>
        ) : (
          <div className="mt-6 rounded-2xl border border-slate-200 bg-slate-50 p-6 transition-colors duration-300 dark:border-slate-800 dark:bg-slate-900">
            <h1 className="text-3xl font-bold">{task.title}</h1>

            <p className="mt-4 text-slate-500 dark:text-slate-400">
              Task ID: {task.id}
            </p>

            <span
              className={`mt-4 inline-block rounded-full px-3 py-1 text-sm font-semibold ${
                task.completed
                  ? "bg-green-100 text-green-700 dark:bg-green-400/10 dark:text-green-400"
                  : "bg-amber-100 text-amber-700 dark:bg-amber-400/10 dark:text-amber-400"
              }`}
            >
              {task.completed ? "Completed" : "Pending"}
            </span>
          </div>
        )}

        <Link
          to="/tasks"
          className="mt-8 inline-block text-sm font-medium text-cyan-600 transition hover:text-cyan-500 dark:text-cyan-400 dark:hover:text-cyan-300"
        >
          ← Back to tasks
        </Link>
      </section>
    </main>
  );
}

export default TaskDetailPage;
