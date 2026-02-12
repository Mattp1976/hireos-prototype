import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { useAuth } from './useAuth';

export interface CandidateWithAssessment {
  id: string;
  name: string;
  email: string;
  location: string;
  tagline: string;
  os_strength: number;
  consistency: number;
  assessment?: {
    cognitive_analytical: number;
    cognitive_creative: number;
    cognitive_strategic: number;
    cognitive_empathetic: number;
    cognitive_systematic: number;
    cognitive_adaptive: number;
    comm_directness: number;
    comm_formality: number;
    comm_detail: number;
    comm_warmth: number;
    comm_persuasion: number;
    comm_clarity: number;
    values: string[];
    working_style: string;
    decision_model: string;
    creative_style: string;
    leadership_style: string;
    conflict_approach: string;
    overall_score: number;
  };
}

interface UseCandidatesReturn {
  candidates: CandidateWithAssessment[];
  loading: boolean;
  error: string | null;
}

export function useCandidates(): UseCandidatesReturn {
  const { organisation } = useAuth();
  const [candidates, setCandidates] = useState<CandidateWithAssessment[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!organisation?.id) {
      setLoading(false);
      return;
    }

    fetchCandidates();
    subscribeToChanges();
  }, [organisation?.id]);

  async function fetchCandidates() {
    if (!organisation?.id) return;

    setLoading(true);
    setError(null);

    try {
      // Fetch candidates with their assessments
      const { data: candidatesData, error: candidatesError } = await supabase
        .from('candidates')
        .select(
          `
          id,
          name,
          email,
          location,
          tagline,
          os_strength,
          consistency,
          assessments(
            cognitive_analytical,
            cognitive_creative,
            cognitive_strategic,
            cognitive_empathetic,
            cognitive_systematic,
            cognitive_adaptive,
            comm_directness,
            comm_formality,
            comm_detail,
            comm_warmth,
            comm_persuasion,
            comm_clarity,
            values,
            working_style,
            decision_model,
            creative_style,
            leadership_style,
            conflict_approach,
            overall_score
          )
        `
        )
        .eq('org_id', organisation.id)
        .order('name');

      if (candidatesError) throw candidatesError;

      const processed = (candidatesData || []).map((candidate: any) => ({
        ...candidate,
        assessment: candidate.assessments?.[0] || undefined,
      }));

      setCandidates(processed);
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to fetch candidates';
      setError(message);
      console.error('Error fetching candidates:', err);
    } finally {
      setLoading(false);
    }
  }

  function subscribeToChanges() {
    if (!organisation?.id) return;

    const subscription = supabase
      .channel(`candidates:${organisation.id}`)
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'candidates',
          filter: `org_id=eq.${organisation.id}`,
        },
        () => {
          fetchCandidates();
        }
      )
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'assessments',
          filter: `org_id=eq.${organisation.id}`,
        },
        () => {
          fetchCandidates();
        }
      )
      .subscribe();

    return () => {
      subscription.unsubscribe();
    };
  }

  return { candidates, loading, error };
}
