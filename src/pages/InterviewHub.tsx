import React, { useState } from 'react';
import { useInterviews } from '../hooks/useInterviews';

function InterviewStatusBadge({ status }: { status: string }) {
  const colors: { [key: string]: string } = {
    scheduled: 'bg-blue-900/30 text-blue-300 border-blue-600/50',
    completed: 'bg-emerald-900/30 text-emerald-300 border-emerald-600/50',
    cancelled: 'bg-red-900/30 text-red-300 border-red-600/50',
  };

  return (
    <span
      className={`px-3 py-1 border rounded-full text-xs font-medium ${colors[status] || 'bg-slate-700 text-slate-300 border-slate-600'}`}
    >
      {status?.charAt(0).toUpperCase() + status?.slice(1) || 'Unknown'}
    </span>
  );
}

function InterviewRow({ interview, onUpdateScorecard, isUpdating }: any) {
  const [showScorecardModal, setShowScorecardModal] = useState(false);
  const [scorecard, setScorecard] = useState(interview.scorecard || {});
  const [outcome, setOutcome] = useState(interview.outcome || '');

  const date = new Date(interview.scheduled_at);
  const dateStr = date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
  const timeStr = date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });

  function handleSaveScorecardh() {
    onUpdateScorecard(interview.id, scorecard, outcome);
    setShowScorecardModal(false);
  }

  return (
    <>
      <div className="bg-slate-800 border border-slate-700 rounded-lg p-6 hover:border-indigo-500/30 transition">
        <div className="flex items-start justify-between mb-4">
          <div>
            <h3 className="text-lg font-semibold text-white">{interview.candidate_name}</h3>
            <p className="text-sm text-slate-400">{interview.job_role_title}</p>
          </div>
          <InterviewStatusBadge status={interview.status} />
        </div>

        <div className="grid grid-cols-2 gap-4 mb-4">
          <div>
            <p className="text-xs text-slate-400 mb-1">Interview Type</p>
            <p className="text-sm font-medium text-white">{interview.interview_type || 'Not specified'}</p>
          </div>
          <div>
            <p className="text-xs text-slate-400 mb-1">Duration</p>
            <p className="text-sm font-medium text-white">{interview.duration_minutes} minutes</p>
          </div>
          <div>
            <p className="text-xs text-slate-400 mb-1">Date & Time</p>
            <p className="text-sm font-medium text-white">
              {dateStr} at {timeStr}
            </p>
          </div>
          <div>
            <p className="text-xs text-slate-400 mb-1">Location</p>
            <p className="text-sm font-medium text-white">{interview.location || 'TBD'}</p>
          </div>
        </div>

        {interview.meeting_url && (
          <div className="mb-4 p-3 bg-indigo-900/20 border border-indigo-600/30 rounded-lg">
            <p className="text-xs text-indigo-300 mb-1">Meeting Link</p>
            <a
              href={interview.meeting_url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-indigo-400 hover:text-indigo-300 break-all"
            >
              {interview.meeting_url}
            </a>
          </div>
        )}

        {interview.status === 'completed' && interview.scorecard && (
          <div className="mb-4 p-4 bg-slate-700/50 border border-slate-600 rounded-lg">
            <h4 className="text-sm font-semibold text-white mb-3">Interview Scorecard</h4>
            <div className="grid grid-cols-2 gap-3 mb-3">
              {Object.entries(interview.scorecard).map(([key, value]: [string, any]) => (
                <div key={key} className="text-sm">
                  <p className="text-xs text-slate-400 capitalize">{key.replace(/_/g, ' ')}</p>
                  <p className="text-white font-medium">{value}</p>
                </div>
              ))}
            </div>
            {interview.outcome && (
              <div className="pt-3 border-t border-slate-600">
                <p className="text-xs text-slate-400 mb-1">Outcome</p>
                <p className="text-white font-medium">{interview.outcome}</p>
              </div>
            )}
          </div>
        )}

        {interview.status === 'scheduled' && (
          <button
            onClick={() => setShowScorecardModal(true)}
            className="w-full py-2 px-4 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg text-sm font-medium transition"
          >
            Complete Interview
          </button>
        )}

        {interview.status === 'completed' && (
          <button
            onClick={() => setShowScorecardModal(true)}
            className="w-full py-2 px-4 bg-slate-700 hover:bg-slate-600 text-slate-200 rounded-lg text-sm font-medium transition"
          >
            View/Edit Scorecard
          </button>
        )}
      </div>

      {/* Scorecard Modal */}
      {showScorecardModal && (
        <div
          className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50"
          onClick={() => setShowScorecardModal(false)}
        >
          <div
            className="bg-slate-800 border border-slate-700 rounded-lg max-w-2xl w-full"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between p-6 border-b border-slate-700">
              <h3 className="text-xl font-bold text-white">Interview Scorecard</h3>
              <button
                onClick={() => setShowScorecardModal(false)}
                className="text-slate-400 hover:text-white text-2xl"
              >
                ✕
              </button>
            </div>

            <div className="p-6 space-y-6">
              {/* Scorecard Fields */}
              <div>
                <h4 className="text-sm font-semibold text-white mb-4">Evaluation Scores</h4>
                <div className="grid grid-cols-2 gap-4">
                  {[
                    'technical_skills',
                    'communication',
                    'problem_solving',
                    'cultural_fit',
                    'experience_level',
                    'motivation',
                  ].map((field) => (
                    <div key={field}>
                      <label className="block text-xs font-medium text-slate-300 mb-2 capitalize">
                        {field.replace(/_/g, ' ')}
                      </label>
                      <input
                        type="number"
                        min="0"
                        max="10"
                        value={scorecard[field] || 5}
                        onChange={(e) =>
                          setScorecard({ ...scorecard, [field]: parseInt(e.target.value) })
                        }
                        className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded text-white text-sm focus:outline-none focus:border-indigo-500"
                      />
                    </div>
                  ))}
                </div>
              </div>

              {/* Outcome */}
              <div>
                <label className="block text-sm font-medium text-white mb-2">Outcome</label>
                <select
                  value={outcome}
                  onChange={(e) => setOutcome(e.target.value)}
                  className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded text-white focus:outline-none focus:border-indigo-500"
                >
                  <option value="">Select outcome...</option>
                  <option value="strong_hire">Strong Hire</option>
                  <option value="hire">Hire</option>
                  <option value="maybe">Maybe</option>
                  <option value="no_hire">No Hire</option>
                </select>
              </div>

              {/* Notes */}
              <div>
                <label className="block text-sm font-medium text-white mb-2">Notes</label>
                <textarea
                  value={scorecard.notes || ''}
                  onChange={(e) => setScorecard({ ...scorecard, notes: e.target.value })}
                  placeholder="Add any additional feedback..."
                  className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded text-white text-sm focus:outline-none focus:border-indigo-500 resize-none"
                  rows={4}
                ></textarea>
              </div>

              {/* Actions */}
              <div className="flex gap-3">
                <button
                  onClick={() => setShowScorecardModal(false)}
                  className="flex-1 py-2 px-4 bg-slate-700 hover:bg-slate-600 text-slate-200 rounded-lg font-medium transition"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSaveScorecardh}
                  disabled={isUpdating}
                  className="flex-1 py-2 px-4 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg font-medium transition disabled:opacity-50"
                >
                  {isUpdating ? 'Saving...' : 'Save Scorecard'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default function InterviewHub() {
  const { interviews, loading, error, updateScorecard } = useInterviews();
  const [isUpdating, setIsUpdating] = useState(false);

  async function handleUpdateScorecard(
    interviewId: string,
    scorecard: any,
    outcome: string
  ) {
    setIsUpdating(true);
    try {
      await updateScorecard(interviewId, scorecard, outcome);
    } catch (err) {
      console.error('Failed to update scorecard:', err);
    } finally {
      setIsUpdating(false);
    }
  }

  const scheduled = interviews.filter((i) => i.status === 'scheduled');
  const completed = interviews.filter((i) => i.status === 'completed');

  if (error) {
    return (
      <div className="p-4 bg-red-900/30 border border-red-700 rounded-lg text-red-300 text-sm">
        {error}
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Scheduled Section */}
      <div>
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-white">Scheduled Interviews</h2>
          <p className="text-slate-400 text-sm mt-1">
            {scheduled.length} interview{scheduled.length !== 1 ? 's' : ''}
          </p>
        </div>

        {loading ? (
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="bg-slate-800 border border-slate-700 rounded-lg p-6 h-48 animate-pulse"
              ></div>
            ))}
          </div>
        ) : scheduled.length > 0 ? (
          <div className="space-y-4">
            {scheduled.map((interview) => (
              <InterviewRow
                key={interview.id}
                interview={interview}
                onUpdateScorecard={handleUpdateScorecard}
                isUpdating={isUpdating}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-12 bg-slate-800/50 border border-slate-700 rounded-lg">
            <p className="text-slate-400 text-lg mb-2">No scheduled interviews</p>
            <p className="text-slate-500 text-sm">Interviews will appear here once scheduled</p>
          </div>
        )}
      </div>

      {/* Completed Section */}
      <div>
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-white">Completed Interviews</h2>
          <p className="text-slate-400 text-sm mt-1">
            {completed.length} interview{completed.length !== 1 ? 's' : ''}
          </p>
        </div>

        {completed.length > 0 ? (
          <div className="space-y-4">
            {completed.map((interview) => (
              <InterviewRow
                key={interview.id}
                interview={interview}
                onUpdateScorecard={handleUpdateScorecard}
                isUpdating={isUpdating}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-12 bg-slate-800/50 border border-slate-700 rounded-lg">
            <p className="text-slate-400 text-lg mb-2">No completed interviews</p>
            <p className="text-slate-500 text-sm">Completed interviews will appear here</p>
          </div>
        )}
      </div>
    </div>
  );
}
