import { useEffect, useState } from "react";
import { ExpenseResponse } from "../../types/ExpensesTypes";
import { getMostRecentExpenses } from "../../service/ExpensesService";
import { Box, Card, Heading } from "@radix-ui/themes";
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
    return (
      <Box
        style={{
          width: "100%",
          minHeight: "350px",
          backgroundColor: "var(--gray-a5)",
          borderRadius: "15px",
        }}
      ></Box>
    );
  }

  return (
    <Card
      style={{
        padding: "1rem",
        overflowX: "scroll",
        maxWidth: "100%",
        flexGrow: "1",
      }}
    >
      <Heading
        style={{ fontSize: "1.5rem", marginBottom: "1rem" }}
        color="jade"
      >
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
