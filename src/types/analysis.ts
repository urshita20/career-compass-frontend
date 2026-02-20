export interface CareerTask {
  id: string;
  title: string;
  description: string;
  duration: string;
  icon: string;
  requiresImage?: boolean;
  imagePrompt?: string;
}

export interface TaskSubmission {
  id: string;
  title: string;
  description: string;
  userAnswer?: string;
  completed: boolean;
  timeSpent?: string;
}


export interface UserContext {
  age?: string;
  background?: string;
  interests?: string;
}

export interface AnalysisResult {
  success: boolean;
  analysis: {
    fitScore: number;
    fitLabel: string;
    headline: string;
    strengths: string[];
    growthAreas: string[];
    personalityInsights: string;
    recommendation: string;
    alternativeCareers: string[];
    motivationalMessage: string;
    parseError?: boolean;
    raw?: string;
  };
  onetData?: any;
  alternativeOnetData?: any;
  error?: string;
}
