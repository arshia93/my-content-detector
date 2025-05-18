import { Geist } from "next/font/google";
import { ThemeProvider } from "next-themes";
import "./globals.css";
import { SupabaseProvider } from "@/lib/supabase/provider";
import { getSupabaseServerClientWithSession } from "@/lib/supabase/server";

const defaultUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : "http://localhost:3000";

export const metadata = {
  metadataBase: new URL(defaultUrl),
  title: "Adly detector",
  description: "By Arshia",
};

const geistSans = Geist({
  display: "swap",
  subsets: ["latin"],
});

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const { session } = await getSupabaseServerClientWithSession();

  return (
    <html lang="en" suppressHydrationWarning className={geistSans.className}>
      <body>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
          <SupabaseProvider serverSession={session}>
            {children}
          </SupabaseProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
