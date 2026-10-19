import { useCallback, useMemo, useState } from "react";
import { Link } from "react-router-dom";

import { createTask, deleteTask, updateTask } from "../services/taskService";

import TaskList from "../components/TaskList";
import TaskForm from "../components/TaskForm";
import TaskFilter from "../components/TaskFilter";
import useTasks from "../hooks/useTask";

function TasksPage() {
  const [title, setTitle] = useState("");
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");
  const [showHelp, setShowHelp] = useState(false);

  const { tasks, setTasks, loading, error, setError } = useTasks();

  async function handleCreateTask() {
    try {
      if (title.trim() === "") return;

      const newTask = await createTask({
        title,
        completed: false,
      });

      setTasks((prev) => [...prev, newTask]);
      setTitle("");
    } catch (error) {
      setError(error.message);
    }
  }

  const handleUpdateTask = useCallback(
    async (task) => {
      try {
        const updatedTask = await updateTask(task.id, {
          completed: !task.completed,
        });

        setTasks((prev) =>
          prev.map((item) =>
            item.id === task.id ? { ...item, ...updatedTask } : item,
          ),
        );
      } catch (error) {
        setError(error.message);
      }
    },
    [setTasks, setError],
  );

  const handleDeleteTask = useCallback(
    async (id) => {
      try {
        await deleteTask(id);

        setTasks((prev) => prev.filter((task) => task.id !== id));
      } catch (error) {
        setError(error.message);
      }
    },
    [setTasks, setError],
  );

  const filteredTasks = useMemo(() => {
    return tasks.filter((task) => {
      const matchSearch = task.title
        .toLowerCase()
        .includes(search.toLowerCase());

      const matchFilter =
        filter === "all" ||
        (filter === "completed" && task.completed) ||
        (filter === "pending" && !task.completed);

      return matchSearch && matchFilter;
    });
  }, [tasks, search, filter]);

  if (loading) {
    return (
      <main className="min-h-screen bg-white text-slate-900 dark:bg-slate-950 dark:text-white">
        <div className="mx-auto max-w-6xl px-6 py-12">
          <p className="text-slate-500 dark:text-slate-400">Loading tasks...</p>
        </div>
      </main>
    );
  }

  if (error) {
    return (
      <main className="min-h-screen bg-white text-slate-900 dark:bg-slate-950 dark:text-white">
        <div className="mx-auto max-w-6xl px-6 py-12">
          <p className="text-red-600 dark:text-red-400">Error: {error}</p>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-white text-slate-900 transition-colors duration-300 dark:bg-slate-950 dark:text-white">
      <section className="mx-auto max-w-6xl px-6 py-12">
        <div className="mb-10">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-cyan-600 dark:text-cyan-400">
            Task Manager
          </p>

          <h1 className="mt-2 text-4xl font-bold">Your Tasks</h1>

          <p className="mt-3 text-slate-600 dark:text-slate-400">
            Manage and track your daily tasks.
          </p>
        </div>

        <TaskForm
          title={title}
          onTitleChange={setTitle}
          onCreate={handleCreateTask}
        />

        <TaskFilter
          search={search}
          onSearchChange={setSearch}
          filter={filter}
          onFilterChange={setFilter}
        />

        <TaskList
          tasks={filteredTasks}
          onDelete={handleDeleteTask}
          onToggle={handleUpdateTask}
        />

        <div className="mt-10">
          <Link
            to="/"
            className="text-sm font-medium text-cyan-600 transition hover:text-cyan-500 dark:text-cyan-400 dark:hover:text-cyan-300"
          >
            ← Back to home
          </Link>
        </div>

        <button
          type="button"
          onClick={() => setShowHelp((prev) => !prev)}
          className="mt-6 rounded-lg bg-slate-100 px-4 py-2 text-slate-800 transition hover:bg-slate-200 dark:bg-slate-800 dark:text-white dark:hover:bg-slate-700"
        >
          Toggle Help
        </button>

        {showHelp && (
          <p className="mt-4 text-slate-600 dark:text-slate-400">
            This is help content.
          </p>
        )}
      </section>
    </main>
  );
}

export default TasksPage;
