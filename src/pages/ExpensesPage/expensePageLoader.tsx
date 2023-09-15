import { getUserCategories } from "../../service/CategoryService";
import { getExpenses } from "../../service/ExpensesService";

export async function expensePageLoader() {
  const categoriesData = await getUserCategories();
  const expensesData = await getExpenses();
  const expenses = expensesData.data ?? [];

  const categories: { [key: string]: string } = {};
  categoriesData.data?.map((category) => {
    categories[category.id.toString()] = category.name;
  });

  const minDate = new Date(
    [...expenses].sort(
      (a, b) => new Date(a.date).valueOf() - new Date(b.date).valueOf(),
    )[0].date,
  );

  const pageData = {
    categories: { ...categories },
    expenses: [...expenses],
    minDate: new Date(minDate),
  };
  return pageData;
}
