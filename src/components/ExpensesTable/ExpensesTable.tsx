import { Box, Button, Callout, Popover, Table } from "@radix-ui/themes";
import { ExpenseResponse } from "../../types/ExpensesTypes";
import { currencyFormatter } from "../../utils/currencyFormatter";
import { InfoCircledIcon } from "@radix-ui/react-icons";
import { useState } from "react";
import ExpenseCategoryFilter from "../ExpenseCategoryFilter/ExpenseCategoryFilter";
import NewExpensePopover from "../NewExpensePopover/NewExpensePopover";
import Notification from "../Notification/Notification";

type ExpensesTableProps = {
  expenses: ExpenseResponse[];
  categories: { [key: string]: string };
};

export default function ExpensesTable({
  expenses,
  categories,
}: ExpensesTableProps) {
  const [categoryFilter, setCategoryFilter] = useState<string[]>(
    [] as string[],
  );

  const [isNotificationShown, setIsNotificationShown] = useState(false);

  const filteredCategories =
    categoryFilter.length > 0 ? [...categoryFilter] : Object.keys(categories);

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
    <>
      <Box style={{ display: "flex", gap: ".5rem", marginBottom: "1rem" }}>
        <Popover.Root>
          <Popover.Trigger>
            <Button style={{ cursor: "pointer" }} variant="outline">
              Filtrar
            </Button>
          </Popover.Trigger>
          <Popover.Content>
            <ExpenseCategoryFilter
              categories={categories}
              categoryFilter={categoryFilter}
              setCategoryFilter={setCategoryFilter}
            />
          </Popover.Content>
        </Popover.Root>
        <Popover.Root>
          <Popover.Trigger>
            <Button style={{ cursor: "pointer" }}>Nova despesa</Button>
          </Popover.Trigger>
          <Popover.Content>
            <NewExpensePopover
              categories={categories}
              triggerNotification={() => setIsNotificationShown(true)}
            />
          </Popover.Content>
        </Popover.Root>
      </Box>
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
          {expenses.map(
            (expense) =>
              filteredCategories.includes(expense.category_id.toString()) && (
                <Table.Row key={expense.id}>
                  <Table.RowHeaderCell>
                    {expense.description}
                  </Table.RowHeaderCell>
                  <Table.Cell>
                    {categories[expense.category_id.toString()]}
                  </Table.Cell>
                  <Table.Cell>
                    {new Date(expense.date).toLocaleDateString("pt-br")}
                  </Table.Cell>
                  <Table.Cell>
                    {currencyFormatter.format(expense.amount)}
                  </Table.Cell>
                </Table.Row>
              ),
          )}
        </Table.Body>
      </Table.Root>
      {isNotificationShown && (
        <Notification
          type="success"
          text="Despesa cadastrada com sucesso"
          closeNotification={() => setIsNotificationShown(false)}
        />
      )}
    </>
  );
}
