import { resetPasswordAction } from "@/app/actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

// Define a simple Message type here if not already globally available
interface Message {
  type?: 'error' | 'success';
  content?: string;
}

export default async function ResetPassword(props: {
  searchParams: Promise<Message>;
}) {
  const searchParams = await props.searchParams;
  return (
    <form className="flex flex-col w-full max-w-md p-4 gap-2 [&>input]:mb-4">
      <h1 className="text-2xl font-medium">Reset password</h1>
      <p className="text-sm text-foreground/60">
        Please enter your new password below.
      </p>
      <Label htmlFor="password">New password</Label>
      <Input
        type="password"
        name="password"
        placeholder="New password"
        required
      />
      <Label htmlFor="confirmPassword">Confirm password</Label>
      <Input
        type="password"
        name="confirmPassword"
        placeholder="Confirm password"
        required
      />
      <Button type="submit" formAction={resetPasswordAction}>
        Reset password
      </Button>
      {searchParams?.content && (
        <p className={`text-sm ${searchParams.type === 'error' ? 'text-red-500' : 'text-green-500'}`}>
          {searchParams.content}
        </p>
      )}
    </form>
  );
}
