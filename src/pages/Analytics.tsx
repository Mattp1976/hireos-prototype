import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const kpis = [
  { title: "Time to Hire", value: "23 days", trend: -8, up: true },
  { title: "Cost per Hire", value: "\u00A34,200", trend: -5, up: true },
  { title: "Quality of Hire", value: "87%", trend: 3, up: true },
  { title: "Offer Acceptance", value: "92%", trend: 4, up: true },
  { title: "Pipeline Velocity", value: "18/wk", trend: 12, up: true },
  { title: "OS Completion", value: "94%", trend: 2, up: true },
];

const funnel = [
  { stage: "Applications", count: 240 },
  { stage: "OS Screened", count: 180 },
  { stage: "Shortlisted", count: 62 },
  { stage: "Interviewed", count: 34 },
  { stage: "Offered", count: 12 },
  { stage: "Hired", count: 8 },
];

const osDiversity = [
  { dim: "Analytical Thinking", pct: 78, color: "bg-blue-500" },
  { dim: "Creative Problem-Solving", pct: 52, color: "bg-purple-500" },
  { dim: "Structured Execution", pct: 85, color: "bg-indigo-500" },
  { dim: "Collaborative Communication", pct: 71, color: "bg-green-500" },
  { dim: "Adaptive Resilience", pct: 64, color: "bg-amber-500" },
  { dim: "Strategic Vision", pct: 58, color: "bg-rose-500" },
];

const monthlyTrend = [
  { month: "Sep", days: 34 },
  { month: "Oct", days: 31 },
  { month: "Nov", days: 28 },
  { month: "Dec", days: 25 },
  { month: "Jan", days: 24 },
  { month: "Feb", days: 23 },
];

const qualityHires = [
  { name: "Sarah Chen", role: "Senior Product Manager", osFit: 94, ninetyDay: 92, manager: 95, retention: 98 },
  { name: "Marcus Johnson", role: "Full Stack Engineer", osFit: 87, ninetyDay: 88, manager: 90, retention: 92 },
  { name: "Elena Rodriguez", role: "UX Designer", osFit: 91, ninetyDay: 89, manager: 93, retention: 95 },
  { name: "James Wilson", role: "Data Analyst", osFit: 85, ninetyDay: 86, manager: 88, retention: 89 },
  { name: "Priya Patel", role: "Marketing Manager", osFit: 89, ninetyDay: 91, manager: 94, retention: 96 },
];

const sourceDiversity = [
  { source: "Direct Apply", pct: 35 },
  { source: "Referral", pct: 25 },
  { source: "Recruiter", pct: 20 },
  { source: "Career Fair", pct: 12 },
  { source: "University", pct: 8 },
];

const stageParity = [
  { stage: "Application", parity: 88 },
  { stage: "Screening", parity: 85 },
  { stage: "Interview", parity: 92 },
  { stage: "Offer", parity: 89 },
  { stage: "Hire", parity: 91 },
];

export function Analytics() {
  const maxDays = Math.max(...monthlyTrend.map((d) => d.days));
  const maxFunnel = funnel[0].count;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Analytics</h1>
          <p className="text-sm text-gray-500 mt-1">Recruitment performance and insights</p>
        </div>
        <Button size="sm" variant="outline" className="text-xs h-8">Export Report</Button>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-6 gap-3">
        {kpis.map((k) => (
          <Card key={k.title} className="border border-gray-200">
            <CardContent className="pt-3 pb-2 px-3">
              <p className="text-[9px] uppercase tracking-widest text-gray-400 font-medium">{k.title}</p>
              <p className="text-lg font-bold text-gray-900 mt-0.5">{k.value}</p>
              <span className={`text-[10px] font-semibold ${k.up ? "text-green-600" : "text-red-600"}`}>
                {k.up ? "↑" : "↓"} {Math.abs(k.trend)}%
              </span>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-2 gap-4">
        {/* Hiring Funnel */}
        <Card className="border border-gray-200">
          <CardHeader className="pb-3"><CardTitle className="text-sm font-semibold">Hiring Funnel</CardTitle></CardHeader>
          <CardContent className="space-y-3">
            {funnel.map((f, i) => {
              const width = Math.max(15, (f.count / maxFunnel) * 100);
              const conv = i > 0 ? Math.round((f.count / funnel[i - 1].count) * 100) : 100;
              return (
                <div key={f.stage}>
                  <div className="flex justify-between text-xs mb-1">
                    <span className="text-gray-700 font-medium">{f.stage}</span>
                    <span className="text-gray-500">{f.count} {i > 0 && <span className="text-gray-400">({conv}%)</span>}</span>
                  </div>
                  <div className="h-5 rounded bg-gradient-to-r from-blue-400 to-blue-600" style={{ width: `${width}%` }} />
                </div>
              );
            })}
          </CardContent>
        </Card>

        {/* Cognitive Diversity Index */}
        <Card className="border border-gray-200">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm font-semibold">Cognitive Diversity Index</CardTitle>
              <span className="text-lg font-bold text-blue-600">82</span>
            </div>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="w-full bg-gray-100 rounded-full h-2 mb-4">
              <div className="bg-gradient-to-r from-green-400 to-blue-600 h-2 rounded-full" style={{ width: "82%" }} />
            </div>
            {osDiversity.map((d) => (
              <div key={d.dim}>
                <div className="flex justify-between text-[11px] mb-1">
                  <span className="text-gray-600">{d.dim}</span>
                  <span className="font-semibold text-gray-900">{d.pct}%</span>
                </div>
                <div className="w-full bg-gray-100 rounded-full h-1.5">
                  <div className={`${d.color} h-1.5 rounded-full transition-all`} style={{ width: `${d.pct}%` }} />
                </div>
              </div>
            ))}
            <p className="text-[10px] text-gray-400 mt-2 pt-2 border-t border-gray-100">
              Your team is strong in Structured Execution but could benefit from more Creative Problem-Solving diversity.
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Time-to-Hire Trend */}
      <Card className="border border-gray-200">
        <CardHeader className="pb-3"><CardTitle className="text-sm font-semibold">Time-to-Hire Trend</CardTitle></CardHeader>
        <CardContent>
          <div className="flex items-end justify-around h-36 gap-3">
            {monthlyTrend.map((d) => {
              const h = (d.days / maxDays) * 100;
              return (
                <div key={d.month} className="flex flex-col items-center gap-1 flex-1">
                  <span className="text-[10px] font-medium text-gray-500">{d.days}d</span>
                  <div className="w-full bg-gray-50 rounded relative" style={{ height: "100px" }}>
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-green-500 to-green-400 rounded" style={{ height: `${h}%` }} />
                  </div>
                  <span className="text-[10px] font-medium text-gray-400">{d.month}</span>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Quality of Hire */}
      <Card className="border border-gray-200">
        <CardHeader className="pb-3"><CardTitle className="text-sm font-semibold">Quality of Hire — Recent Hires</CardTitle></CardHeader>
        <CardContent>
          <table className="w-full text-xs">
            <thead>
              <tr className="border-b border-gray-200 bg-gray-50/50">
                <th className="text-left py-2 px-3 font-semibold text-gray-500">Name</th>
                <th className="text-left py-2 px-3 font-semibold text-gray-500">Role</th>
                <th className="text-center py-2 px-3 font-semibold text-gray-500">OS Fit</th>
                <th className="text-center py-2 px-3 font-semibold text-gray-500">90-Day</th>
                <th className="text-center py-2 px-3 font-semibold text-gray-500">Manager</th>
                <th className="text-center py-2 px-3 font-semibold text-gray-500">Retention</th>
              </tr>
            </thead>
            <tbody>
              {qualityHires.map((h, i) => (
                <tr key={h.name} className={`border-b border-gray-50 hover:bg-gray-50 ${i % 2 === 1 ? "bg-gray-50/30" : ""}`}>
                  <td className="py-2 px-3 font-medium text-gray-900">{h.name}</td>
                  <td className="py-2 px-3 text-gray-500">{h.role}</td>
                  {[h.osFit, h.ninetyDay, h.manager, h.retention].map((v, j) => (
                    <td key={j} className="py-2 px-3 text-center">
                      <span className={`inline-block px-2 py-0.5 rounded text-[10px] font-semibold ${v >= 90 ? "bg-green-100 text-green-700" : v >= 80 ? "bg-blue-100 text-blue-700" : "bg-amber-100 text-amber-700"}`}>{v}</span>
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </CardContent>
      </Card>

      {/* DEI */}
      <div className="grid grid-cols-2 gap-4">
        <Card className="border border-gray-200">
          <CardHeader className="pb-3"><CardTitle className="text-sm font-semibold">Source Diversity</CardTitle></CardHeader>
          <CardContent className="space-y-2.5">
            {sourceDiversity.map((s) => (
              <div key={s.source}>
                <div className="flex justify-between text-[11px] mb-1">
                  <span className="text-gray-600">{s.source}</span>
                  <span className="font-medium text-gray-900">{s.pct}%</span>
                </div>
                <div className="w-full bg-gray-100 rounded-full h-1.5">
                  <div className="h-1.5 rounded-full bg-gradient-to-r from-pink-400 to-rose-500" style={{ width: `${s.pct}%` }} />
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
        <Card className="border border-gray-200">
          <CardHeader className="pb-3"><CardTitle className="text-sm font-semibold">Stage Conversion Parity</CardTitle></CardHeader>
          <CardContent className="space-y-2.5">
            {stageParity.map((s) => (
              <div key={s.stage}>
                <div className="flex justify-between text-[11px] mb-1">
                  <span className="text-gray-600">{s.stage}</span>
                  <span className="font-medium text-gray-900">{s.parity}%</span>
                </div>
                <div className="w-full bg-gray-100 rounded-full h-1.5">
                  <div className="h-1.5 rounded-full bg-gradient-to-r from-teal-400 to-cyan-500" style={{ width: `${s.parity}%` }} />
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
