import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { useAuth } from './useAuth';

export interface AnalyticsData {
  totalCandidates: number;
  totalApplications: number;
  totalOpenRoles: number;
  interviewsThisWeek: number;
  pipelineDistribution: {
    stage: string;
    count: number;
  }[];
  avgFitScoreByDepartment: {
    department: string;
    avgFit: number;
  }[];
  applicationsByDepartment: {
    department: string;
    count: number;
  }[];
  averageTimeToHire: number;
  topCandidates: {
    name: string;
    overallScore: number;
    applications: number;
  }[];
}

interface UseAnalyticsReturn {
  analytics: AnalyticsData | null;
  loading: boolean;
  error: string | null;
}

export function useAnalytics(): UseAnalyticsReturn {
  const { organisation } = useAuth();
  const [analytics, setAnalytics] = useState<AnalyticsData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!organisation?.id) {
      setLoading(false);
      return;
    }

    fetchAnalytics();
    subscribeToChanges();
  }, [organisation?.id]);

  async function fetchAnalytics() {
    if (!organisation?.id) return;

    setLoading(true);
    setError(null);

    try {
      // Fetch candidates
      const { data: candidatesData, error: candError } = await supabase
        .from('candidates')
        .select('id')
        .eq('org_id', organisation.id);

      if (candError) throw candError;

      // Fetch applications
      const { data: applicationsData, error: appError } = await supabase
        .from('applications')
        .select('id, stage, overall_fit, job_role_id, created_at')
        .eq('org_id', organisation.id);

      if (appError) throw appError;

      // Fetch job roles
      const { data: jobRolesData, error: jobError } = await supabase
        .from('job_roles')
        .select('id, department, status')
        .eq('org_id', organisation.id);

      if (jobError) throw jobError;

      // Fetch interviews
      const { data: interviewsData, error: intError } = await supabase
        .from('interviews')
        .select('id, scheduled_at, status')
        .eq('org_id', organisation.id);

      if (intError) throw intError;

      // Fetch assessments for top candidates
      const { data: assessmentsData, error: assError } = await supabase
        .from('assessments')
        .select('id, overall_score, candidates(name)')
        .eq('org_id', organisation.id)
        .order('overall_score', { ascending: false })
        .limit(5);

      if (assError) throw assError;

      // Calculate metrics
      const applications = applicationsData || [];
      const jobRoles = jobRolesData || [];
      const interviews = interviewsData || [];

      // Pipeline distribution
      const pipelineDistribution = [
        'new',
        'screening',
        'shortlisted',
        'interview',
        'offer',
        'hired',
        'rejected',
      ].map((stage) => ({
        stage,
        count: applications.filter((a: any) => a.stage === stage).length,
      }));

      // Interviews this week
      const oneWeekAgo = new Date();
      oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
      const interviewsThisWeek = interviews.filter((i: any) => {
        const scheduledDate = new Date(i.scheduled_at);
        return scheduledDate >= oneWeekAgo;
      }).length;

      // Average fit by department
      const avgFitByDept: { [key: string]: { sum: number; count: number } } = {};
      applications.forEach((app: any) => {
        const role = jobRoles.find((r: any) => r.id === app.job_role_id);
        if (role?.department) {
          if (!avgFitByDept[role.department]) {
            avgFitByDept[role.department] = { sum: 0, count: 0 };
          }
          avgFitByDept[role.department].sum += app.overall_fit || 0;
          avgFitByDept[role.department].count += 1;
        }
      });

      const avgFitScoreByDepartment = Object.entries(avgFitByDept).map(([dept, data]) => ({
        department: dept,
        avgFit: Math.round((data.sum / data.count) * 100) / 100,
      }));

      // Applications by department
      const appsByDept: { [key: string]: number } = {};
      jobRoles.forEach((role: any) => {
        if (!appsByDept[role.department]) {
          appsByDept[role.department] = 0;
        }
        const roleApps = applications.filter((a: any) => a.job_role_id === role.id);
        appsByDept[role.department] += roleApps.length;
      });

      const applicationsByDepartment = Object.entries(appsByDept).map(([dept, count]) => ({
        department: dept,
        count,
      }));

      // Average time to hire
      const hiredApps = applications.filter((a: any) => a.stage === 'hired');
      const avgTimeToHire =
        hiredApps.length > 0
          ? Math.round(
              hiredApps.reduce((sum: number, app: any) => {
                const createdDate = new Date(app.created_at);
                const now = new Date();
                return sum + (now.getTime() - createdDate.getTime()) / (1000 * 60 * 60 * 24);
              }, 0) / hiredApps.length
            )
          : 0;

      // Top candidates
      const topCandidates = (assessmentsData || [])
        .slice(0, 5)
        .map((assessment: any) => {
          const candidateApps = applications.filter(
            (a: any) => a.id === assessment.id
          ).length;
          return {
            name: assessment.candidates?.name || 'Unknown',
            overallScore: assessment.overall_score || 0,
            applications: candidateApps,
          };
        });

      setAnalytics({
        totalCandidates: candidatesData?.length || 0,
        totalApplications: applications.length,
        totalOpenRoles: jobRoles.filter((r: any) => r.status === 'open').length,
        interviewsThisWeek,
        pipelineDistribution,
        avgFitScoreByDepartment,
        applicationsByDepartment,
        averageTimeToHire: avgTimeToHire,
        topCandidates,
      });
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to fetch analytics';
      setError(message);
      console.error('Error fetching analytics:', err);
    } finally {
      setLoading(false);
    }
  }

  function subscribeToChanges() {
    if (!organisation?.id) return;

    const subscription = supabase
      .channel(`analytics:${organisation.id}`)
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'applications',
          filter: `org_id=eq.${organisation.id}`,
        },
        () => {
          fetchAnalytics();
        }
      )
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'interviews',
          filter: `org_id=eq.${organisation.id}`,
        },
        () => {
          fetchAnalytics();
        }
      )
      .subscribe();

    return () => {
      subscription.unsubscribe();
    };
  }

  return { analytics, loading, error };
}
