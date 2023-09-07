import { supabase } from "../config/supabase";

export async function getUserCategories() {
  const res = await supabase.from("Category").select();
  return res;
}
