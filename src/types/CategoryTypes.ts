import { Database } from "./supabase";

export type CategoryResponse = Database["public"]["Tables"]["Category"]["Row"];
