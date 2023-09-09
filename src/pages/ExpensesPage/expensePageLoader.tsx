import { getExpenses } from "../../service/ExpensesService";

export async function expensePageLoader() {
  return (await getExpenses()).data;
}
