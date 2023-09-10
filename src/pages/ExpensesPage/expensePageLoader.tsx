import { getUserCategories } from "../../service/CategoryService";
import { getExpenses } from "../../service/ExpensesService";

export async function expensePageLoader() {
  const categoriesData = await getUserCategories();
  const expensesData = await getExpenses();

  const categories: { [key: string]: string } = {};
  categoriesData.data.map((category) => {
    categories[category.id.toString()] = category.name;
  });

  const minDate = new Date(
    [...expensesData.data].sort(
      (a, b) => new Date(a.date) - new Date(b.date),
    )[0].date,
  );

  const pageData = {
    categories: { ...categories },
    expenses: [...expensesData.data],
    minDate: new Date(minDate),
  };
  return pageData;
}
