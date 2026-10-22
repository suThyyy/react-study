import { memo } from "react";
import TaskItem from "./TaskItem";

const TaskList = memo(function TaskList({
  tasks,
  users,
  categories,
  onDelete,
  onToggle,
  onEdit,
}) {
  console.log("TaskList render");

  return (
    <div className="grid gap-4 md:grid-cols-2">
      {tasks.map((task) => (
        <TaskItem
          key={task.id}
          task={task}
          users={users}
          categories={categories}
          onDelete={onDelete}
          onToggle={onToggle}
          onEdit={onEdit}
        />
      ))}
    </div>
  );
});

export default TaskList;
