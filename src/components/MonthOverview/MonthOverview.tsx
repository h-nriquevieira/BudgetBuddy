import { Card, Text } from "@radix-ui/themes";
import BrandHeading from "../BrandHeading/BrandHeading";
import { useEffect, useState } from "react";
import { getAllCategoriesBudgets } from "../../service/CategoryService";
import { currencyFormatter } from "../../utils/currencyFormatter";
import { getAllExpensesFromCurrentMont } from "../../service/ExpensesService";
export default function MonthOverview() {
  const [totalBudget, setTotalBudget] = useState<number>();
  const [totalExpenses, setTotalExpenses] = useState<number>();

  const remainingBudget =
    totalBudget && totalExpenses && totalBudget - totalExpenses;

  useEffect(() => {
    (async () => {
      const budget = await getAllCategoriesBudgets();
      setTotalBudget(budget);
    })();
  }, []);

  useEffect(() => {
    (async () => {
      const expenses = await getAllExpensesFromCurrentMont();
      setTotalExpenses(expenses);
    })();
  }, []);

  if (!totalBudget || !totalExpenses) {
    return <Text>Loading</Text>;
  }

  return (
    <Card>
      <BrandHeading variant="small">Resumo do mês</BrandHeading>
      <Text>Orçamento total: {currencyFormatter.format(totalBudget)}</Text>
      <Text>Despesas: {currencyFormatter.format(totalExpenses)}</Text>
      <Text>Restante: {currencyFormatter.format(remainingBudget ?? 0)}</Text>
    </Card>
  );
}
