import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Separator } from "@/components/ui/separator";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { RadarChartComponent } from "@/components/RadarChart";
import { ScoreRing } from "@/components/ScoreRing";

export function RoleBuilder() {
  const [title, setTitle] = useState("");
  const [department, setDepartment] = useState("");
  const [autonomy, setAutonomy] = useState(70);

  // Cognitive
  const [analytical, setAnalytical] = useState(70);
  const [creative, setCreative] = useState(70);
  const [strategic, setStrategic] = useState(70);
  const [empathetic, setEmpathetic] = useState(70);
  const [systematic, setSystematic] = useState(70);
  const [adaptive, setAdaptive] = useState(70);

  // Communication
  const [directness, setDirectness] = useState(70);
  const [formality, setFormality] = useState(50);
  const [detail, setDetail] = useState(70);
  const [warmth, setWarmth] = useState(70);
  const [persuasion, setPersuasion] = useState(70);
  const [clarity, setClarity] = useState(70);

  // Values & Agents
  const [selectedValues, setSelectedValues] = useState<string[]>([]);
  const [agentReqs, setAgentReqs] = useState<string[]>([]);
  const [newAgentReq, setNewAgentReq] = useState("");

  const VALUE_OPTIONS = [
    "First-principles thinking",
    "Outcome over process",
    "Radical transparency",
    "User obsession",
    "Craft over speed",
    "Inclusive by default",
    "Rigour over intuition",
    "Reproducibility",
    "Intellectual humility",
    "Ethical AI",
    "Bias for action",
    "Deep work",
    "Continuous learning",
    "Collaboration first",
    "Autonomy & ownership",
  ];

  const TEMPLATES = [
    {
      name: "Strategy Lead",
      values: { analytical: 90, creative: 75, strategic: 95, empathetic: 65, systematic: 80, adaptive: 85 },
      comms: { directness: 85, formality: 70, detail: 75, warmth: 60, persuasion: 90, clarity: 90 },
      vals: ["First-principles thinking", "Outcome over process", "Radical transparency"],
      agents: ["Market analysis", "Competitive intelligence", "Strategic planning", "Executive communication"],
      dept: "Executive",
      auto: 90,
    },
    {
      name: "Product Designer",
      values: { analytical: 70, creative: 90, strategic: 75, empathetic: 90, systematic: 65, adaptive: 85 },
      comms: { directness: 65, formality: 45, detail: 80, warmth: 85, persuasion: 80, clarity: 85 },
      vals: ["User obsession", "Craft over speed", "Inclusive by default"],
      agents: ["UI research", "Prototyping", "User research synthesis", "Design system management"],
      dept: "Product",
      auto: 80,
    },
    {
      name: "Data Science Lead",
      values: { analytical: 95, creative: 60, strategic: 80, empathetic: 55, systematic: 95, adaptive: 70 },
      comms: { directness: 90, formality: 75, detail: 95, warmth: 50, persuasion: 70, clarity: 90 },
      vals: ["Rigour over intuition", "Reproducibility", "Intellectual humility"],
      agents: ["Automated EDA", "Model selection", "Technical reporting", "Pipeline orchestration"],
      dept: "Engineering",
      auto: 75,
    },
  ];

  const applyTemplate = (t: typeof TEMPLATES[0]) => {
    setAnalytical(t.values.analytical);
    setCreative(t.values.creative);
    setStrategic(t.values.strategic);
    setEmpathetic(t.values.empathetic);
    setSystematic(t.values.systematic);
    setAdaptive(t.values.adaptive);
    setDirectness(t.comms.directness);
    setFormality(t.comms.formality);
    setDetail(t.comms.detail);
    setWarmth(t.comms.warmth);
    setPersuasion(t.comms.persuasion);
    setClarity(t.comms.clarity);
    setSelectedValues(t.vals);
    setAgentReqs(t.agents);
    setDepartment(t.dept);
    setAutonomy(t.auto);
    setTitle(t.name);
  };

  const cognitiveData = [
    { subject: "Analytical", A: analytical },
    { subject: "Creative", A: creative },
    { subject: "Strategic", A: strategic },
    { subject: "Empathetic", A: empathetic },
    { subject: "Systematic", A: systematic },
    { subject: "Adaptive", A: adaptive },
  ];

  const addAgentReq = () => {
    if (newAgentReq.trim() && !agentReqs.includes(newAgentReq.trim())) {
      setAgentReqs([...agentReqs, newAgentReq.trim()]);
      setNewAgentReq("");
    }
  };

  const [saved, setSaved] = useState(false);

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-semibold text-gray-900 tracking-tight">
            Role OS Builder
          </h2>
          <p className="text-sm text-gray-500 mt-0.5">
            Define what this role demands — cognitively, communicatively, and agentically
          </p>
        </div>
      </div>

      {/* Templates */}
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-xs font-medium text-gray-500">
            Start from a Template
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex gap-2">
            {TEMPLATES.map((t) => (
              <Button
                key={t.name}
                variant="outline"
                size="sm"
                className="text-xs"
                onClick={() => applyTemplate(t)}
              >
                {t.name}
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Role Identity */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-sm font-medium text-gray-700">
            Role Identity
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-3 gap-4">
            <div className="space-y-1.5">
              <Label className="text-xs">Role Title</Label>
              <Input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Head of Strategy"
                className="text-sm"
              />
            </div>
            <div className="space-y-1.5">
              <Label className="text-xs">Department</Label>
              <Input
                value={department}
                onChange={(e) => setDepartment(e.target.value)}
                placeholder="Executive"
                className="text-sm"
              />
            </div>
            <div className="space-y-1.5">
              <Label className="text-xs">Autonomy Level</Label>
              <div className="flex items-center gap-3 pt-1">
                <Slider
                  value={[autonomy]}
                  onValueChange={([v]) => setAutonomy(v)}
                  min={10}
                  max={100}
                  step={5}
                  className="flex-1"
                />
                <span className="text-sm font-semibold tabular-nums text-gray-900 w-10 text-right">
                  {autonomy}%
                </span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Cognitive + Preview */}
      <div className="grid grid-cols-2 gap-4">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-gray-700">
              Cognitive Requirements
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {[
              { label: "Analytical", value: analytical, set: setAnalytical },
              { label: "Creative", value: creative, set: setCreative },
              { label: "Strategic", value: strategic, set: setStrategic },
              { label: "Empathetic", value: empathetic, set: setEmpathetic },
              { label: "Systematic", value: systematic, set: setSystematic },
              { label: "Adaptive", value: adaptive, set: setAdaptive },
            ].map((item) => (
              <div key={item.label} className="space-y-1">
                <div className="flex items-center justify-between">
                  <span className="text-xs text-gray-600">{item.label}</span>
                  <span className="text-xs font-semibold tabular-nums">
                    {item.value}
                  </span>
                </div>
                <Slider
                  value={[item.value]}
                  onValueChange={([v]) => item.set(v)}
                  min={20}
                  max={100}
                  step={1}
                />
              </div>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-700">
              Role OS Preview
            </CardTitle>
          </CardHeader>
          <CardContent>
            <RadarChartComponent
              data={cognitiveData}
              labelA={title || "New Role"}
              colorA="#1e40af"
              height={260}
            />
          </CardContent>
        </Card>
      </div>

      {/* Communication */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-sm font-medium text-gray-700">
            Communication Requirements
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-3 gap-x-8 gap-y-4">
            {[
              { label: "Directness", value: directness, set: setDirectness },
              { label: "Formality", value: formality, set: setFormality },
              { label: "Detail Level", value: detail, set: setDetail },
              { label: "Warmth", value: warmth, set: setWarmth },
              { label: "Persuasion", value: persuasion, set: setPersuasion },
              { label: "Clarity", value: clarity, set: setClarity },
            ].map((item) => (
              <div key={item.label} className="space-y-1">
                <div className="flex items-center justify-between">
                  <span className="text-xs text-gray-600">{item.label}</span>
                  <span className="text-xs font-semibold tabular-nums">
                    {item.value}
                  </span>
                </div>
                <Slider
                  value={[item.value]}
                  onValueChange={([v]) => item.set(v)}
                  min={10}
                  max={100}
                  step={1}
                />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Values + Agentic */}
      <div className="grid grid-cols-2 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-700">
              Required Values
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-1.5">
              {VALUE_OPTIONS.map((v) => (
                <Badge
                  key={v}
                  variant={selectedValues.includes(v) ? "default" : "outline"}
                  className={`cursor-pointer text-[10px] py-1 px-2 transition-all ${
                    selectedValues.includes(v)
                      ? "bg-gray-900 hover:bg-gray-800"
                      : "hover:bg-gray-100"
                  }`}
                  onClick={() =>
                    setSelectedValues((prev) =>
                      prev.includes(v)
                        ? prev.filter((x) => x !== v)
                        : [...prev, v]
                    )
                  }
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
              Agentic Requirements
            </CardTitle>
            <p className="text-[10px] text-gray-400">
              What AI capabilities should the candidate bring?
            </p>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex gap-2">
              <Input
                value={newAgentReq}
                onChange={(e) => setNewAgentReq(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && addAgentReq()}
                placeholder="e.g. Market analysis"
                className="text-sm h-8 flex-1"
              />
              <Button
                variant="outline"
                size="sm"
                className="text-xs h-8"
                onClick={addAgentReq}
              >
                Add
              </Button>
            </div>
            <div className="flex flex-wrap gap-1.5">
              {agentReqs.map((a) => (
                <Badge
                  key={a}
                  variant="secondary"
                  className="text-[10px] py-1 px-2 cursor-pointer hover:bg-red-100 hover:text-red-700 transition-colors"
                  onClick={() =>
                    setAgentReqs(agentReqs.filter((x) => x !== a))
                  }
                >
                  {a} ×
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Save */}
      <div className="flex justify-center pt-2">
        <Button
          className="text-sm px-8"
          onClick={() => setSaved(true)}
        >
          {saved ? "✓ Role OS Saved" : "Save Role OS"}
        </Button>
      </div>
    </div>
  );
}
