import { ExpenseResponse } from "../../types/ExpensesTypes";
import { currencyFormatter } from "../../utils/currencyFormatter";

type ExpensesTableProps = {
  expenses: ExpenseResponse[];
};

export default function ExpensesTable({ expenses }: ExpensesTableProps) {
  return (
    <>
      {expenses.map((expense) => (
        <p>
          {expense.name} + {currencyFormatter.format(expense.amount)}
        </p>
      ))}
    </>
  );
}
