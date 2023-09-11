import { Database } from "./supabase";

export type ExpenseResponse = Database["public"]["Tables"]["Expense"]["Row"];
export type ExpenseCreateRequest =
  Database["public"]["Tables"]["Expense"]["Insert"];
