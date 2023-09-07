// import { supabase } from "../config/supabase";

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
      budget: 725,
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
  ];

  return { data: res };
}
