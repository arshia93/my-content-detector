'use client';

import { createContext, useContext, useState, useEffect } from 'react';
import type { SupabaseClient } from '@supabase/supabase-js';
import { createSupabaseBrowserClient } from './client';
import { useRouter } from 'next/navigation';

interface SupabaseProviderProps {
  children: React.ReactNode;
  serverSession: Awaited<ReturnType<typeof import('@/lib/supabase/server').getSupabaseServerClientWithSession>>["session"];
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
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      // TODO: Add more robust session handling if needed, e.g., for token refresh errors
      if (session?.user?.id !== serverSession?.user?.id) {
        router.refresh(); // Refresh server components to reflect auth state change
      }
    });

    return () => {
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