// Request payload sent to POST /api/generate — matches backend PrepRequest model
export interface GenerateRequest {
  job_description: string;
  candidate_cv: string;
}

// State shape returned by the useGenerateBrief hook
export interface BriefState {
  brief: string;
  isGenerating: boolean;
  error: string | null;
}

// The five sections of a completed interview brief (for reference / future use)
export interface InterviewBriefSections {
  competencyMap: string;
  questions: string;
  evaluationCriteria: string;
  gaps: string;
  interviewFlow: string;
}
