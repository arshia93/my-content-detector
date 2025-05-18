'use client';

import { Button } from "@/components/ui/button";
import { useSupabase } from "@/lib/supabase/provider";
import { useRouter } from "next/navigation";
// import { LogOut } from 'lucide-react'; // Icon removed for style consistency

export function SignOutButton() {
  const { supabase } = useSupabase();
  const router = useRouter();

  async function handleSignOut() {
    console.log("[SignOutButton] handleSignOut called");
    const { error } = await supabase.auth.signOut();
    
    if (error) {
      console.error("[SignOutButton] Error signing out:", error);
      // Optionally, trigger a router.refresh() even on error to be safe, or handle error display
      router.refresh();
    } else {
      console.log("[SignOutButton] SignOut successful on client. Navigating to '/'. Relying on SupabaseProvider for refresh.");
      // router.refresh(); // Removed: Let SupabaseProvider handle the refresh via onAuthStateChange
    }
    
    router.push('/'); 
    // If the UI doesn't update, the router.refresh() in SupabaseProvider might not be effective enough
    // or there's a deeper caching/rendering issue with Nav.
    // As a fallback, if SupabaseProvider's refresh isn't working, re-add router.refresh() here AFTER router.push()
  }

  return (
    <Button
      onClick={handleSignOut}
      variant="outline"
      className="hidden px-4 py-2 text-sm text-green-700 border border-green-700 rounded-full hover:bg-green-50 md:block sm:text-base"
    >
      Sign Out
    </Button>
  );
} 