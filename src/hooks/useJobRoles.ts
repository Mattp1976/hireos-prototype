import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { useAuth } from './useAuth';

export interface JobRole {
  id: string;
  title: string;
  department: string;
  description: string;
  status: 'open' | 'closed' | 'draft';
  location: string;
  salary_min: number;
  salary_max: number;
  ideal_analytical: number;
  ideal_creative: number;
  ideal_strategic: number;
  ideal_empathetic: number;
  ideal_systematic: number;
  ideal_adaptive: number;
  required_values: string[];
  autonomy_level: string;
  collaboration_style: string;
  agentic_requirements: string[];
}

interface UseJobRolesReturn {
  jobRoles: JobRole[];
  loading: boolean;
  error: string | null;
}

export function useJobRoles(): UseJobRolesReturn {
  const { organisation } = useAuth();
  const [jobRoles, setJobRoles] = useState<JobRole[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!organisation?.id) {
      setLoading(false);
      return;
    }

    fetchJobRoles();
    subscribeToChanges();
  }, [organisation?.id]);

  async function fetchJobRoles() {
    if (!organisation?.id) return;

    setLoading(true);
    setError(null);

    try {
      const { data, error: fetchError } = await supabase
        .from('job_roles')
        .select('*')
        .eq('org_id', organisation.id)
        .order('created_at', { ascending: false });

      if (fetchError) throw fetchError;

      setJobRoles(data || []);
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to fetch job roles';
      setError(message);
      console.error('Error fetching job roles:', err);
    } finally {
      setLoading(false);
    }
  }

  function subscribeToChanges() {
    if (!organisation?.id) return;

    const subscription = supabase
      .channel(`job_roles:${organisation.id}`)
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'job_roles',
          filter: `org_id=eq.${organisation.id}`,
        },
        () => {
          fetchJobRoles();
        }
      )
      .subscribe();

    return () => {
      subscription.unsubscribe();
    };
  }

  return { jobRoles, loading, error };
}
