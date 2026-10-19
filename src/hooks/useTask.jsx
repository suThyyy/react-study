import { useEffect, useState } from "react";
import { getTasks } from "../services/taskService";

function useTasks() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadTasks() {
      try {
        const data = await getTasks();
        setTasks(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    }

    loadTasks();
  }, []);

  return {
    tasks,
    setTasks,
    loading,
    error,
    setError,
  };
}

export default useTasks;
