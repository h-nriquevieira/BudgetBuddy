import { Box, Button, Callout, Popover, Heading } from "@radix-ui/themes";
import * as Accordion from "@radix-ui/react-accordion";
import CategoryAccordionItem from "../CategoryAccordionItem/CategoryAccordionItem";
import styles from "./styles.module.css";
import { CategoryResponse } from "../../types/CategoryTypes";
import { InfoCircledIcon, PlusIcon } from "@radix-ui/react-icons";
import NewCategoryPopover from "../NewCategoryPopover/NewCategoryPopover";
import { useState } from "react";

type CategoryPanelProps = {
  categories: CategoryResponse[];
};

export default function CategoryPanel({ categories }: CategoryPanelProps) {
  const headingStyles = {
    fontWeight: "300",
  };

  const [isPopoverOpen, setIsPopoverOpen] = useState(false);

  return (
    <>
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
        <Popover.Root open={isPopoverOpen}>
          <Popover.Trigger>
            <Button
              style={{
                marginTop: "2rem",
                marginLeft: "auto",
                cursor: "pointer",
              }}
              onClick={() => setIsPopoverOpen(true)}
            >
              <PlusIcon />
              Nova categoria
            </Button>
          </Popover.Trigger>

          <Popover.Content onEscapeKeyDown={() => setIsPopoverOpen(false)}>
            <NewCategoryPopover setIsPopoverOpen={setIsPopoverOpen} />
          </Popover.Content>
        </Popover.Root>
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
    </>
  );
}
