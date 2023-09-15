import { Box, Card, Heading, Text } from "@radix-ui/themes";
import { useEffect, useState } from "react";
import { getAllCategoriesBudgets } from "../../service/CategoryService";
import { getAllExpensesFromCurrentMont } from "../../service/ExpensesService";
import { useMediaQuery } from "react-responsive";
import { currencyFormatter } from "../../utils/currencyFormatter";

export default function MonthOverview() {
  const [totalBudget, setTotalBudget] = useState<number>();
  const [totalExpenses, setTotalExpenses] = useState<number>();

  const isSmallScreen = useMediaQuery({
    query: "(max-width: 1250px)",
  });

  const remainingBudget =
    totalBudget && totalExpenses && totalBudget - totalExpenses;

  const styles = {
    legend: {
      fontWeight: "300",
    },
    value: {
      fontWeight: "500",
    },
  };

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
    <Card
      style={{
        width: isSmallScreen ? "100%" : "400px",
        padding: "1rem",
      }}
    >
      <Heading
        style={{ fontSize: "1.5rem", marginBottom: "2rem" }}
        color="jade"
      >
        Resumo mensal
      </Heading>
      <Box
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "1rem",
        }}
      >
        <Box>
          <Box style={{ display: "flex", justifyContent: "space-between" }}>
            <Text style={styles.legend}>Orçamento: </Text>
            <Text style={styles.value}>
              {currencyFormatter.format(totalBudget)}
            </Text>
          </Box>
          <Box
            style={{
              width: "100%",
              height: "25px",
              background: "var(--jade-9)",
            }}
          ></Box>
        </Box>
        <Box>
          <Box style={{ display: "flex", justifyContent: "space-between" }}>
            <Text style={styles.legend}>Despesas: </Text>
            <Text style={styles.value}>
              {currencyFormatter.format(totalExpenses)}
            </Text>
          </Box>
          <Box
            style={{
              width: `${(totalExpenses * 100) / totalBudget}%`,
              height: "25px",
              background: "var(--tomato-9)",
            }}
          ></Box>
        </Box>
        <Box>
          <Box style={{ display: "flex", justifyContent: "space-between" }}>
            <Text style={styles.legend}>Restante: </Text>
            <Text style={styles.value}>
              {currencyFormatter.format(remainingBudget ?? 0)}
            </Text>
          </Box>
          <Box
            style={{
              width: `${(remainingBudget * 100) / totalBudget}%`,
              height: "25px",
              background: "var(--amber-9)",
            }}
          ></Box>
        </Box>
      </Box>
    </Card>
  );
}
