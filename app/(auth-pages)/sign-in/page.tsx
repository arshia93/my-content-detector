import { signInAction } from "@/app/actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import { getSupabaseServerClientWithSession } from "@/lib/supabase/server";
import { redirect } from "next/navigation";

// Define a simple Message type here if not already globally available
interface Message {
  type?: 'error' | 'success';
  content?: string;
}

export default async function LoginPage(props: { searchParams: Promise<Message> }) {
  const { session } = await getSupabaseServerClientWithSession();

  if (session) {
    redirect('/');
  }

  const searchParams = await props.searchParams;

  return (
    <Card className="w-full max-w-sm">
      <CardHeader className="text-center">
        <CardTitle className="text-2xl">Sign In</CardTitle>
        <CardDescription>
          Welcome back! Please enter your credentials.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" name="email" type="email" placeholder="you@example.com" required />
          </div>
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label htmlFor="password">Password</Label>
              <Link
                href="/forgot-password"
                className="text-sm font-medium text-primary hover:underline"
              >
                Forgot Password?
              </Link>
            </div>
            <Input id="password" name="password" type="password" placeholder="Your password" required />
          </div>
          {searchParams?.content && (
            <p className={`text-sm ${searchParams.type === 'error' ? 'text-destructive' : 'text-emerald-600'}`}>
              {searchParams.content}
            </p>
          )}
          <Button type="submit" formAction={signInAction} className="w-full">
            Sign In
          </Button>
        </form>
      </CardContent>
      <CardFooter className="text-center text-sm">
        <p className="text-muted-foreground">
          Don't have an account?{" "}
          <Link href="/sign-up" className="font-medium text-primary hover:underline">
            Sign Up
          </Link>
        </p>
      </CardFooter>
    </Card>
  );
}
