function TaskFilter({ search, onSearchChange, filter, onFilterChange }) {
  return (
    <div className="mb-6 space-y-4">
      <input
        type="text"
        value={search}
        placeholder="Search tasks..."
        onChange={(e) => onSearchChange(e.target.value)}
        className="w-full rounded-xl border border-slate-700 bg-slate-900 px-4 py-3 text-white outline-none transition placeholder:text-slate-500 focus:border-cyan-400"
      />

      <div className="flex flex-wrap gap-2">
        <button
          onClick={() => onFilterChange("all")}
          className={`rounded-lg px-4 py-2 text-sm font-medium transition ${
            filter === "all"
              ? "bg-cyan-400 text-slate-950"
              : "bg-slate-900 text-slate-400 hover:bg-slate-800 hover:text-white"
          }`}
        >
          All
        </button>

        <button
          onClick={() => onFilterChange("completed")}
          className={`rounded-lg px-4 py-2 text-sm font-medium transition ${
            filter === "completed"
              ? "bg-green-400 text-slate-950"
              : "bg-slate-900 text-slate-400 hover:bg-slate-800 hover:text-white"
          }`}
        >
          Completed
        </button>

        <button
          onClick={() => onFilterChange("pending")}
          className={`rounded-lg px-4 py-2 text-sm font-medium transition ${
            filter === "pending"
              ? "bg-amber-400 text-slate-950"
              : "bg-slate-900 text-slate-400 hover:bg-slate-800 hover:text-white"
          }`}
        >
          Pending
        </button>
      </div>
    </div>
  );
}

export default TaskFilter;
