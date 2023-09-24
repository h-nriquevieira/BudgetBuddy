import { supabase } from "../config/supabase";
import { CategoryCreateRequest } from "../types/CategoryTypes";

export async function getUserCategories() {
  const res = await supabase.from("Category").select();

  return res;
}

export async function postNewCategory(category: CategoryCreateRequest) {
  const res = await supabase.from("Category").insert({
    name: category.name,
    user_id: category.user_id,
    budget: category.budget,
  });
  console.log(res);
  return res;
}

export async function getAllCategoriesBudgets() {
  const res = await supabase.from("Category").select("budget");
  const totalBudget = res.data?.reduce((acc, currentValue) => {
    if (currentValue.budget) {
      return acc + currentValue.budget;
    }
    return acc;
  }, 0);
  return totalBudget;
}
