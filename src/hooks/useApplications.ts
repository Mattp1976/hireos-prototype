import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { useAuth } from './useAuth';

export type ApplicationStage = 'new' | 'screening' | 'shortlisted' | 'interview' | 'offer' | 'hired' | 'rejected';

export interface ApplicationWithDetails {
  id: string;
  candidate_id: string;
  job_role_id: string;
  stage: ApplicationStage;
  overall_fit: number;
  cognitive_match: number;
  communication_match: number;
  values_alignment: number;
  collaboration_fit: number;
  candidate_name: string;
  job_role_title: string;
  created_at: string;
}

interface UseApplicationsReturn {
  applications: ApplicationWithDetails[];
  loading: boolean;
  error: string | null;
  updateStage: (applicationId: string, newStage: ApplicationStage) => Promise<void>;
}

export function useApplications(): UseApplicationsReturn {
  const { organisation } = useAuth();
  const [applications, setApplications] = useState<ApplicationWithDetails[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!organisation?.id) {
      setLoading(false);
      return;
    }

    fetchApplications();
    subscribeToChanges();
  }, [organisation?.id]);

  async function fetchApplications() {
    if (!organisation?.id) return;

    setLoading(true);
    setError(null);

    try {
      const { data, error: fetchError } = await supabase
        .from('applications')
        .select(
          `
          id,
          candidate_id,
          job_role_id,
          stage,
          overall_fit,
          cognitive_match,
          communication_match,
          values_alignment,
          collaboration_fit,
          created_at,
          candidates(name),
          job_roles(title)
        `
        )
        .eq('org_id', organisation.id)
        .order('created_at', { ascending: false });

      if (fetchError) throw fetchError;

      const processed = (data || []).map((app: any) => ({
        id: app.id,
        candidate_id: app.candidate_id,
        job_role_id: app.job_role_id,
        stage: app.stage,
        overall_fit: app.overall_fit,
        cognitive_match: app.cognitive_match,
        communication_match: app.communication_match,
        values_alignment: app.values_alignment,
        collaboration_fit: app.collaboration_fit,
        candidate_name: app.candidates?.name || 'Unknown',
        job_role_title: app.job_roles?.title || 'Unknown Role',
        created_at: app.created_at,
      }));

      setApplications(processed);
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to fetch applications';
      setError(message);
      console.error('Error fetching applications:', err);
    } finally {
      setLoading(false);
    }
  }

  async function updateStage(applicationId: string, newStage: ApplicationStage) {
    try {
      // Get the current application to find old stage
      const app = applications.find((a) => a.id === applicationId);
      if (!app) throw new Error('Application not found');

      // Update application stage
      const { error: updateError } = await supabase
        .from('applications')
        .update({ stage: newStage })
        .eq('id', applicationId);

      if (updateError) throw updateError;

      // Create history record
      const { error: historyError } = await supabase.from('application_history').insert({
        org_id: organisation?.id,
        application_id: applicationId,
        old_stage: app.stage,
        new_stage: newStage,
        changed_by: organisation?.id,
        changed_at: new Date().toISOString(),
      });

      if (historyError) throw historyError;

      // Update local state
      setApplications((prev) =>
        prev.map((a) => (a.id === applicationId ? { ...a, stage: newStage } : a))
      );
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to update stage';
      console.error('Error updating stage:', err);
      throw err;
    }
  }

  function subscribeToChanges() {
    if (!organisation?.id) return;

    const subscription = supabase
      .channel(`applications:${organisation.id}`)
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'applications',
          filter: `org_id=eq.${organisation.id}`,
        },
        () => {
          fetchApplications();
        }
      )
      .subscribe();

    return () => {
      subscription.unsubscribe();
    };
  }

  return { applications, loading, error, updateStage };
}
