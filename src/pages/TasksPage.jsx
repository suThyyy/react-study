import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  createTask,
  deleteTask,
  getTasks,
  updateTask,
} from "../services/taskService";
import TaskList from "../components/TaskList";
import TaskForm from "../components/TaskForm";
import TaskFilter from "../components/TaskFilter";

function TasksPage() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [title, setTitle] = useState("");
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");

  async function handleCreateTask() {
    try {
      if (title.trim() === "") {
        return;
      }
      const newTask = await createTask({ title, completed: false });
      setTasks((prev) => [...prev, newTask]);
      setTitle("");
    } catch (error) {
      setError(error.message);
    }
  }

  async function handleUpdateTask(task) {
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
  }

  async function handleDeleteTask(id) {
    try {
      await deleteTask(id);
      setTasks((prev) => prev.filter((task) => task.id !== id));
    } catch (error) {
      setError(error.message);
    }
  }

  useEffect(() => {
    async function loadTasks() {
      try {
        const data = await getTasks();
        setTasks(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    }

    loadTasks();
  }, []);

  if (loading) {
    return (
      <main className="min-h-screen bg-slate-950 text-white">
        <div className="mx-auto max-w-6xl px-6 py-12">
          <p className="text-slate-400">Loading tasks...</p>
        </div>
      </main>
    );
  }

  if (error) {
    return (
      <main className="min-h-screen bg-slate-950 text-white">
        <div className="mx-auto max-w-6xl px-6 py-12">
          <p className="text-red-400">Error: {error}</p>
        </div>
      </main>
    );
  }
  ///includes("") luon tra ve true
  const filteredTasks = tasks.filter((task) => {
    const matchSearch = task.title.toLowerCase().includes(search.toLowerCase());
    const matchFilter =
      filter === "all" ||
      (filter === "completed" && task.completed) ||
      (filter === "pending" && !task.completed);
    return matchSearch && matchFilter;
  });

  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <section className="mx-auto max-w-6xl px-6 py-12">
        <div className="mb-10">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-cyan-400">
            Task Manager
          </p>

          <h1 className="mt-2 text-4xl font-bold">Your Tasks</h1>

          <p className="mt-3 text-slate-400">
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
            className="text-sm font-medium text-cyan-400 transition hover:text-cyan-300"
          >
            ← Back to home
          </Link>
        </div>
      </section>
    </main>
  );
}

export default TasksPage;
