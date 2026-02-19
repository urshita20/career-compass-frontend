import type { AnalysisResult, TaskSubmission, UserContext } from '../types/analysis';

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || 'https://career-compass-backend-nzny.onrender.com';

export async function submitCareerAnalysis(
  careerTitle: string,
  tasks: TaskSubmission[],
  userContext: UserContext,
  image?: File | null
): Promise<AnalysisResult> {
  const formData = new FormData();
  formData.append('careerTitle', careerTitle);
  formData.append('tasks', JSON.stringify(tasks));
  formData.append('userContext', JSON.stringify(userContext));
  if (image) {
    formData.append('image', image);
  }

  const res = await fetch(`${BACKEND_URL}/api/analysis/career-task`, {
    method: 'POST',
    body: formData,
  });

  if (!res.ok) {
    const err = await res.json().catch(() => ({ error: 'Network error' }));
    throw new Error(err.error || `Request failed: ${res.status}`);
  }

  return res.json();
}
