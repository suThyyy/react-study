import { useState } from "react";

function TodoItem({ todo, deleteTodo }) {
  return (
    <div>
      {todo}
      <button onClick={() => deleteTodo(todo)}>Delete</button>
    </div>
  );
}

function TodoList({ todos, deleteTodo }) {
  return (
    <>
      {todos.map((todo, index) => (
        <TodoItem key={index} todo={todo} deleteTodo={deleteTodo} />
      ))}
    </>
  );
}

function App() {
  const [todos, setTodos] = useState([
    "study",
    "report",
    "fix bug",
    "dating",
    "hanging out",
    "preparing meals",
  ]);

  function deleteTodo(todoToDelete) {
    setTodos((prev) => prev.filter((todo) => todo !== todoToDelete));
  }

  return (
    <>
      <TodoList todos={todos} deleteTodo={deleteTodo} />
    </>
  );
}

export default App;
