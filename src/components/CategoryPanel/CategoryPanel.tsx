import { Box, Button, Callout, Heading } from "@radix-ui/themes";
import * as Accordion from "@radix-ui/react-accordion";
import CategoryAccordionItem from "../CategoryAccordionItem/CategoryAccordionItem";
import styles from "./styles.module.css";
import { CategoryResponse } from "../../types/CategoryTypes";
import { useMediaQuery } from "react-responsive";
import { InfoCircledIcon, PlusIcon } from "@radix-ui/react-icons";

type CategoryPanelProps = {
  categories: CategoryResponse[];
};

export default function CategoryPanel({ categories }: CategoryPanelProps) {
  const headingStyles = {
    fontWeight: "300",
  };

  const isSmallScreen = useMediaQuery({ query: "(max-width: 800px)" });

  return (
    <Box style={{ display: "flex", flexDirection: "column" }}>
      <Heading as="h2" color="jade" style={headingStyles}>
        Categorias
      </Heading>
      {!categories.length && (
        <Callout.Root style={{ marginTop: "2rem" }} color="amber">
          <Callout.Icon>
            <InfoCircledIcon />
          </Callout.Icon>
          <Callout.Text>Adicione sua primeira categoria.</Callout.Text>
        </Callout.Root>
      )}
      <Button
        style={{ marginTop: "2rem", marginLeft: "auto", cursor: "pointer" }}
      >
        <PlusIcon />
        {!isSmallScreen && "Nova categoria"}
      </Button>
      <Accordion.Root
        type="single"
        collapsible
        className={styles.AccordionRoot}
      >
        {categories &&
          categories.map((category) => (
            <CategoryAccordionItem key={category.id} category={category} />
          ))}
      </Accordion.Root>
    </Box>
  );
}
