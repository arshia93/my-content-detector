import { type NextRequest } from "next/server";
import { updateSession } from "@/utils/supabase/middleware";

export async function middleware(request: NextRequest) {
  return await updateSession(request);
}

export const config = {
  matcher: [
    // Only run middleware on auth pages and API routes that need protection
    "/sign-in",
    "/sign-up", 
    "/forgot-password",
    "/reset-password",
    "/api/protected/:path*",
    "/dashboard/:path*" // Add any protected routes here
  ],
};
