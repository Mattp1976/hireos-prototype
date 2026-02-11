import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { RadarChartComponent } from "@/components/RadarChart";
import { ScoreRing } from "@/components/ScoreRing";
import { BarMeter } from "@/components/BarMeter";
import { candidates, roles, getFitForCandidate, teamMembers } from "@/data/sampleData";
import type { Candidate, RoleOS } from "@/data/types";

interface Props {
  candidateId: string;
  roleId: string;
}

export function FitEngine({ candidateId, roleId }: Props) {
  const candidate = candidates.find((c) => c.id === candidateId)!;
  const role = roles.find((r) => r.id === roleId)!;
  const fit = getFitForCandidate(candidateId, roleId);

  if (!fit) return <div className="text-gray-400 p-8">No fit data available.</div>;

  const cognitiveCompare = [
    { subject: "Analytical", A: candidate.cognitive.analytical, B: role.cognitive.analytical },
    { subject: "Creative", A: candidate.cognitive.creative, B: role.cognitive.creative },
    { subject: "Strategic", A: candidate.cognitive.strategic, B: role.cognitive.strategic },
    { subject: "Empathetic", A: candidate.cognitive.empathetic, B: role.cognitive.empathetic },
    { subject: "Systematic", A: candidate.cognitive.systematic, B: role.cognitive.systematic },
    { subject: "Adaptive", A: candidate.cognitive.adaptive, B: role.cognitive.adaptive },
  ];

  const commsCompare = [
    { subject: "Direct", A: candidate.communication.directness, B: role.communication.directness },
    { subject: "Formal", A: candidate.communication.formality, B: role.communication.formality },
    { subject: "Detailed", A: candidate.communication.detail, B: role.communication.detail },
    { subject: "Warm", A: candidate.communication.warmth, B: role.communication.warmth },
    { subject: "Persuasive", A: candidate.communication.persuasion, B: role.communication.persuasion },
    { subject: "Clear", A: candidate.communication.clarity, B: role.communication.clarity },
  ];

  // Team cognitive diversity
  const teamAvg = {
    analytical: Math.round(teamMembers.reduce((s, m) => s + m.cognitive.analytical, 0) / teamMembers.length),
    creative: Math.round(teamMembers.reduce((s, m) => s + m.cognitive.creative, 0) / teamMembers.length),
    strategic: Math.round(teamMembers.reduce((s, m) => s + m.cognitive.strategic, 0) / teamMembers.length),
    empathetic: Math.round(teamMembers.reduce((s, m) => s + m.cognitive.empathetic, 0) / teamMembers.length),
    systematic: Math.round(teamMembers.reduce((s, m) => s + m.cognitive.systematic, 0) / teamMembers.length),
    adaptive: Math.round(teamMembers.reduce((s, m) => s + m.cognitive.adaptive, 0) / teamMembers.length),
  };

  const teamVsCandidate = [
    { subject: "Analytical", A: candidate.cognitive.analytical, B: teamAvg.analytical },
    { subject: "Creative", A: candidate.cognitive.creative, B: teamAvg.creative },
    { subject: "Strategic", A: candidate.cognitive.strategic, B: teamAvg.strategic },
    { subject: "Empathetic", A: candidate.cognitive.empathetic, B: teamAvg.empathetic },
    { subject: "Systematic", A: candidate.cognitive.systematic, B: teamAvg.systematic },
    { subject: "Adaptive", A: candidate.cognitive.adaptive, B: teamAvg.adaptive },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-semibold text-gray-900 tracking-tight">
            OS-to-OS Compatibility
          </h2>
          <p className="text-sm text-gray-500 mt-0.5">
            <span className="font-medium text-gray-700">{candidate.name}</span>
            {" → "}
            <span className="font-medium text-gray-700">{role.title}</span>
            <span className="text-gray-400"> · {role.department}</span>
          </p>
        </div>
        <ScoreRing
          score={fit.overallFit}
          size={72}
          label="Overall Fit"
          color={fit.overallFit >= 85 ? "#059669" : fit.overallFit >= 70 ? "#d97706" : "#dc2626"}
        />
      </div>

      {/* Score Grid */}
      <div className="grid grid-cols-4 gap-3">
        <Card>
          <CardContent className="pt-4 flex flex-col items-center">
            <ScoreRing score={fit.cognitiveMatch} size={60} strokeWidth={5} color="#1e40af" />
            <span className="text-xs text-gray-500 mt-2 text-center">Cognitive Match</span>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-4 flex flex-col items-center">
            <ScoreRing score={fit.communicationMatch} size={60} strokeWidth={5} color="#6d28d9" />
            <span className="text-xs text-gray-500 mt-2 text-center">Comms Match</span>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-4 flex flex-col items-center">
            <ScoreRing score={fit.collaborationAlignment} size={60} strokeWidth={5} color="#0891b2" />
            <span className="text-xs text-gray-500 mt-2 text-center">Collaboration</span>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-4 flex flex-col items-center">
            <ScoreRing score={fit.cognitiveDiversity} size={60} strokeWidth={5} color="#d97706" />
            <span className="text-xs text-gray-500 mt-2 text-center">Cog. Diversity</span>
          </CardContent>
        </Card>
      </div>

      {/* Radar Comparisons */}
      <div className="grid grid-cols-2 gap-4">
        <Card>
          <CardHeader className="pb-1">
            <CardTitle className="text-sm font-medium text-gray-700">
              Candidate OS vs Role OS — Cognitive
            </CardTitle>
          </CardHeader>
          <CardContent>
            <RadarChartComponent
              data={cognitiveCompare}
              labelA={candidate.name}
              labelB={role.title}
              colorA="#1e40af"
              colorB="#dc2626"
              height={250}
            />
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-1">
            <CardTitle className="text-sm font-medium text-gray-700">
              Candidate OS vs Role OS — Communication
            </CardTitle>
          </CardHeader>
          <CardContent>
            <RadarChartComponent
              data={commsCompare}
              labelA={candidate.name}
              labelB={role.title}
              colorA="#6d28d9"
              colorB="#dc2626"
              height={250}
            />
          </CardContent>
        </Card>
      </div>

      {/* Team Fit */}
      <Card>
        <CardHeader className="pb-1">
          <CardTitle className="text-sm font-medium text-gray-700">
            Candidate OS vs Team OS — Cognitive Diversity
          </CardTitle>
          <p className="text-[11px] text-gray-400">
            How {candidate.name} complements the existing team
          </p>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-3 gap-4 items-start">
            <div className="col-span-2">
              <RadarChartComponent
                data={teamVsCandidate}
                labelA={candidate.name}
                labelB="Team Average"
                colorA="#1e40af"
                colorB="#9ca3af"
                height={240}
              />
            </div>
            <div className="space-y-2 pt-4">
              <p className="text-xs font-medium text-gray-700 mb-2">Current Team</p>
              {teamMembers.map((m) => (
                <div key={m.name} className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-md bg-gray-100 flex items-center justify-center text-[10px] font-semibold text-gray-600">
                    {m.avatar}
                  </div>
                  <div>
                    <p className="text-xs font-medium text-gray-800">{m.name}</p>
                    <p className="text-[10px] text-gray-400">{m.role}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Insights */}
      <div className="grid grid-cols-2 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-green-700">
              Strengths
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            {fit.strengths.map((s, i) => (
              <div key={i} className="flex items-start gap-2">
                <span className="text-green-500 text-xs mt-0.5">●</span>
                <p className="text-xs text-gray-600">{s}</p>
              </div>
            ))}
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-amber-700">
              Risk Areas
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            {fit.riskAreas.length > 0 ? (
              fit.riskAreas.map((r, i) => (
                <div key={i} className="flex items-start gap-2">
                  <span className="text-amber-500 text-xs mt-0.5">●</span>
                  <p className="text-xs text-gray-600">{r}</p>
                </div>
              ))
            ) : (
              <p className="text-xs text-gray-400">No significant risk areas detected.</p>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Predictions */}
      <div className="grid grid-cols-3 gap-4">
        <Card>
          <CardContent className="pt-4">
            <p className="text-[11px] text-gray-400 uppercase tracking-wide">
              Onboarding
            </p>
            <p className="text-sm font-medium text-gray-800 mt-1">
              {fit.onboardingPrediction}
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-4">
            <p className="text-[11px] text-gray-400 uppercase tracking-wide">
              Day One Ready
            </p>
            <div className="flex items-center gap-3 mt-1">
              <span className="text-2xl font-bold tabular-nums text-gray-900">
                {fit.dayOneReady}
              </span>
              <span className="text-xs text-gray-400">/100</span>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-4">
            <p className="text-[11px] text-gray-400 uppercase tracking-wide">
              Potential to Perform
            </p>
            <div className="flex items-center gap-3 mt-1">
              <span className="text-2xl font-bold tabular-nums text-gray-900">
                {fit.potentialToPerform}
              </span>
              <span className="text-xs text-gray-400">/100</span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Agentic ROI */}
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium text-gray-700">
            Agentic ROI Estimate
          </CardTitle>
          <p className="text-[11px] text-gray-400">
            What this person's OS can automate from day one
          </p>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-3 gap-6">
            <div>
              <p className="text-[11px] text-gray-400 uppercase tracking-wide">
                Productivity Lift
              </p>
              <p className="text-2xl font-bold text-gray-900 mt-1">
                +{fit.productivityLift}%
              </p>
            </div>
            <div>
              <p className="text-[11px] text-gray-400 uppercase tracking-wide">
                Time Saved
              </p>
              <p className="text-2xl font-bold text-gray-900 mt-1">
                {fit.timeSaved}
              </p>
            </div>
            <div>
              <p className="text-[11px] text-gray-400 uppercase tracking-wide">
                Active Agents
              </p>
              <p className="text-2xl font-bold text-gray-900 mt-1">
                {candidate.agents.length}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
