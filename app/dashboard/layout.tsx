import Sidebar from "@/components/sidebar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="flex min-h-screen">
      <Sidebar />

      <div className="flex-1 bg-zinc-100 p-10">
        {children}
      </div>
    </main>
  );
}