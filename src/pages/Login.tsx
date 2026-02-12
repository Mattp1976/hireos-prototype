import React, { useState } from 'react';
import { useAuth } from '../hooks/useAuth';

export default function Login() {
  const { signIn, loading } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [showDemoHint, setShowDemoHint] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError('');

    if (!email || !password) {
      setError('Please enter both email and password');
      return;
    }

    try {
      await signIn(email, password);
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Sign in failed';
      setError(message);
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-indigo-900 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Logo/Brand */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-14 h-14 bg-gradient-to-br from-indigo-500 to-violet-600 rounded-lg mb-4 shadow-lg">
            <span className="text-2xl font-bold text-white">H</span>
          </div>
          <h1 className="text-3xl font-bold text-white mb-2">HireOS</h1>
          <p className="text-indigo-200 text-sm">The Operating System for Hiring</p>
        </div>

        {/* Card */}
        <div className="bg-slate-800 border border-slate-700 rounded-xl shadow-2xl p-8">
          <h2 className="text-xl font-semibold text-white mb-6">Sign In</h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Email Field */}
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">
                Email Address
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 transition"
                placeholder="you@company.com"
                disabled={loading}
              />
            </div>

            {/* Password Field */}
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 transition"
                placeholder="••••••••"
                disabled={loading}
              />
            </div>

            {/* Error Message */}
            {error && (
              <div className="p-3 bg-red-900/30 border border-red-700 rounded-lg text-red-300 text-sm">
                {error}
              </div>
            )}

            {/* Sign In Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full mt-6 py-2 px-4 bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 text-white font-medium rounded-lg transition duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  Signing in...
                </>
              ) : (
                'Sign In'
              )}
            </button>
          </form>

          {/* Demo Credentials Hint */}
          <div className="mt-8 pt-6 border-t border-slate-700">
            <button
              type="button"
              onClick={() => setShowDemoHint(!showDemoHint)}
              className="text-xs text-indigo-400 hover:text-indigo-300 transition"
            >
              {showDemoHint ? 'Hide demo credentials' : 'Need demo credentials?'}
            </button>
            {showDemoHint && (
              <div className="mt-3 p-3 bg-indigo-900/20 border border-indigo-700/50 rounded-lg text-xs text-indigo-200 space-y-1">
                <div>
                  <span className="text-slate-400">Email:</span> demo@meridian-global.com
                </div>
                <div>
                  <span className="text-slate-400">Password:</span> HireOS2025!
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <p className="text-center text-slate-400 text-xs mt-6">
          Powered by enterprise hiring intelligence
        </p>
      </div>
    </div>
  );
}
