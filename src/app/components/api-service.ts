const API_BASE_URL = "https://career-compass-backend.vercel.app/api/careers";

export interface BackendCareer {
  id: number;
  name: string;
  description: string;
  skills: string[];
  education: string;
  salary: string;
  stream: string;
  matchScore?: number;
}

// Get personalized career suggestions
export async function getCareerSuggestions(
  interest: string,
  subject: string,
  classLevel: string
): Promise<BackendCareer[]> {
  try {
    const response = await fetch(`${API_BASE_URL}/suggestions`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        interest,
        subject,
        classLevel,
      }),
    });

    if (!response.ok) {
      throw new Error("Failed to fetch career suggestions");
    }

    const data = await response.json();
    return data.recommendedCareers || [];
  } catch (error) {
    console.error("Error fetching career suggestions:", error);
    return [];
  }
}

// Get all careers
export async function getAllCareers(): Promise<BackendCareer[]> {
  try {
    const response = await fetch(`${API_BASE_URL}/all`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error("Failed to fetch all careers");
    }

    const data = await response.json();
    return data.careers || [];
  } catch (error) {
    console.error("Error fetching all careers:", error);
    return [];
  }
}
