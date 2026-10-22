function TaskForm({
  formData,
  onFormChange,
  users,
  categories,
  onSubmit,
  isEditing = false,
  onCancel,
}) {
  const inputClass =
    "w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-white outline-none transition placeholder:text-slate-500 focus:border-cyan-400";

  return (
    <div className="mb-8 rounded-2xl border border-slate-800 bg-slate-900 p-4">
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        {/* Title */}
        <div className="sm:col-span-2">
          <label className="mb-2 block text-sm text-slate-400">
            Task Title
          </label>
          <input
            type="text"
            name="title"
            value={formData.title}
            placeholder="Enter task title..."
            onChange={onFormChange}
            className={inputClass}
          />
        </div>

        {/* Description */}
        <div className="sm:col-span-2">
          <label className="mb-2 block text-sm text-slate-400">
            Description
          </label>
          <textarea
            name="description"
            value={formData.description}
            placeholder="Enter task description..."
            onChange={onFormChange}
            rows={3}
            className={inputClass}
          />
        </div>

        {/* User */}
        <div>
          <label className="mb-2 block text-sm text-slate-400">
            Người phụ trách
          </label>
          <select
            name="userId"
            value={formData.userId}
            onChange={onFormChange}
            className={inputClass}
          >
            <option value="">Select user</option>
            {users.map((user) => (
              <option key={user.id} value={user.id}>
                {user.fullname}
              </option>
            ))}
          </select>
        </div>

        {/* Category */}
        <div>
          <label className="mb-2 block text-sm text-slate-400">Danh mục</label>
          <select
            name="categoryId"
            value={formData.categoryId}
            onChange={onFormChange}
            className={inputClass}
          >
            <option value="">Select category</option>
            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
        </div>

        {/* Due Date */}
        <div className="sm:col-span-2">
          <label className="mb-2 block text-sm text-slate-400">Due Date</label>
          <input
            type="date"
            name="dueDate"
            value={formData.dueDate}
            onChange={onFormChange}
            className={inputClass}
          />
        </div>

        {/* Submit */}
        <div className="sm:col-span-2 flex gap-3">
          <button
            type="button"
            onClick={onSubmit}
            className="w-full cursor-pointer rounded-xl bg-cyan-400 px-5 py-3 font-semibold text-slate-950 transition hover:bg-cyan-300"
          >
            {isEditing ? "Save Changes" : "Add Task"}
          </button>

          {isEditing && (
            <button
              type="button"
              onClick={onCancel}
              className="cursor-pointer rounded-xl border border-slate-700 px-5 py-3 font-semibold text-slate-300 transition hover:bg-slate-800"
            >
              Cancel
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default TaskForm;
