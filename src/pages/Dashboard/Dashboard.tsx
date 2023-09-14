import { Box } from "@radix-ui/themes";
import BrandHeading from "../../components/BrandHeading/BrandHeading";
import PageContainer from "../../components/PageContainer/PageContainer";
import { useAuthContext } from "../../context/AuthContext/useAuthContext";
import MonthOverview from "../../components/MonthOverview/MonthOverview";

export default function Dashboard() {
  const { user } = useAuthContext();

  return (
    <PageContainer>
      <BrandHeading>
        Olá
        {user
          ? `, ${user.user_metadata.name}!` ?? `, ${user.user_metadata.email}!`
          : "!"}
      </BrandHeading>
      <Box style={{ padding: "2rem 0", overflowY: "scroll" }}>
        <MonthOverview />
      </Box>
    </PageContainer>
  );
}
