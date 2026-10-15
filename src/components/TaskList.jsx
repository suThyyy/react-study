import TaskItem from "./TaskItem";

function TaskList({ tasks, onDelete, onToggle }) {
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
}

export default TaskList;
