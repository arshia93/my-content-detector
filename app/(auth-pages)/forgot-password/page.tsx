import { forgotPasswordAction } from "@/app/actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { SmtpMessage } from "../smtp-message";

// Define a simple Message type here if not already globally available
interface Message {
  type?: 'error' | 'success';
  content?: string;
}

export default async function ForgotPassword(props: {
  searchParams: Promise<Message>;
}) {
  const searchParams = await props.searchParams;
  return (
    <>
      <form className="flex-1 flex flex-col w-full gap-2 text-foreground [&>input]:mb-6 min-w-64 max-w-64 mx-auto">
        <div>
          <h1 className="text-2xl font-medium">Reset Password</h1>
          <p className="text-sm text-secondary-foreground">
            Already have an account?{" "}
            <Link className="text-primary underline" href="/sign-in">
              Sign in
            </Link>
          </p>
        </div>
        <div className="flex flex-col gap-2 [&>input]:mb-3 mt-8">
          <Label htmlFor="email">Email</Label>
          <Input name="email" placeholder="you@example.com" required />
          <Button type="submit" formAction={forgotPasswordAction}>
            Reset Password
          </Button>
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
