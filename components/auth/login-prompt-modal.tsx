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
    router.push("/signup"); // Or your actual signup page route
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
          <Button onClick={() => handleLogin("google")} variant="outline">
            {/* Replace with actual Google icon if available */}
            <span className="mr-2">G</span> Login with Google
          </Button>
          <Button onClick={() => handleLogin("github")} variant="outline">
            {/* Replace with actual GitHub icon if available */}
            <span className="mr-2">GH</span> Login with GitHub
          </Button>
          {/* Add more login options if needed, e.g., email/password */}
        </div>
        <DialogFooter className="sm:justify-center">
          <p className="text-sm text-muted-foreground">
            Don't have an account?
            <Button variant="link" className="px-1" onClick={handleSignUpClick}>
              Sign up for unlimited access
            </Button>
          </p>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
} 