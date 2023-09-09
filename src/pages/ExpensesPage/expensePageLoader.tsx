import { getUserCategories } from "../../service/CategoryService";
import { getExpenses } from "../../service/ExpensesService";

export async function expensePageLoader() {
  const categoriesData = await getUserCategories();
  const expensesData = await getExpenses();

  const categories: { [key: string]: string } = {};
  categoriesData.data.map((category) => {
    categories[category.id.toString()] = category.name;
  });

  const pageData = {
    categories: { ...categories },
    expenses: [...expensesData.data],
  };
  return pageData;
}
