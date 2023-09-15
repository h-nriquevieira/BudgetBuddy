import { useEffect, useState } from "react";
import { ExpenseResponse } from "../../types/ExpensesTypes";
import { getMostRecentExpenses } from "../../service/ExpensesService";
import { Card, Heading } from "@radix-ui/themes";
import { getUserCategories } from "../../service/CategoryService";
import ExpensesTable from "../ExpensesTable/ExpensesTable";

export default function RecentExpenses() {
  const [recentExpenses, setRecentExpenses] = useState<ExpenseResponse[]>();
  const [categories, setCategories] = useState<{ [key: string]: string }>();

  useEffect(() => {
    (async () => {
      const expenses = await getMostRecentExpenses();
      expenses && setRecentExpenses(expenses);
    })();
  }, []);

  useEffect(() => {
    (async () => {
      const categoriesData = await getUserCategories();

      const categories: { [key: string]: string } = {};
      categoriesData.data?.map((category) => {
        categories[category.id.toString()] = category.name;
      });

      setCategories(categories);
    })();
  }, []);

  if (!recentExpenses || !categories) {
    return <p>Loading</p>;
  }

  return (
    <Card>
      <Heading style={{ fontSize: "1.5rem" }} color="jade">
        Últimas despesas
      </Heading>
      <ExpensesTable
        categories={categories}
        expenses={recentExpenses}
        compact
      />
    </Card>
  );
}
