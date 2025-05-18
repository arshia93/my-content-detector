import { resetPasswordAction } from "@/app/actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { getSupabaseServerClientWithSession } from "@/lib/supabase/server";
import { redirect } from "next/navigation";

interface Message {
  type?: 'error' | 'success';
  content?: string;
}

// This page should only be accessible if the user has a valid reset token in the URL (handled by Supabase callback)
// Or, if Supabase session is briefly active during the reset flow after clicking the email link.
// If a user is fully signed in and stumbles here, redirect to home.
export default async function ResetPasswordPage(props: { searchParams: Promise<Message> }) {
  const { session } = await getSupabaseServerClientWithSession();

  // If user is already fully signed in and not in a reset flow (e.g. no token in URL handled by middleware/callback),
  // redirect them home. The actual token verification happens in the /auth/callback route.
  // This page is the destination *after* a valid token redirects from /auth/callback.
  if (session && !props.searchParams.hasOwnProperty('token_hash') && !props.searchParams.hasOwnProperty('message')) {
    // A more robust check might be needed if session alone isn't enough to distinguish from reset flow
    // For now, if they have a session and no specific reset-related searchParams, send to home.
    // redirect('/'); // Commented out for now: let's assume /auth/callback handles ensuring only valid reset tokens land here.
  }

  const searchParams = await props.searchParams;

  return (
    <Card className="w-full max-w-sm">
      <CardHeader className="text-center">
        <CardTitle className="text-2xl">Reset Your Password</CardTitle>
        <CardDescription>
          Enter your new password below.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="password">New Password</Label>
            <Input id="password" name="password" type="password" placeholder="Enter new password" required />
          </div>
          <div className="space-y-2">
            <Label htmlFor="confirmPassword">Confirm New Password</Label>
            <Input id="confirmPassword" name="confirmPassword" type="password" placeholder="Confirm new password" required />
          </div>
          {searchParams?.content && (
            <p className={`text-sm ${searchParams.type === 'error' ? 'text-destructive' : 'text-emerald-600'}`}>
              {searchParams.content}
            </p>
          )}
          <Button type="submit" formAction={resetPasswordAction} className="w-full">
            Set New Password
          </Button>
        </form>
      </CardContent>
      {/* No CardFooter with links needed here, typically */}
    </Card>
  );
} 