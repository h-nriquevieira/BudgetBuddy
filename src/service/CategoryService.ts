import { supabase } from "../config/supabase";
import { CategoryCreateRequest } from "../types/CategoryTypes";

export async function getUserCategories() {
  // const res = await supabase.from("Category").select();

  // mock
  const res = [
    {
      budget: 500,
      id: 1,
      name: "Groceries",
      user_id: "user123",
    },
    {
      budget: null,
      id: 2,
      name: "Entertainment",
      user_id: "user456",
    },
    {
      budget: 1000,
      id: 3,
      name: "Utilities",
      user_id: "user789",
    },
    {
      budget: 750,
      id: 4,
      name: "Transportation",
      user_id: "user101",
    },
    {
      budget: 200,
      id: 5,
      name: "Dining Out",
      user_id: "user202",
    },
    {
      budget: null,
      id: 6,
      name: "Healthcare",
      user_id: "user303",
    },
    {
      budget: 300,
      id: 7,
      name: "Clothing",
      user_id: "user404",
    },
    {
      budget: 1500,
      id: 8,
      name: "Vacation",
      user_id: "user505",
    },
    {
      budget: null,
      id: 9,
      name: "Education",
      user_id: "user606",
    },
    {
      budget: 400,
      id: 10,
      name: "Hobbies",
      user_id: "user707",
    },
  ];
  // return res;
  // mock
  return { data: res };
}

export async function postNewCategory(category: CategoryCreateRequest) {
  const res = await supabase.from("Category").insert({
    name: category.name,
    user_id: category.user_id,
    budget: category.budget,
  });
  return res;
}
