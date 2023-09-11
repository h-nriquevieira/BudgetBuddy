import {
  Box,
  Button,
  Checkbox,
  Heading,
  PopoverClose,
  ScrollArea,
  Switch,
  Text,
} from "@radix-ui/themes";
import { useState } from "react";
import { useMediaQuery } from "react-responsive";

type ExpenseCategoryFilterProps = {
  categories: { [key: string]: string };
  categoryFilter: string[];
  setCategoryFilter: (filter: string[]) => void;
};

export default function ExpenseCategoryFilter({
  categories,
  categoryFilter,
  setCategoryFilter,
}: ExpenseCategoryFilterProps) {
  const [isFilterActive, setIsFilterActive] = useState(
    categoryFilter.length > 0,
  );
  const [tempCategoryFilter, setTempCategoryFilter] = useState([
    ...categoryFilter,
  ]);

  const categoryKeys = Object.keys(categories);

  const isSmallScreen = useMediaQuery({
    query: "(max-width: 800px)",
  });

  function toggleFilter() {
    setIsFilterActive((prev) => !prev);
    setCategoryFilter([]);
  }

  function handleCheck(event: boolean, categoryId: string) {
    if (event == true) {
      setTempCategoryFilter((prev: string[]) => [...prev, categoryId]);
    } else {
      setTempCategoryFilter((prev) => {
        const newFilter = [...prev].filter(
          (category) => category != categoryId,
        );
        return newFilter;
      });
    }
  }

  function handleSave() {
    if (isFilterActive) {
      setCategoryFilter([...tempCategoryFilter]);
    }
  }

  return (
    <Box style={{ display: "flex", flexDirection: "column" }}>
      <label style={{ display: "flex", alignItems: "center" }}>
        <Switch
          mr="2"
          size="1"
          radius="full"
          onClick={toggleFilter}
          defaultChecked={isFilterActive}
          style={{ cursor: "pointer" }}
        />{" "}
        <Heading
          as="h3"
          style={{
            fontSize: "1rem",
            color: isFilterActive ? "var(--jade-9)" : "var(--gray-9)",
          }}
        >
          Filtrar por categoria
        </Heading>
      </label>
      {isFilterActive && (
        <ScrollArea type="always" scrollbars="vertical">
          <Box
            style={{
              display: "flex",
              flexDirection: "column",
              gap: ".5rem",
              maxHeight: isSmallScreen ? "200px" : "initial",
            }}
          >
            {categoryKeys.map((categoryId) => (
              <label
                key={categoryId}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: ".5rem",
                  cursor: "pointer",
                }}
              >
                <Checkbox
                  checked={tempCategoryFilter.includes(categoryId)}
                  onCheckedChange={(e) => handleCheck(e as boolean, categoryId)}
                />{" "}
                <Text>{categories[categoryId]}</Text>
              </label>
            ))}
          </Box>
        </ScrollArea>
      )}
      <Box
        style={{
          display: "flex",
          justifyContent: "end",
          gap: ".5rem",
          width: "100%",
          marginTop: "1rem",
        }}
      >
        <Button
          variant="outline"
          style={{ cursor: "pointer" }}
          onClick={() => setTempCategoryFilter([])}
        >
          Limpar
        </Button>
        <PopoverClose>
          <Button style={{ cursor: "pointer" }} onClick={handleSave}>
            Salvar
          </Button>
        </PopoverClose>
      </Box>
    </Box>
  );
}
