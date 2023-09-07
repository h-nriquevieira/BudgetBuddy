import { Heading } from "@radix-ui/themes";
import * as Accordion from "@radix-ui/react-accordion";
import CategoryAccordionItem from "../CategoryAccordionItem/CategoryAccordionItem";
import styles from "./styles.module.css";
import { CategoryResponse } from "../../types/CategoryTypes";

type CategoryPanelProps = {
  categories: CategoryResponse[];
};

export default function CategoryPanel({ categories }: CategoryPanelProps) {
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
        {categories.length &&
          categories.map((category) => (
            <CategoryAccordionItem key={category.id} category={category} />
          ))}
      </Accordion.Root>
    </>
  );
}
