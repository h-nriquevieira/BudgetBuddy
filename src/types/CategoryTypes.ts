import { Database } from "./supabase";

export type CategoryResponse = Database["public"]["Tables"]["Category"]["Row"];
export type CategoryCreateRequest =
  Database["public"]["Tables"]["Category"]["Insert"];
