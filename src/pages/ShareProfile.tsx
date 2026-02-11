import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ScoreRing } from "@/components/ScoreRing";
import { RadarChartComponent } from "@/components/RadarChart";
import { BarMeter } from "@/components/BarMeter";
import { candidates } from "@/data/sampleData";
import type { Candidate } from "@/data/types";

interface ScopeSettings {
  showCognitive: boolean;
  showCommunication: boolean;
  showAgents: boolean;
  showWorkSamples: boolean;
  showValues: boolean;
  showBehaviourFingerprints: boolean;
  expiresIn: string;
}

export function ShareProfile() {
  const [selectedCandidate, setSelectedCandidate] = useState(candidates[0].id);
  const candidate = candidates.find((c) => c.id === selectedCandidate)!;

  const [scope, setScope] = useState<ScopeSettings>({
    showCognitive: true,
    showCommunication: true,
    showAgents: true,
    showWorkSamples: true,
    showValues: true,
    showBehaviourFingerprints: false,
    expiresIn: "7d",
  });

  const [linkGenerated, setLinkGenerated] = useState(false);
  const [copied, setCopied] = useState(false);

  const shareUrl = `hireos.app/os/${candidate.id}/${Math.random().toString(36).slice(2, 10)}`;

  const enabledSections = [
    scope.showCognitive && "Cognitive",
    scope.showCommunication && "Communication",
    scope.showAgents && "Agents",
    scope.showWorkSamples && "Work Samples",
    scope.showValues && "Values",
    scope.showBehaviourFingerprints && "Fingerprints",
  ].filter(Boolean);

  const cognitiveData = [
    { subject: "Analytical", A: candidate.cognitive.analytical },
    { subject: "Creative", A: candidate.cognitive.creative },
    { subject: "Strategic", A: candidate.cognitive.strategic },
    { subject: "Empathetic", A: candidate.cognitive.empathetic },
    { subject: "Systematic", A: candidate.cognitive.systematic },
    { subject: "Adaptive", A: candidate.cognitive.adaptive },
  ];

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-semibold text-gray-900 tracking-tight">
            Identity Share Link
          </h2>
          <p className="text-sm text-gray-500 mt-0.5">
            Create a scoped, time-limited preview of your OS for employers
          </p>
        </div>
        <Select value={selectedCandidate} onValueChange={(v) => { setSelectedCandidate(v); setLinkGenerated(false); setCopied(false); }}>
          <SelectTrigger className="w-48">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {candidates.map((c) => (
              <SelectItem key={c.id} value={c.id}>{c.name}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="grid grid-cols-5 gap-4">
        {/* Controls — left column */}
        <div className="col-span-2 space-y-4">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-gray-700">
                Privacy Scope
              </CardTitle>
              <p className="text-[11px] text-gray-400">
                Control exactly what employers see
              </p>
            </CardHeader>
            <CardContent className="space-y-4">
              {[
                { key: "showCognitive" as const, label: "Cognitive Profile", desc: "Thinking patterns & radar chart" },
                { key: "showCommunication" as const, label: "Communication Style", desc: "How you communicate" },
                { key: "showAgents" as const, label: "AI Agent Network", desc: "Your autonomous agents & capabilities" },
                { key: "showWorkSamples" as const, label: "Work Samples", desc: "Simulated outputs & scores" },
                { key: "showValues" as const, label: "Values & Working Style", desc: "Core values and preferences" },
                { key: "showBehaviourFingerprints" as const, label: "Behaviour Fingerprints", desc: "Detailed behavioural patterns" },
              ].map((item) => (
                <div key={item.key} className="flex items-center justify-between">
                  <div>
                    <Label className="text-xs font-medium">{item.label}</Label>
                    <p className="text-[10px] text-gray-400">{item.desc}</p>
                  </div>
                  <Switch
                    checked={scope[item.key]}
                    onCheckedChange={(v) =>
                      setScope({ ...scope, [item.key]: v })
                    }
                  />
                </div>
              ))}
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-gray-700">
                Link Settings
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-1.5">
                <Label className="text-xs">Expires In</Label>
                <Select
                  value={scope.expiresIn}
                  onValueChange={(v) => setScope({ ...scope, expiresIn: v })}
                >
                  <SelectTrigger className="h-8 text-xs">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="24h">24 hours</SelectItem>
                    <SelectItem value="7d">7 days</SelectItem>
                    <SelectItem value="30d">30 days</SelectItem>
                    <SelectItem value="90d">90 days</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <p className="text-[11px] text-gray-500">
                  <span className="font-medium">{enabledSections.length}</span> of 6 sections visible
                </p>
                <div className="flex flex-wrap gap-1">
                  {enabledSections.map((s) => (
                    <Badge key={s as string} variant="secondary" className="text-[9px]">
                      {s as string}
                    </Badge>
                  ))}
                </div>
              </div>

              <Button
                className="w-full text-xs"
                onClick={() => setLinkGenerated(true)}
              >
                {linkGenerated ? "Regenerate Link" : "Generate Share Link"}
              </Button>

              {linkGenerated && (
                <div className="space-y-2">
                  <div className="flex gap-2">
                    <Input
                      value={shareUrl}
                      readOnly
                      className="text-xs h-8 font-mono bg-gray-50"
                    />
                    <Button
                      variant="outline"
                      size="sm"
                      className="text-xs h-8 shrink-0"
                      onClick={() => setCopied(true)}
                    >
                      {copied ? "Copied!" : "Copy"}
                    </Button>
                  </div>
                  <p className="text-[10px] text-gray-400">
                    Link expires in {scope.expiresIn === "24h" ? "24 hours" : scope.expiresIn === "7d" ? "7 days" : scope.expiresIn === "30d" ? "30 days" : "90 days"}. You can revoke access at any time.
                  </p>
                </div>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-4">
              <div className="flex items-start gap-2">
                <span className="text-sm">🔒</span>
                <div>
                  <p className="text-xs font-medium text-gray-700">
                    Your data, your control
                  </p>
                  <p className="text-[11px] text-gray-400 mt-0.5 leading-relaxed">
                    Employers can only see what you enable. Access is time-limited and fully revocable. No data is stored by the employer — they see a live, scoped view of your OS.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Live Preview — right column */}
        <div className="col-span-3 space-y-4">
          <Card>
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <CardTitle className="text-xs font-medium text-gray-500 uppercase tracking-wide">
                  Live Preview — What Employers See
                </CardTitle>
                <Badge variant="outline" className="text-[9px]">
                  Scoped View
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              {/* Profile Header (always visible) */}
              <div className="flex items-start gap-4 pb-4">
                <div
                  className="w-12 h-12 rounded-lg flex items-center justify-center text-base font-bold text-white shrink-0"
                  style={{
                    background: "linear-gradient(135deg, #1e3a5f, #2d5a87)",
                  }}
                >
                  {candidate.avatar}
                </div>
                <div className="flex-1">
                  <h3 className="text-sm font-semibold text-gray-900">
                    {candidate.name}
                  </h3>
                  <p className="text-xs text-gray-500">{candidate.role}</p>
                  <p className="text-[11px] text-gray-400">{candidate.location}</p>
                  <p className="text-xs text-gray-600 mt-1 italic">
                    "{candidate.tagline}"
                  </p>
                </div>
                <ScoreRing
                  score={candidate.osStrength}
                  size={52}
                  strokeWidth={4}
                  label="OS"
                  color="#1e40af"
                />
              </div>
              <Separator />

              {/* Conditional sections */}
              <div className="space-y-4 pt-4">
                {scope.showCognitive && (
                  <div>
                    <p className="text-[10px] font-medium text-gray-400 uppercase tracking-wide mb-2">
                      Cognitive Profile
                    </p>
                    <RadarChartComponent
                      data={cognitiveData}
                      labelA={candidate.name}
                      colorA="#1e40af"
                      height={200}
                    />
                  </div>
                )}

                {scope.showCommunication && (
                  <div>
                    <p className="text-[10px] font-medium text-gray-400 uppercase tracking-wide mb-2">
                      Communication Style
                    </p>
                    <div className="space-y-1.5">
                      <BarMeter label="Directness" value={candidate.communication.directness} color="#1e40af" />
                      <BarMeter label="Formality" value={candidate.communication.formality} color="#6d28d9" />
                      <BarMeter label="Detail" value={candidate.communication.detail} color="#0891b2" />
                      <BarMeter label="Warmth" value={candidate.communication.warmth} color="#d97706" />
                      <BarMeter label="Persuasion" value={candidate.communication.persuasion} color="#059669" />
                      <BarMeter label="Clarity" value={candidate.communication.clarity} color="#1e40af" />
                    </div>
                  </div>
                )}

                {scope.showAgents && (
                  <div>
                    <p className="text-[10px] font-medium text-gray-400 uppercase tracking-wide mb-2">
                      AI Agent Network
                    </p>
                    <div className="grid grid-cols-2 gap-2">
                      {candidate.agents.map((a) => (
                        <div key={a.name} className="p-2.5 border rounded-lg">
                          <div className="flex items-center gap-2">
                            <span className="text-base">{a.icon}</span>
                            <div>
                              <p className="text-xs font-medium text-gray-900">
                                {a.name}
                              </p>
                              <p className="text-[10px] text-gray-500">
                                {a.capability}
                              </p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {scope.showWorkSamples && (
                  <div>
                    <p className="text-[10px] font-medium text-gray-400 uppercase tracking-wide mb-2">
                      Work Samples
                    </p>
                    <div className="space-y-2">
                      {candidate.workSamples.slice(0, 3).map((ws) => (
                        <div
                          key={ws.title}
                          className="flex items-center justify-between p-2.5 border rounded-lg"
                        >
                          <div>
                            <p className="text-xs font-medium text-gray-900">
                              {ws.title}
                            </p>
                            <p className="text-[10px] text-gray-400">
                              {ws.type} · {ws.timeToComplete}
                            </p>
                          </div>
                          <ScoreRing
                            score={ws.score}
                            size={36}
                            strokeWidth={3}
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {scope.showValues && (
                  <div>
                    <p className="text-[10px] font-medium text-gray-400 uppercase tracking-wide mb-2">
                      Core Values
                    </p>
                    <div className="flex flex-wrap gap-1.5">
                      {candidate.values.map((v) => (
                        <Badge
                          key={v}
                          variant="secondary"
                          className="text-[10px]"
                        >
                          {v}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}

                {scope.showBehaviourFingerprints && (
                  <div>
                    <p className="text-[10px] font-medium text-gray-400 uppercase tracking-wide mb-2">
                      Behaviour Fingerprints
                    </p>
                    <div className="space-y-1.5">
                      {candidate.behaviourFingerprints.map((b) => (
                        <BarMeter
                          key={b.label}
                          label={b.label}
                          value={b.value}
                          color="#1e40af"
                        />
                      ))}
                    </div>
                  </div>
                )}

                {enabledSections.length === 0 && (
                  <div className="py-8 text-center">
                    <p className="text-sm text-gray-400">
                      No sections enabled — toggle some on to preview
                    </p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
