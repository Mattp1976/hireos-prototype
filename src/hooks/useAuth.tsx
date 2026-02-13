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
    let active = true;

    async function loadProfile(userId: string) {
      try {
        const { data: p, error: pe } = await supabase
          .from('users')
          .select('*')
          .eq('id', userId)
          .single();
        if (pe || !p) throw pe || new Error('No profile');
        if (!active) return;
        setProfile(p);
        const { data: o } = await supabase
          .from('organisations')
          .select('*')
          .eq('id', p.org_id)
          .single();
        if (!active) return;
        setOrganisation(o);
      } catch (err) {
        console.error('Profile load failed:', err);
        if (!active) return;
        setUser(null);
        setProfile(null);
        setOrganisation(null);
      }
    }

    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        if (!active) return;

        if (event === 'INITIAL_SESSION' || event === 'SIGNED_IN') {
          if (session?.user) {
            setUser(session.user);
            await loadProfile(session.user.id);
          } else {
            setUser(null);
            setProfile(null);
            setOrganisation(null);
          }
          if (active) setLoading(false);
        } else if (event === 'SIGNED_OUT') {
          setUser(null);
          setProfile(null);
          setOrganisation(null);
          if (active) setLoading(false);
        }
      }
    );

    return () => {
      active = false;
      subscription?.unsubscribe();
    };
  }, []);

  async function signIn(email: string, password: string) {
    setLoading(true);
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) {
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
