const API_URL = `${import.meta.env.VITE_API_BASE_URL}/api/users`;

export async function getUsers() {
  const response = await fetch(API_URL);

  if (!response.ok) {
    throw new Error(`Get users failed: ${response.status}`);
  }

  return response.json();
}
