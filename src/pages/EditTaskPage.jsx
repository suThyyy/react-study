import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import TaskForm from "../components/TaskForm";
import useTaskLookups from "../hooks/useTaskLookups";
import { getTaskById, updateTask } from "../services/taskService";

function EditTaskPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const {
    users,
    categories,
    loading: lookupsLoading,
    error: lookupsError,
  } = useTaskLookups();

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    userId: "",
    categoryId: "",
    dueDate: "",
  });

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  // GET: Lấy thông tin Task cần chỉnh sửa
  useEffect(() => {
    let cancelled = false;

    async function fetchTask() {
      try {
        const task = await getTaskById(id);

        if (cancelled) return;

        setFormData({
          title: task.title ?? "",
          description: task.description ?? "",
          userId: String(task.userId ?? ""),
          categoryId: String(task.categoryId ?? ""),
          dueDate: task.dueDate ? task.dueDate.slice(0, 10) : "",
        });
      } catch (err) {
        if (!cancelled) {
          setError(err.message);
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    }

    fetchTask();

    return () => {
      cancelled = true;
    };
  }, [id]);

  // Cập nhật form khi nhập dữ liệu
  function handleFormChange(e) {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  // PUT: Lưu thông tin chỉnh sửa
  async function handleSaveTask() {
    setError("");

    if (!formData.title.trim()) {
      setError("Vui lòng nhập tiêu đề công việc.");
      return;
    }

    if (!formData.userId || !formData.categoryId) {
      setError("Vui lòng chọn người phụ trách và danh mục.");
      return;
    }

    if (saving) return;

    setSaving(true);

    try {
      await updateTask(id, {
        title: formData.title.trim(),
        description: formData.description.trim(),
        userId: Number(formData.userId),
        categoryId: Number(formData.categoryId),
        dueDate: formData.dueDate || null,
      });

      // PUT thành công, quay về danh sách
      navigate("/tasks");
    } catch (err) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
  }

  if (loading || lookupsLoading) {
    return (
      <main className="min-h-screen bg-white text-slate-900 dark:bg-slate-950 dark:text-white">
        <div className="mx-auto max-w-6xl px-6 py-12">Loading task...</div>
      </main>
    );
  }

  if (lookupsError) {
    return (
      <main className="min-h-screen bg-white text-slate-900 dark:bg-slate-950 dark:text-white">
        <div className="mx-auto max-w-6xl px-6 py-12 text-red-400">
          Error: {lookupsError}
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

          <h1 className="mt-2 text-4xl font-bold">Edit Task</h1>

          <p className="mt-3 text-slate-600 dark:text-slate-400">
            Update your task information.
          </p>
        </div>

        <TaskForm
          formData={formData}
          onFormChange={handleFormChange}
          users={users}
          categories={categories}
          isEditing={true}
          onSubmit={handleSaveTask}
          onCancel={() => navigate("/tasks")}
        />

        {saving && (
          <p className="mb-4 text-sm text-cyan-400">Saving changes...</p>
        )}

        {error && (
          <p
            role="alert"
            className="mb-6 rounded-xl border border-red-500/30 bg-red-500/10 p-3 text-sm text-red-400"
          >
            {error}
          </p>
        )}
      </section>
    </main>
  );
}

export default EditTaskPage;
