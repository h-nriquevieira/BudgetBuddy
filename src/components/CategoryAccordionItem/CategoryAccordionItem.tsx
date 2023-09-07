import * as Accordion from "@radix-ui/react-accordion";
import { ChevronDownIcon } from "@radix-ui/react-icons";
import styles from "../CategoryPanel/styles.module.css";
import { Box, Button, Text } from "@radix-ui/themes";
import { CategoryResponse } from "../../types/CategoryTypes";
import { currencyFormatter } from "../../utils/currencyFormatter";

type CategoryAccordionItemProps = {
  category: CategoryResponse;
};

export default function CategoryAccordionItem({
  category,
}: CategoryAccordionItemProps) {
  return (
    <Accordion.Item value="item-1" className={styles.AccordionItem}>
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
            {category.budget && currencyFormatter.format(category.budget)}
          </Text>
        </Box>
        <Box
          className={styles.AccordionContentText}
          style={{ display: "flex", gap: "1rem", justifyContent: "end" }}
        >
          <Button style={{ cursor: "pointer" }} variant="outline">
            Editar
          </Button>
          <Button style={{ cursor: "pointer" }}>Ver despesas</Button>
        </Box>
      </Accordion.Content>
    </Accordion.Item>
  );
}
