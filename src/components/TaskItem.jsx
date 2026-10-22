import { Link } from "react-router-dom";

function TaskItem({ task, users, categories, onDelete, onToggle, onEdit }) {
  const user = users.find((u) => u.id === task.userId);
  const category = categories.find((c) => c.id === task.categoryId);
  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-900 p-5 shadow-lg transition hover:-translate-y-1 hover:border-slate-700">
      <h3 className="font-semibold text-white">{task.title}</h3>

      <div className="mt-4 space-y-3 border-t border-slate-800 pt-4">
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          <div>
            <p className="text-xs text-slate-500">Người phụ trách</p>
            <p className="mt-1 text-sm font-medium text-slate-200">
              {user?.fullname ?? "Không xác định"}
            </p>
          </div>

          <div>
            <p className="text-xs text-slate-500">Danh mục</p>
            <p className="mt-1 text-sm font-medium text-cyan-400">
              {category?.name ?? "Không xác định"}
            </p>
          </div>
        </div>

        <div>
          <p className="text-xs text-slate-500">Mô tả</p>
          <p className="mt-1 text-sm whitespace-pre-wrap break-words text-slate-300">
            {task.description || "Không có mô tả"}
          </p>
        </div>

        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          <div>
            <p className="text-xs text-slate-500">Hạn hoàn thành</p>
            <p className="mt-1 text-sm text-slate-300">
              {task.dueDate || "Không có"}
            </p>
          </div>

          <div>
            <p className="text-xs text-slate-500">Ngày tạo</p>
            <p className="mt-1 text-sm text-slate-300">
              {task.createdAt
                ? new Date(task.createdAt).toLocaleString("vi-VN")
                : "Không xác định"}
            </p>
          </div>
        </div>
      </div>

      <div className="mt-4 flex items-center justify-between gap-3">
        <span
          className={`rounded-full px-3 py-1 text-xs font-semibold ${
            task.completed
              ? "bg-green-400/10 text-green-400"
              : "bg-amber-400/10 text-amber-400"
          }`}
        >
          {task.completed ? "Completed" : "Pending"}
        </span>

        <div className="flex gap-2">
          <Link
            to={`/tasks/${task.id}/edit`}
            className="rounded-lg border border-violet-500/30 bg-violet-500/10 px-3 py-1 text-sm font-medium text-violet-400 transition hover:bg-violet-500 hover:text-white"
          >
            Edit
          </Link>
          <Link
            to={`/tasks/${task.id}`}
            className="rounded-lg border border-cyan-500/30 bg-cyan-500/10 px-3 py-1 text-sm font-medium text-cyan-400 transition hover:bg-cyan-500 hover:text-slate-950"
          >
            View Detail
          </Link>
          <button
            onClick={() => onToggle(task)}
            className={`rounded-lg border px-3 py-1 text-sm font-medium transition ${
              task.completed
                ? "border-amber-500/30 bg-amber-500/10 text-amber-400 hover:bg-amber-500 hover:text-white"
                : "border-green-500/30 bg-green-500/10 text-green-400 hover:bg-green-500 hover:text-white"
            }`}
          >
            {task.completed ? "Undo" : "Complete"}
          </button>

          <button
            onClick={() => onDelete(task.id)}
            className="rounded-lg border border-red-500/30 bg-red-500/10 px-3 py-1 text-sm font-medium text-red-400 transition hover:bg-red-500 hover:text-white"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}

export default TaskItem;
