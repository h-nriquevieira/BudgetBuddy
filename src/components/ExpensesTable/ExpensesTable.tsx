import { Callout, Table } from "@radix-ui/themes";
import { ExpenseResponse } from "../../types/ExpensesTypes";
import { currencyFormatter } from "../../utils/currencyFormatter";
import { InfoCircledIcon } from "@radix-ui/react-icons";

type ExpensesTableProps = {
  expenses: ExpenseResponse[];
  categories: { [key: string]: string };
};

export default function ExpensesTable({
  expenses,
  categories,
}: ExpensesTableProps) {
  if (expenses.length == 0) {
    return (
      <Callout.Root>
        <Callout.Icon>
          <InfoCircledIcon />
        </Callout.Icon>
        <Callout.Text>Não há despesas cadastradas para esse mês.</Callout.Text>
      </Callout.Root>
    );
  }

  return (
    <Table.Root>
      <Table.Header>
        <Table.Row>
          <Table.ColumnHeaderCell>Descrição</Table.ColumnHeaderCell>
          <Table.ColumnHeaderCell>Categoria</Table.ColumnHeaderCell>
          <Table.ColumnHeaderCell>Data</Table.ColumnHeaderCell>
          <Table.ColumnHeaderCell>Valor</Table.ColumnHeaderCell>
        </Table.Row>
      </Table.Header>

      <Table.Body>
        {expenses.map((expense) => (
          <Table.Row key={expense.id}>
            <Table.RowHeaderCell>{expense.name}</Table.RowHeaderCell>
            <Table.Cell>
              {categories[expense.category_id.toString()]}
            </Table.Cell>
            <Table.Cell>
              {new Date(expense.date).toLocaleDateString("pt-br")}
            </Table.Cell>
            <Table.Cell>{currencyFormatter.format(expense.amount)}</Table.Cell>
          </Table.Row>
        ))}
      </Table.Body>
    </Table.Root>
  );
}
