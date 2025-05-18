import Link from "next/link";
import { getSupabaseServerClientWithSession } from "@/lib/supabase/server";
import { SignOutButton } from "@/components/auth/sign-out-button";

export async function Nav() {
  const { session } = await getSupabaseServerClientWithSession();
  console.log("[Nav Component] Rendering. Session User ID:", session?.user?.id);

  return (
    <header className="sticky top-0 z-50 bg-background border-b">
      <div className="container flex items-center justify-between px-4 py-3 mx-auto">
        <div className="flex items-center">
          <Link href="/" className="flex items-center gap-2 text-xl font-semibold sm:text-2xl">
            <div className="flex items-center justify-center w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-foreground text-background">
              <span className="text-sm font-bold sm:text-base">AD</span>
            </div>
            AdlyDetector
          </Link>
        </div>
        <div className="flex items-center gap-3">
          {session ? (
            <SignOutButton />
          ) : (
            <Link 
              href="/sign-up"
              className="hidden px-4 py-2 text-sm text-green-700 border border-green-700 rounded-full hover:bg-green-50 md:block sm:text-base"
            >
              Sign up for unlimited access
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}