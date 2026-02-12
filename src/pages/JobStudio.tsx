import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface Job {
  id: string;
  title: string;
  department: string;
  osProfileType: string;
  applicantCount: number;
  daysOpen: number;
  status: "Active" | "Paused" | "Draft";
}

interface OSProfile {
  analyticalThinking: number;
  creativeProblemSolving: number;
  structuredExecution: number;
  collaborativeCommunication: number;
  adaptiveResilience: number;
  strategicVision: number;
}

const sampleJobs: Job[] = [
  { id: "1", title: "Senior Software Engineer", department: "Engineering", osProfileType: "Technical Leader", applicantCount: 24, daysOpen: 12, status: "Active" },
  { id: "2", title: "Product Manager", department: "Product", osProfileType: "Strategic Vision", applicantCount: 18, daysOpen: 8, status: "Active" },
  { id: "3", title: "UX Designer", department: "Design", osProfileType: "Creative Director", applicantCount: 31, daysOpen: 5, status: "Active" },
  { id: "4", title: "Operations Director", department: "Operations", osProfileType: "Operations Manager", applicantCount: 12, daysOpen: 15, status: "Paused" },
  { id: "5", title: "HR Business Partner", department: "People", osProfileType: "People Manager", applicantCount: 0, daysOpen: 0, status: "Draft" },
];

const templates = [
  { id: "tech", name: "Technical Leader", profile: { analyticalThinking: 85, creativeProblemSolving: 75, structuredExecution: 80, collaborativeCommunication: 75, adaptiveResilience: 70, strategicVision: 80 } },
  { id: "creative", name: "Creative Director", profile: { analyticalThinking: 65, creativeProblemSolving: 90, structuredExecution: 70, collaborativeCommunication: 85, adaptiveResilience: 75, strategicVision: 85 } },
  { id: "ops", name: "Operations Manager", profile: { analyticalThinking: 80, creativeProblemSolving: 60, structuredExecution: 90, collaborativeCommunication: 80, adaptiveResilience: 75, strategicVision: 70 } },
  { id: "people", name: "People Manager", profile: { analyticalThinking: 70, creativeProblemSolving: 70, structuredExecution: 75, collaborativeCommunication: 90, adaptiveResilience: 85, strategicVision: 75 } },
];

const languageSuggestions = [
  { original: "rockstar", suggestion: "Consider 'high-performer' or 'expert'", type: "warning" as const },
  { original: "move fast and break things", suggestion: "Consider 'move efficiently while maintaining quality'", type: "warning" as const },
  { original: "guru", suggestion: "Consider 'subject matter expert'", type: "warning" as const },
  { original: "Gender-neutral language", suggestion: "All pronouns are inclusive", type: "success" as const },
];

function statusColor(s: string) {
  if (s === "Active") return "bg-green-100 text-green-700";
  if (s === "Paused") return "bg-amber-100 text-amber-700";
  return "bg-gray-100 text-gray-500";
}

export function JobStudio() {
  const [osProfile, setOsProfile] = useState<OSProfile>({
    analyticalThinking: 75, creativeProblemSolving: 60, structuredExecution: 80,
    collaborativeCommunication: 70, adaptiveResilience: 65, strategicVision: 55,
  });
  const [selectedTemplate, setSelectedTemplate] = useState<string | null>(null);
  const [channels, setChannels] = useState({
    linkedin: true, indeed: true, careers: true, referrals: false, university: false, diversity: true,
  });
  const [jobDescription, setJobDescription] = useState(
    "We are looking for a rockstar developer who can move fast and break things. Must be a guru in full-stack development."
  );

  const activeCount = sampleJobs.filter((j) => j.status === "Active").length;
  const totalApps = sampleJobs.reduce((s, j) => s + j.applicantCount, 0);

  const applyTemplate = (t: typeof templates[0]) => {
    setOsProfile(t.profile);
    setSelectedTemplate(t.id);
  };

  const dimensions: { label: string; key: keyof OSProfile }[] = [
    { label: "Analytical Thinking", key: "analyticalThinking" },
    { label: "Creative Problem-Solving", key: "creativeProblemSolving" },
    { label: "Structured Execution", key: "structuredExecution" },
    { label: "Collaborative Communication", key: "collaborativeCommunication" },
    { label: "Adaptive Resilience", key: "adaptiveResilience" },
    { label: "Strategic Vision", key: "strategicVision" },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Job Studio</h1>
        <p className="text-sm text-gray-500 mt-1">Create OS-first job descriptions and manage postings</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-4 gap-3">
        {[
          { label: "Total Positions", value: sampleJobs.length },
          { label: "Active Jobs", value: activeCount },
          { label: "Total Applicants", value: totalApps },
          { label: "Avg Per Job", value: Math.round(totalApps / sampleJobs.length) },
        ].map((s) => (
          <Card key={s.label} className="border border-gray-200">
            <CardContent className="pt-4 pb-3 px-4">
              <p className="text-[10px] uppercase tracking-widest text-gray-400 font-medium">{s.label}</p>
              <p className="text-xl font-bold text-gray-900 mt-0.5">{s.value}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-3 gap-4">
        {/* Job Cards */}
        <div className="col-span-2 space-y-4">
          <h2 className="text-sm font-semibold text-gray-700">Active Jobs</h2>
          <div className="grid grid-cols-2 gap-3">
            {sampleJobs.map((job) => (
              <Card key={job.id} className="border border-gray-200 hover:shadow-sm transition-shadow">
                <CardContent className="pt-4 pb-3">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <p className="text-sm font-semibold text-gray-900">{job.title}</p>
                      <p className="text-[11px] text-gray-500">{job.department}</p>
                    </div>
                    <span className={`text-[10px] font-medium px-1.5 py-0.5 rounded ${statusColor(job.status)}`}>{job.status}</span>
                  </div>
                  <p className="text-[10px] text-indigo-600 font-medium mb-2">{job.osProfileType}</p>
                  <div className="flex gap-4">
                    <div>
                      <p className="text-[10px] text-gray-400">Applicants</p>
                      <p className="text-sm font-bold text-gray-900">{job.applicantCount}</p>
                    </div>
                    <div>
                      <p className="text-[10px] text-gray-400">Days Open</p>
                      <p className="text-sm font-bold text-gray-900">{job.daysOpen}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Right Column */}
        <div className="space-y-4">
          {/* Templates */}
          <Card className="border border-gray-200">
            <CardHeader className="pb-2"><CardTitle className="text-sm font-semibold">Template Library</CardTitle></CardHeader>
            <CardContent className="space-y-1.5">
              {templates.map((t) => (
                <Button
                  key={t.id}
                  variant={selectedTemplate === t.id ? "default" : "outline"}
                  size="sm"
                  className="w-full justify-start text-xs h-8"
                  onClick={() => applyTemplate(t)}
                >
                  {t.name}
                </Button>
              ))}
            </CardContent>
          </Card>

          {/* OS Profile Builder */}
          <Card className="border border-gray-200">
            <CardHeader className="pb-2"><CardTitle className="text-sm font-semibold">OS Profile Builder</CardTitle></CardHeader>
            <CardContent className="space-y-3">
              {dimensions.map(({ label, key }) => (
                <div key={key}>
                  <div className="flex justify-between text-[11px] mb-1">
                    <span className="text-gray-600">{label}</span>
                    <span className="font-semibold text-indigo-600">{osProfile[key]}</span>
                  </div>
                  <div className="w-full bg-gray-100 rounded-full h-1.5">
                    <div className="bg-indigo-600 h-1.5 rounded-full transition-all" style={{ width: `${osProfile[key]}%` }} />
                  </div>
                  <input type="range" min={0} max={100} value={osProfile[key]} onChange={(e) => setOsProfile({ ...osProfile, [key]: Number(e.target.value) })} className="w-full h-1 mt-1 cursor-pointer accent-indigo-600" />
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Distribution Channels */}
          <Card className="border border-gray-200">
            <CardHeader className="pb-2"><CardTitle className="text-sm font-semibold">Distribution Channels</CardTitle></CardHeader>
            <CardContent className="space-y-1.5">
              {(Object.entries(channels) as [string, boolean][]).map(([key, on]) => (
                <label key={key} className="flex items-center gap-2 py-1 cursor-pointer hover:bg-gray-50 px-1 rounded">
                  <input
                    type="checkbox"
                    checked={on}
                    onChange={(e) => setChannels({ ...channels, [key]: e.target.checked })}
                    className="w-3.5 h-3.5 rounded border-gray-300 accent-indigo-600"
                  />
                  <span className="text-xs text-gray-700 capitalize">{key === "careers" ? "Company Careers" : key === "referrals" ? "Internal Referrals" : key === "university" ? "University Partners" : key === "diversity" ? "Diversity Networks" : key.charAt(0).toUpperCase() + key.slice(1)}</span>
                </label>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Inclusive Language Scanner */}
      <Card className="border border-gray-200">
        <CardHeader className="pb-2"><CardTitle className="text-sm font-semibold">Inclusive Language Scanner</CardTitle></CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-[10px] uppercase tracking-widest text-gray-400 font-medium block mb-1.5">Job Description</label>
              <textarea
                value={jobDescription}
                onChange={(e) => setJobDescription(e.target.value)}
                className="w-full h-28 p-2.5 border border-gray-200 rounded-md text-xs bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500 resize-none"
              />
            </div>
            <div>
              <label className="text-[10px] uppercase tracking-widest text-gray-400 font-medium block mb-1.5">Suggestions</label>
              <div className="space-y-2">
                {languageSuggestions.map((s, i) => (
                  <div key={i} className={`p-2 rounded border text-xs ${s.type === "warning" ? "bg-amber-50 border-amber-200" : "bg-green-50 border-green-200"}`}>
                    <span className="mr-1.5">{s.type === "warning" ? "⚠" : "✓"}</span>
                    <span className="font-medium text-gray-900">"{s.original}"</span>
                    <span className="text-gray-600 ml-1">— {s.suggestion}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <Button size="sm" className="text-xs h-8 mt-3 bg-gray-900 hover:bg-gray-800">Publish Job Posting</Button>
        </CardContent>
      </Card>
    </div>
  );
}
