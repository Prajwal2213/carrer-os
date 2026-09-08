import { createClient } from "@/src/lib/supabase/server";


export default async function DashboardPage() {

  const supabase = await createClient();

  const { data : { user }} = await supabase.auth.getUser();
  console.log(user);
  const { data : profile } = await supabase.from("profiles")
  .select("full_name")
  .eq("id", user?.id)
  .single();
  return (
    <div>
      <h1>Hello { profile ?.full_name ?? "there" }</h1>
    </div>
  );
}