const API_URL = `${import.meta.env.VITE_API_BASE_URL}/api/todotasks`;

export async function getTasks() {
  const response = await fetch(API_URL);

  if (!response.ok) {
    throw new Error(`Get todotasks failed: ${response.status}`);
  }
  const data = await response.json();

  return data;
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
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(updatedData),
  });

  if (!response.ok) {
    throw new Error(`Update task failed: ${response.status}`);
  }

  const text = await response.text();

  return text ? JSON.parse(text) : null;
}

export async function updateTaskStatus(id, completed) {
  const response = await fetch(`${API_URL}/${id}/status`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ completed }),
  });

  if (!response.ok) {
    throw new Error(`Update task status failed: ${response.status}`);
  }

  return response.status === 204 ? null : response.json();
}

export async function deleteTask(id) {
  const response = await fetch(`${API_URL}/${id}`, {
    method: "DELETE",
  });
  if (!response.ok) {
    throw new Error("Delete task failed");
  }
}
