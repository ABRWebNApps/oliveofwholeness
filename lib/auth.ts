import { createClient } from "@/lib/supabase/client";

export async function checkAdminAuth() {
  const supabase = createClient();

  const {
    data: { session },
    error,
  } = await supabase.auth.getSession();

  if (!session || error) {
    return false;
  }

  // Check if user has admin profile
  const { data: adminProfile } = await supabase
    .from("admin_profiles")
    .select("*")
    .eq("id", session.user.id)
    .single();

  return !!adminProfile;
}
