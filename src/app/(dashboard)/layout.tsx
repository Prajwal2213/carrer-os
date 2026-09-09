import { createClient } from "@/src/lib/supabase/server";
import Sidebar from "@/src/components/layout/Sidebar";
import Topbar from "@/src/components/layout/Topbar";

export default async function DashBoardLayout({ children }: { children: React.ReactNode }) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  const { data: profile } = await supabase
    .from("profiles")
    .select("full_name, avatar_url")
    .eq("id", user?.id)
    .single();

  return (
    <div className="flex h-screen w-screen bg-gray-50 text-gray-800">
      <Sidebar />
      <div className="flex-1 flex flex-col min-w-0">
        <Topbar name={profile?.full_name} avatarUrl={profile?.avatar_url} />
        <main className="flex-1 overflow-y-auto px-8 pb-10">
          {children}
        </main>
      </div>
    </div>
  );
}