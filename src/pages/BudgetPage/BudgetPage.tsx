import { Box, Flex } from "@radix-ui/themes";
import PageContainer from "../../components/PageContainer/PageContainer";
import { useMediaQuery } from "react-responsive";
import CategoryPanel from "../../components/CategoryPanel/CategoryPanel";
import BudgetPanel from "../../components/BudgetPanel/BudgetPanel";
import { useLoaderData } from "react-router-dom";
import { CategoryResponse } from "../../types/CategoryTypes";

export default function BudgetPage() {
  const isSmallScreen = useMediaQuery({
    query: "(max-width: 800px)",
  });

  const categories = useLoaderData() as CategoryResponse[];
  // const categories = [] as CategoryResponse[];

  return (
    <PageContainer>
      <Flex
        style={{ minWidth: "100%", gap: "2rem" }}
        direction={isSmallScreen ? "column" : "row"}
      >
        {categories.length > 0 && (
          <Box
            style={{ flexGrow: "1", maxWidth: isSmallScreen ? "100vw" : "50%" }}
          >
            <BudgetPanel categories={categories} />
          </Box>
        )}
        <Box style={{ flexGrow: "1" }}>
          <CategoryPanel categories={categories} />
        </Box>
      </Flex>
    </PageContainer>
  );
}
