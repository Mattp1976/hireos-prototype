import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { ScoreRing } from "@/components/ScoreRing";
import { BarMeter } from "@/components/BarMeter";
import { RadarChartComponent } from "@/components/RadarChart";
import { candidates, roles, getFitForCandidate, teamMembers } from "@/data/sampleData";
import type { Candidate } from "@/data/types";

interface Props {
  onViewCandidate: (id: string) => void;
  onViewFit: (candidateId: string, roleId: string) => void;
}

export function Dashboard({ onViewCandidate, onViewFit }: Props) {
  const [selectedRole, setSelectedRole] = useState(roles[0].id);
  const role = roles.find((r) => r.id === selectedRole)!;

  // Rank candidates by fit
  const ranked = candidates
    .map((c) => ({
      candidate: c,
      fit: getFitForCandidate(c.id, selectedRole),
    }))
    .filter((r) => r.fit)
    .sort((a, b) => (b.fit?.overallFit ?? 0) - (a.fit?.overallFit ?? 0));

  // Team composition
  const allCog = teamMembers.map((m) => m.cognitive);
  const teamCogData = [
    { subject: "Analytical", A: Math.round(allCog.reduce((s, c) => s + c.analytical, 0) / allCog.length) },
    { subject: "Creative", A: Math.round(allCog.reduce((s, c) => s + c.creative, 0) / allCog.length) },
    { subject: "Strategic", A: Math.round(allCog.reduce((s, c) => s + c.strategic, 0) / allCog.length) },
    { subject: "Empathetic", A: Math.round(allCog.reduce((s, c) => s + c.empathetic, 0) / allCog.length) },
    { subject: "Systematic", A: Math.round(allCog.reduce((s, c) => s + c.systematic, 0) / allCog.length) },
    { subject: "Adaptive", A: Math.round(allCog.reduce((s, c) => s + c.adaptive, 0) / allCog.length) },
  ];

  // Capability gaps
  const agentCaps = role.agenticRequirements;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-semibold text-gray-900 tracking-tight">
            Employer Dashboard
          </h2>
          <p className="text-sm text-gray-500 mt-0.5">
            Hiring intelligence for your open roles
          </p>
        </div>
        <Select value={selectedRole} onValueChange={setSelectedRole}>
          <SelectTrigger className="w-56">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {roles.map((r) => (
              <SelectItem key={r.id} value={r.id}>
                {r.title} · {r.department}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Stats Row */}
      <div className="grid grid-cols-4 gap-3">
        <Card>
          <CardContent className="pt-4">
            <p className="text-[11px] text-gray-400 uppercase tracking-wide">
              Candidates
            </p>
            <p className="text-2xl font-bold text-gray-900 mt-1">
              {ranked.length}
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-4">
            <p className="text-[11px] text-gray-400 uppercase tracking-wide">
              Strong Matches
            </p>
            <p className="text-2xl font-bold text-green-600 mt-1">
              {ranked.filter((r) => (r.fit?.overallFit ?? 0) >= 85).length}
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-4">
            <p className="text-[11px] text-gray-400 uppercase tracking-wide">
              Avg Fit Score
            </p>
            <p className="text-2xl font-bold text-gray-900 mt-1">
              {Math.round(
                ranked.reduce((s, r) => s + (r.fit?.overallFit ?? 0), 0) /
                  ranked.length
              )}
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-4">
            <p className="text-[11px] text-gray-400 uppercase tracking-wide">
              Avg Day One Ready
            </p>
            <p className="text-2xl font-bold text-gray-900 mt-1">
              {Math.round(
                ranked.reduce((s, r) => s + (r.fit?.dayOneReady ?? 0), 0) /
                  ranked.length
              )}
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Candidate Rankings */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-sm font-medium text-gray-700">
            Candidate Rankings — {role.title}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-1">
          {ranked.map(({ candidate: c, fit }, idx) => (
            <div
              key={c.id}
              className="flex items-center gap-4 py-3 px-3 rounded-lg hover:bg-gray-50 transition-colors group"
            >
              <span className="text-sm font-medium text-gray-400 w-5 text-right tabular-nums">
                {idx + 1}
              </span>
              <div
                className="w-10 h-10 rounded-lg flex items-center justify-center text-sm font-bold text-white shrink-0"
                style={{
                  background: "linear-gradient(135deg, #1e3a5f, #2d5a87)",
                }}
              >
                {c.avatar}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900">{c.name}</p>
                <p className="text-[11px] text-gray-400">{c.role} · {c.location}</p>
              </div>
              <div className="flex items-center gap-4">
                <div className="text-right">
                  <p className="text-[10px] text-gray-400 uppercase">Fit</p>
                  <p
                    className="text-lg font-bold tabular-nums"
                    style={{
                      color:
                        (fit?.overallFit ?? 0) >= 85
                          ? "#059669"
                          : (fit?.overallFit ?? 0) >= 70
                          ? "#d97706"
                          : "#dc2626",
                    }}
                  >
                    {fit?.overallFit}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-[10px] text-gray-400 uppercase">Day 1</p>
                  <p className="text-lg font-bold tabular-nums text-gray-700">
                    {fit?.dayOneReady}
                  </p>
                </div>
                <div className="flex gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity">
                  <Button
                    variant="outline"
                    size="sm"
                    className="text-[11px] h-7 px-2.5"
                    onClick={() => onViewCandidate(c.id)}
                  >
                    OS Profile
                  </Button>
                  <Button
                    size="sm"
                    className="text-[11px] h-7 px-2.5"
                    onClick={() => onViewFit(c.id, selectedRole)}
                  >
                    Fit Report
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Team + Role */}
      <div className="grid grid-cols-2 gap-4">
        {/* Team Composition */}
        <Card>
          <CardHeader className="pb-1">
            <CardTitle className="text-sm font-medium text-gray-700">
              Current Team OS
            </CardTitle>
            <p className="text-[11px] text-gray-400">
              Cognitive composition of the existing team
            </p>
          </CardHeader>
          <CardContent>
            <RadarChartComponent
              data={teamCogData}
              labelA="Team Average"
              colorA="#6b7280"
              height={220}
            />
            <div className="grid grid-cols-2 gap-2 mt-3">
              {teamMembers.map((m) => (
                <div key={m.name} className="flex items-center gap-2 py-1">
                  <div className="w-7 h-7 rounded-md bg-gray-100 flex items-center justify-center text-[10px] font-semibold text-gray-600">
                    {m.avatar}
                  </div>
                  <div>
                    <p className="text-xs font-medium text-gray-800">
                      {m.name}
                    </p>
                    <p className="text-[10px] text-gray-400">{m.role}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Role OS */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-700">
              Role OS — {role.title}
            </CardTitle>
            <p className="text-[11px] text-gray-400">
              What this role demands
            </p>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <p className="text-[11px] text-gray-400 uppercase tracking-wide mb-2">
                Cognitive Requirements
              </p>
              <div className="space-y-1.5">
                <BarMeter label="Analytical" value={role.cognitive.analytical} color="#1e40af" />
                <BarMeter label="Creative" value={role.cognitive.creative} color="#7c3aed" />
                <BarMeter label="Strategic" value={role.cognitive.strategic} color="#059669" />
                <BarMeter label="Empathetic" value={role.cognitive.empathetic} color="#d97706" />
                <BarMeter label="Systematic" value={role.cognitive.systematic} color="#0891b2" />
                <BarMeter label="Adaptive" value={role.cognitive.adaptive} color="#dc2626" />
              </div>
            </div>
            <Separator />
            <div>
              <p className="text-[11px] text-gray-400 uppercase tracking-wide mb-2">
                Agentic Requirements
              </p>
              <div className="flex flex-wrap gap-1.5">
                {agentCaps.map((a) => (
                  <Badge key={a} variant="outline" className="text-[10px]">
                    {a}
                  </Badge>
                ))}
              </div>
            </div>
            <Separator />
            <div>
              <p className="text-[11px] text-gray-400 uppercase tracking-wide mb-2">
                Required Values
              </p>
              <div className="flex flex-wrap gap-1.5">
                {role.requiredValues.map((v) => (
                  <Badge key={v} variant="secondary" className="text-[10px]">
                    {v}
                  </Badge>
                ))}
              </div>
            </div>
            <Separator />
            <div>
              <p className="text-[11px] text-gray-400 uppercase tracking-wide mb-1">
                Autonomy Level
              </p>
              <div className="flex items-center gap-2">
                <div className="flex-1 h-2 bg-gray-100 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-blue-600 rounded-full"
                    style={{ width: `${role.autonomyLevel}%` }}
                  />
                </div>
                <span className="text-xs font-medium tabular-nums text-gray-700">
                  {role.autonomyLevel}%
                </span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
