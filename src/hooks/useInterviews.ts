import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { useAuth } from './useAuth';

export interface InterviewScorecard {
  [key: string]: number | string;
}

export interface InterviewWithDetails {
  id: string;
  application_id: string;
  interviewer_id: string;
  scheduled_at: string;
  duration_minutes: number;
  interview_type: string;
  location: string;
  meeting_url: string;
  status: 'scheduled' | 'completed' | 'cancelled';
  scorecard: InterviewScorecard | null;
  outcome: string | null;
  candidate_name: string;
  job_role_title: string;
}

interface UseInterviewsReturn {
  interviews: InterviewWithDetails[];
  loading: boolean;
  error: string | null;
  updateScorecard: (
    interviewId: string,
    scorecard: InterviewScorecard,
    outcome: string
  ) => Promise<void>;
}

export function useInterviews(): UseInterviewsReturn {
  const { organisation } = useAuth();
  const [interviews, setInterviews] = useState<InterviewWithDetails[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!organisation?.id) {
      setLoading(false);
      return;
    }

    fetchInterviews();
    subscribeToChanges();
  }, [organisation?.id]);

  async function fetchInterviews() {
    if (!organisation?.id) return;

    setLoading(true);
    setError(null);

    try {
      const { data, error: fetchError } = await supabase
        .from('interviews')
        .select(
          `
          id,
          application_id,
          interviewer_id,
          scheduled_at,
          duration_minutes,
          interview_type,
          location,
          meeting_url,
          status,
          scorecard,
          outcome,
          applications(
            candidates(name),
            job_roles(title)
          )
        `
        )
        .eq('org_id', organisation.id)
        .order('scheduled_at', { ascending: false });

      if (fetchError) throw fetchError;

      const processed = (data || []).map((interview: any) => ({
        id: interview.id,
        application_id: interview.application_id,
        interviewer_id: interview.interviewer_id,
        scheduled_at: interview.scheduled_at,
        duration_minutes: interview.duration_minutes,
        interview_type: interview.interview_type,
        location: interview.location,
        meeting_url: interview.meeting_url,
        status: interview.status,
        scorecard: interview.scorecard,
        outcome: interview.outcome,
        candidate_name: interview.applications?.candidates?.name || 'Unknown',
        job_role_title: interview.applications?.job_roles?.title || 'Unknown Role',
      }));

      setInterviews(processed);
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to fetch interviews';
      setError(message);
      console.error('Error fetching interviews:', err);
    } finally {
      setLoading(false);
    }
  }

  async function updateScorecard(
    interviewId: string,
    scorecard: InterviewScorecard,
    outcome: string
  ) {
    try {
      const { error: updateError } = await supabase
        .from('interviews')
        .update({
          scorecard,
          outcome,
          status: 'completed',
        })
        .eq('id', interviewId);

      if (updateError) throw updateError;

      // Update local state
      setInterviews((prev) =>
        prev.map((i) =>
          i.id === interviewId
            ? { ...i, scorecard, outcome, status: 'completed' }
            : i
        )
      );
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to update scorecard';
      console.error('Error updating scorecard:', err);
      throw err;
    }
  }

  function subscribeToChanges() {
    if (!organisation?.id) return;

    const subscription = supabase
      .channel(`interviews:${organisation.id}`)
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'interviews',
          filter: `org_id=eq.${organisation.id}`,
        },
        () => {
          fetchInterviews();
        }
      )
      .subscribe();

    return () => {
      subscription.unsubscribe();
    };
  }

  return { interviews, loading, error, updateScorecard };
}
