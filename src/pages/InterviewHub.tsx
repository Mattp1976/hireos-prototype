import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface Interview {
  id: string;
  candidateName: string;
  role: string;
  time: string;
  day: string;
  interviewers: string[];
  type: "OS Deep-Dive" | "Technical Assessment" | "Culture Fit" | "Hiring Manager Panel";
}

interface Scorecard {
  id: string;
  candidateName: string;
  role: string;
  osAlignment: number;
  technical: number;
  communication: number;
  cultureAdd: number;
}

const interviews: Interview[] = [
  { id: "1", candidateName: "Sarah Chen", role: "Senior Product Manager", time: "10:00", day: "Today", interviewers: ["Alex Rivera"], type: "OS Deep-Dive" },
  { id: "2", candidateName: "Marcus Johnson", role: "Engineering Lead", time: "14:00", day: "Today", interviewers: ["Jamie Lee", "Sam Kumar"], type: "Technical Assessment" },
  { id: "3", candidateName: "Elena Petrov", role: "Product Designer", time: "11:30", day: "Tomorrow", interviewers: ["Morgan Chase"], type: "Culture Fit" },
  { id: "4", candidateName: "James Okafor", role: "Data Scientist", time: "15:30", day: "Tomorrow", interviewers: ["Alex Rivera"], type: "Technical Assessment" },
  { id: "5", candidateName: "Priya Sharma", role: "Marketing Manager", time: "09:00", day: "Thursday", interviewers: ["Morgan Chase", "Sam Kumar", "Casey Wong"], type: "Hiring Manager Panel" },
  { id: "6", candidateName: "Tom Williams", role: "Sales Director", time: "13:00", day: "Thursday", interviewers: ["Jordan Blake"], type: "OS Deep-Dive" },
  { id: "7", candidateName: "Aisha Mohammed", role: "UX Researcher", time: "14:45", day: "Friday", interviewers: ["Morgan Chase"], type: "Culture Fit" },
  { id: "8", candidateName: "David Kim", role: "Backend Engineer", time: "16:00", day: "Friday", interviewers: ["Jamie Lee"], type: "Technical Assessment" },
];

const scorecards: Scorecard[] = [
  { id: "s1", candidateName: "Lisa Wang", role: "Product Manager", osAlignment: 5, technical: 4, communication: 5, cultureAdd: 4 },
  { id: "s2", candidateName: "Robert Gonzalez", role: "Frontend Engineer", osAlignment: 4, technical: 5, communication: 3, cultureAdd: 4 },
  { id: "s3", candidateName: "Sophia Larsson", role: "Design Director", osAlignment: 3, technical: 4, communication: 4, cultureAdd: 3 },
  { id: "s4", candidateName: "Yuki Tanaka", role: "Data Engineer", osAlignment: 4, technical: 5, communication: 4, cultureAdd: 5 },
  { id: "s5", candidateName: "Carlos Mendoza", role: "Sales Manager", osAlignment: 5, technical: 3, communication: 5, cultureAdd: 4 },
];

const loops = [
  { name: "Sarah Chen", role: "Senior Product Manager", current: 2, stages: ["Applied", "OS Screen", "Technical", "Culture", "Panel", "Decision"] },
  { name: "Marcus Johnson", role: "Engineering Lead", current: 1, stages: ["Applied", "OS Screen", "Technical", "Culture", "Panel", "Decision"] },
  { name: "Elena Petrov", role: "Product Designer", current: 3, stages: ["Applied", "OS Screen", "Technical", "Culture", "Panel", "Decision"] },
];

const questionBank = [
  {
    candidate: "Sarah Chen",
    trait: "High Structured Thinking",
    questions: [
      "Walk us through how you break down complex product problems into components.",
      "Describe your framework for prioritising competing requirements.",
      "How do you create structure in ambiguous situations?",
    ],
  },
  {
    candidate: "Marcus Johnson",
    trait: "High Strategic Vision",
    questions: [
      "Tell us about a time you influenced technical direction without formal authority.",
      "How do you balance long-term architecture with short-term delivery?",
      "Describe your approach to mentoring and developing engineering talent.",
    ],
  },
  {
    candidate: "Elena Petrov",
    trait: "High Creative Problem-Solving",
    questions: [
      "Share an example of an unconventional design solution you championed.",
      "How do you validate creative ideas with users quickly?",
      "Describe your process for brainstorming across disciplines.",
    ],
  },
  {
    candidate: "James Okafor",
    trait: "High Analytical Thinking",
    questions: [
      "Walk us through your approach to designing a data pipeline for a new use case.",
      "How do you communicate complex statistical findings to non-technical stakeholders?",
      "Describe a time when data contradicted the prevailing assumption.",
    ],
  },
];

function typeColor(t: string) {
  if (t === "OS Deep-Dive") return "border-l-blue-500";
  if (t === "Technical Assessment") return "border-l-purple-500";
  if (t === "Culture Fit") return "border-l-green-500";
  return "border-l-amber-500";
}

function typeBg(t: string) {
  if (t === "OS Deep-Dive") return "bg-blue-50 text-blue-700";
  if (t === "Technical Assessment") return "bg-purple-50 text-purple-700";
  if (t === "Culture Fit") return "bg-green-50 text-green-700";
  return "bg-amber-50 text-amber-700";
}

function scorePill(v: number) {
  if (v >= 4) return "bg-green-100 text-green-800";
  if (v >= 3) return "bg-amber-100 text-amber-800";
  return "bg-red-100 text-red-800";
}

export function InterviewHub() {
  const [showSchedule, setShowSchedule] = useState(false);
  const [expandedQ, setExpandedQ] = useState<string | null>("Sarah Chen");

  const todayCount = interviews.filter((i) => i.day === "Today").length;
  const avgScore = (scorecards.reduce((s, c) => s + (c.osAlignment + c.technical + c.communication + c.cultureAdd) / 4, 0) / scorecards.length).toFixed(1);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Interview Hub</h1>
          <p className="text-sm text-gray-500 mt-1">Schedule, prepare & score interviews</p>
        </div>
        <Button size="sm" className="text-xs h-8 bg-gray-900 hover:bg-gray-800" onClick={() => setShowSchedule(!showSchedule)}>+ Quick Schedule</Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-4 gap-3">
        {[
          { label: "Today", value: todayCount },
          { label: "This Week", value: interviews.length },
          { label: "Avg Score", value: avgScore },
          { label: "Completion", value: "63%" },
        ].map((s) => (
          <Card key={s.label} className="border border-gray-200">
            <CardContent className="pt-4 pb-3 px-4">
              <p className="text-[10px] uppercase tracking-widest text-gray-400 font-medium">{s.label}</p>
              <p className="text-xl font-bold text-gray-900 mt-0.5">{s.value}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Quick Schedule Panel */}
      {showSchedule && (
        <Card className="border border-blue-200 bg-blue-50/30">
          <CardContent className="pt-4 pb-3">
            <div className="grid grid-cols-3 gap-3">
              <div>
                <label className="text-[10px] uppercase tracking-widest text-gray-400 font-medium block mb-1.5">Candidate</label>
                <input type="text" placeholder="Name" className="w-full px-2.5 py-1.5 border border-gray-200 rounded-md text-xs bg-white" />
              </div>
              <div>
                <label className="text-[10px] uppercase tracking-widest text-gray-400 font-medium block mb-1.5">Type</label>
                <select className="w-full px-2.5 py-1.5 border border-gray-200 rounded-md text-xs bg-white">
                  <option>OS Deep-Dive</option>
                  <option>Technical Assessment</option>
                  <option>Culture Fit</option>
                  <option>Hiring Manager Panel</option>
                </select>
              </div>
              <div>
                <label className="text-[10px] uppercase tracking-widest text-gray-400 font-medium block mb-1.5">Date & Time</label>
                <input type="datetime-local" className="w-full px-2.5 py-1.5 border border-gray-200 rounded-md text-xs bg-white" />
              </div>
            </div>
            <Button size="sm" className="text-xs h-7 mt-3 bg-gray-900 hover:bg-gray-800">Schedule</Button>
          </CardContent>
        </Card>
      )}

      <div className="grid grid-cols-3 gap-4">
        {/* Upcoming Interviews */}
        <div className="col-span-2">
          <Card className="border border-gray-200">
            <CardHeader className="pb-3"><CardTitle className="text-sm font-semibold">Upcoming Interviews</CardTitle></CardHeader>
            <CardContent className="space-y-2">
              {interviews.map((iv) => (
                <div key={iv.id} className={`border-l-4 ${typeColor(iv.type)} rounded-r-md p-3 bg-white hover:bg-gray-50 transition-colors`}>
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-900">{iv.candidateName}</p>
                      <p className="text-[11px] text-gray-500">{iv.role}</p>
                      <div className="flex items-center gap-2 mt-1.5">
                        <span className="text-[11px] font-medium text-gray-700">{iv.time}</span>
                        <span className={`text-[10px] px-1.5 py-0.5 rounded ${typeBg(iv.type)}`}>{iv.type}</span>
                      </div>
                      <p className="text-[10px] text-gray-400 mt-1">{iv.interviewers.join(", ")}</p>
                    </div>
                    <span className="text-[10px] font-medium bg-gray-100 text-gray-600 px-2 py-0.5 rounded">{iv.day}</span>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Interview Loops */}
        <Card className="border border-gray-200">
          <CardHeader className="pb-3"><CardTitle className="text-sm font-semibold">Interview Loops</CardTitle></CardHeader>
          <CardContent className="space-y-5">
            {loops.map((loop) => (
              <div key={loop.name}>
                <p className="text-xs font-semibold text-gray-900 mb-2">{loop.name}</p>
                <p className="text-[10px] text-gray-400 mb-2">{loop.role}</p>
                <div className="flex items-center gap-1">
                  {loop.stages.map((s, i) => (
                    <div key={i} className="flex items-center">
                      <div className={`w-6 h-6 rounded-full flex items-center justify-center text-[9px] font-bold ${
                        i < loop.current ? "bg-green-500 text-white" : i === loop.current ? "border-2 border-blue-500 text-blue-600 bg-white" : "bg-gray-200 text-gray-400"
                      }`}>
                        {i < loop.current ? "✓" : i + 1}
                      </div>
                      {i < loop.stages.length - 1 && <div className={`w-3 h-0.5 ${i < loop.current ? "bg-green-400" : "bg-gray-200"}`} />}
                    </div>
                  ))}
                </div>
                <div className="flex gap-1 mt-1">
                  {loop.stages.map((s, i) => (
                    <span key={i} className="text-[8px] text-gray-400 w-6 text-center leading-tight">{s.slice(0, 3)}</span>
                  ))}
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* Question Bank */}
      <Card className="border border-gray-200">
        <CardHeader className="pb-3"><CardTitle className="text-sm font-semibold">OS-Informed Question Bank</CardTitle></CardHeader>
        <CardContent className="space-y-2">
          {questionBank.map((qb) => (
            <div key={qb.candidate} className="border border-gray-100 rounded-md overflow-hidden">
              <button onClick={() => setExpandedQ(expandedQ === qb.candidate ? null : qb.candidate)} className="w-full px-3 py-2.5 flex items-center justify-between bg-gray-50 hover:bg-gray-100 transition-colors">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-medium text-gray-900">{qb.candidate}</span>
                  <span className="text-[10px] px-1.5 py-0.5 rounded bg-indigo-50 text-indigo-600">{qb.trait}</span>
                </div>
                <span className="text-gray-400 text-xs">{expandedQ === qb.candidate ? "−" : "+"}</span>
              </button>
              {expandedQ === qb.candidate && (
                <div className="px-3 py-2 space-y-1.5 bg-white border-t border-gray-100">
                  {qb.questions.map((q, i) => (
                    <p key={i} className="text-xs text-gray-600 flex gap-2"><span className="text-gray-300">•</span>{q}</p>
                  ))}
                </div>
              )}
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Scorecards */}
      <Card className="border border-gray-200">
        <CardHeader className="pb-3"><CardTitle className="text-sm font-semibold">Recent Scorecards</CardTitle></CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-xs">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-2 px-3 font-semibold text-gray-500">Candidate</th>
                  <th className="text-left py-2 px-3 font-semibold text-gray-500">Role</th>
                  <th className="text-center py-2 px-3 font-semibold text-gray-500">OS Align</th>
                  <th className="text-center py-2 px-3 font-semibold text-gray-500">Technical</th>
                  <th className="text-center py-2 px-3 font-semibold text-gray-500">Comms</th>
                  <th className="text-center py-2 px-3 font-semibold text-gray-500">Culture</th>
                </tr>
              </thead>
              <tbody>
                {scorecards.map((sc) => (
                  <tr key={sc.id} className="border-b border-gray-50 hover:bg-gray-50">
                    <td className="py-2 px-3 font-medium text-gray-900">{sc.candidateName}</td>
                    <td className="py-2 px-3 text-gray-500">{sc.role}</td>
                    {[sc.osAlignment, sc.technical, sc.communication, sc.cultureAdd].map((v, i) => (
                      <td key={i} className="py-2 px-3 text-center">
                        <span className={`inline-block px-2 py-0.5 rounded-full font-semibold text-[10px] ${scorePill(v)}`}>{v}</span>
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
