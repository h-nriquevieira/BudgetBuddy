import { Box, Button, Callout, Card, Heading, Text } from "@radix-ui/themes";
import { useEffect, useState } from "react";
import { getAllCategoriesBudgets } from "../../service/CategoryService";
import { getAllExpensesFromCurrentMont } from "../../service/ExpensesService";
import { useMediaQuery } from "react-responsive";
import { currencyFormatter } from "../../utils/currencyFormatter";
import { ExclamationTriangleIcon } from "@radix-ui/react-icons";
import { Link } from "react-router-dom";

export default function MonthOverview() {
  const [totalBudget, setTotalBudget] = useState<number>();
  const [totalExpenses, setTotalExpenses] = useState<number>();
  const [appState, setAppState] = useState({
    budgetLoaded: false,
    expensesLoaded: false,
  });

  const isSmallScreen = useMediaQuery({
    query: "(max-width: 1250px)",
  });

  let remainingBudget;

  if (totalBudget && totalBudget > 0) {
    remainingBudget = totalExpenses ? totalBudget - totalExpenses : totalBudget;
  }

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
      setAppState((prev) => ({ ...prev, budgetLoaded: true }));
    })();
  }, []);

  useEffect(() => {
    (async () => {
      const expenses = await getAllExpensesFromCurrentMont();
      setTotalExpenses(expenses);
      setAppState((prev) => ({ ...prev, expensesLoaded: true }));
    })();
  }, []);

  if (!appState.budgetLoaded || !appState.expensesLoaded) {
    return (
      <Box
        style={{
          width: isSmallScreen ? "100%" : "400px",
          minHeight: "350px",
          backgroundColor: "var(--gray-a5)",
          borderRadius: "15px",
        }}
      ></Box>
    );
  }

  if (totalBudget == 0) {
    return (
      <Card
        style={{
          width: isSmallScreen ? "100%" : "400px",
          padding: "1rem",
          display: "flex",
        }}
      >
        <Heading
          style={{ fontSize: "1.5rem", marginBottom: "1rem" }}
          color="jade"
        >
          Resumo mensal
        </Heading>
        <Callout.Root color="amber">
          <Callout.Icon>
            <ExclamationTriangleIcon />
          </Callout.Icon>
          <Callout.Text>
            Você ainda não tem registros. Comece cadastrando suas categorias na
            página orçamento.
          </Callout.Text>
        </Callout.Root>
        <Link to="/app/budget">
          <Button style={{ marginTop: "1rem", width: "100%" }}>
            Ir para página Orçamento
          </Button>
        </Link>
      </Card>
    );
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
              {totalBudget && currencyFormatter.format(totalBudget)}
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
              {currencyFormatter.format(totalExpenses ?? 0)}
            </Text>
          </Box>
          <Box
            style={{
              width: `${((totalExpenses ?? 0) * 100) / (totalBudget ?? 0)}%`,
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
          {remainingBudget && (
            <Box
              style={{
                width: `${(remainingBudget * 100) / (totalBudget ?? 1)}%`,
                height: "25px",
                background: "var(--amber-9)",
              }}
            ></Box>
          )}
        </Box>
      </Box>
    </Card>
  );
}
