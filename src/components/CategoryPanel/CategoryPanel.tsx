import { Heading } from "@radix-ui/themes";
import * as Accordion from "@radix-ui/react-accordion";
import CategoryAccordionItem from "../CategoryAccordionItem/CategoryAccordionItem";
import styles from "./styles.module.css";

export default function CategoryPanel() {
  const headingStyles = {
    fontWeight: "300",
  };

  return (
    <>
      <Heading as="h2" color="jade" style={headingStyles}>
        Categorias
      </Heading>
      <Accordion.Root
        type="single"
        collapsible
        className={styles.AccordionRoot}
      >
        <CategoryAccordionItem />
        <CategoryAccordionItem />
      </Accordion.Root>
    </>
  );
}
