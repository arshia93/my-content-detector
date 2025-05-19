import { signUpAction } from "@/app/actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import { SmtpMessage } from "../smtp-message";
import { getSupabaseServerClientWithSession } from "@/lib/supabase/server";
import { redirect } from "next/navigation";

// Define a simple Message type here if not already globally available
interface Message {
  type?: 'error' | 'success';
  content?: string;
  message?: string; // Added based on usage in this file
}

export default async function SignUpPage(props: { searchParams: Promise<Message> }) {
  const { session } = await getSupabaseServerClientWithSession();

  if (session) {
    redirect('/');
  }

  const searchParams = await props.searchParams;

  // This part handles the redirect from Supabase after a successful sign-up email confirmation (or if there's an issue before that)
  // It shows a simple message. We can enhance this if needed.
  if (searchParams?.message) {
    return (
      <Card className="w-full max-w-md p-6 text-center">
        <CardTitle className={`text-xl ${searchParams.type === 'error' ? 'text-destructive' : 'text-emerald-600'}`}>
          {searchParams.type === 'error' ? 'Sign-up Error' : 'Sign-up Successful'}
        </CardTitle>
        <CardDescription className="mt-2">
          {searchParams.message}
        </CardDescription>
        <Button asChild className="mt-6 w-full sm:w-auto">
          <Link href="/sign-in">Proceed to Sign In</Link>
        </Button>
      </Card>
    );
  }

  return (
    <>
      <Card className="w-full max-w-sm">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl">Create an Account</CardTitle>
          <CardDescription>
            Enter your email and password to get started.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" name="email" type="email" placeholder="you@example.com" required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input id="password" name="password" type="password" placeholder="Your password (min. 6 characters)" minLength={6} required />
            </div>
            {/* Display general form submission errors (e.g., from server action validation) */}
            {searchParams?.content && searchParams.type === 'error' && (
              <p className="text-sm text-destructive">
                {searchParams.content}
              </p>
            )}
            <Button 
              type="submit" 
              formAction={signUpAction} 
              className="w-full bg-green-600 hover:bg-green-700 text-white"
            >
              Sign Up
            </Button>
          </form>
        </CardContent>
        <CardFooter className="text-center text-sm">
          <p className="text-muted-foreground">
            Already have an account?{" "}
            <Link href="/sign-in" className="font-medium text-primary hover:underline">
              Sign In
            </Link>
          </p>
        </CardFooter>
      </Card>
      <div className="mt-6 w-full max-w-sm">
        <SmtpMessage />
      </div>
    </>
  );
}
