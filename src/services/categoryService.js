const API_URL = `${import.meta.env.VITE_API_BASE_URL}/api/categories`;

export async function getCategories() {
  const response = await fetch(API_URL);

  if (!response.ok) {
    throw new Error(`Get categories failed: ${response.status}`);
  }

  return response.json();
}
