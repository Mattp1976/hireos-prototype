import React from 'react';
import { useCandidates } from '../hooks/useCandidates';
import { useApplications } from '../hooks/useApplications';
import { useInterviews } from '../hooks/useInterviews';
import { useJobRoles } from '../hooks/useJobRoles';
import { useAnalytics } from '../hooks/useAnalytics';

function StatCard({ label, value, icon, loading }: any) {
  return (
    <div className="bg-slate-800 border border-slate-700 rounded-lg p-6">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-slate-400 text-sm font-medium">{label}</p>
          {loading ? (
            <div className="mt-2 h-8 bg-slate-700 rounded animate-pulse w-24"></div>
          ) : (
            <p className="mt-2 text-3xl font-bold text-white">{value}</p>
          )}
        </div>
        <span className="text-3xl opacity-50">{icon}</span>
      </div>
    </div>
  );
}

function RecentApplicationItem({ app }: any) {
  const stageColors: { [key: string]: string } = {
    new: 'bg-slate-600',
    screening: 'bg-indigo-600',
    shortlisted: 'bg-violet-600',
    interview: 'bg-purple-600',
    offer: 'bg-green-600',
    hired: 'bg-emerald-600',
    rejected: 'bg-red-600',
  };

  return (
    <div className="flex items-center justify-between p-4 bg-slate-800/50 border border-slate-700 rounded-lg hover:bg-slate-700/30 transition">
      <div>
        <p className="font-medium text-white">{app.candidate_name}</p>
        <p className="text-sm text-slate-400">{app.job_role_title}</p>
      </div>
      <div className="flex items-center gap-3">
        <span className={`px-3 py-1 rounded text-xs font-medium text-white capitalize ${stageColors[app.stage] || 'bg-slate-600'}`}>
          {app.stage}
        </span>
        <span className="text-sm font-bold text-indigo-400">{Math.round(app.overall_fit * 100)}%</span>
      </div>
    </div>
  );
}

function UpcomingInterviewItem({ interview }: any) {
  const date = new Date(interview.scheduled_at);
  const timeStr = date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
  const dateStr = date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });

  return (
    <div className="flex items-center justify-between p-4 bg-slate-800/50 border border-slate-700 rounded-lg hover:bg-slate-700/30 transition">
      <div>
        <p className="font-medium text-white">{interview.candidate_name}</p>
        <p className="text-sm text-slate-400">{interview.interview_type}</p>
      </div>
      <div className="text-right">
        <p className="text-sm font-medium text-white">{timeStr}</p>
        <p className="text-xs text-slate-400">{dateStr}</p>
      </div>
    </div>
  );
}

export default function Dashboard() {
  const { candidates, loading: candidatesLoading } = useCandidates();
  const { applications, loading: applicationsLoading } = useApplications();
  const { interviews, loading: interviewsLoading } = useInterviews();
  const { jobRoles, loading: jobRolesLoading } = useJobRoles();
  const { analytics, loading: analyticsLoading } = useAnalytics();

  const openRoles = jobRoles.filter((role) => role.status === 'open').length;

  // Upcoming interviews
  const now = new Date();
  const upcomingInterviews = interviews
    .filter(
      (i) =>
        new Date(i.scheduled_at) > now &&
        (i.status === 'scheduled' || i.status === 'completed')
    )
    .slice(0, 5);

  // Recent applications
  const recentApplications = applications.slice(0, 5);

  // This week's interviews count
  const oneWeekAgo = new Date();
  oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
  const interviewsThisWeek = interviews.filter(
    (i) => new Date(i.scheduled_at) >= oneWeekAgo
  ).length;

  const isLoading =
    candidatesLoading ||
    applicationsLoading ||
    interviewsLoading ||
    jobRolesLoading ||
    analyticsLoading;

  return (
    <div className="space-y-8">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          label="Total Candidates"
          value={candidates.length}
          icon="👥"
          loading={candidatesLoading}
        />
        <StatCard
          label="Open Roles"
          value={openRoles}
          icon="💼"
          loading={jobRolesLoading}
        />
        <StatCard
          label="In Pipeline"
          value={applications.length}
          icon="🔄"
          loading={applicationsLoading}
        />
        <StatCard
          label="Interviews This Week"
          value={interviewsThisWeek}
          icon="🎤"
          loading={interviewsLoading}
        />
      </div>

      {/* Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Recent Applications */}
        <div className="bg-slate-900 border border-slate-700 rounded-lg p-6">
          <h3 className="text-lg font-bold text-white mb-4">Recent Applications</h3>
          {applicationsLoading ? (
            <div className="space-y-3">
              {[1, 2, 3].map((i) => (
                <div key={i} className="h-16 bg-slate-800 rounded animate-pulse"></div>
              ))}
            </div>
          ) : recentApplications.length > 0 ? (
            <div className="space-y-3">
              {recentApplications.map((app) => (
                <RecentApplicationItem key={app.id} app={app} />
              ))}
            </div>
          ) : (
            <p className="text-slate-400 text-center py-8">No applications yet</p>
          )}
        </div>

        {/* Upcoming Interviews */}
        <div className="bg-slate-900 border border-slate-700 rounded-lg p-6">
          <h3 className="text-lg font-bold text-white mb-4">Upcoming Interviews</h3>
          {interviewsLoading ? (
            <div className="space-y-3">
              {[1, 2, 3].map((i) => (
                <div key={i} className="h-16 bg-slate-800 rounded animate-pulse"></div>
              ))}
            </div>
          ) : upcomingInterviews.length > 0 ? (
            <div className="space-y-3">
              {upcomingInterviews.map((interview) => (
                <UpcomingInterviewItem key={interview.id} interview={interview} />
              ))}
            </div>
          ) : (
            <p className="text-slate-400 text-center py-8">No upcoming interviews</p>
          )}
        </div>
      </div>

      {/* Pipeline Overview */}
      {analytics && (
        <div className="bg-slate-900 border border-slate-700 rounded-lg p-6">
          <h3 className="text-lg font-bold text-white mb-6">Pipeline Overview</h3>
          <div className="space-y-4">
            {analytics.pipelineDistribution.map((stage) => (
              <div key={stage.stage}>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-slate-300 capitalize">
                    {stage.stage}
                  </span>
                  <span className="text-sm font-bold text-indigo-400">{stage.count}</span>
                </div>
                <div className="w-full bg-slate-700 rounded-full h-2">
                  <div
                    className="bg-gradient-to-r from-indigo-600 to-violet-600 h-2 rounded-full transition-all duration-300"
                    style={{
                      width: `${Math.min(
                        (stage.count / (analytics.totalApplications || 1)) * 100,
                        100
                      )}%`,
                    }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
