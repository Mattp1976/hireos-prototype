import React, { useState } from 'react';
import { AuthProvider, useAuth } from './hooks/useAuth';
import AuthGuard from './components/AuthGuard';
import Dashboard from './pages/Dashboard';
import Candidates from './pages/Candidates';
import Pipeline from './pages/Pipeline';
import InterviewHub from './pages/InterviewHub';
import JobStudio from './pages/JobStudio';
import Analytics from './pages/Analytics';

type Page = 'dashboard' | 'candidates' | 'pipeline' | 'interviews' | 'jobs' | 'analytics';

function AppContent() {
  const [currentPage, setCurrentPage] = useState<Page>('dashboard');
  const { profile, organisation, signOut, loading } = useAuth();

  const navigationItems = [
    { id: 'dashboard', label: 'Dashboard', icon: '📊' },
    { id: 'candidates', label: 'Candidates', icon: '👥' },
    { id: 'pipeline', label: 'Pipeline', icon: '🔄' },
    { id: 'interviews', label: 'Interviews', icon: '🎤' },
    { id: 'jobs', label: 'Jobs', icon: '💼' },
    { id: 'analytics', label: 'Analytics', icon: '📈' },
  ] as const;

  function renderPage() {
    switch (currentPage) {
      case 'dashboard':
        return <Dashboard />;
      case 'candidates':
        return <Candidates />;
      case 'pipeline':
        return <Pipeline />;
      case 'interviews':
        return <InterviewHub />;
      case 'jobs':
        return <JobStudio />;
      case 'analytics':
        return <Analytics />;
      default:
        return <Dashboard />;
    }
  }

  return (
    <div className="flex h-screen bg-slate-950">
      {/* Sidebar */}
      <div className="w-64 bg-gradient-to-b from-slate-900 to-slate-800 border-r border-slate-700 flex flex-col">
        {/* Logo */}
        <div className="p-6 border-b border-slate-700">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-violet-600 rounded-lg flex items-center justify-center">
              <span className="text-lg font-bold text-white">H</span>
            </div>
            <div>
              <h1 className="text-lg font-bold text-white">HireOS</h1>
              <p className="text-xs text-indigo-300">{organisation?.name || 'Loading...'}</p>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 space-y-2">
          {navigationItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setCurrentPage(item.id as Page)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition duration-200 ${
                currentPage === item.id
                  ? 'bg-indigo-600 text-white'
                  : 'text-slate-300 hover:bg-slate-700/50'
              }`}
            >
              <span className="text-xl">{item.icon}</span>
              <span className="font-medium">{item.label}</span>
            </button>
          ))}
        </nav>

        {/* User Profile */}
        <div className="p-4 border-t border-slate-700">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-gradient-to-br from-indigo-400 to-violet-500 rounded-full flex items-center justify-center flex-shrink-0">
              <span className="text-sm font-bold text-white">
                {profile?.full_name?.charAt(0).toUpperCase() || 'U'}
              </span>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-white truncate">
                {profile?.full_name || 'User'}
              </p>
              <p className="text-xs text-slate-400 truncate">{profile?.email || ''}</p>
            </div>
          </div>
          <button
            onClick={() => signOut()}
            disabled={loading}
            className="w-full py-2 px-4 bg-slate-700 hover:bg-slate-600 text-slate-200 rounded-lg text-sm font-medium transition duration-200 disabled:opacity-50"
          >
            Sign Out
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="bg-slate-900 border-b border-slate-700 px-8 py-4">
          <h2 className="text-2xl font-bold text-white">
            {navigationItems.find((item) => item.id === currentPage)?.label}
          </h2>
        </header>

        {/* Content */}
        <main className="flex-1 overflow-auto">
          <div className="p-8">
            {renderPage()}
          </div>
        </main>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <AuthGuard>
        <AppContent />
      </AuthGuard>
    </AuthProvider>
  );
}
