import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
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

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [organisation, setOrganisation] = useState<Organisation | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;

    const sessionTimeout = setTimeout(() => {
      if (!cancelled) {
        console.warn('Session restoration timed out, clearing session');
        supabase.auth.signOut().catch(() => {});
        setUser(null);
        setProfile(null);
        setOrganisation(null);
        setLoading(false);
      }
    }, 5000);

    supabase.auth.getSession().then(({ data: { session } }) => {
      if (cancelled) return;
      clearTimeout(sessionTimeout);
      setUser(session?.user ?? null);
      if (session?.user) {
        fetchUserProfile(session.user.id);
      } else {
        setLoading(false);
      }
    }).catch(() => {
      if (cancelled) return;
      clearTimeout(sessionTimeout);
      setLoading(false);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (cancelled) return;
      setUser(session?.user ?? null);
      if (session?.user) {
        await fetchUserProfile(session.user.id);
      } else {
        setProfile(null);
        setOrganisation(null);
        setLoading(false);
      }
    });

    return () => {
      cancelled = true;
      clearTimeout(sessionTimeout);
      subscription?.unsubscribe();
    };
  }, []);

  async function fetchUserProfile(userId: string) {
    try {
      const { data: userProfile, error: profileError } = await supabase
        .from('users')
        .select('*')
        .eq('id', userId)
        .single();

      if (profileError) throw profileError;
      setProfile(userProfile);

      if (userProfile?.org_id) {
        const { data: org, error: orgError } = await supabase
          .from('organisations')
          .select('*')
          .eq('id', userProfile.org_id)
          .single();

        if (orgError) throw orgError;
        setOrganisation(org);
      }
    } catch (error) {
      console.error('Error fetching user profile, clearing session:', error);
      setProfile(null);
      setOrganisation(null);
      setUser(null);
      await supabase.auth.signOut().catch(() => {});
    } finally {
      setLoading(false);
    }
  }

  async function signIn(email: string, password: string) {
    setLoading(true);
    try {
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) throw error;
    } finally {
      setLoading(false);
    }
  }

  async function signOut() {
    setLoading(true);
    try {
      await supabase.auth.signOut();
      setUser(null);
      setProfile(null);
      setOrganisation(null);
    } finally {
      setLoading(false);
    }
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
