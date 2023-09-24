import { Box } from "@radix-ui/themes";
import BrandHeading from "../../components/BrandHeading/BrandHeading";
import PageContainer from "../../components/PageContainer/PageContainer";
import { useAuthContext } from "../../context/AuthContext/useAuthContext";
import MonthOverview from "../../components/MonthOverview/MonthOverview";
import RecentExpenses from "../../components/RecentExpenses/RecentExpenses";
import { useMediaQuery } from "react-responsive";
import CategoryOverview from "../../components/CategoryOverview/CategoryOverview";

export default function Dashboard() {
  const { user } = useAuthContext();

  const userName =
    user?.user_metadata.name ??
    user?.user_metadata.email ??
    user?.email ??
    null;

  const isSmallScreen = useMediaQuery({
    query: "(max-width: 1250px)",
  });

  return (
    <PageContainer>
      <BrandHeading>{userName ? `Olá, ${userName}` : "Olá!"}</BrandHeading>
      <Box
        style={{
          padding: "2rem 0",
          overflowY: "scroll",
          display: "flex",
          flexDirection: isSmallScreen ? "column" : "row",
          flexWrap: "wrap",
          gap: "2rem",
        }}
      >
        <MonthOverview />
        <RecentExpenses />
        <CategoryOverview />
      </Box>
    </PageContainer>
  );
}
