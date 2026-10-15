const API_URL = "https://jsonplaceholder.typicode.com/todos";

export async function getTasks() {
  const response = await fetch(`${API_URL}?_limit=5`);

  if (!response.ok) {
    throw new Error("Get todos failed");
  }

  return response.json();
}

export async function getTaskById(id) {
  const response = await fetch(`${API_URL}/${id}`);

  if (!response.ok) {
    throw new Error("Get task detail failed");
  }

  return response.json();
}

export async function createTask(task) {
  const response = await fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(task),
  });
  if (!response.ok) {
    throw new Error("Create task failed");
  }
  return response.json();
}

export async function updateTask(id, updatedData) {
  const response = await fetch(`${API_URL}/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(updatedData),
  });
  if (!response.ok) {
    throw new Error("Update task failed");
  }
  return response.json();
}

export async function deleteTask(id) {
  const response = await fetch(`${API_URL}/${id}`, {
    method: "DELETE",
  });
  if (!response.ok) {
    throw new Error("Delete task failed");
  }
}
