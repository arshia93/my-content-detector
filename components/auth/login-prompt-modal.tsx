"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle,
} from "@/components/ui/dialog";
import { useSupabase } from "@/lib/supabase/provider";
import { useRouter } from "next/navigation";

interface LoginPromptModalProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
}

export function LoginPromptModal({ isOpen, onOpenChange }: LoginPromptModalProps) {
  const { supabase } = useSupabase();
  const router = useRouter();

  // Function to handle login with a provider (e.g., Google, GitHub)
  async function handleLogin(provider: "google" | "github") { // Add other providers as needed
    const { error } = await supabase.auth.signInWithOAuth({
      provider,
      options: {
        redirectTo: `${window.location.origin}/auth/callback`, // Or your desired redirect path
      },
    });
    if (error) {
      console.error(`Error logging in with ${provider}:`, error.message);
      // Handle error (e.g., show a toast notification)
    }
  }

  function handleSignUpClick() {
    // You might want to close the modal first if it obstructs the signup page
    onOpenChange(false);
    router.push("/sign-up"); // Or your actual signup page route
  }

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Login Required</DialogTitle>
          <DialogDescription>
            You've used all your free checks. Please log in or sign up to continue checking unlimited texts.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <Button 
            onClick={handleSignUpClick} 
            className="w-full bg-green-600 hover:bg-green-700 text-white"
          >
            Sign up to get unlimited access
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
} 