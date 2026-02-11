import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ScoreRing } from "@/components/ScoreRing";
import { candidates } from "@/data/sampleData";
import type { Candidate } from "@/data/types";

interface Message {
  from: "employer" | "candidate-os";
  text: string;
  meta?: string;
}

const TASK_TEMPLATES = [
  {
    id: "strategy",
    label: "Write a strategy brief",
    prompt:
      "We're considering entering the Nordic market for our B2B SaaS platform. Can you draft a one-page strategic assessment covering market opportunity, key risks, and a recommended approach?",
  },
  {
    id: "email",
    label: "Handle a difficult email",
    prompt:
      "Our biggest client just emailed saying they're evaluating competitors and want a 30% discount or they'll leave. Draft a response that protects the relationship without giving away margin.",
  },
  {
    id: "decision",
    label: "Make a decision under ambiguity",
    prompt:
      "We have budget for one new hire: a senior engineer or a product designer. Engineering says they're blocked, design says the UX is losing us customers. We have data for neither. What's your recommendation and reasoning?",
  },
  {
    id: "plan",
    label: "Create a weekly plan",
    prompt:
      "You're starting Monday with 3 active projects, a board meeting Thursday, and a team offsite to plan. Draft your weekly plan with priorities and time allocation.",
  },
];

function generateResponse(candidate: Candidate, taskId: string): { text: string; meta: string } {
  const style = candidate.communication;
  const cog = candidate.cognitive;

  const responses: Record<string, { text: string; meta: string }> = {
    strategy: {
      text: cog.strategic > 85
        ? `Here's my assessment structured around three lenses: market readiness, competitive positioning, and execution risk.

**Market Opportunity**: The Nordic B2B SaaS market is growing at ~18% CAGR with relatively low competitive density in our segment. Sweden and Denmark are the most accessible entry points — strong English proficiency, digital-first procurement culture, and established SaaS buying patterns.

**Key Risks**: (1) Localisation costs are often underestimated — GDPR enforcement is stricter in Nordics, and data residency expectations are high. (2) Sales cycles tend to be longer due to consensus-driven buying. (3) Channel partner dependency — direct sales is expensive without local presence.

**Recommended Approach**: Start with a partnership-led model in Sweden. Identify 2–3 established resellers with existing enterprise relationships. Run a 90-day validation with a ring-fenced budget of £80–120k. Gate the decision on 5+ qualified pipeline opportunities before committing to local hiring.

I'd want to pressure-test the pricing assumption before going further — Nordic customers often expect different packaging than UK/US markets.`
        : `Looking at the Nordic opportunity, I think there's potential but we need to be careful about how we enter.

The market seems promising based on what I've seen of similar expansions. I'd suggest we start small — maybe partner with a local firm — and see how it goes before committing heavily.

Main things to watch out for: regulatory differences, cultural fit of our product, and whether our pricing works in that market. Happy to dig deeper into any of these.`,
      meta: `Reasoning style: ${cog.strategic > 85 ? "Structured, multi-lens analysis with clear recommendation" : "Exploratory, cautious, seeks more input"}. Response reflects ${style.directness > 80 ? "high directness" : "measured tone"} and ${style.detail > 75 ? "granular detail" : "high-level framing"}.`,
    },
    email: {
      text: style.persuasion > 80
        ? `Subject: Let's talk about growing together

Thanks for being direct with us — we value that, and we value this partnership enormously.

Before we talk numbers, I'd love to understand what's driving the evaluation. Is it purely cost, or are there capability gaps we should be addressing? We've found that our most successful partnerships are ones where we solve the real problem, not just the stated one.

That said, I want to be transparent: a 30% reduction would take us below the level where we can deliver the service quality you rely on. What I can do is explore ways to restructure the engagement that delivers more value — potentially adding the analytics module you've mentioned wanting, with adjusted packaging that works better for your team's actual usage patterns.

Can we schedule 30 minutes this week to explore this together? I'd rather find a creative solution than lose a partnership that's been strong for both sides.`
        : `Thank you for reaching out and sharing this openly.

We really appreciate the partnership and want to find a way forward that works. A 30% discount is difficult for us, but let me look at what options we might have — perhaps there's a way to adjust the package to better fit your current needs and budget.

Would you be open to a call to discuss? I think talking it through would be more productive than going back and forth over email.`,
      meta: `Communication approach: ${style.persuasion > 80 ? "Reframes the conversation, creates new options, maintains leverage" : "Acknowledges, shows flexibility, seeks dialogue"}. ${style.warmth > 75 ? "Warm and relationship-focused" : "Professional and measured"}.`,
    },
    decision: {
      text: cog.analytical > 85
        ? `This is a false binary as presented, but if forced to choose, I'd hire the engineer. Here's my reasoning:

**The framing problem**: "Engineering says they're blocked" and "design says UX is losing customers" are both claims without data. Before spending £80k+/year, I'd want 2 weeks to validate both claims.

**For the engineer** (my lean):
- Engineering blockers compound — every week of blocked velocity is lost product iteration
- A blocked engineering team can't ship the design improvements anyway
- You can contract design work; contracting engineering is harder and riskier
- If the UX truly is losing customers, that's a product/research problem first, not a design execution problem

**For the designer** (the counter):
- If churn is genuinely UX-driven, no amount of engineering velocity fixes revenue loss
- Design debt tends to be invisible until it's catastrophic

**My actual recommendation**: Spend £5k on a 2-week research sprint — customer interviews + analytics review. Then hire with evidence, not competing narratives. If leadership insists on deciding now, hire the engineer and bring in a contract designer for 3 months.`
        : `Tough call. Without data, I'd probably lean toward the product designer, but I'd want to understand more before committing.

My instinct says customer-facing problems (UX losing customers) should take priority over internal blockers, because revenue is harder to win back. But I'd want to validate that the UX really is the problem, not just something the design team believes.

Could we explore a middle ground? Maybe a contract role for one while we hire the other?`,
      meta: `Decision model: ${cog.analytical > 85 ? "Challenges the frame, decomposes the problem, provides conditional recommendation" : "Intuition-led with caveats, seeks more information"}. Shows ${candidate.decisionModel.includes("pre-mortem") ? "pre-mortem thinking" : "exploratory reasoning"}.`,
    },
    plan: {
      text: cog.systematic > 80
        ? `**Monday** — Deep work block (AM): Review all three project statuses and update risk registers. PM: 1:1s with each project lead — 30 min each, focused on blockers and decisions needed this week.

**Tuesday** — Project execution day. Morning on highest-priority project (the one with the nearest deadline). Afternoon: Board meeting prep — draft my section, circulate to CEO for input by EOD.

**Wednesday** — AM: Board deck finalisation and rehearsal. PM: Offsite planning — agenda design, pre-reads, and logistics. Block 90 min for async responses and email.

**Thursday** — Board meeting (AM + early PM). Post-board: capture action items and distribute within 2 hours. Late PM: Quick project check-ins via Slack — written updates only, no meetings.

**Friday** — Offsite execution or strategic thinking time. Review week's decisions and log learnings. Prep handoff notes for anything carrying into next week.

**Principles this week**: Protect Monday morning for thinking. Don't let board prep bleed into project time. Use Tuesday as the throughput day. Keep Friday flexible.`
        : `Roughly, I'd structure the week around the board meeting as the anchor:

Mon–Tue: Focus on the three active projects, with priority on whichever is most at risk. Start board prep in the margins.

Wed: Finish board prep and start thinking about the offsite agenda.

Thu: Board meeting, then decompress and handle any follow-ups.

Fri: Offsite planning in detail, and wrap up any loose ends from the week.

I'd keep some flexibility built in since weeks like this always have surprises.`,
      meta: `Planning style: ${cog.systematic > 80 ? "Highly structured, time-blocked, with explicit principles" : "Flexible and adaptive, milestone-oriented rather than time-blocked"}. Reflects ${candidate.workingStyle.includes("Deep-work") || candidate.workingStyle.includes("Deep work") ? "deep-work preference" : "collaborative working style"}.`,
    },
  };

  return responses[taskId] || {
    text: "I'd approach this by first understanding the full context, then structuring my thinking around the key decision points.",
    meta: "Generic response — task type not matched to candidate profile.",
  };
}

export function SimulatedCollab() {
  const [selectedCandidate, setSelectedCandidate] = useState(candidates[0].id);
  const [messages, setMessages] = useState<Message[]>([]);
  const [customPrompt, setCustomPrompt] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  const candidate = candidates.find((c) => c.id === selectedCandidate)!;

  const sendTask = (prompt: string, taskId: string) => {
    const trimmed = prompt.trim();
    if (!trimmed) return;

    setMessages((prev) => [...prev, { from: "employer", text: trimmed }]);
    setIsTyping(true);

    setTimeout(() => {
      const response = generateResponse(candidate, taskId);
      setMessages((prev) => [
        ...prev,
        {
          from: "candidate-os",
          text: response.text,
          meta: response.meta,
        },
      ]);
      setIsTyping(false);
    }, 1200 + Math.random() * 800);
  };

  const reset = () => {
    setMessages([]);
    setCustomPrompt("");
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-semibold text-gray-900 tracking-tight">
            Simulated Collaboration
          </h2>
          <p className="text-sm text-gray-500 mt-0.5">
            Work with a candidate's OS on a real task — see how they think, communicate, and decide
          </p>
        </div>
        <Select value={selectedCandidate} onValueChange={(v) => { setSelectedCandidate(v); reset(); }}>
          <SelectTrigger className="w-52">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {candidates.map((c) => (
              <SelectItem key={c.id} value={c.id}>
                {c.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Candidate Summary */}
      <Card>
        <CardContent className="pt-4">
          <div className="flex items-center gap-4">
            <div
              className="w-10 h-10 rounded-lg flex items-center justify-center text-sm font-bold text-white shrink-0"
              style={{
                background: "linear-gradient(135deg, #1e3a5f, #2d5a87)",
              }}
            >
              {candidate.avatar}
            </div>
            <div className="flex-1">
              <p className="text-sm font-medium text-gray-900">
                {candidate.name}'s OS
              </p>
              <p className="text-xs text-gray-400">
                {candidate.tagline}
              </p>
            </div>
            <div className="flex gap-3">
              <ScoreRing score={candidate.osStrength} size={48} strokeWidth={4} label="OS" color="#1e40af" />
              <ScoreRing score={candidate.consistency} size={48} strokeWidth={4} label="Consistency" color="#059669" />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Task Templates */}
      {messages.length === 0 && (
        <div className="space-y-3">
          <p className="text-xs font-medium text-gray-500 uppercase tracking-wide">
            Choose a task to simulate
          </p>
          <div className="grid grid-cols-2 gap-3">
            {TASK_TEMPLATES.map((t) => (
              <Card
                key={t.id}
                className="cursor-pointer hover:shadow-md transition-all hover:border-gray-300"
                onClick={() => sendTask(t.prompt, t.id)}
              >
                <CardContent className="pt-4">
                  <p className="text-sm font-medium text-gray-900">
                    {t.label}
                  </p>
                  <p className="text-xs text-gray-500 mt-1 line-clamp-2">
                    {t.prompt}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
          <Separator />
          <div className="space-y-2">
            <p className="text-xs font-medium text-gray-500 uppercase tracking-wide">
              Or write your own brief
            </p>
            <div className="flex gap-2">
              <Textarea
                value={customPrompt}
                onChange={(e) => setCustomPrompt(e.target.value)}
                placeholder="Describe a task or scenario you want this candidate's OS to work on..."
                className="text-sm min-h-[60px] flex-1"
              />
              <Button
                size="sm"
                className="text-xs self-end"
                onClick={() => {
                  if (customPrompt.trim()) sendTask(customPrompt, "strategy");
                }}
                disabled={!customPrompt.trim()}
              >
                Send
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Conversation */}
      {messages.length > 0 && (
        <div className="space-y-4">
          {messages.map((msg, i) => (
            <div key={i}>
              <div
                className={`flex gap-3 ${
                  msg.from === "employer" ? "" : ""
                }`}
              >
                <div
                  className={`w-8 h-8 rounded-lg flex items-center justify-center text-[10px] font-bold shrink-0 ${
                    msg.from === "employer"
                      ? "bg-gray-200 text-gray-600"
                      : "text-white"
                  }`}
                  style={
                    msg.from === "candidate-os"
                      ? {
                          background:
                            "linear-gradient(135deg, #1e3a5f, #2d5a87)",
                        }
                      : {}
                  }
                >
                  {msg.from === "employer" ? "You" : candidate.avatar}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-[11px] font-medium text-gray-400 mb-1">
                    {msg.from === "employer"
                      ? "You (Employer)"
                      : `${candidate.name}'s OS`}
                  </p>
                  <div
                    className={`p-4 rounded-lg text-sm leading-relaxed whitespace-pre-wrap ${
                      msg.from === "employer"
                        ? "bg-gray-50 text-gray-700 border"
                        : "bg-blue-50/50 text-gray-800 border border-blue-100"
                    }`}
                  >
                    {msg.text}
                  </div>
                  {msg.meta && (
                    <div className="mt-2 p-2.5 rounded bg-amber-50 border border-amber-100">
                      <p className="text-[11px] text-amber-800">
                        <span className="font-medium">OS Analysis: </span>
                        {msg.meta}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}

          {isTyping && (
            <div className="flex gap-3">
              <div
                className="w-8 h-8 rounded-lg flex items-center justify-center text-[10px] font-bold text-white shrink-0"
                style={{
                  background: "linear-gradient(135deg, #1e3a5f, #2d5a87)",
                }}
              >
                {candidate.avatar}
              </div>
              <div className="p-4 rounded-lg bg-blue-50/50 border border-blue-100">
                <div className="flex gap-1.5">
                  <div className="w-2 h-2 bg-blue-300 rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
                  <div className="w-2 h-2 bg-blue-300 rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
                  <div className="w-2 h-2 bg-blue-300 rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
                </div>
              </div>
            </div>
          )}

          <Separator />
          <div className="flex justify-between items-center">
            <Button
              variant="outline"
              size="sm"
              className="text-xs"
              onClick={reset}
            >
              Reset & Try Another Task
            </Button>
            <p className="text-[10px] text-gray-400">
              Responses are generated based on {candidate.name}'s cognitive profile, communication style, and decision model
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
