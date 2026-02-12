import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { CandidateProfile } from "@/pages/CandidateProfile";
import { FitEngine } from "@/pages/FitEngine";
import { Dashboard } from "@/pages/Dashboard";
import { OSUpload } from "@/pages/OSUpload";
import { RoleBuilder } from "@/pages/RoleBuilder";
import { SimulatedCollab } from "@/pages/SimulatedCollab";
import { ShareProfile } from "@/pages/ShareProfile";
import { Landing } from "@/pages/Landing";
import { Pipeline } from "@/pages/Pipeline";
import { InterviewHub } from "@/pages/InterviewHub";
import { JobStudio } from "@/pages/JobStudio";
import { Analytics } from "@/pages/Analytics";
import { candidates, roles } from "@/data/sampleData";

type View =
  | { type: "landing" }
  | { type: "dashboard" }
  | { type: "candidate"; id: string }
  | { type: "fit"; candidateId: string; roleId: string }
  | { type: "upload" }
  | { type: "role-builder" }
  | { type: "simulate" }
  | { type: "share" }
  | { type: "pipeline" }
  | { type: "interviews" }
  | { type: "jobs" }
  | { type: "analytics" };

function App() {
  const [view, setView] = useState<View>({ type: "landing" });

  // Landing page gets its own layout — no app nav bar
  if (view.type === "landing") {
    return (
      <div>
        <header className="sticky top-0 z-50 bg-white/80 backdrop-blur border-b border-gray-100">
          <div className="max-w-5xl mx-auto px-6 h-12 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded bg-gray-900 flex items-center justify-center">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="3" />
                  <path d="M12 2v4" />
                  <path d="M12 18v4" />
                  <path d="m4.93 4.93 2.83 2.83" />
                  <path d="m16.24 16.24 2.83 2.83" />
                  <path d="M2 12h4" />
                  <path d="M18 12h4" />
                  <path d="m4.93 19.07 2.83-2.83" />
                  <path d="m16.24 7.76 2.83-2.83" />
                </svg>
              </div>
              <span className="text-sm font-semibold tracking-tight text-gray-900">HireOS</span>
            </div>
            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="sm"
                className="text-xs h-8"
                onClick={() => setView({ type: "upload" })}
              >
                Build Your OS
              </Button>
              <Button
                size="sm"
                className="text-xs h-8 bg-gray-900 hover:bg-gray-800"
                onClick={() => setView({ type: "dashboard" })}
              >
                Enter Platform
              </Button>
            </div>
          </div>
        </header>
        <Landing
          onEnter={() => setView({ type: "dashboard" })}
          onBuildOS={() => setView({ type: "upload" })}
        />
      </div>
    );
  }

  const breadcrumb = () => {
    switch (view.type) {
      case "dashboard":
      case "upload":
      case "role-builder":
      case "simulate":
      case "share":
      case "pipeline":
      case "interviews":
      case "jobs":
      case "analytics":
        return null;
      case "candidate": {
        const c = candidates.find((x) => x.id === view.id);
        return (
          <div className="flex items-center gap-2 text-xs text-gray-400">
            <button
              onClick={() => setView({ type: "dashboard" })}
              className="hover:text-gray-600 transition-colors"
            >
              Dashboard
            </button>
            <span>/</span>
            <span className="text-gray-600">{c?.name}</span>
          </div>
        );
      }
      case "fit": {
        const c = candidates.find((x) => x.id === view.candidateId);
        const r = roles.find((x) => x.id === view.roleId);
        return (
          <div className="flex items-center gap-2 text-xs text-gray-400">
            <button
              onClick={() => setView({ type: "dashboard" })}
              className="hover:text-gray-600 transition-colors"
            >
              Dashboard
            </button>
            <span>/</span>
            <button
              onClick={() =>
                setView({ type: "candidate", id: view.candidateId })
              }
              className="hover:text-gray-600 transition-colors"
            >
              {c?.name}
            </button>
            <span>/</span>
            <span className="text-gray-600">Fit → {r?.title}</span>
          </div>
        );
      }
    }
  };

  const isActive = (type: string) => view.type === type;

  return (
    <div className="min-h-screen bg-[#fafafa]">
      <header className="sticky top-0 z-50 bg-white border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-6 h-14 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div
              className="flex items-center gap-2 cursor-pointer"
              onClick={() => setView({ type: "landing" })}
            >
              <div className="w-7 h-7 rounded-md bg-gray-900 flex items-center justify-center">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="3" />
                  <path d="M12 2v4" />
                  <path d="M12 18v4" />
                  <path d="m4.93 4.93 2.83 2.83" />
                  <path d="m16.24 16.24 2.83 2.83" />
                  <path d="M2 12h4" />
                  <path d="M18 12h4" />
                  <path d="m4.93 19.07 2.83-2.83" />
                  <path d="m16.24 7.76 2.83-2.83" />
                </svg>
              </div>
              <span className="text-sm font-semibold tracking-tight text-gray-900">HireOS</span>
            </div>
            <Separator orientation="vertical" className="h-5" />
            <nav className="flex items-center gap-0.5">
              <Button
                variant={isActive("dashboard") ? "secondary" : "ghost"}
                size="sm"
                className="text-[11px] h-7 px-2.5"
                onClick={() => setView({ type: "dashboard" })}
              >
                Dashboard
              </Button>
              <Button
                variant={isActive("pipeline") ? "secondary" : "ghost"}
                size="sm"
                className="text-[11px] h-7 px-2.5"
                onClick={() => setView({ type: "pipeline" })}
              >
                Pipeline
              </Button>
              <Button
                variant={isActive("interviews") ? "secondary" : "ghost"}
                size="sm"
                className="text-[11px] h-7 px-2.5"
                onClick={() => setView({ type: "interviews" })}
              >
                Interviews
              </Button>
              <Button
                variant={isActive("jobs") ? "secondary" : "ghost"}
                size="sm"
                className="text-[11px] h-7 px-2.5"
                onClick={() => setView({ type: "jobs" })}
              >
                Jobs
              </Button>
              <Button
                variant={isActive("analytics") ? "secondary" : "ghost"}
                size="sm"
                className="text-[11px] h-7 px-2.5"
                onClick={() => setView({ type: "analytics" })}
              >
                Analytics
              </Button>
              <Separator orientation="vertical" className="h-4 mx-0.5" />
              <Button
                variant={isActive("upload") ? "secondary" : "ghost"}
                size="sm"
                className="text-[11px] h-7 px-2.5"
                onClick={() => setView({ type: "upload" })}
              >
                Build OS
              </Button>
              <Button
                variant={isActive("role-builder") ? "secondary" : "ghost"}
                size="sm"
                className="text-[11px] h-7 px-2.5"
                onClick={() => setView({ type: "role-builder" })}
              >
                Role Builder
              </Button>
              <Button
                variant={isActive("simulate") ? "secondary" : "ghost"}
                size="sm"
                className="text-[11px] h-7 px-2.5"
                onClick={() => setView({ type: "simulate" })}
              >
                Simulate
              </Button>
              <Button
                variant={isActive("share") ? "secondary" : "ghost"}
                size="sm"
                className="text-[11px] h-7 px-2.5"
                onClick={() => setView({ type: "share" })}
              >
                Share
              </Button>
              <Separator orientation="vertical" className="h-4 mx-1" />
              {candidates.map((c) => (
                <Button
                  key={c.id}
                  variant={
                    view.type === "candidate" && view.id === c.id
                      ? "secondary"
                      : "ghost"
                  }
                  size="sm"
                  className="text-[11px] h-7 px-2"
                  onClick={() => setView({ type: "candidate", id: c.id })}
                >
                  {c.name.split(" ")[0]}
                </Button>
              ))}
            </nav>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-[10px] uppercase tracking-widest text-gray-400 font-medium">
              Prototype
            </span>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-6 py-6">
        {breadcrumb() && <div className="mb-4">{breadcrumb()}</div>}

        {view.type === "dashboard" && (
          <Dashboard
            onViewCandidate={(id) => setView({ type: "candidate", id })}
            onViewFit={(candidateId, roleId) =>
              setView({ type: "fit", candidateId, roleId })
            }
          />
        )}

        {view.type === "candidate" && (
          <div className="space-y-4">
            <CandidateProfile
              candidate={candidates.find((c) => c.id === view.id)!}
            />
            <Separator />
            <div>
              <p className="text-xs text-gray-400 mb-2 uppercase tracking-wide font-medium">
                Compare to open roles
              </p>
              <div className="flex gap-2">
                {roles.map((r) => (
                  <Button
                    key={r.id}
                    variant="outline"
                    size="sm"
                    className="text-xs"
                    onClick={() =>
                      setView({
                        type: "fit",
                        candidateId: view.id,
                        roleId: r.id,
                      })
                    }
                  >
                    Fit → {r.title}
                  </Button>
                ))}
              </div>
            </div>
          </div>
        )}

        {view.type === "fit" && (
          <FitEngine candidateId={view.candidateId} roleId={view.roleId} />
        )}

        {view.type === "upload" && <OSUpload />}
        {view.type === "role-builder" && <RoleBuilder />}
        {view.type === "simulate" && <SimulatedCollab />}
        {view.type === "share" && <ShareProfile />}
        {view.type === "pipeline" && <Pipeline />}
        {view.type === "interviews" && <InterviewHub />}
        {view.type === "jobs" && <JobStudio />}
        {view.type === "analytics" && <Analytics />}
      </main>
    </div>
  );
}

export default App;
