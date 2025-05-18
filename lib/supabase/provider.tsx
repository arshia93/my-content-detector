'use client';

import { createContext, useContext, useState, useEffect } from 'react';
import type { SupabaseClient, Session as SupabaseSession } from '@supabase/supabase-js';
import { createSupabaseBrowserClient } from './client';
import { useRouter } from 'next/navigation';

const LOCAL_STORAGE_KEY_API_CHECKS = "anonymousApiCheckCount";

interface ServerSessionType extends SupabaseSession {}

interface SupabaseProviderProps {
  children: React.ReactNode;
  serverSession: ServerSessionType | null;
}

interface SupabaseContextType {
  supabase: SupabaseClient;
  session: SupabaseProviderProps["serverSession"];
}

const SupabaseContext = createContext<SupabaseContextType | undefined>(
  undefined
);

export function SupabaseProvider({ children, serverSession }: SupabaseProviderProps) {
  const [supabase] = useState(() => createSupabaseBrowserClient());
  const router = useRouter();

  useEffect(() => {
    console.log("[SupabaseProvider] Initial serverSession User ID:", serverSession?.user?.id);
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, currentSession) => {
      console.log("[SupabaseProvider] Auth event:", event, "Current client session User ID:", currentSession?.user?.id);
      
      if (event === 'SIGNED_IN') {
        console.log("[SupabaseProvider] SIGNED_IN detected. Resetting API checks.");
        try {
          localStorage.setItem(LOCAL_STORAGE_KEY_API_CHECKS, "0");
        } catch (error) {
          console.error("[SupabaseProvider] Error resetting API check count:", error);
        }
      }
      
      if (currentSession?.user?.id !== serverSession?.user?.id) {
        console.log("[SupabaseProvider] Session mismatch. Calling router.refresh(). Client session:", currentSession?.user?.id, "Initial server session:", serverSession?.user?.id);
        router.refresh();
      } else {
        console.log("[SupabaseProvider] Session consistent or no change needed for refresh. Client session:", currentSession?.user?.id, "Initial server session:", serverSession?.user?.id);
      }
    });

    return () => {
      console.log("[SupabaseProvider] Unsubscribing from auth state changes.");
      subscription.unsubscribe();
    };
  }, [supabase, router, serverSession]);

  return (
    <SupabaseContext.Provider value={{ supabase, session: serverSession }}>
      {children}
    </SupabaseContext.Provider>
  );
}

export function useSupabase() {
  const context = useContext(SupabaseContext);
  if (context === undefined) {
    throw new Error('useSupabase must be used within a SupabaseProvider');
  }
  return context;
} 