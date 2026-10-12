import { useEffect, useState } from "react";

function App() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    // fetch:
    // https://jsonplaceholder.typicode.com/users
    // nếu lỗi -> setError
    // cuối cùng -> setLoading(false)
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Fetch failed");
        }

        return response.json();
      })
      .then((data) => {
        setUsers(data);
      })
      .catch((err) => {
        setError(err.message);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <div>
      {
        /* map users ra tên */ users.map((user) => (
          <p key={user.id}>{user.name}</p>
        ))
      }
    </div>
  );
}

export default App;
