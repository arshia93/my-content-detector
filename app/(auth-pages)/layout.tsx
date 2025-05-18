import { Nav } from "@/components/Nav";

export default async function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col min-h-screen">
      <Nav />
      <main className="flex-grow flex flex-col items-center justify-start pt-20 bg-muted/50 p-4">
        {children}
      </main>
    </div>
  );
}
