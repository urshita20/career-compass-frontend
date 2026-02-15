const API_BASE_URL = "https://career-compass-backend-nzny.onrender.com/api/careers";

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

export interface AIInsight {
  insight: string;
  generatedAt: string;
  fallback?: boolean;
}

// Submit assessment and get AI-powered recommendations
export async function submitAssessment(answers: any): Promise<{ careers: BackendCareer[], aiInsight: AIInsight | null }> {
  try {
    const response = await fetch(`${API_BASE_URL}/assessment/submit`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ answers }),
    });

    if (!response.ok) {
      throw new Error("Failed to submit assessment");
    }

    const data = await response.json();
    return {
      careers: data.recommendedCareers || [],
      aiInsight: data.aiInsights || null
    };
  } catch (error) {
    console.error("Error submitting assessment:", error);
    return { careers: [], aiInsight: null };
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
