import { useEffect, useState } from "react";
import { getUsers } from "../services/userService";
import { getCategories } from "../services/categoryService";

function useTaskLookups() {
  const [users, setUsers] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadLookups() {
      try {
        const [usersData, categoriesData] = await Promise.all([
          getUsers(),
          getCategories(),
        ]);
        setUsers(usersData);
        setCategories(categoriesData);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    loadLookups();
  }, []);
  return { users, categories, loading, error };
}
export default useTaskLookups;
