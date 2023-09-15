import * as Accordion from "@radix-ui/react-accordion";
import { ChevronDownIcon } from "@radix-ui/react-icons";
import styles from "../CategoryPanel/styles.module.css";
import { Box, Button, Text } from "@radix-ui/themes";
import { CategoryResponse } from "../../types/CategoryTypes";
import { currencyFormatter } from "../../utils/currencyFormatter";
import { useEffect, useState } from "react";
import { getExpensesByCategoryId } from "../../service/ExpensesService";

type CategoryAccordionItemProps = {
  category: CategoryResponse;
};

export default function CategoryAccordionItem({
  category,
}: CategoryAccordionItemProps) {
  const [amountSpent, setAmountSpent] = useState<number>();

  useEffect(() => {
    getExpensesByCategoryId(category.id).then(
      (amount) => amount && setAmountSpent(amount),
    );
  }, [category.id]);

  return (
    <Accordion.Item
      value={category.name + category.id}
      className={styles.AccordionItem}
    >
      <Accordion.Header className={styles.AccordionHeader}>
        <Accordion.Trigger className={styles.AccordionTrigger}>
          {category.name}
          <ChevronDownIcon className={styles.AccordionChevron} />
        </Accordion.Trigger>
      </Accordion.Header>
      <Accordion.Content className={styles.AccordionContent}>
        <Box
          className={styles.AccordionContentText}
          style={{ display: "flex", justifyContent: "space-between" }}
        >
          <Text>
            Planejado:{" "}
            {category.budget && currencyFormatter.format(category.budget)}
          </Text>
          <Text>
            Restante:{" "}
            {amountSpent
              ? currencyFormatter.format(
                  (category.budget as number) - amountSpent,
                )
              : currencyFormatter.format(category.budget as number)}
          </Text>
        </Box>
        {/* Comentado para ativar no futuro */}
        {/* <Box
          className={styles.AccordionContentText}
          style={{ display: "flex", gap: "1rem", justifyContent: "end" }}
        >
          <Button style={{ cursor: "pointer" }} variant="outline">
            Editar
          </Button>
          <Button style={{ cursor: "pointer" }}>Ver despesas</Button>
        </Box> */}
      </Accordion.Content>
    </Accordion.Item>
  );
}
