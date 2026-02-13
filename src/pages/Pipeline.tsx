import React, { useState } from 'react';
import { useApplications, ApplicationStage } from '../hooks/useApplications';

const STAGES: ApplicationStage[] = [
  'new',
  'screening',
  'shortlisted',
  'interview',
  'offer',
  'hired',
  'rejected',
];

const STAGE_LABELS: Record<string, string> = {
  new: 'New',
  screening: 'Screening',
  shortlisted: 'Shortlisted',
  interview: 'Interview',
  offer: 'Offer',
  hired: 'Hired',
  rejected: 'Rejected',
};

const STAGE_COLORS: Record<string, string> = {
  new: 'bg-slate-600',
  screening: 'bg-blue-600',
  shortlisted: 'bg-indigo-600',
  interview: 'bg-purple-600',
  offer: 'bg-amber-600',
  hired: 'bg-emerald-600',
  rejected: 'bg-red-600',
};

function ApplicationCard({ application, onUpdateStage, isUpdating }: any) {
  const [showMenu, setShowMenu] = useState(false);

  return (
    <div className="bg-slate-700/50 border border-slate-600 rounded-lg p-4 hover:border-slate-500 transition">
      <div className="mb-3">
        <h4 className="font-semibold text-white text-sm">{application.candidate_name}</h4>
        <p className="text-xs text-slate-400">{application.job_role_title}</p>
      </div>

      <div className="mb-4">
        <div className="flex items-center justify-between">
          <span className="text-xs text-slate-400">Overall Fit</span>
          <span className="text-sm font-bold text-indigo-400">
            {Math.round(application.overall_fit)}%
          </span>
        </div>
        <div className="mt-1 w-full bg-slate-600 rounded-full h-1.5">
          <div
            className="bg-gradient-to-r from-indigo-600 to-violet-600 h-1.5 rounded-full"
            style={{ width: `${application.overall_fit}%` }}
          ></div>
        </div>
      </div>

      <div className="space-y-2 mb-4">
        <div className="flex justify-between text-xs">
          <span className="text-slate-400">Cognitive</span>
          <span className="text-slate-300">{Math.round(application.cognitive_match)}%</span>
        </div>
        <div className="flex justify-between text-xs">
          <span className="text-slate-400">Communication</span>
          <span className="text-slate-300">{Math.round(application.communication_match)}%</span>
        </div>
        <div className="flex justify-between text-xs">
          <span className="text-slate-400">Values</span>
          <span className="text-slate-300">{Math.round(application.values_alignment)}%</span>
        </div>
      </div>

      <div className="relative">
        <button
          onClick={() => setShowMenu(!showMenu)}
          className="w-full px-3 py-2 bg-slate-600 hover:bg-slate-500 text-white text-xs font-medium rounded transition flex items-center justify-between"
        >
          <span>Change Stage</span>
          <span>â¼</span>
        </button>

        {showMenu && (
          <div className="absolute top-full left-0 right-0 mt-1 bg-slate-800 border border-slate-600 rounded-lg shadow-lg z-10">
            {STAGES.map((stage) => (
              <button
                key={stage}
                onClick={() => {
                  onUpdateStage(application.id, stage);
                  setShowMenu(false);
                }}
                disabled={isUpdating || stage === application.stage}
                className={`w-full text-left px-4 py-2 text-sm transition ${
                  stage === application.stage
                    ? 'bg-slate-700 text-indigo-400 font-medium'
                    : 'text-slate-300 hover:bg-slate-700'
                } disabled:opacity-50 disabled:cursor-not-allowed`}
              >
                {STAGE_LABELS[stage]}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function PipelineColumn({ stage, applications, onUpdateStage, isUpdating }: any) {
  const stageApps = applications.filter((app: any) => app.stage === stage);

  return (
    <div className="bg-slate-800/50 rounded-lg p-4 flex flex-col flex-1 min-w-0">
      <div className="mb-4 pb-4 border-b border-slate-700">
        <div className="flex items-center justify-between">
          <h3 className="font-semibold text-white">{STAGE_LABELS[stage]}</h3>
          <span className={`${STAGE_COLORS[stage]} text-white text-xs font-bold px-2.5 py-1 rounded`}>
            {stageApps.length}
          </span>
        </div>
      </div>

      <div className="space-y-3 overflow-y-auto flex-1">
        {stageApps.length > 0 ? (
          stageApps.map((app: any) => (
            <ApplicationCard
              key={app.id}
              application={app}
              onUpdateStage={onUpdateStage}
              isUpdating={isUpdating}
            />
          ))
        ) : (
          <p className="text-slate-500 text-xs text-center py-8">No applications</p>
        )}
      </div>
    </div>
  );
}

export default function Pipeline() {
  const { applications, loading, error, updateStage } = useApplications();
  const [isUpdating, setIsUpdating] = useState(false);

  async function handleUpdateStage(applicationId: string, newStage: ApplicationStage) {
    setIsUpdating(true);
    try {
      await updateStage(applicationId, newStage);
    } catch (err) {
      console.error('Failed to update stage:', err);
    } finally {
      setIsUpdating(false);
    }
  }

  if (error) {
    return (
      <div className="p-4 bg-red-900/30 border border-red-700 rounded-lg text-red-300 text-sm">
        {error}
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-white">Hiring Pipeline</h2>
          <p className="text-slate-400 text-sm mt-1">
            {applications.length} application{applications.length !== 1 ? 's' : ''} in progress
          </p>
        </div>
      </div>

      {loading ? (
        <div className="grid grid-cols-7 gap-4">
          {STAGES.map((stage) => (
            <div
              key={stage}
              className="bg-slate-800/50 rounded-lg p-4 h-96 animate-pulse"
            ></div>
          ))}
        </div>
      ) : (
        <div className="flex gap-4 overflow-x-auto pb-4">
          {STAGES.map((stage) => (
            <div key={stage} className="flex-shrink-0 w-80 max-h-96">
              <PipelineColumn
                stage={stage}
                applications={applications}
                onUpdateStage={handleUpdateStage}
                isUpdating={isUpdating}
              />
            </div>
          ))}
        </div>
      )}

      {!loading && applications.length === 0 && (
        <div className="text-center py-12">
          <p className="text-slate-400 text-lg mb-2">No applications yet</p>
          <p className="text-slate-500 text-sm">
            Applications will appear here once candidates apply for your open roles
          </p>
        </div>
      )}
    </div>
  );
}
