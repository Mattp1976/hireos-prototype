import React from 'react';
import { useAnalytics } from '../hooks/useAnalytics';

function BarChart({ data, label }: any) {
  const maxValue = Math.max(...data.map((d: any) => d.value || d.count), 1);

  return (
    <div className="space-y-4">
      {data.map((item: any, idx: number) => (
        <div key={idx}>
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-slate-300">
              {item.label || item.stage || item.department || 'Unknown'}
            </span>
            <span className="text-sm font-bold text-indigo-400">
              {item.value || item.count || 0}
            </span>
          </div>
          <div className="w-full bg-slate-700 rounded-full h-3">
            <div
              className="bg-gradient-to-r from-indigo-600 to-violet-600 h-3 rounded-full transition-all duration-300"
              style={{
                width: `${Math.min(((item.value || item.count || 0) / maxValue) * 100, 100)}%`,
              }}
            ></div>
          </div>
        </div>
      ))}
    </div>
  );
}

function MetricCard({ label, value, icon, loading }: any) {
  return (
    <div className="bg-slate-800 border border-slate-700 rounded-lg p-6">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-slate-400 text-sm font-medium">{label}</p>
          {loading ? (
            <div className="mt-2 h-8 bg-slate-700 rounded animate-pulse w-24"></div>
          ) : (
            <p className="mt-2 text-3xl font-bold text-white">{value}</p>
          )}
        </div>
        <span className="text-4xl opacity-40">{icon}</span>
      </div>
    </div>
  );
}

export default function Analytics() {
  const { analytics, loading, error } = useAnalytics();

  if (error) {
    return (
      <div className="p-4 bg-red-900/30 border border-red-700 rounded-lg text-red-300 text-sm">
        {error}
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Key Metrics */}
      <div>
        <h2 className="text-2xl font-bold text-white mb-6">Key Metrics</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <MetricCard
            label="Total Candidates"
            value={analytics?.totalCandidates || 0}
            icon="👥"
            loading={loading}
          />
          <MetricCard
            label="Total Applications"
            value={analytics?.totalApplications || 0}
            icon="📋"
            loading={loading}
          />
          <MetricCard
            label="Open Roles"
            value={analytics?.totalOpenRoles || 0}
            icon="💼"
            loading={loading}
          />
          <MetricCard
            label="Avg Days to Hire"
            value={analytics?.averageTimeToHire || 0}
            icon="⏱️"
            loading={loading}
          />
        </div>
      </div>

      {/* Pipeline Funnel */}
      {analytics && (
        <div className="bg-slate-900 border border-slate-700 rounded-lg p-6">
          <h3 className="text-lg font-bold text-white mb-6">Pipeline Distribution</h3>
          <BarChart
            data={analytics.pipelineDistribution.map((stage) => ({
              stage: stage.stage.charAt(0).toUpperCase() + stage.stage.slice(1),
              value: stage.count,
            }))}
          />
        </div>
      )}

      {/* Department Analytics */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Applications by Department */}
        {analytics && analytics.applicationsByDepartment.length > 0 && (
          <div className="bg-slate-900 border border-slate-700 rounded-lg p-6">
            <h3 className="text-lg font-bold text-white mb-6">Applications by Department</h3>
            <BarChart
              data={analytics.applicationsByDepartment.map((dept) => ({
                department: dept.department,
                value: dept.count,
              }))}
            />
          </div>
        )}

        {/* Average Fit Score by Department */}
        {analytics && analytics.avgFitScoreByDepartment.length > 0 && (
          <div className="bg-slate-900 border border-slate-700 rounded-lg p-6">
            <h3 className="text-lg font-bold text-white mb-6">Avg Fit Score by Department</h3>
            <BarChart
              data={analytics.avgFitScoreByDepartment.map((dept) => ({
                department: dept.department,
                value: Math.round(dept.avgFit * 100),
              }))}
            />
          </div>
        )}
      </div>

      {/* Top Performers */}
      {analytics && analytics.topCandidates.length > 0 && (
        <div className="bg-slate-900 border border-slate-700 rounded-lg p-6">
          <h3 className="text-lg font-bold text-white mb-6">Top Performing Candidates</h3>
          <div className="space-y-4">
            {analytics.topCandidates.map((candidate, idx) => (
              <div
                key={idx}
                className="flex items-center justify-between p-4 bg-slate-800/50 border border-slate-700 rounded-lg hover:border-indigo-500/30 transition"
              >
                <div>
                  <h4 className="font-semibold text-white">{candidate.name}</h4>
                  <p className="text-xs text-slate-400">
                    {candidate.applications} application{candidate.applications !== 1 ? 's' : ''}
                  </p>
                </div>
                <div className="text-right">
                  <div className="flex items-center gap-2 mb-1">
                    <div className="w-32 bg-slate-700 rounded-full h-2">
                      <div
                        className="bg-gradient-to-r from-emerald-600 to-emerald-500 h-2 rounded-full"
                        style={{ width: `${candidate.overallScore * 100}%` }}
                      ></div>
                    </div>
                  </div>
                  <span className="text-sm font-bold text-emerald-400">
                    {Math.round(candidate.overallScore * 100)}%
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Conversion Insights */}
      {analytics && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-slate-900 border border-slate-700 rounded-lg p-6">
            <h4 className="text-sm font-bold text-white mb-4">Pipeline Health</h4>
            <div className="space-y-3">
              {analytics.pipelineDistribution.slice(0, 3).map((stage) => {
                const percentage = Math.round(
                  (stage.count / (analytics.totalApplications || 1)) * 100
                );
                return (
                  <div key={stage.stage}>
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-xs text-slate-400 capitalize">{stage.stage}</span>
                      <span className="text-xs font-bold text-indigo-400">{percentage}%</span>
                    </div>
                    <div className="w-full bg-slate-700 rounded-full h-1.5">
                      <div
                        className="bg-indigo-600 h-1.5 rounded-full"
                        style={{ width: `${percentage}%` }}
                      ></div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="bg-slate-900 border border-slate-700 rounded-lg p-6">
            <h4 className="text-sm font-bold text-white mb-4">Hiring Funnel</h4>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between items-center">
                <span className="text-slate-400">Total Applicants</span>
                <span className="font-bold text-white">
                  {analytics.totalApplications}
                </span>
              </div>
              <div className="h-px bg-slate-700"></div>
              <div className="flex justify-between items-center">
                <span className="text-slate-400">Interviews</span>
                <span className="font-bold text-indigo-400">
                  {analytics.pipelineDistribution.find((s) => s.stage === 'interview')?.count ||
                    0}
                </span>
              </div>
              <div className="h-px bg-slate-700"></div>
              <div className="flex justify-between items-center">
                <span className="text-slate-400">Offers</span>
                <span className="font-bold text-emerald-400">
                  {analytics.pipelineDistribution.find((s) => s.stage === 'offer')?.count ||
                    0}
                </span>
              </div>
            </div>
          </div>

          <div className="bg-slate-900 border border-slate-700 rounded-lg p-6">
            <h4 className="text-sm font-bold text-white mb-4">Recent Activity</h4>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between items-center">
                <span className="text-slate-400">This Week</span>
                <span className="font-bold text-white">
                  {analytics.interviewsThisWeek} interview
                  {analytics.interviewsThisWeek !== 1 ? 's' : ''}
                </span>
              </div>
              <div className="h-px bg-slate-700"></div>
              <div className="flex justify-between items-center">
                <span className="text-slate-400">Hired</span>
                <span className="font-bold text-emerald-400">
                  {analytics.pipelineDistribution.find((s) => s.stage === 'hired')?.count ||
                    0}
                </span>
              </div>
              <div className="h-px bg-slate-700"></div>
              <div className="flex justify-between items-center">
                <span className="text-slate-400">Rejected</span>
                <span className="font-bold text-red-400">
                  {analytics.pipelineDistribution.find((s) => s.stage === 'rejected')?.count ||
                    0}
                </span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Loading State */}
      {loading && (
        <div className="space-y-6">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="bg-slate-800 border border-slate-700 rounded-lg p-6 h-64 animate-pulse"
            ></div>
          ))}
        </div>
      )}
    </div>
  );
}
