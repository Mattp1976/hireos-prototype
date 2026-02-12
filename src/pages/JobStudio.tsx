import React, { useMemo } from 'react';
import { useJobRoles } from '../hooks/useJobRoles';
import { useApplications } from '../hooks/useApplications';

function JobRoleCard({ jobRole, applicationCount }: any) {
  const cognitiveScores = [
    { label: 'A', value: jobRole.ideal_analytical },
    { label: 'C', value: jobRole.ideal_creative },
    { label: 'S', value: jobRole.ideal_strategic },
    { label: 'E', value: jobRole.ideal_empathetic },
    { label: 'Sy', value: jobRole.ideal_systematic },
    { label: 'Ad', value: jobRole.ideal_adaptive },
  ];

  const salaryRange =
    jobRole.salary_min && jobRole.salary_max
      ? `$${(jobRole.salary_min / 1000).toFixed(0)}k - $${(jobRole.salary_max / 1000).toFixed(0)}k`
      : 'Not specified';

  const statusColors: { [key: string]: string } = {
    open: 'bg-emerald-900/30 text-emerald-300 border-emerald-600/50',
    closed: 'bg-red-900/30 text-red-300 border-red-600/50',
    draft: 'bg-amber-900/30 text-amber-300 border-amber-600/50',
  };

  return (
    <div className="bg-slate-800 border border-slate-700 rounded-lg p-6 hover:border-indigo-500/30 transition">
      <div className="flex items-start justify-between mb-4">
        <div>
          <h3 className="text-lg font-bold text-white">{jobRole.title}</h3>
          <p className="text-sm text-slate-400">{jobRole.department || 'Engineering'}</p>
        </div>
        <span
          className={`px-3 py-1 border rounded-full text-xs font-medium ${statusColors[jobRole.status] || 'bg-slate-700 text-slate-300 border-slate-600'}`}
        >
          {jobRole.status?.charAt(0).toUpperCase() + jobRole.status?.slice(1) || 'Unknown'}
        </span>
      </div>

      {jobRole.description && (
        <p className="text-sm text-slate-300 mb-4 line-clamp-2">{jobRole.description}</p>
      )}

      <div className="grid grid-cols-2 gap-4 mb-6 pb-6 border-b border-slate-700">
        <div>
          <p className="text-xs text-slate-400 mb-1">Location</p>
          <p className="text-sm font-medium text-white">{jobRole.location || 'Remote'}</p>
        </div>
        <div>
          <p className="text-xs text-slate-400 mb-1">Salary Range</p>
          <p className="text-sm font-medium text-white">{salaryRange}</p>
        </div>
      </div>

      {/* Ideal Cognitive Profile */}
      <div className="mb-6">
        <h4 className="text-xs font-semibold text-slate-300 mb-3 uppercase">Ideal Profile</h4>
        <div className="grid grid-cols-6 gap-2">
          {cognitiveScores.map((score) => (
            <div key={score.label} className="text-center">
              <div className="relative w-full aspect-square mb-1">
                <div className="absolute inset-0 bg-slate-700 rounded-full"></div>
                <div
                  className="absolute inset-0 bg-gradient-to-b from-indigo-600 to-indigo-500 rounded-full"
                  style={{
                    clipPath: `polygon(50% 50%, 50% 0%, ${50 + 50 * Math.cos(-Math.PI / 2 + (score.value * Math.PI * 2))}% ${50 + 50 * Math.sin(-Math.PI / 2 + (score.value * Math.PI * 2))}%)`,
                  }}
                ></div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-xs font-bold text-white">
                    {Math.round(score.value * 10)}
                  </span>
                </div>
              </div>
              <span className="text-xs font-medium text-slate-400">{score.label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Work Environment */}
      <div className="mb-6 pb-6 border-b border-slate-700">
        <h4 className="text-xs font-semibold text-slate-300 mb-3 uppercase">Work Environment</h4>
        <div className="space-y-2">
          {jobRole.autonomy_level && (
            <div className="flex justify-between items-center text-xs">
              <span className="text-slate-400">Autonomy</span>
              <span className="text-slate-300 font-medium">{jobRole.autonomy_level}</span>
            </div>
          )}
          {jobRole.collaboration_style && (
            <div className="flex justify-between items-center text-xs">
              <span className="text-slate-400">Collaboration</span>
              <span className="text-slate-300 font-medium">{jobRole.collaboration_style}</span>
            </div>
          )}
        </div>
      </div>

      {/* Required Values */}
      {jobRole.required_values && jobRole.required_values.length > 0 && (
        <div className="mb-6 pb-6 border-b border-slate-700">
          <h4 className="text-xs font-semibold text-slate-300 mb-3 uppercase">Required Values</h4>
          <div className="flex flex-wrap gap-2">
            {jobRole.required_values.map((value: string) => (
              <span
                key={value}
                className="px-2 py-1 bg-indigo-900/30 border border-indigo-600/50 rounded text-xs font-medium text-indigo-300"
              >
                {value}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Application Count */}
      <div className="bg-indigo-900/20 border border-indigo-600/30 rounded-lg p-4 text-center">
        <p className="text-xs text-indigo-300 mb-1">Applications</p>
        <p className="text-2xl font-bold text-indigo-400">{applicationCount}</p>
      </div>
    </div>
  );
}

export default function JobStudio() {
  const { jobRoles, loading, error } = useJobRoles();
  const { applications } = useApplications();

  const applicationCountByRole = useMemo(() => {
    const counts: { [key: string]: number } = {};
    applications.forEach((app) => {
      counts[app.job_role_id] = (counts[app.job_role_id] || 0) + 1;
    });
    return counts;
  }, [applications]);

  const openRoles = jobRoles.filter((role) => role.status === 'open');
  const closedRoles = jobRoles.filter((role) => role.status === 'closed');
  const draftRoles = jobRoles.filter((role) => role.status === 'draft');

  if (error) {
    return (
      <div className="p-4 bg-red-900/30 border border-red-700 rounded-lg text-red-300 text-sm">
        {error}
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-emerald-900/20 border border-emerald-600/30 rounded-lg p-6">
          <p className="text-emerald-300 text-sm font-medium mb-2">Open Roles</p>
          {loading ? (
            <div className="h-10 bg-slate-700 rounded animate-pulse"></div>
          ) : (
            <p className="text-4xl font-bold text-emerald-400">{openRoles.length}</p>
          )}
        </div>
        <div className="bg-slate-800 border border-slate-700 rounded-lg p-6">
          <p className="text-slate-400 text-sm font-medium mb-2">Draft Roles</p>
          {loading ? (
            <div className="h-10 bg-slate-700 rounded animate-pulse"></div>
          ) : (
            <p className="text-4xl font-bold text-slate-300">{draftRoles.length}</p>
          )}
        </div>
        <div className="bg-red-900/20 border border-red-600/30 rounded-lg p-6">
          <p className="text-red-300 text-sm font-medium mb-2">Closed Roles</p>
          {loading ? (
            <div className="h-10 bg-slate-700 rounded animate-pulse"></div>
          ) : (
            <p className="text-4xl font-bold text-red-400">{closedRoles.length}</p>
          )}
        </div>
      </div>

      {/* Open Roles Section */}
      <div>
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-white">Open Positions</h2>
          <p className="text-slate-400 text-sm mt-1">
            {openRoles.length} role{openRoles.length !== 1 ? 's' : ''}
          </p>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="bg-slate-800 border border-slate-700 rounded-lg p-6 h-96 animate-pulse"
              ></div>
            ))}
          </div>
        ) : openRoles.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {openRoles.map((role) => (
              <JobRoleCard
                key={role.id}
                jobRole={role}
                applicationCount={applicationCountByRole[role.id] || 0}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-12 bg-slate-800/50 border border-slate-700 rounded-lg">
            <p className="text-slate-400 text-lg">No open positions</p>
          </div>
        )}
      </div>

      {/* Draft Roles Section */}
      {draftRoles.length > 0 && (
        <div>
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-white">Draft Positions</h2>
            <p className="text-slate-400 text-sm mt-1">{draftRoles.length} role{draftRoles.length !== 1 ? 's' : ''}</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {draftRoles.map((role) => (
              <JobRoleCard
                key={role.id}
                jobRole={role}
                applicationCount={applicationCountByRole[role.id] || 0}
              />
            ))}
          </div>
        </div>
      )}

      {/* Closed Roles Section */}
      {closedRoles.length > 0 && (
        <div>
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-white">Closed Positions</h2>
            <p className="text-slate-400 text-sm mt-1">{closedRoles.length} role{closedRoles.length !== 1 ? 's' : ''}</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {closedRoles.map((role) => (
              <JobRoleCard
                key={role.id}
                jobRole={role}
                applicationCount={applicationCountByRole[role.id] || 0}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
