import { Box } from "@radix-ui/themes";
import { PropsWithChildren } from "react";
import { useMediaQuery } from "react-responsive";

export default function PageContainer({ children }: PropsWithChildren) {
  const isSmallScreen = useMediaQuery({
    query: "(max-width: 800px)",
  });

  const generalStyles = {
    padding: isSmallScreen ? "2rem 2rem" : "2rem 4rem",
    width: "100%",
  };

  const desktopStyles = {
    maxHeight: "100vh",
    overflow: "scroll",
  };

  const styles = isSmallScreen
    ? generalStyles
    : { ...generalStyles, ...desktopStyles };

  return <Box style={styles}>{children}</Box>;
}
