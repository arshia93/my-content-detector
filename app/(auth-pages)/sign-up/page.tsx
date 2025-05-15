import { signUpAction } from "@/app/actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { SmtpMessage } from "../smtp-message";

// Define a simple Message type here if not already globally available
interface Message {
  type?: 'error' | 'success';
  content?: string;
  message?: string; // Added based on usage in this file
}

export default async function Signup(props: {
  searchParams: Promise<Message>;
}) {
  const searchParams = await props.searchParams;
  if ("message" in searchParams && searchParams.message) { // Updated condition
    return (
      <div className="w-full flex-1 flex items-center h-screen sm:max-w-md justify-center gap-2 p-4">
        {/* Replaced FormMessage */}
        <p className={`text-sm ${searchParams.type === 'error' ? 'text-red-500' : 'text-green-500'}`}>
          {searchParams.message}
        </p>
      </div>
    );
  }

  return (
    <>
      <form className="flex flex-col min-w-64 max-w-64 mx-auto">
        <h1 className="text-2xl font-medium">Sign up</h1>
        <p className="text-sm text text-foreground">
          Already have an account?{" "}
          <Link className="text-primary font-medium underline" href="/sign-in">
            Sign in
          </Link>
        </p>
        <div className="flex flex-col gap-2 [&>input]:mb-3 mt-8">
          <Label htmlFor="email">Email</Label>
          <Input name="email" placeholder="you@example.com" required />
          <Label htmlFor="password">Password</Label>
          <Input
            type="password"
            name="password"
            placeholder="Your password"
            minLength={6}
            required
          />
          {/* Replaced SubmitButton */}
          <Button type="submit" formAction={signUpAction}>
            Sign up
          </Button>
          {/* Replaced FormMessage - ensure searchParams.content or similar is used */}
          {searchParams?.content && (
            <p className={`text-sm ${searchParams.type === 'error' ? 'text-red-500' : 'text-green-500'}`}>
              {searchParams.content}
            </p>
          )}
        </div>
      </form>
      <SmtpMessage />
    </>
  );
}
