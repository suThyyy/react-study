import { useEffect, useState } from "react";

import PostForm from "../components/PostForm";
import PostList from "../components/PostList";

import {
  getPosts,
  createPost,
  updatePost,
  deletePost,
} from "../services/postService";

function PostsPage() {
  const [posts, setPosts] = useState([]);
  const [title, setTitle] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadPosts() {
      try {
        setLoading(true);
        setError("");

        const data = await getPosts();

        setPosts(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    loadPosts();
  }, []);

  async function handleCreate() {
    try {
      if (title.trim() === "") {
        return;
      }

      const newPost = await createPost({
        title,
        body: "Learning React CRUD",
        userId: 1,
      });

      setPosts((prev) => [...prev, newPost]);

      setTitle("");
    } catch (err) {
      setError(err.message);
    }
  }

  async function handleUpdate(id) {
    try {
      const updatedPost = await updatePost(id, {
        title: "Updated Title",
      });

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

  async function handleDelete(id) {
    try {
      await deletePost(id);

      setPosts((prev) => prev.filter((post) => post.id !== id));
    } catch (err) {
      setError(err.message);
    }
  }

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <h1>Posts CRUD</h1>

      {error && <p>Error: {error}</p>}

      <PostForm
        title={title}
        onTitleChange={setTitle}
        onCreate={handleCreate}
      />

      <PostList posts={posts} onUpdate={handleUpdate} onDelete={handleDelete} />
    </div>
  );
}

export default PostsPage;
