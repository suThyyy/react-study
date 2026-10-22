import { useCallback, useMemo, useState } from "react";
import { Link } from "react-router-dom";

import {
  createTask,
  deleteTask,
  updateTaskStatus,
} from "../services/taskService";

import TaskList from "../components/TaskList";
import TaskForm from "../components/TaskForm";
import TaskFilter from "../components/TaskFilter";
import useTasks from "../hooks/useTask";
import useTaskLookups from "../hooks/useTaskLookups";

function TasksPage() {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    userId: "",
    categoryId: "",
    dueDate: "",
  });

  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");
  const [showHelp, setShowHelp] = useState(false);

  // Thông báo dành riêng cho form POST
  const [formError, setFormError] = useState("");
  const [formSuccess, setFormSuccess] = useState("");
  const [editingTaskId, setEditingTaskId] = useState(null);

  const {
    tasks,
    setTasks,
    loading: tasksLoading,
    error: tasksError,
    setError,
  } = useTasks();

  const {
    users,
    categories,
    loading: lookupsLoading,
    error: lookupsError,
  } = useTaskLookups();

  // Cập nhật dữ liệu form
  function handleFormChange(e) {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  function handleEditTask(task) {
    setEditingTaskId(task.id);

    setFormData({
      title: task.title ?? "",
      description: task.description ?? "",
      userId: String(task.userId),
      categoryId: String(task.categoryId),
      dueDate: task.dueDate ? task.dueDate.slice(0, 10) : "",
    });

    setFormError("");
    setFormSuccess("");
  }

  // POST: Tạo TodoTask
  async function handleCreateTask() {
    setFormError("");
    setFormSuccess("");

    try {
      if (!formData.title.trim()) {
        setFormError("Vui lòng nhập tiêu đề công việc.");
        return;
      }

      if (!formData.userId || !formData.categoryId) {
        setFormError("Vui lòng chọn người phụ trách và danh mục.");
        return;
      }

      const newTask = await createTask({
        title: formData.title.trim(),
        description: formData.description.trim(),
        userId: Number(formData.userId),
        categoryId: Number(formData.categoryId),
        dueDate: formData.dueDate || null,
      });

      // Cập nhật danh sách sau khi POST thành công
      setTasks((prev) => [...prev, newTask]);

      // Reset form
      setFormData({
        title: "",
        description: "",
        userId: "",
        categoryId: "",
        dueDate: "",
      });

      setFormSuccess("Thêm TodoTask thành công!");
    } catch (error) {
      // Lỗi POST chỉ hiển thị bên dưới form
      setFormError(error.message);
    }
  }

  // Cập nhật trạng thái Task (logic hiện tại)
  const handleUpdateTask = useCallback(
    async (task) => {
      try {
        const completed = !task.completed;

        await updateTaskStatus(task.id, completed);

        setTasks((prev) =>
          prev.map((item) =>
            item.id === task.id ? { ...item, completed } : item,
          ),
        );
      } catch (error) {
        setError(error.message);
      }
    },
    [setTasks, setError],
  );

  // DELETE: Xóa Task

  const handleDeleteTask = useCallback(
    async (id) => {
      const confirmed = window.confirm(
        "Bạn có chắc chắn muốn xóa công việc này không?",
      );

      if (!confirmed) return;

      setFormError("");
      setFormSuccess("");

      try {
        await deleteTask(id);

        setTasks((prev) => prev.filter((task) => task.id !== id));

        setFormSuccess("Xóa TodoTask thành công!");
      } catch (error) {
        setFormError(`Xóa thất bại: ${error.message}`);
      }
    },
    [setTasks],
  );

  // Tìm kiếm và lọc danh sách
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

  // Loading
  if (tasksLoading || lookupsLoading) {
    return (
      <main className="min-h-screen bg-white text-slate-900 dark:bg-slate-950 dark:text-white">
        <div className="mx-auto max-w-6xl px-6 py-12">
          <p className="text-slate-500 dark:text-slate-400">Loading tasks...</p>
        </div>
      </main>
    );
  }

  // Lỗi tải dữ liệu ban đầu
  if (tasksError || lookupsError) {
    return (
      <main className="min-h-screen bg-white text-slate-900 dark:bg-slate-950 dark:text-white">
        <div className="mx-auto max-w-6xl px-6 py-12">
          <p className="text-red-600 dark:text-red-400">
            Error: {tasksError || lookupsError}
          </p>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-white text-slate-900 transition-colors duration-300 dark:bg-slate-950 dark:text-white">
      <section className="mx-auto max-w-6xl px-6 py-12">
        {/* Header */}
        <div className="mb-10">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-cyan-600 dark:text-cyan-400">
            Task Manager
          </p>

          <h1 className="mt-2 text-4xl font-bold">Your Tasks</h1>

          <p className="mt-3 text-slate-600 dark:text-slate-400">
            Manage and track your daily tasks.
          </p>
        </div>

        {/* Create Task Form */}
        <TaskForm
          formData={formData}
          onFormChange={handleFormChange}
          users={users}
          categories={categories}
          onSubmit={handleCreateTask}
        />

        {/* Thông báo lỗi form */}
        {formError && (
          <p
            role="alert"
            className="mb-6 rounded-xl border border-red-500/30 bg-red-500/10 p-3 text-sm text-red-400"
          >
            {formError}
          </p>
        )}

        {/* Thông báo POST thành công */}
        {formSuccess && (
          <p
            role="status"
            className="mb-6 rounded-xl border border-green-500/30 bg-green-500/10 p-3 text-sm text-green-400"
          >
            {formSuccess}
          </p>
        )}

        {/* Search and Filter */}
        <TaskFilter
          search={search}
          onSearchChange={setSearch}
          filter={filter}
          onFilterChange={setFilter}
        />

        {/* Task List */}
        <TaskList
          tasks={filteredTasks}
          users={users}
          categories={categories}
          onDelete={handleDeleteTask}
          onToggle={handleUpdateTask}
          onEdit={handleEditTask}
        />

        {/* Back to Home */}
        <div className="mt-10">
          <Link
            to="/"
            className="text-sm font-medium text-cyan-600 transition hover:text-cyan-500 dark:text-cyan-400 dark:hover:text-cyan-300"
          >
            ← Back to home
          </Link>
        </div>

        {/* Help */}
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
