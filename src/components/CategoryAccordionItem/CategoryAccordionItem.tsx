import * as Accordion from "@radix-ui/react-accordion";
import { ChevronDownIcon } from "@radix-ui/react-icons";
import styles from "../CategoryPanel/styles.module.css";
import { Box } from "@radix-ui/themes";
import { CategoryResponse } from "../../types/CategoryTypes";

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
        <Box className={styles.AccordionContentText}>
          Planejado: {category.budget}
        </Box>
      </Accordion.Content>
    </Accordion.Item>
  );
}
