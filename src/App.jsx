import { useEffect, useState } from "react";

function App() {
  const [posts, setPosts] = useState([]);
  const [title, setTitle] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const API_URL = "https://jsonplaceholder.typicode.com/posts";

  // GET
  async function getPosts() {
    try {
      setLoading(true);
      setError("");

      const response = await fetch(`${API_URL}?_limit=5`);

      if (!response.ok) {
        throw new Error("Get posts failed");
      }

      const data = await response.json();

      setPosts(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  // POST
  async function createPost() {
    try {
      if (title.trim() === "") {
        return;
      }

      const response = await fetch(API_URL, {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify({
          title: title,
          body: "Learning React CRUD",
          userId: 1,
        }),
      });

      if (!response.ok) {
        throw new Error("Create post failed");
      }

      const newPost = await response.json();

      setPosts((prev) => [...prev, newPost]);

      setTitle("");
    } catch (err) {
      setError(err.message);
    }
  }

  // PATCH
  async function updatePost(id) {
    try {
      const response = await fetch(`${API_URL}/${id}`, {
        method: "PATCH",

        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify({
          title: "Updated Title",
        }),
      });

      if (!response.ok) {
        throw new Error("Update post failed");
      }

      const updatedPost = await response.json();

      setPosts((prev) =>
        prev.map((post) =>
          post.id === id
            ? {
                ...post,
                ...updatedPost,
              }
            : post,
        ),
      );
    } catch (err) {
      setError(err.message);
    }
  }

  // DELETE
  async function deletePost(id) {
    try {
      const response = await fetch(`${API_URL}/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Delete post failed");
      }

      setPosts((prev) => prev.filter((post) => post.id !== id));
    } catch (err) {
      setError(err.message);
    }
  }

  useEffect(() => {
    getPosts();
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <h1>Posts CRUD</h1>

      {error && <p>Error: {error}</p>}

      <div>
        <input
          type="text"
          value={title}
          placeholder="Post title"
          onChange={(e) => setTitle(e.target.value)}
        />

        <button onClick={createPost}>Create Post</button>
      </div>

      <hr />

      {posts.map((post) => (
        <div key={post.id}>
          <h3>
            {post.id} - {post.title}
          </h3>

          <button onClick={() => updatePost(post.id)}>Update</button>

          <button onClick={() => deletePost(post.id)}>Delete</button>
        </div>
      ))}
    </div>
  );
}

export default App;
