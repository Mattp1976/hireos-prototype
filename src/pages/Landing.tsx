import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { RadarChartComponent } from "@/components/RadarChart";
import { ScoreRing } from "@/components/ScoreRing";

interface Props {
  onEnter: () => void;
  onBuildOS: () => void;
}

const sampleCognitive = [
  { subject: "Analytical", A: 92 },
  { subject: "Creative", A: 74 },
  { subject: "Strategic", A: 96 },
  { subject: "Empathetic", A: 68 },
  { subject: "Systematic", A: 88 },
  { subject: "Adaptive", A: 81 },
];

const compareData = [
  { subject: "Analytical", A: 92, B: 90 },
  { subject: "Creative", A: 74, B: 75 },
  { subject: "Strategic", A: 96, B: 95 },
  { subject: "Empathetic", A: 68, B: 65 },
  { subject: "Systematic", A: 88, B: 80 },
  { subject: "Adaptive", A: 81, B: 85 },
];

export function Landing({ onEnter, onBuildOS }: Props) {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-gray-50 via-white to-white" />
        <div className="relative max-w-5xl mx-auto px-6 pt-24 pb-20">
          <div className="flex items-start justify-between gap-16">
            <div className="max-w-xl pt-4">
              <Badge variant="outline" className="text-[10px] tracking-wide mb-6 border-gray-300 text-gray-500 font-normal">
                The world's first Meta OS–powered hiring platform
              </Badge>
              <h1 className="text-[2.75rem] leading-[1.1] font-bold tracking-tight text-gray-900">
                Hire people for how they{" "}
                <span className="relative">
                  actually
                  <svg className="absolute -bottom-1 left-0 w-full" height="6" viewBox="0 0 200 6" fill="none">
                    <path d="M0 5C50 -1 150 -1 200 5" stroke="#1e40af" strokeWidth="2" strokeLinecap="round" />
                  </svg>
                </span>{" "}
                think and work.
              </h1>
              <p className="text-lg text-gray-500 mt-6 leading-relaxed">
                HireOS replaces the CV with a living, intelligent representation of how a person operates — their thinking patterns, decision models, communication style, and AI-augmented capabilities.
              </p>
              <div className="flex items-center gap-3 mt-8">
                <Button
                  size="lg"
                  className="text-sm h-11 px-6 bg-gray-900 hover:bg-gray-800"
                  onClick={onEnter}
                >
                  Explore the Platform →
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  className="text-sm h-11 px-6"
                  onClick={onBuildOS}
                >
                  Build Your OS
                </Button>
              </div>
              <div className="flex items-center gap-6 mt-10 text-xs text-gray-400">
                <span>Measurable</span>
                <span className="w-1 h-1 rounded-full bg-gray-300" />
                <span>Predictable</span>
                <span className="w-1 h-1 rounded-full bg-gray-300" />
                <span>Fair</span>
                <span className="w-1 h-1 rounded-full bg-gray-300" />
                <span>Context-Rich</span>
              </div>
            </div>

            {/* Hero visual — mini OS card */}
            <div className="shrink-0 w-72">
              <div className="rounded-xl border border-gray-200 bg-white shadow-lg overflow-hidden">
                <div className="p-4 border-b border-gray-100 bg-gray-50/50">
                  <div className="flex items-center gap-3">
                    <div
                      className="w-10 h-10 rounded-lg flex items-center justify-center text-sm font-bold text-white"
                      style={{ background: "linear-gradient(135deg, #1e3a5f, #2d5a87)" }}
                    >
                      EV
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-gray-900">Elena Vasquez</p>
                      <p className="text-[11px] text-gray-400">Strategy & Operations Lead</p>
                    </div>
                  </div>
                </div>
                <div className="p-3">
                  <RadarChartComponent data={sampleCognitive} labelA="Cognitive OS" colorA="#1e40af" height={160} />
                </div>
                <div className="px-4 pb-4 flex justify-center gap-3">
                  <ScoreRing score={93} size={48} strokeWidth={4} label="OS" color="#1e40af" />
                  <ScoreRing score={91} size={48} strokeWidth={4} label="Consistency" color="#059669" />
                  <ScoreRing score={88} size={48} strokeWidth={4} label="Fit" color="#d97706" />
                </div>
              </div>
              <p className="text-[10px] text-gray-400 text-center mt-3 italic">
                A living OS profile — not a static CV
              </p>
            </div>
          </div>
        </div>
      </section>

      <Separator />

      {/* Problem Statement */}
      <section className="max-w-4xl mx-auto px-6 py-20">
        <p className="text-xs uppercase tracking-widest text-gray-400 font-medium mb-4">
          The problem
        </p>
        <h2 className="text-2xl font-bold text-gray-900 tracking-tight max-w-2xl">
          Hiring is broken because it measures the wrong things.
        </h2>
        <div className="grid grid-cols-3 gap-8 mt-10">
          <div>
            <div className="w-10 h-10 rounded-lg bg-red-50 flex items-center justify-center text-lg mb-3">
              📄
            </div>
            <h3 className="text-sm font-semibold text-gray-900 mb-1">CVs are dead artefacts</h3>
            <p className="text-[13px] text-gray-500 leading-relaxed">
              A list of job titles and dates tells you nothing about how someone thinks, decides, or solves problems under pressure.
            </p>
          </div>
          <div>
            <div className="w-10 h-10 rounded-lg bg-red-50 flex items-center justify-center text-lg mb-3">
              🎭
            </div>
            <h3 className="text-sm font-semibold text-gray-900 mb-1">Interviews reward performance</h3>
            <p className="text-[13px] text-gray-500 leading-relaxed">
              A 45-minute conversation optimises for charisma and rehearsed answers, not for actual on-the-job capability.
            </p>
          </div>
          <div>
            <div className="w-10 h-10 rounded-lg bg-red-50 flex items-center justify-center text-lg mb-3">
              🎲
            </div>
            <h3 className="text-sm font-semibold text-gray-900 mb-1">Gut feel doesn't scale</h3>
            <p className="text-[13px] text-gray-500 leading-relaxed">
              Bias, pattern-matching, and cultural familiarity drive most hiring decisions. Quality is left to chance.
            </p>
          </div>
        </div>
      </section>

      <Separator />

      {/* How It Works */}
      <section className="bg-gray-50/50">
        <div className="max-w-4xl mx-auto px-6 py-20">
          <p className="text-xs uppercase tracking-widest text-gray-400 font-medium mb-4">
            How HireOS works
          </p>
          <h2 className="text-2xl font-bold text-gray-900 tracking-tight max-w-2xl">
            Four layers that replace guesswork with intelligence.
          </h2>

          <div className="mt-12 space-y-6">
            {[
              {
                num: "01",
                title: "Personal Meta OS",
                desc: "Every candidate imports or builds their Meta OS — a structured representation of their thinking patterns, communication style, reasoning logic, decision models, values, and AI agent network. This is their \"thinking API\".",
                tags: ["Identity Model", "Cognitive Profile", "Agent Network", "Behaviour Fingerprints"],
              },
              {
                num: "02",
                title: "Agentic Capability Layer",
                desc: "See what a candidate can actually produce with AI augmentation. Their OS runs on real tasks — strategy briefs, research synthesis, decision analysis — showing output quality, not just credentials.",
                tags: ["Work Simulations", "Agent Outputs", "Multi-step Workflows", "Consistency Scoring"],
              },
              {
                num: "03",
                title: "Compatibility & Fit Engine",
                desc: "The heart of the platform. Compare Candidate OS → Role OS, Team OS, Culture OS, and Leadership OS. Get fit scores, cognitive diversity analysis, red flags, and onboarding predictions.",
                tags: ["OS-to-OS Matching", "Cognitive Diversity", "Risk Analysis", "Day One Ready Score"],
              },
              {
                num: "04",
                title: "Employer Dashboard",
                desc: "A full intelligence layer. Browse ranked candidates, compare OS profiles, map team composition, estimate agentic ROI, and simulate collaboration before making a single hire.",
                tags: ["Candidate Rankings", "Team Composition", "Capability Gaps", "Hire vs Develop"],
              },
            ].map((item) => (
              <Card key={item.num} className="overflow-hidden">
                <CardContent className="p-6">
                  <div className="flex items-start gap-5">
                    <span className="text-2xl font-bold text-gray-200 tabular-nums shrink-0 w-10">
                      {item.num}
                    </span>
                    <div>
                      <h3 className="text-base font-semibold text-gray-900">
                        {item.title}
                      </h3>
                      <p className="text-[13px] text-gray-500 mt-1.5 leading-relaxed max-w-xl">
                        {item.desc}
                      </p>
                      <div className="flex flex-wrap gap-1.5 mt-3">
                        {item.tags.map((t) => (
                          <Badge key={t} variant="secondary" className="text-[10px] font-normal">
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
        </div>
      </section>

      <Separator />

      {/* For Candidates / For Employers */}
      <section className="max-w-4xl mx-auto px-6 py-20">
        <div className="grid grid-cols-2 gap-12">
          <div>
            <p className="text-xs uppercase tracking-widest text-gray-400 font-medium mb-4">
              For Candidates
            </p>
            <h3 className="text-xl font-bold text-gray-900 tracking-tight">
              Your OS becomes your professional identity.
            </h3>
            <div className="mt-6 space-y-4">
              {[
                { label: "Get hired for how you think", desc: "Not for how you format a CV or rehearse interview answers." },
                { label: "Show your augmented self", desc: "Employers see you with your AI agents — the full picture of your capability." },
                { label: "Control your data", desc: "Scoped, time-limited sharing. Revoke access at any time. You own your OS." },
                { label: "Stand out with substance", desc: "Work simulations, cognitive profiles, and consistency scores replace guesswork." },
              ].map((item) => (
                <div key={item.label} className="flex items-start gap-3">
                  <span className="text-blue-600 text-xs mt-1">●</span>
                  <div>
                    <p className="text-sm font-medium text-gray-900">{item.label}</p>
                    <p className="text-xs text-gray-500 mt-0.5">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div>
            <p className="text-xs uppercase tracking-widest text-gray-400 font-medium mb-4">
              For Employers
            </p>
            <h3 className="text-xl font-bold text-gray-900 tracking-tight">
              See how someone works before you hire them.
            </h3>
            <div className="mt-6 space-y-4">
              {[
                { label: "Reduce time-to-hire by 70%", desc: "OS-to-OS matching replaces weeks of screening with instant compatibility scores." },
                { label: "Remove bias from hiring", desc: "Structured cognitive analysis replaces gut feel and pattern-matching." },
                { label: "Predict team performance", desc: "See how a candidate complements or overloads your existing team's cognitive profile." },
                { label: "Simulate before you commit", desc: "Work with a candidate's OS on a real task. This alone kills the interview." },
              ].map((item) => (
                <div key={item.label} className="flex items-start gap-3">
                  <span className="text-green-600 text-xs mt-1">●</span>
                  <div>
                    <p className="text-sm font-medium text-gray-900">{item.label}</p>
                    <p className="text-xs text-gray-500 mt-0.5">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <Separator />

      {/* OS vs CV comparison */}
      <section className="bg-gray-50/50">
        <div className="max-w-4xl mx-auto px-6 py-20">
          <p className="text-xs uppercase tracking-widest text-gray-400 font-medium mb-4">
            The intelligent CV
          </p>
          <h2 className="text-2xl font-bold text-gray-900 tracking-tight">
            What a CV tells you vs what a Meta OS tells you.
          </h2>

          <div className="grid grid-cols-2 gap-6 mt-10">
            <Card className="border-red-100">
              <CardContent className="p-5">
                <p className="text-xs font-semibold text-red-400 uppercase tracking-wide mb-3">
                  Traditional CV
                </p>
                <div className="space-y-2.5">
                  {[
                    "Job titles and company names",
                    "Years of experience",
                    "Self-reported skills",
                    "Education credentials",
                    "Curated achievements",
                    "No insight into how they think",
                    "No prediction of team fit",
                  ].map((item) => (
                    <div key={item} className="flex items-center gap-2">
                      <span className="text-red-300 text-xs">✕</span>
                      <p className="text-[13px] text-gray-500">{item}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="border-blue-100">
              <CardContent className="p-5">
                <p className="text-xs font-semibold text-blue-500 uppercase tracking-wide mb-3">
                  Meta OS Profile
                </p>
                <div className="space-y-2.5">
                  {[
                    "Cognitive profile and reasoning patterns",
                    "Communication style fingerprint",
                    "Decision-making model under uncertainty",
                    "AI agent network and capabilities",
                    "Live work simulations with scoring",
                    "OS-to-OS compatibility matching",
                    "Day One readiness prediction",
                  ].map((item) => (
                    <div key={item} className="flex items-center gap-2">
                      <span className="text-blue-500 text-xs">✓</span>
                      <p className="text-[13px] text-gray-700">{item}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <Separator />

      {/* CTA */}
      <section className="max-w-4xl mx-auto px-6 py-20 text-center">
        <h2 className="text-2xl font-bold text-gray-900 tracking-tight">
          The future of hiring is OS-to-OS.
        </h2>
        <p className="text-base text-gray-500 mt-3 max-w-lg mx-auto">
          Stop guessing. Start matching people to roles based on how they actually think, communicate, and create.
        </p>
        <div className="flex items-center justify-center gap-3 mt-8">
          <Button
            size="lg"
            className="text-sm h-11 px-8 bg-gray-900 hover:bg-gray-800"
            onClick={onEnter}
          >
            Explore the Platform →
          </Button>
          <Button
            variant="outline"
            size="lg"
            className="text-sm h-11 px-8"
            onClick={onBuildOS}
          >
            Build Your OS
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-200 py-8">
        <div className="max-w-4xl mx-auto px-6 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-5 h-5 rounded bg-gray-900 flex items-center justify-center">
              <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="3" />
              </svg>
            </div>
            <span className="text-xs font-semibold text-gray-700 tracking-tight">HireOS</span>
          </div>
          <p className="text-[11px] text-gray-400">
            Part of the Humanise ecosystem · Built for Industry 5.0
          </p>
        </div>
      </footer>
    </div>
  );
}
