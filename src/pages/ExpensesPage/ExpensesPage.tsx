import PageContainer from "../../components/PageContainer/PageContainer";
import BrandHeading from "../../components/BrandHeading/BrandHeading";
import { Box, Button, Text } from "@radix-ui/themes";
import { useState } from "react";
import { getMonthByIndex } from "../../utils/dateUtils";
import { ChevronLeftIcon, ChevronRightIcon } from "@radix-ui/react-icons";
import { useLoaderData } from "react-router-dom";
import { ExpenseResponse } from "../../types/ExpensesTypes";
import ExpensesTable from "../../components/ExpensesTable/ExpensesTable";

export default function ExpensesPage() {
  const [date, setDate] = useState(new Date());

  const expenses = useLoaderData() as ExpenseResponse[];

  function shouldShowExpense(expense: ExpenseResponse) {
    const expenseDate = new Date(expense.date);
    return (
      expenseDate.getMonth() == date.getMonth() &&
      expenseDate.getFullYear() == date.getFullYear()
    );
  }

  const filteredExpenses = expenses.filter(shouldShowExpense);

  const disableForward =
    date.getMonth() + 1 > new Date().getMonth() &&
    date.getFullYear() == new Date().getFullYear()
      ? true
      : false;

  function changeMonth(difference: number) {
    if (difference > 0 && disableForward) {
      return;
    }
    setDate((prev) => {
      const newDate = new Date(prev);
      newDate.setMonth(newDate.getMonth() + difference);
      return newDate;
    });
  }

  return (
    <PageContainer>
      <BrandHeading>Despesas</BrandHeading>
      <Box
        style={{
          padding: "2rem 0",
          display: "flex",
          alignItems: "center",
          gap: "1rem",
        }}
      >
        <Button
          variant="soft"
          style={{ cursor: "pointer", borderRadius: "100%" }}
          onClick={() => changeMonth(-1)}
        >
          <ChevronLeftIcon />
        </Button>
        <Box
          style={{
            minWidth: "150px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "baseline",
          }}
        >
          <Text style={{ fontSize: "1.5rem" }}>
            {getMonthByIndex(date.getMonth())}
          </Text>
          <Text
            as="span"
            style={{ fontSize: ".75rem", color: "var(--jade-11)" }}
          >
            {date.getFullYear()}
          </Text>
        </Box>
        <Button
          variant="soft"
          style={{
            cursor: disableForward ? "initial" : "pointer",
            borderRadius: "100%",
          }}
          onClick={() => changeMonth(1)}
          disabled={disableForward}
        >
          <ChevronRightIcon />
        </Button>
      </Box>
      <ExpensesTable expenses={filteredExpenses} />
    </PageContainer>
  );
}
