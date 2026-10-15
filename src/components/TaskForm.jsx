function TaskForm({ title, onTitleChange, onCreate }) {
  return (
    <div className="mb-8 rounded-2xl border border-slate-800 bg-slate-900 p-4">
      <div className="flex flex-col gap-3 sm:flex-row">
        <input
          type="text"
          value={title}
          placeholder="Enter task title..."
          onChange={(e) => onTitleChange(e.target.value)}
          className="flex-1 rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-white outline-none transition placeholder:text-slate-500 focus:border-cyan-400"
        />

        <button
          onClick={onCreate}
          className="rounded-xl bg-cyan-400 px-5 py-3 font-semibold text-slate-950 transition hover:bg-cyan-300"
        >
          Add Task
        </button>
      </div>
    </div>
  );
}

export default TaskForm;
