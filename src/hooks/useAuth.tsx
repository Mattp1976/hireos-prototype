import React, { createContext, useContext, useEffect, useState, useRef, ReactNode } from 'react';
import { User } from '@supabase/supabase-js';
import { supabase } from '../lib/supabase';

export interface UserProfile {
  id: string;
  org_id: string;
  email: string;
  full_name: string;
  role: string;
}

export interface Organisation {
  id: string;
  name: string;
  slug: string;
}

interface AuthContextType {
  user: User | null;
  profile: UserProfile | null;
  organisation: Organisation | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

function withTimeout<T>(promise: Promise<T>, ms: number): Promise<T> {
  return Promise.race([
    promise,
    new Promise<T>((_, reject) => setTimeout(() => reject(new Error('Query timeout')), ms))
  ]);
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [organisation, setOrganisation] = useState<Organisation | null>(null);
  const [loading, setLoading] = useState(true);
  const loadingRef = useRef(true);

  useEffect(() => {
    let active = true;

    function setDone() {
      if (active && loadingRef.current) {
        loadingRef.current = false;
        setLoading(false);
      }
    }

    async function loadProfile(userId: string): Promise<boolean> {
      try {
        const profileResult = await withTimeout(
          Promise.resolve(supabase.from('users').select('*').eq('id', userId).single()),
          4000
        ) as { data: UserProfile | null; error: unknown };
        if (profileResult.error || !profileResult.data) throw profileResult.error || new Error('No profile');
        if (!active) return false;
        setProfile(profileResult.data);
        const orgResult = await withTimeout(
          Promise.resolve(supabase.from('organisations').select('*').eq('id', profileResult.data.org_id).single()),
          4000
        ) as { data: Organisation | null; error: unknown };
        if (!active) return false;
        setOrganisation(orgResult.data);
        return true;
      } catch (err) {
        console.warn('Profile load failed:', err);
        if (!active) return false;
        setUser(null);
        setProfile(null);
        setOrganisation(null);
        return false;
      }
    }

    // Use getSession for initial load (handles token refresh)
    supabase.auth.getSession().then(async ({ data: { session } }) => {
      if (!active) return;
      if (session?.user) {
        setUser(session.user);
        await loadProfile(session.user.id);
      }
      setDone();
    }).catch(() => {
      setDone();
    });

    // Listen for subsequent auth changes only
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        if (!active) return;
        if (event === 'INITIAL_SESSION') return;

        if (event === 'SIGNED_IN' && session?.user) {
          setUser(session.user);
          loadProfile(session.user.id).then(() => {
            if (active) setDone();
          });
        } else if (event === 'SIGNED_OUT') {
          setUser(null);
          setProfile(null);
          setOrganisation(null);
          setDone();
        }
      }
    );

    // Safety timeout
    const safetyTimeout = setTimeout(() => {
      console.warn('Auth safety timeout, forcing loading=false');
      setDone();
    }, 8000);

    return () => {
      active = false;
      clearTimeout(safetyTimeout);
      subscription?.unsubscribe();
    };
  }, []);

  async function signIn(email: string, password: string) {
    loadingRef.current = true;
    setLoading(true);
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) {
      loadingRef.current = false;
      setLoading(false);
      throw error;
    }
  }

  async function signOut() {
    await supabase.auth.signOut();
  }

  return (
    <AuthContext.Provider value={{ user, profile, organisation, loading, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
}
