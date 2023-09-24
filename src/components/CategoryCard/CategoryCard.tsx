import { Card, Heading, Text } from "@radix-ui/themes";
import { CategoryResponse } from "../../types/CategoryTypes";
import { useEffect, useState } from "react";
import { getExpensesByCategoryId } from "../../service/ExpensesService";
import { currencyFormatter } from "../../utils/currencyFormatter";

type CategoryCardProps = {
  category: CategoryResponse;
};

const styles = {
  subtitle: {
    fontSize: "1rem",
    fontWeight: "300",
    marginTop: ".5rem",
  },
  currency: {
    fontSize: ".9rem",
    fontWeight: "700",
  },
};

export default function CategoryCard({ category }: CategoryCardProps) {
  const [expenses, setExpenses] = useState(0);

  const remainingBudget = currencyFormatter.format(
    (category.budget ?? 0) - expenses,
  );

  useEffect(() => {
    getExpensesByCategoryId(category.id).then((res) => setExpenses(res ?? 0));
  }, [category.id]);

  return (
    <Card style={{ width: "min(90%, 225px)" }}>
      <Heading style={{ fontSize: "1rem" }}>
        {category.name} - {currencyFormatter.format(category.budget ?? 0)}
      </Heading>
      <Text as="p" style={{ ...styles.subtitle }}>
        Gastos:
      </Text>
      <Text as="p" style={{ ...styles.currency, color: "var(--tomato-9)" }}>
        {currencyFormatter.format(expenses)}
      </Text>
      <Text as="p" style={{ ...styles.subtitle }}>
        Restante:
      </Text>
      <Text as="p" style={{ ...styles.currency, color: "var(--jade-9)" }}>
        {remainingBudget}
      </Text>
    </Card>
  );
}
