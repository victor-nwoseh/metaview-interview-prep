import { useState, useCallback } from 'react';
import type { GenerateRequest } from '../types';

export function useGenerateBrief() {
  const [brief, setBrief] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const generate = useCallback(async (jobDescription: string, candidateCv: string) => {
    setIsGenerating(true);
    setBrief('');
    setError(null);

    try {
      const payload: GenerateRequest = {
        job_description: jobDescription,
        candidate_cv: candidateCv,
      };

      const apiBase = import.meta.env.VITE_API_URL ?? '';
      const response = await fetch(`${apiBase}/api/generate`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        if (response.status >= 500) {
          throw new Error('The server encountered a problem. Please try again in a moment.');
        }
        if (response.status === 422) {
          throw new Error('The job description and CV fields must not be empty.');
        }
        throw new Error(`Request failed (${response.status}). Please try again.`);
      }

      if (!response.body) {
        throw new Error('No response body received from the server.');
      }

      const reader = response.body.getReader();
      const decoder = new TextDecoder();

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        const chunk = decoder.decode(value, { stream: true });
        setBrief((prev) => prev + chunk);
      }
    } catch (err) {
      if (err instanceof TypeError && (err.message.includes('fetch') || err.message.includes('network'))) {
        setError('Unable to reach the server. Check your connection and try again.');
      } else if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('An unexpected error occurred. Please try again.');
      }
    } finally {
      setIsGenerating(false);
    }
  }, []);

  return { brief, isGenerating, error, generate };
}
