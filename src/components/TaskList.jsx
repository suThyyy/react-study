import { memo } from "react";
import TaskItem from "./TaskItem";

const TaskList = memo(function TaskList({ tasks, onDelete, onToggle }) {
  console.log("TaskList render");

  return (
    <div className="grid gap-4 md:grid-cols-2">
      {tasks.map((task) => (
        <TaskItem
          key={task.id}
          task={task}
          onDelete={onDelete}
          onToggle={onToggle}
        />
      ))}
    </div>
  );
});

export default TaskList;
