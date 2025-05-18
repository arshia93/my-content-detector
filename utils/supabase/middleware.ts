import { createServerClient } from "@supabase/ssr";
import { type NextRequest, NextResponse } from "next/server";

export const updateSession = async (request: NextRequest) => {
  // This `try/catch` block is only here for the interactive tutorial.
  // Feel free to remove once you have Supabase connected.
  try {
    let response = NextResponse.next({
      request: {
        headers: request.headers,
      },
    });

    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      {
        cookies: {
          getAll() {
            return request.cookies.getAll();
          },
          setAll(cookiesToSet) {
            cookiesToSet.forEach(({ name, value }) =>
              request.cookies.set(name, value),
            );
            response = NextResponse.next({
              request,
            });
            cookiesToSet.forEach(({ name, value, options }) =>
              response.cookies.set(name, value, options),
            );
          },
        },
      },
    );

    // This will refresh session if expired - required for Server Components
    // https://supabase.com/docs/guides/auth/server-side/nextjs
    const { data: { user } } = await supabase.auth.getUser();

    const { pathname } = request.nextUrl;

    // If user is authenticated and tries to access auth pages, redirect to home
    if (user && (pathname === '/sign-in' || pathname === '/sign-up' || pathname === '/forgot-password')) {
      return NextResponse.redirect(new URL('/', request.url));
    }

    // If user is NOT authenticated and tries to access a route that is NOT an auth page (and not other public assets already filtered by config.matcher)
    // This is a basic example. If you add more specific protected routes like '/dashboard', handle them explicitly.
    // For now, this means if they are not on an auth page and not logged in, they can still see public parts of any page.
    // The actual content protection (e.g. hiding features) is done in components based on session.
    // We are primarily concerned with not redirect-looping and allowing access to auth pages when appropriate.

    // The problematic redirect loop for authenticated users on '/' has been removed.
    // The redirect for unauthenticated users from *all* matched paths to '/sign-in' has also been removed to be more granular.
    // If you want to protect specific non-auth pages, add checks here:
    // e.g. if (pathname.startsWith('/app-dashboard') && !user) { return NextResponse.redirect(new URL("/sign-in", request.url)); }

    return response;
  } catch (e) {
    // If you are here, a Supabase client could not be created!
    // This is likely because you have not set up environment variables.
    // Check out http://localhost:3000 for Next Steps.
    return NextResponse.next({
      request: {
        headers: request.headers,
      },
    });
  }
};
