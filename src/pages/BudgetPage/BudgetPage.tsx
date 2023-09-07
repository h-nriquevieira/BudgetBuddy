import { Box, Flex } from "@radix-ui/themes";
import PageContainer from "../../components/PageContainer/PageContainer";
import { useMediaQuery } from "react-responsive";
import CategoryPanel from "../../components/CategoryPanel/CategoryPanel";
import BudgetPanel from "../../components/BudgetPanel/BudgetPanel";

export default function BudgetPage() {
  const isSmallScreen = useMediaQuery({
    query: "(max-width: 800px)",
  });

  return (
    <PageContainer>
      <Flex
        style={{ minWidth: "100%", gap: "2rem" }}
        direction={isSmallScreen ? "column" : "row"}
      >
        <Box
          style={{ flexGrow: "1", maxWidth: isSmallScreen ? "100vw" : "50%" }}
        >
          <BudgetPanel />
        </Box>
        <Box style={{ flexGrow: "1" }}>
          <CategoryPanel />
        </Box>
      </Flex>
    </PageContainer>
  );
}
