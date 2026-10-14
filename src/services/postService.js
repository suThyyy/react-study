// src/services/postService.js

const API_URL = "https://jsonplaceholder.typicode.com/posts";

export async function getPosts() {
  const response = await fetch(`${API_URL}?_limit=5`);

  if (!response.ok) {
    throw new Error("Get posts failed");
  }

  return response.json();
}

export async function createPost(post) {
  const response = await fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(post),
  });

  if (!response.ok) {
    throw new Error("Create post failed");
  }

  return response.json();
}

export async function updatePost(id, updatedData) {
  const response = await fetch(`${API_URL}/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(updatedData),
  });

  if (!response.ok) {
    throw new Error("Update post failed");
  }

  return response.json();
}

export async function deletePost(id) {
  const response = await fetch(`${API_URL}/${id}`, {
    method: "DELETE",
  });

  if (!response.ok) {
    throw new Error("Delete post failed");
  }
}
