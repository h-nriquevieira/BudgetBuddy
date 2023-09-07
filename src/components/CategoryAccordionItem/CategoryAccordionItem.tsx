import * as Accordion from "@radix-ui/react-accordion";
import { ChevronDownIcon } from "@radix-ui/react-icons";
import styles from "../CategoryPanel/styles.module.css";
import { Box } from "@radix-ui/themes";

export default function CategoryAccordionItem() {
  return (
    <Accordion.Item value="item-1" className={styles.AccordionItem}>
      <Accordion.Header className={styles.AccordionHeader}>
        <Accordion.Trigger className={styles.AccordionTrigger}>
          Categoria 1
          <ChevronDownIcon className={styles.AccordionChevron} />
        </Accordion.Trigger>
      </Accordion.Header>
      <Accordion.Content className={styles.AccordionContent}>
        <Box className={styles.AccordionContentText}>
          Descrição da categoria 1
        </Box>
      </Accordion.Content>
    </Accordion.Item>
  );
}
