import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { RadarChartComponent } from "@/components/RadarChart";
import { ScoreRing } from "@/components/ScoreRing";
import { BarMeter } from "@/components/BarMeter";
import type { Candidate } from "@/data/types";

interface Props {
  candidate: Candidate;
}

export function CandidateProfile({ candidate }: Props) {
  const cognitiveData = [
    { subject: "Analytical", A: candidate.cognitive.analytical },
    { subject: "Creative", A: candidate.cognitive.creative },
    { subject: "Strategic", A: candidate.cognitive.strategic },
    { subject: "Empathetic", A: candidate.cognitive.empathetic },
    { subject: "Systematic", A: candidate.cognitive.systematic },
    { subject: "Adaptive", A: candidate.cognitive.adaptive },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-start gap-5">
        <div
          className="w-16 h-16 rounded-lg flex items-center justify-center text-xl font-bold text-white shrink-0"
          style={{
            background: "linear-gradient(135deg, #1e3a5f, #2d5a87)",
          }}
        >
          {candidate.avatar}
        </div>
        <div className="flex-1 min-w-0">
          <h2 className="text-xl font-semibold text-gray-900 tracking-tight">
            {candidate.name}
          </h2>
          <p className="text-sm text-gray-500 mt-0.5">{candidate.role}</p>
          <p className="text-sm text-gray-400 mt-0.5">{candidate.location}</p>
          <p className="text-[13px] text-gray-600 mt-2 italic">
            "{candidate.tagline}"
          </p>
        </div>
        <div className="flex gap-3 shrink-0">
          <ScoreRing score={candidate.osStrength} label="OS Strength" color="#1e40af" />
          <ScoreRing score={candidate.consistency} label="Consistency" color="#059669" />
        </div>
      </div>

      <Tabs defaultValue="thinking" className="w-full">
        <TabsList className="grid grid-cols-5 w-full h-auto">
          <TabsTrigger value="thinking" className="text-xs py-1.5">
            Thinking
          </TabsTrigger>
          <TabsTrigger value="communication" className="text-xs py-1.5">
            Communication
          </TabsTrigger>
          <TabsTrigger value="agents" className="text-xs py-1.5">
            AI Agents
          </TabsTrigger>
          <TabsTrigger value="work" className="text-xs py-1.5">
            Work Samples
          </TabsTrigger>
          <TabsTrigger value="identity" className="text-xs py-1.5">
            Identity
          </TabsTrigger>
        </TabsList>

        {/* THINKING TAB */}
        <TabsContent value="thinking" className="mt-4 space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-gray-700">
                  Cognitive Profile
                </CardTitle>
              </CardHeader>
              <CardContent>
                <RadarChartComponent data={cognitiveData} labelA={candidate.name} height={260} />
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-gray-700">
                  Behaviour Fingerprints
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {candidate.behaviourFingerprints.map((b) => (
                  <div key={b.label}>
                    <BarMeter
                      label={b.label}
                      value={b.value}
                      color="#1e40af"
                    />
                    <p className="text-[11px] text-gray-400 mt-0.5 ml-[7.75rem]">
                      {b.description}
                    </p>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-gray-700">
                  Decision Model
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-[13px] text-gray-600 leading-relaxed">
                  {candidate.decisionModel}
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-gray-700">
                  Creative Style
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-[13px] text-gray-600 leading-relaxed">
                  {candidate.creativeStyle}
                </p>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* COMMUNICATION TAB */}
        <TabsContent value="communication" className="mt-4 space-y-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-700">
                Communication Profile
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <BarMeter
                label="Directness"
                value={candidate.communication.directness}
                color="#1e40af"
              />
              <BarMeter
                label="Formality"
                value={candidate.communication.formality}
                color="#6d28d9"
              />
              <BarMeter
                label="Detail level"
                value={candidate.communication.detail}
                color="#0891b2"
              />
              <BarMeter
                label="Warmth"
                value={candidate.communication.warmth}
                color="#d97706"
              />
              <BarMeter
                label="Persuasion"
                value={candidate.communication.persuasion}
                color="#059669"
              />
              <BarMeter
                label="Clarity"
                value={candidate.communication.clarity}
                color="#1e40af"
              />
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-700">
                Working Style
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-[13px] text-gray-600 leading-relaxed">
                {candidate.workingStyle}
              </p>
            </CardContent>
          </Card>
        </TabsContent>

        {/* AGENTS TAB */}
        <TabsContent value="agents" className="mt-4">
          <div className="grid grid-cols-2 gap-3">
            {candidate.agents.map((agent) => (
              <Card key={agent.name}>
                <CardContent className="pt-4">
                  <div className="flex items-start gap-3">
                    <span className="text-2xl">{agent.icon}</span>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <h4 className="text-sm font-semibold text-gray-900">
                          {agent.name}
                        </h4>
                        <Badge
                          variant="outline"
                          className="text-[10px] font-normal tabular-nums"
                        >
                          {agent.consistency}% consistent
                        </Badge>
                      </div>
                      <p className="text-xs text-gray-500 mt-0.5">
                        {agent.capability}
                      </p>
                      <div className="mt-2 flex flex-wrap gap-1">
                        {agent.tasks.map((t) => (
                          <Badge
                            key={t}
                            variant="secondary"
                            className="text-[10px] font-normal"
                          >
                            {t}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* WORK SAMPLES TAB */}
        <TabsContent value="work" className="mt-4 space-y-3">
          {candidate.workSamples.map((ws) => (
            <Card key={ws.title}>
              <CardContent className="pt-4">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <h4 className="text-sm font-medium text-gray-900">
                        {ws.title}
                      </h4>
                      <Badge
                        variant="outline"
                        className="text-[10px] shrink-0"
                      >
                        {ws.type}
                      </Badge>
                    </div>
                    <p className="text-xs text-gray-500 mt-1 leading-relaxed">
                      {ws.summary}
                    </p>
                    <p className="text-[11px] text-gray-400 mt-1">
                      Completed in {ws.timeToComplete}
                    </p>
                  </div>
                  <ScoreRing score={ws.score} size={56} strokeWidth={4} />
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        {/* IDENTITY TAB */}
        <TabsContent value="identity" className="mt-4 space-y-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-700">
                Core Values
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {candidate.values.map((v) => (
                  <Badge
                    key={v}
                    variant="secondary"
                    className="text-xs py-1 px-3"
                  >
                    {v}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-700">
                Industry Knowledge
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {candidate.industryKnowledge.map((k) => (
                  <Badge
                    key={k}
                    variant="outline"
                    className="text-xs py-1 px-3"
                  >
                    {k}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>

          <div className="grid grid-cols-2 gap-4">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-gray-700">
                  OS Strength
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-gray-500">Overall</span>
                    <span className="text-sm font-semibold tabular-nums">
                      {candidate.osStrength}/100
                    </span>
                  </div>
                  <Progress value={candidate.osStrength} className="h-2" />
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-gray-700">
                  Consistency Score
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-gray-500">Across outputs</span>
                    <span className="text-sm font-semibold tabular-nums">
                      {candidate.consistency}/100
                    </span>
                  </div>
                  <Progress value={candidate.consistency} className="h-2" />
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
