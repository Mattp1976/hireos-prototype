import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

interface Candidate {
  id: string;
  name: string;
  role: string;
  osFitScore: number;
  daysInStage: number;
  stage: "New Applicants" | "OS Screening" | "Shortlisted" | "Interview" | "Offer";
}

const SAMPLE_CANDIDATES: Candidate[] = [
  { id: "1", name: "Sarah Chen", role: "Head of Digital", osFitScore: 92, daysInStage: 2, stage: "New Applicants" },
  { id: "2", name: "Marcus Johnson", role: "Senior Product Manager", osFitScore: 78, daysInStage: 5, stage: "New Applicants" },
  { id: "3", name: "Elena Rossi", role: "UX Research Lead", osFitScore: 88, daysInStage: 1, stage: "New Applicants" },
  { id: "4", name: "David Kim", role: "Head of Digital", osFitScore: 65, daysInStage: 8, stage: "OS Screening" },
  { id: "5", name: "Priya Patel", role: "Senior Product Manager", osFitScore: 91, daysInStage: 4, stage: "OS Screening" },
  { id: "6", name: "James Thompson", role: "UX Research Lead", osFitScore: 72, daysInStage: 6, stage: "OS Screening" },
  { id: "7", name: "Lisa Wang", role: "Head of Digital", osFitScore: 86, daysInStage: 3, stage: "Shortlisted" },
  { id: "8", name: "Ahmed Hassan", role: "Senior Product Manager", osFitScore: 94, daysInStage: 2, stage: "Shortlisted" },
  { id: "9", name: "Sophie Martin", role: "UX Research Lead", osFitScore: 81, daysInStage: 5, stage: "Shortlisted" },
  { id: "10", name: "Robert Garcia", role: "Head of Digital", osFitScore: 89, daysInStage: 7, stage: "Interview" },
  { id: "11", name: "Nina Kovak", role: "Senior Product Manager", osFitScore: 87, daysInStage: 4, stage: "Interview" },
  { id: "12", name: "Carlos Lopez", role: "UX Research Lead", osFitScore: 90, daysInStage: 2, stage: "Offer" },
];

const PIPELINE_STAGES = ["New Applicants", "OS Screening", "Shortlisted", "Interview", "Offer"] as const;
const ROLES = ["Head of Digital", "Senior Product Manager", "UX Research Lead"];

function getOsFitColor(score: number): string {
  if (score >= 85) return "bg-green-100 text-green-800";
  if (score >= 70) return "bg-amber-100 text-amber-800";
  return "bg-red-100 text-red-800";
}

function getOsFitDotColor(score: number): string {
  if (score >= 85) return "bg-green-500";
  if (score >= 70) return "bg-amber-500";
  return "bg-red-500";
}

export function Pipeline() {
  const [candidates, setCandidates] = useState<Candidate[]>(SAMPLE_CANDIDATES);
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
  const [filterRole, setFilterRole] = useState<string>("");
  const [filterOsMin, setFilterOsMin] = useState<number>(0);
  const [filterOsMax, setFilterOsMax] = useState<number>(100);
  const [filterStage, setFilterStage] = useState<string>("");
  const [showFilters, setShowFilters] = useState(false);

  const filteredCandidates = candidates.filter((c) => {
    if (filterRole && c.role !== filterRole) return false;
    if (c.osFitScore < filterOsMin || c.osFitScore > filterOsMax) return false;
    if (filterStage && c.stage !== filterStage) return false;
    return true;
  });

  const toggleSelected = (id: string) => {
    const next = new Set(selectedIds);
    if (next.has(id)) next.delete(id);
    else next.add(id);
    setSelectedIds(next);
  };

  const toggleSelectAll = (stage: string) => {
    const stageIds = filteredCandidates.filter((c) => c.stage === stage).map((c) => c.id);
    const next = new Set(selectedIds);
    const allSelected = stageIds.every((id) => next.has(id));
    if (allSelected) stageIds.forEach((id) => next.delete(id));
    else stageIds.forEach((id) => next.add(id));
    setSelectedIds(next);
  };

  const handleAdvance = () => {
    setCandidates(
      candidates.map((c) => {
        if (selectedIds.has(c.id)) {
          const idx = PIPELINE_STAGES.indexOf(c.stage);
          if (idx < PIPELINE_STAGES.length - 1) return { ...c, stage: PIPELINE_STAGES[idx + 1], daysInStage: 0 };
        }
        return c;
      })
    );
    setSelectedIds(new Set());
  };

  const handleArchive = () => {
    setCandidates(candidates.filter((c) => !selectedIds.has(c.id)));
    setSelectedIds(new Set());
  };

  const autoScreenedCount = filteredCandidates.filter((c) => c.stage !== "New Applicants" && c.osFitScore >= 70).length;
  const avgOsFit = filteredCandidates.length ? Math.round(filteredCandidates.reduce((s, c) => s + c.osFitScore, 0) / filteredCandidates.length) : 0;
  const shortlistedPlus = filteredCandidates.filter((c) => c.stage === "Shortlisted" || c.stage === "Interview" || c.stage === "Offer").length;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Pipeline</h1>
        <p className="text-sm text-gray-500 mt-1">Manage candidates through your recruitment pipeline</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-4 gap-3">
        {[
          { label: "Total Candidates", value: filteredCandidates.length },
          { label: "Avg OS Fit", value: `${avgOsFit}%` },
          { label: "Auto-Screened", value: autoScreenedCount },
          { label: "Shortlisted+", value: shortlistedPlus },
        ].map((s) => (
          <Card key={s.label} className="border border-gray-200">
            <CardContent className="pt-4 pb-3 px-4">
              <p className="text-[10px] uppercase tracking-widest text-gray-400 font-medium">{s.label}</p>
              <p className="text-xl font-bold text-gray-900 mt-0.5">{s.value}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Toolbar */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" className="text-xs h-8" onClick={() => setShowFilters(!showFilters)}>
            <svg className="w-3.5 h-3.5 mr-1.5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path d="M3 4h18M5 8h14M7 12h10M9 16h6" strokeLinecap="round" /></svg>
            Filters
          </Button>
          {(filterRole || filterOsMin > 0 || filterOsMax < 100 || filterStage) && (
            <Button variant="ghost" size="sm" className="text-xs h-7" onClick={() => { setFilterRole(""); setFilterOsMin(0); setFilterOsMax(100); setFilterStage(""); }}>
              Clear
            </Button>
          )}
        </div>
        {selectedIds.size > 0 && (
          <div className="flex items-center gap-2">
            <span className="text-xs font-medium text-gray-500">{selectedIds.size} selected</span>
            <Button size="sm" className="text-xs h-8 bg-gray-900 hover:bg-gray-800" onClick={handleAdvance}>Advance →</Button>
            <Button size="sm" variant="outline" className="text-xs h-8" onClick={() => {}}>Send Assessment</Button>
            <Button size="sm" variant="outline" className="text-xs h-8" onClick={handleArchive}>Archive</Button>
          </div>
        )}
      </div>

      {/* Filter Panel */}
      {showFilters && (
        <Card className="border border-gray-200 bg-gray-50/50">
          <CardContent className="pt-4 pb-3">
            <div className="grid grid-cols-4 gap-3">
              <div>
                <label className="text-[10px] uppercase tracking-widest text-gray-400 font-medium block mb-1.5">Role</label>
                <select value={filterRole} onChange={(e) => setFilterRole(e.target.value)} className="w-full px-2.5 py-1.5 border border-gray-200 rounded-md text-xs bg-white">
                  <option value="">All roles</option>
                  {ROLES.map((r) => <option key={r} value={r}>{r}</option>)}
                </select>
              </div>
              <div>
                <label className="text-[10px] uppercase tracking-widest text-gray-400 font-medium block mb-1.5">OS Fit Min</label>
                <input type="number" min={0} max={100} value={filterOsMin} onChange={(e) => setFilterOsMin(Number(e.target.value))} className="w-full px-2.5 py-1.5 border border-gray-200 rounded-md text-xs bg-white" />
              </div>
              <div>
                <label className="text-[10px] uppercase tracking-widest text-gray-400 font-medium block mb-1.5">OS Fit Max</label>
                <input type="number" min={0} max={100} value={filterOsMax} onChange={(e) => setFilterOsMax(Number(e.target.value))} className="w-full px-2.5 py-1.5 border border-gray-200 rounded-md text-xs bg-white" />
              </div>
              <div>
                <label className="text-[10px] uppercase tracking-widest text-gray-400 font-medium block mb-1.5">Stage</label>
                <select value={filterStage} onChange={(e) => setFilterStage(e.target.value)} className="w-full px-2.5 py-1.5 border border-gray-200 rounded-md text-xs bg-white">
                  <option value="">All stages</option>
                  {PIPELINE_STAGES.map((s) => <option key={s} value={s}>{s}</option>)}
                </select>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Kanban Board */}
      <div className="grid grid-cols-5 gap-3">
        {PIPELINE_STAGES.map((stage) => {
          const stageCandidates = filteredCandidates.filter((c) => c.stage === stage);
          const allSel = stageCandidates.length > 0 && stageCandidates.every((c) => selectedIds.has(c.id));
          return (
            <div key={stage} className="flex flex-col">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-xs font-semibold text-gray-700">{stage}</h3>
                <span className="w-5 h-5 rounded-full bg-gray-200 text-[10px] font-medium text-gray-600 flex items-center justify-center">{stageCandidates.length}</span>
              </div>
              {stageCandidates.length > 0 && (
                <label className="flex items-center gap-1.5 text-[10px] text-gray-400 mb-2 cursor-pointer">
                  <input type="checkbox" checked={allSel} onChange={() => toggleSelectAll(stage)} className="w-3 h-3 rounded" />
                  Select all
                </label>
              )}
              <div className="flex-1 bg-gray-50 rounded-lg p-2 space-y-2 min-h-[320px] border border-gray-100">
                {stageCandidates.length === 0 ? (
                  <p className="text-[10px] text-gray-300 text-center pt-10">No candidates</p>
                ) : (
                  stageCandidates.map((c) => (
                    <div
                      key={c.id}
                      onClick={() => toggleSelected(c.id)}
                      className={`bg-white rounded-md p-3 border cursor-pointer transition-all hover:shadow-sm ${selectedIds.has(c.id) ? "border-gray-900 ring-1 ring-gray-900/10" : "border-gray-100"}`}
                    >
                      <div className="flex items-start justify-between mb-1.5">
                        <input type="checkbox" checked={selectedIds.has(c.id)} onChange={() => toggleSelected(c.id)} onClick={(e) => e.stopPropagation()} className="w-3 h-3 rounded mt-0.5" />
                        <span className={`inline-flex items-center gap-1 px-1.5 py-0.5 rounded-full text-[10px] font-medium ${getOsFitColor(c.osFitScore)}`}>
                          <span className={`w-1.5 h-1.5 rounded-full ${getOsFitDotColor(c.osFitScore)}`} />
                          {c.osFitScore}%
                        </span>
                      </div>
                      <p className="font-medium text-xs text-gray-900">{c.name}</p>
                      <p className="text-[10px] text-gray-500 mt-0.5">{c.role}</p>
                      <p className="text-[10px] text-gray-300 mt-2">{c.daysInStage}d in stage</p>
                    </div>
                  ))
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
