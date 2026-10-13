import { useEffect, useState } from "react";

function useFetch(url) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    // tự viết fetch ở đây
    async function getData() {
      try {
        const response = await fetch(`${url}`);
        if (!response.ok) {
          throw new Error("Fetch failed");
        }
        const result = await response.json();
        setData(result);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    getData();
  }, [url]);

  return {
    data,
    loading,
    error,
  };
}

function Users() {
  const { data, loading, error } = useFetch(
    "https://jsonplaceholder.typicode.com/users",
  );

  if (loading) return <p>Loading users...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      {data?.map((user) => (
        <p key={user.id}>{user.name}</p>
      ))}
    </div>
  );
}

function Posts() {
  const { data, loading, error } = useFetch(
    "https://jsonplaceholder.typicode.com/posts",
  );

  if (loading) return <p>Loading posts...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      {data?.slice(0, 5).map((post) => (
        <p key={post.id}>{post.title}</p>
      ))}
    </div>
  );
}

function App() {
  return (
    <>
      <h1>Users</h1>
      <Users />

      <h1>Posts</h1>
      <Posts />
    </>
  );
}

export default App;
