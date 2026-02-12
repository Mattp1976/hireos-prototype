import React, { useState, useMemo } from 'react';
import { useCandidates } from '../hooks/useCandidates';
import { CandidateWithAssessment } from '../hooks/useCandidates';

function CandidateCard({ candidate, onSelect }: any) {
  return (
    <div
      onClick={onSelect}
      className="bg-slate-800 border border-slate-700 rounded-lg p-6 hover:border-indigo-500 hover:shadow-lg hover:shadow-indigo-500/20 transition cursor-pointer"
    >
      <div className="flex items-start justify-between mb-4">
        <div>
          <h3 className="text-lg font-bold text-white">{candidate.name}</h3>
          <p className="text-sm text-slate-400">{candidate.email}</p>
        </div>
        <div className="text-right">
          <div className="inline-block px-3 py-1 bg-indigo-900/30 border border-indigo-600/50 rounded text-xs font-medium text-indigo-300">
            OS: {Math.round(candidate.os_strength * 100)}%
          </div>
        </div>
      </div>

      {candidate.tagline && (
        <p className="text-slate-300 text-sm mb-4">{candidate.tagline}</p>
      )}

      <div className="flex items-center justify-between mb-4">
        <span className="text-xs text-slate-400">📍 {candidate.location || 'Unknown'}</span>
        <span className="text-xs font-medium text-slate-400">
          Consistency: {Math.round(candidate.consistency * 100)}%
        </span>
      </div>

      {candidate.assessment && (
        <div className="pt-4 border-t border-slate-700">
          <div className="grid grid-cols-3 gap-3">
            <div className="text-center">
              <p className="text-xs text-slate-400 mb-1">Analytical</p>
              <p className="text-sm font-bold text-indigo-400">
                {Math.round(candidate.assessment.cognitive_analytical * 10)}/10
              </p>
            </div>
            <div className="text-center">
              <p className="text-xs text-slate-400 mb-1">Creative</p>
              <p className="text-sm font-bold text-violet-400">
                {Math.round(candidate.assessment.cognitive_creative * 10)}/10
              </p>
            </div>
            <div className="text-center">
              <p className="text-xs text-slate-400 mb-1">Overall</p>
              <p className="text-sm font-bold text-emerald-400">
                {Math.round(candidate.assessment.overall_score * 100)}%
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function CandidateDetailModal({ candidate, onClose }: any) {
  if (!candidate) return null;

  const assessment = candidate.assessment;

  return (
    <div
      className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50"
      onClick={onClose}
    >
      <div
        className="bg-slate-800 border border-slate-700 rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="sticky top-0 flex items-center justify-between p-6 border-b border-slate-700 bg-slate-800/95">
          <div>
            <h2 className="text-2xl font-bold text-white">{candidate.name}</h2>
            <p className="text-slate-400 text-sm">{candidate.email}</p>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-white text-2xl transition"
          >
            ✕
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Basic Info */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-xs text-slate-400 mb-1">Location</p>
              <p className="text-white font-medium">{candidate.location || 'Not specified'}</p>
            </div>
            <div>
              <p className="text-xs text-slate-400 mb-1">OS Strength</p>
              <p className="text-white font-medium">{Math.round(candidate.os_strength * 100)}%</p>
            </div>
            <div>
              <p className="text-xs text-slate-400 mb-1">Consistency</p>
              <p className="text-white font-medium">{Math.round(candidate.consistency * 100)}%</p>
            </div>
            <div>
              <p className="text-xs text-slate-400 mb-1">Tagline</p>
              <p className="text-white font-medium">{candidate.tagline || 'Not specified'}</p>
            </div>
          </div>

          {assessment && (
            <>
              {/* Cognitive Profile */}
              <div>
                <h3 className="text-lg font-bold text-white mb-4">Cognitive Profile</h3>
                <div className="grid grid-cols-2 gap-4">
                  {[
                    { label: 'Analytical', value: assessment.cognitive_analytical },
                    { label: 'Creative', value: assessment.cognitive_creative },
                    { label: 'Strategic', value: assessment.cognitive_strategic },
                    { label: 'Empathetic', value: assessment.cognitive_empathetic },
                    { label: 'Systematic', value: assessment.cognitive_systematic },
                    { label: 'Adaptive', value: assessment.cognitive_adaptive },
                  ].map((item) => (
                    <div key={item.label} className="bg-slate-700/50 rounded-lg p-4">
                      <p className="text-xs text-slate-400 mb-2">{item.label}</p>
                      <div className="flex items-center justify-between">
                        <div className="flex-1 bg-slate-600 rounded-full h-2 mr-3">
                          <div
                            className="bg-gradient-to-r from-indigo-600 to-violet-600 h-2 rounded-full"
                            style={{ width: `${item.value * 100}%` }}
                          ></div>
                        </div>
                        <span className="text-sm font-bold text-indigo-400">
                          {Math.round(item.value * 10)}/10
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Communication Style */}
              <div>
                <h3 className="text-lg font-bold text-white mb-4">Communication Style</h3>
                <div className="grid grid-cols-2 gap-4">
                  {[
                    { label: 'Directness', value: assessment.comm_directness },
                    { label: 'Formality', value: assessment.comm_formality },
                    { label: 'Detail', value: assessment.comm_detail },
                    { label: 'Warmth', value: assessment.comm_warmth },
                    { label: 'Persuasion', value: assessment.comm_persuasion },
                    { label: 'Clarity', value: assessment.comm_clarity },
                  ].map((item) => (
                    <div key={item.label} className="bg-slate-700/50 rounded-lg p-4">
                      <p className="text-xs text-slate-400 mb-2">{item.label}</p>
                      <div className="flex items-center justify-between">
                        <div className="flex-1 bg-slate-600 rounded-full h-2 mr-3">
                          <div
                            className="bg-gradient-to-r from-violet-600 to-purple-600 h-2 rounded-full"
                            style={{ width: `${item.value * 100}%` }}
                          ></div>
                        </div>
                        <span className="text-sm font-bold text-violet-400">
                          {Math.round(item.value * 10)}/10
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Work Styles */}
              <div className="grid grid-cols-2 gap-4">
                {[
                  { label: 'Working Style', value: assessment.working_style },
                  { label: 'Decision Model', value: assessment.decision_model },
                  { label: 'Creative Style', value: assessment.creative_style },
                  { label: 'Leadership Style', value: assessment.leadership_style },
                  { label: 'Conflict Approach', value: assessment.conflict_approach },
                ].map((item) => (
                  <div key={item.label} className="bg-slate-700/50 rounded-lg p-4">
                    <p className="text-xs text-slate-400 mb-1">{item.label}</p>
                    <p className="text-white font-medium text-sm">{item.value || 'Not assessed'}</p>
                  </div>
                ))}
              </div>

              {/* Values */}
              {assessment.values && assessment.values.length > 0 && (
                <div>
                  <h3 className="text-lg font-bold text-white mb-3">Core Values</h3>
                  <div className="flex flex-wrap gap-2">
                    {assessment.values.map((value: string) => (
                      <span
                        key={value}
                        className="px-3 py-1 bg-indigo-900/30 border border-indigo-600/50 rounded text-xs font-medium text-indigo-300"
                      >
                        {value}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Overall Score */}
              <div className="bg-gradient-to-r from-indigo-900/20 to-violet-900/20 border border-indigo-600/30 rounded-lg p-6 text-center">
                <p className="text-slate-400 text-sm mb-2">Overall Assessment Score</p>
                <p className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-violet-400">
                  {Math.round(assessment.overall_score * 100)}%
                </p>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default function Candidates() {
  const { candidates, loading, error } = useCandidates();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCandidate, setSelectedCandidate] = useState<CandidateWithAssessment | null>(
    null
  );

  const filteredCandidates = useMemo(() => {
    return candidates.filter(
      (candidate) =>
        candidate.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        candidate.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
        candidate.location.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [candidates, searchQuery]);

  return (
    <div className="space-y-6">
      {/* Search */}
      <div>
        <input
          type="text"
          placeholder="Search candidates by name, email, or location..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 transition"
        />
      </div>

      {/* Error */}
      {error && (
        <div className="p-4 bg-red-900/30 border border-red-700 rounded-lg text-red-300 text-sm">
          {error}
        </div>
      )}

      {/* Loading */}
      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div
              key={i}
              className="bg-slate-800 border border-slate-700 rounded-lg p-6 h-48 animate-pulse"
            ></div>
          ))}
        </div>
      ) : filteredCandidates.length > 0 ? (
        <>
          <p className="text-slate-400 text-sm">
            {filteredCandidates.length} candidate{filteredCandidates.length !== 1 ? 's' : ''}
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCandidates.map((candidate) => (
              <CandidateCard
                key={candidate.id}
                candidate={candidate}
                onSelect={() => setSelectedCandidate(candidate)}
              />
            ))}
          </div>
        </>
      ) : (
        <div className="text-center py-12">
          <p className="text-slate-400 text-lg mb-2">No candidates found</p>
          <p className="text-slate-500 text-sm">
            {candidates.length === 0 ? 'Add your first candidate to get started' : 'Try adjusting your search filters'}
          </p>
        </div>
      )}

      {/* Detail Modal */}
      <CandidateDetailModal
        candidate={selectedCandidate}
        onClose={() => setSelectedCandidate(null)}
      />
    </div>
  );
}
