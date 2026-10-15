import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getTaskById } from "../services/taskService";

function TaskDetailPage() {
  const { id } = useParams();

  const [task, setTask] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadTask() {
      try {
        const data = await getTaskById(id);
        setTask(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    }

    loadTask();
  }, [id]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <section className="mx-auto max-w-3xl px-6 py-12">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-cyan-400">
          Task Detail
        </p>

        <div className="mt-6 rounded-2xl border border-slate-800 bg-slate-900 p-6">
          <h1 className="text-3xl font-bold">{task.title}</h1>

          <p className="mt-4 text-slate-400">Task ID: {task.id}</p>

          <span
            className={`mt-4 inline-block rounded-full px-3 py-1 text-sm font-semibold ${
              task.completed
                ? "bg-green-400/10 text-green-400"
                : "bg-amber-400/10 text-amber-400"
            }`}
          >
            {task.completed ? "Completed" : "Pending"}
          </span>
        </div>

        <Link
          to="/tasks"
          className="mt-8 inline-block text-cyan-400 transition hover:text-cyan-300"
        >
          ← Back to tasks
        </Link>
      </section>
    </main>
  );
}

export default TaskDetailPage;
