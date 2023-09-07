import { getUserCategories } from "../../service/CategoryService";

export async function budgetPageLoader() {
  const categories = await getUserCategories();
  return categories.data;
}
