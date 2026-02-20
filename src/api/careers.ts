export async function fetchCareers() {
  try {
    const response = await fetch(
      "https://career-compass-backend-1-1fnz.onrender.com/api/careers"
    );

    return await response.json();
  } catch (error) {
    console.error(error);
    return [];
  }
}
