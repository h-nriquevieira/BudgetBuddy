import { Box, Button, Callout, Popover } from "@radix-ui/themes";
import * as Accordion from "@radix-ui/react-accordion";
import CategoryAccordionItem from "../CategoryAccordionItem/CategoryAccordionItem";
import styles from "./styles.module.css";
import { CategoryResponse } from "../../types/CategoryTypes";
import { InfoCircledIcon, PlusIcon } from "@radix-ui/react-icons";
import NewCategoryPopover from "../NewCategoryPopover/NewCategoryPopover";
import { useState } from "react";
import Notification from "../Notification/Notification";
import BrandHeading from "../BrandHeading/BrandHeading";

type CategoryPanelProps = {
  categories: CategoryResponse[];
};

export default function CategoryPanel({ categories }: CategoryPanelProps) {
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);
  const [isNotificationShown, setIsNotificationShown] = useState(false);

  return (
    <>
      <Box style={{ display: "flex", flexDirection: "column" }}>
        <BrandHeading>Categorias</BrandHeading>
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
            <NewCategoryPopover
              setIsPopoverOpen={setIsPopoverOpen}
              triggerNotification={() => setIsNotificationShown(true)}
            />
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
      {isNotificationShown && (
        <Notification
          type="success"
          text="Categoria cadastrada com sucesso"
          closeNotification={() => setIsNotificationShown(false)}
        />
      )}
    </>
  );
}
