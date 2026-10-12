import { useEffect, useState } from "react";

function App() {
  const [userId, setUserId] = useState(1);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function getUser() {
      try {
        setLoading(true);
        setError("");

        const response = await fetch(
          `https://jsonplaceholder.typicode.com/users/${userId}`,
        );

        if (!response.ok) {
          throw new Error("Fetch failed");
        }

        const data = await response.json();

        setUser(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    getUser();
  }, [userId]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <>
      <input
        type="number"
        value={userId}
        onChange={(e) => {
          // tự viết
          setUserId(Number(e.target.value));
        }}
      />

      {/* loading */ loading && <p>Loading...</p>}
      {/* error */ error && <p>Error:{error} </p>}
      {
        /* user */ !loading && !error && user && (
          <div>
            <h2>{user.name}</h2>
            <h2>{user.email} </h2>
          </div>
        )
      }
    </>
  );
}

export default App;
