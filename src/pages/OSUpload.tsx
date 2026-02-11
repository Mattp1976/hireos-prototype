import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Slider } from "@/components/ui/slider";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScoreRing } from "@/components/ScoreRing";
import { RadarChartComponent } from "@/components/RadarChart";
import { BarMeter } from "@/components/BarMeter";

type Step = "method" | "identity" | "cognitive" | "communication" | "values" | "agents" | "review";

const STEPS: { key: Step; label: string }[] = [
  { key: "method", label: "Import Method" },
  { key: "identity", label: "Identity" },
  { key: "cognitive", label: "Thinking" },
  { key: "communication", label: "Communication" },
  { key: "values", label: "Values & Style" },
  { key: "agents", label: "AI Agents" },
  { key: "review", label: "Review" },
];

interface AgentDraft {
  name: string;
  capability: string;
  tasks: string;
}

export function OSUpload() {
  const [step, setStep] = useState<Step>("method");
  const [importMethod, setImportMethod] = useState<"guided" | "sync" | null>(null);
  const [syncing, setSyncing] = useState(false);
  const [syncProgress, setSyncProgress] = useState(0);
  const [syncDone, setSyncDone] = useState(false);

  // Identity
  const [name, setName] = useState("");
  const [role, setRole] = useState("");
  const [location, setLocation] = useState("");
  const [tagline, setTagline] = useState("");

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

  // Values
  const [workingStyle, setWorkingStyle] = useState("");
  const [decisionModel, setDecisionModel] = useState("");
  const [selectedValues, setSelectedValues] = useState<string[]>([]);

  // Agents
  const [agents, setAgents] = useState<AgentDraft[]>([
    { name: "", capability: "", tasks: "" },
  ]);

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

  const toggleValue = (v: string) => {
    setSelectedValues((prev) =>
      prev.includes(v) ? prev.filter((x) => x !== v) : [...prev, v]
    );
  };

  const stepIndex = STEPS.findIndex((s) => s.key === step);
  const progress = Math.round(((stepIndex + 1) / STEPS.length) * 100);

  const handleSync = () => {
    setSyncing(true);
    setSyncProgress(0);
    const interval = setInterval(() => {
      setSyncProgress((p) => {
        if (p >= 100) {
          clearInterval(interval);
          setSyncDone(true);
          setSyncing(false);
          // Auto-fill with sample data
          setName("Matt Harris");
          setRole("Strategy Director");
          setLocation("London, UK");
          setTagline("Connects dots others don't see, then builds the bridge");
          setAnalytical(86);
          setCreative(79);
          setStrategic(93);
          setEmpathetic(72);
          setSystematic(81);
          setAdaptive(88);
          setDirectness(82);
          setFormality(55);
          setDetail(76);
          setWarmth(74);
          setPersuasion(90);
          setClarity(88);
          setWorkingStyle(
            "Async-first with structured thinking sessions. Writes to think. Prefers frameworks over freeform brainstorming."
          );
          setDecisionModel(
            "Evidence-weighted but comfortable with intuition when data is sparse. Uses pre-mortem analysis on high-stakes calls."
          );
          setSelectedValues([
            "First-principles thinking",
            "Outcome over process",
            "Bias for action",
            "Continuous learning",
          ]);
          setAgents([
            {
              name: "StratBot",
              capability: "Market analysis & positioning",
              tasks: "Competitor digests, Pricing models, Market sizing",
            },
            {
              name: "WriterOS",
              capability: "Long-form content & comms",
              tasks: "Blog drafts, Investor updates, Strategy memos",
            },
          ]);
          return 100;
        }
        return p + 3;
      });
    }, 60);
  };

  const goNext = () => {
    const idx = STEPS.findIndex((s) => s.key === step);
    if (idx < STEPS.length - 1) setStep(STEPS[idx + 1].key);
  };

  const goBack = () => {
    const idx = STEPS.findIndex((s) => s.key === step);
    if (idx > 0) setStep(STEPS[idx - 1].key);
  };

  const cognitiveData = [
    { subject: "Analytical", A: analytical },
    { subject: "Creative", A: creative },
    { subject: "Strategic", A: strategic },
    { subject: "Empathetic", A: empathetic },
    { subject: "Systematic", A: systematic },
    { subject: "Adaptive", A: adaptive },
  ];

  const initials = name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);

  const osStrength = Math.round(
    (analytical + creative + strategic + empathetic + systematic + adaptive) / 6
  );

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-lg font-semibold text-gray-900 tracking-tight">
          Build Your Meta OS
        </h2>
        <p className="text-sm text-gray-500 mt-0.5">
          Import from Humanise OS or create your OS profile step by step
        </p>
      </div>

      {/* Progress */}
      {step !== "method" && (
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <div className="flex gap-1">
              {STEPS.map((s, i) => (
                <button
                  key={s.key}
                  onClick={() => setStep(s.key)}
                  className={`text-[10px] px-2 py-1 rounded transition-colors ${
                    s.key === step
                      ? "bg-gray-900 text-white"
                      : i <= stepIndex
                      ? "bg-gray-200 text-gray-700 hover:bg-gray-300"
                      : "bg-gray-100 text-gray-400"
                  }`}
                >
                  {s.label}
                </button>
              ))}
            </div>
            <span className="text-[11px] text-gray-400 tabular-nums">
              {progress}%
            </span>
          </div>
          <Progress value={progress} className="h-1" />
        </div>
      )}

      {/* STEP: Method */}
      {step === "method" && (
        <div className="grid grid-cols-2 gap-4">
          <Card
            className={`cursor-pointer transition-all hover:shadow-md ${
              importMethod === "sync"
                ? "ring-2 ring-gray-900"
                : ""
            }`}
            onClick={() => setImportMethod("sync")}
          >
            <CardContent className="pt-6 text-center space-y-3">
              <div className="w-12 h-12 rounded-lg bg-gray-100 flex items-center justify-center mx-auto text-2xl">
                🔄
              </div>
              <div>
                <h3 className="text-sm font-semibold text-gray-900">
                  Sync from Humanise OS
                </h3>
                <p className="text-xs text-gray-500 mt-1">
                  Import your existing Meta OS profile automatically. All identity, cognitive, and agent data will be pulled in.
                </p>
              </div>
              {importMethod === "sync" && !syncDone && (
                <div className="pt-2">
                  {!syncing ? (
                    <Button
                      size="sm"
                      className="text-xs"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleSync();
                      }}
                    >
                      Connect & Sync
                    </Button>
                  ) : (
                    <div className="space-y-2">
                      <Progress value={syncProgress} className="h-1.5" />
                      <p className="text-[11px] text-gray-400">
                        Importing your OS... {syncProgress}%
                      </p>
                    </div>
                  )}
                </div>
              )}
              {syncDone && (
                <div className="pt-2 space-y-2">
                  <Badge className="bg-green-100 text-green-700 text-[10px]">
                    Sync complete
                  </Badge>
                  <p className="text-[11px] text-gray-500">
                    Your OS has been imported. Review and refine below.
                  </p>
                </div>
              )}
            </CardContent>
          </Card>

          <Card
            className={`cursor-pointer transition-all hover:shadow-md ${
              importMethod === "guided"
                ? "ring-2 ring-gray-900"
                : ""
            }`}
            onClick={() => setImportMethod("guided")}
          >
            <CardContent className="pt-6 text-center space-y-3">
              <div className="w-12 h-12 rounded-lg bg-gray-100 flex items-center justify-center mx-auto text-2xl">
                ✏️
              </div>
              <div>
                <h3 className="text-sm font-semibold text-gray-900">
                  Guided Setup
                </h3>
                <p className="text-xs text-gray-500 mt-1">
                  Build your Meta OS from scratch. We'll walk you through each layer — identity, thinking, communication, values, and agents.
                </p>
              </div>
            </CardContent>
          </Card>

          {(importMethod === "guided" || syncDone) && (
            <div className="col-span-2 flex justify-end">
              <Button onClick={goNext} className="text-xs">
                {syncDone ? "Review & Refine" : "Start Building"} →
              </Button>
            </div>
          )}
        </div>
      )}

      {/* STEP: Identity */}
      {step === "identity" && (
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-gray-700">
              Your Identity
            </CardTitle>
            <p className="text-[11px] text-gray-400">
              The foundation of your Meta OS — who you are professionally
            </p>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <Label className="text-xs">Full Name</Label>
                <Input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Elena Vasquez"
                  className="text-sm"
                />
              </div>
              <div className="space-y-1.5">
                <Label className="text-xs">Current Role</Label>
                <Input
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  placeholder="Strategy & Operations Lead"
                  className="text-sm"
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <Label className="text-xs">Location</Label>
                <Input
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  placeholder="London, UK"
                  className="text-sm"
                />
              </div>
              <div className="space-y-1.5">
                <Label className="text-xs">Tagline</Label>
                <Input
                  value={tagline}
                  onChange={(e) => setTagline(e.target.value)}
                  placeholder="One line that captures how you work"
                  className="text-sm"
                />
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* STEP: Cognitive */}
      {step === "cognitive" && (
        <div className="grid grid-cols-2 gap-4">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-gray-700">
                Cognitive Profile
              </CardTitle>
              <p className="text-[11px] text-gray-400">
                How you think — adjust each dimension to reflect your natural strengths
              </p>
            </CardHeader>
            <CardContent className="space-y-5">
              {[
                { label: "Analytical", value: analytical, set: setAnalytical, desc: "Breaking down complex problems logically" },
                { label: "Creative", value: creative, set: setCreative, desc: "Generating novel ideas and solutions" },
                { label: "Strategic", value: strategic, set: setStrategic, desc: "Seeing the big picture and long-term patterns" },
                { label: "Empathetic", value: empathetic, set: setEmpathetic, desc: "Understanding others' perspectives and needs" },
                { label: "Systematic", value: systematic, set: setSystematic, desc: "Building repeatable processes and structures" },
                { label: "Adaptive", value: adaptive, set: setAdaptive, desc: "Adjusting approach when conditions change" },
              ].map((item) => (
                <div key={item.label} className="space-y-1.5">
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-xs font-medium text-gray-700">
                        {item.label}
                      </span>
                      <p className="text-[10px] text-gray-400">{item.desc}</p>
                    </div>
                    <span className="text-sm font-semibold tabular-nums text-gray-900 w-8 text-right">
                      {item.value}
                    </span>
                  </div>
                  <Slider
                    value={[item.value]}
                    onValueChange={([v]) => item.set(v)}
                    min={20}
                    max={100}
                    step={1}
                    className="w-full"
                  />
                </div>
              ))}
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-700">
                Live Preview
              </CardTitle>
            </CardHeader>
            <CardContent>
              <RadarChartComponent
                data={cognitiveData}
                labelA="Your OS"
                colorA="#1e40af"
                height={280}
              />
              <div className="flex justify-center mt-2">
                <ScoreRing score={osStrength} size={64} strokeWidth={5} label="OS Strength" color="#1e40af" />
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* STEP: Communication */}
      {step === "communication" && (
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-gray-700">
              Communication Style
            </CardTitle>
            <p className="text-[11px] text-gray-400">
              How you communicate — each slider represents a spectrum
            </p>
          </CardHeader>
          <CardContent className="space-y-5">
            {[
              { label: "Directness", value: directness, set: setDirectness, low: "Diplomatic", high: "Blunt" },
              { label: "Formality", value: formality, set: setFormality, low: "Casual", high: "Formal" },
              { label: "Detail Level", value: detail, set: setDetail, low: "High-level", high: "Granular" },
              { label: "Warmth", value: warmth, set: setWarmth, low: "Reserved", high: "Expressive" },
              { label: "Persuasion", value: persuasion, set: setPersuasion, low: "Informative", high: "Influential" },
              { label: "Clarity", value: clarity, set: setClarity, low: "Exploratory", high: "Precise" },
            ].map((item) => (
              <div key={item.label} className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-medium text-gray-700">
                    {item.label}
                  </span>
                  <span className="text-sm font-semibold tabular-nums text-gray-900 w-8 text-right">
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
                <div className="flex justify-between">
                  <span className="text-[10px] text-gray-400">{item.low}</span>
                  <span className="text-[10px] text-gray-400">{item.high}</span>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      )}

      {/* STEP: Values */}
      {step === "values" && (
        <div className="space-y-4">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-gray-700">
                Core Values
              </CardTitle>
              <p className="text-[11px] text-gray-400">
                Select the values that define how you work (pick 3–5)
              </p>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {VALUE_OPTIONS.map((v) => (
                  <Badge
                    key={v}
                    variant={selectedValues.includes(v) ? "default" : "outline"}
                    className={`cursor-pointer text-xs py-1.5 px-3 transition-all ${
                      selectedValues.includes(v)
                        ? "bg-gray-900 hover:bg-gray-800"
                        : "hover:bg-gray-100"
                    }`}
                    onClick={() => toggleValue(v)}
                  >
                    {v}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>

          <div className="grid grid-cols-2 gap-4">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-gray-700">
                  Working Style
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Textarea
                  value={workingStyle}
                  onChange={(e) => setWorkingStyle(e.target.value)}
                  placeholder="Describe how you prefer to work — async vs sync, deep work vs collaboration, how you structure your day..."
                  className="text-sm min-h-[100px]"
                />
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-gray-700">
                  Decision Model
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Textarea
                  value={decisionModel}
                  onChange={(e) => setDecisionModel(e.target.value)}
                  placeholder="How do you make decisions? Data-driven, intuition-led, consensus-based? How do you handle ambiguity?"
                  className="text-sm min-h-[100px]"
                />
              </CardContent>
            </Card>
          </div>
        </div>
      )}

      {/* STEP: Agents */}
      {step === "agents" && (
        <div className="space-y-4">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-gray-700">
                Your AI Agent Network
              </CardTitle>
              <p className="text-[11px] text-gray-400">
                The autonomous agents that augment your capabilities
              </p>
            </CardHeader>
            <CardContent className="space-y-4">
              {agents.map((agent, i) => (
                <div key={i} className="p-3 border rounded-lg space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-medium text-gray-500">
                      Agent {i + 1}
                    </span>
                    {agents.length > 1 && (
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-[10px] h-6 text-red-500 hover:text-red-700"
                        onClick={() =>
                          setAgents(agents.filter((_, j) => j !== i))
                        }
                      >
                        Remove
                      </Button>
                    )}
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div className="space-y-1">
                      <Label className="text-[11px]">Agent Name</Label>
                      <Input
                        value={agent.name}
                        onChange={(e) => {
                          const updated = [...agents];
                          updated[i] = { ...updated[i], name: e.target.value };
                          setAgents(updated);
                        }}
                        placeholder="e.g. StratBot"
                        className="text-sm h-8"
                      />
                    </div>
                    <div className="space-y-1">
                      <Label className="text-[11px]">Core Capability</Label>
                      <Input
                        value={agent.capability}
                        onChange={(e) => {
                          const updated = [...agents];
                          updated[i] = {
                            ...updated[i],
                            capability: e.target.value,
                          };
                          setAgents(updated);
                        }}
                        placeholder="e.g. Market analysis & positioning"
                        className="text-sm h-8"
                      />
                    </div>
                  </div>
                  <div className="space-y-1">
                    <Label className="text-[11px]">
                      Tasks (comma-separated)
                    </Label>
                    <Input
                      value={agent.tasks}
                      onChange={(e) => {
                        const updated = [...agents];
                        updated[i] = { ...updated[i], tasks: e.target.value };
                        setAgents(updated);
                      }}
                      placeholder="Competitor digests, Pricing models, Market sizing"
                      className="text-sm h-8"
                    />
                  </div>
                </div>
              ))}
              <Button
                variant="outline"
                size="sm"
                className="text-xs w-full"
                onClick={() =>
                  setAgents([
                    ...agents,
                    { name: "", capability: "", tasks: "" },
                  ])
                }
              >
                + Add Agent
              </Button>
            </CardContent>
          </Card>
        </div>
      )}

      {/* STEP: Review */}
      {step === "review" && (
        <div className="space-y-4">
          <Card>
            <CardContent className="pt-5">
              <div className="flex items-start gap-4">
                <div
                  className="w-14 h-14 rounded-lg flex items-center justify-center text-lg font-bold text-white shrink-0"
                  style={{
                    background: "linear-gradient(135deg, #1e3a5f, #2d5a87)",
                  }}
                >
                  {initials || "??"}
                </div>
                <div className="flex-1">
                  <h3 className="text-base font-semibold text-gray-900">
                    {name || "Your Name"}
                  </h3>
                  <p className="text-sm text-gray-500">{role || "Your Role"}</p>
                  <p className="text-xs text-gray-400">{location}</p>
                  {tagline && (
                    <p className="text-[13px] text-gray-600 mt-1 italic">
                      "{tagline}"
                    </p>
                  )}
                </div>
                <ScoreRing
                  score={osStrength}
                  size={64}
                  strokeWidth={5}
                  label="OS Strength"
                  color="#1e40af"
                />
              </div>
            </CardContent>
          </Card>

          <div className="grid grid-cols-2 gap-4">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-xs font-medium text-gray-500">
                  Cognitive Profile
                </CardTitle>
              </CardHeader>
              <CardContent>
                <RadarChartComponent
                  data={cognitiveData}
                  labelA="Your OS"
                  colorA="#1e40af"
                  height={200}
                />
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-xs font-medium text-gray-500">
                  Communication Style
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <BarMeter label="Directness" value={directness} color="#1e40af" />
                <BarMeter label="Formality" value={formality} color="#6d28d9" />
                <BarMeter label="Detail" value={detail} color="#0891b2" />
                <BarMeter label="Warmth" value={warmth} color="#d97706" />
                <BarMeter label="Persuasion" value={persuasion} color="#059669" />
                <BarMeter label="Clarity" value={clarity} color="#1e40af" />
              </CardContent>
            </Card>
          </div>

          {selectedValues.length > 0 && (
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-xs font-medium text-gray-500">
                  Core Values
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-1.5">
                  {selectedValues.map((v) => (
                    <Badge key={v} variant="secondary" className="text-[11px]">
                      {v}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {agents.filter((a) => a.name).length > 0 && (
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-xs font-medium text-gray-500">
                  Agent Network
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-2">
                  {agents
                    .filter((a) => a.name)
                    .map((a, i) => (
                      <div key={i} className="p-3 border rounded-lg">
                        <p className="text-sm font-medium text-gray-900">
                          {a.name}
                        </p>
                        <p className="text-xs text-gray-500">{a.capability}</p>
                        {a.tasks && (
                          <div className="flex flex-wrap gap-1 mt-1.5">
                            {a.tasks.split(",").map((t, j) => (
                              <Badge
                                key={j}
                                variant="outline"
                                className="text-[9px]"
                              >
                                {t.trim()}
                              </Badge>
                            ))}
                          </div>
                        )}
                      </div>
                    ))}
                </div>
              </CardContent>
            </Card>
          )}

          <div className="flex justify-center pt-2">
            <Button className="text-sm px-8">
              Publish My OS →
            </Button>
          </div>
        </div>
      )}

      {/* Navigation */}
      {step !== "method" && (
        <div className="flex justify-between pt-2">
          <Button variant="outline" size="sm" className="text-xs" onClick={goBack}>
            ← Back
          </Button>
          {step !== "review" && (
            <Button size="sm" className="text-xs" onClick={goNext}>
              Continue →
            </Button>
          )}
        </div>
      )}
    </div>
  );
}
