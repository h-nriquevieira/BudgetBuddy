import { Button } from "@radix-ui/themes";
import { PropsWithChildren } from "react";
import { useMediaQuery } from "react-responsive";
import { useNavigate } from "react-router-dom";

type NavButtonProps = {
  isActive: boolean;
  navPath: string;
  closeSidebar: () => void;
};

export default function NavButton({
  children,
  isActive,
  navPath,
  closeSidebar,
}: PropsWithChildren<NavButtonProps>) {
  const isSmallScreen = useMediaQuery({
    query: "(max-width: 900px)",
  });

  const navigate = useNavigate();

  function handleClick() {
    navigate(navPath);
    closeSidebar();
  }

  return (
    <Button
      variant={isActive ? "solid" : "ghost"}
      style={{
        justifyContent: "start",
        borderRadius: "0",
        maxWidth: "100% !important",
        padding: ".75rem 1rem",
        margin: "0",
        marginBottom: isSmallScreen ? ".25rem" : "0",
        cursor: "pointer",
        fontSize: isSmallScreen ? "1.5rem" : "1.25rem",
        textTransform: "uppercase",
        fontWeight: isActive ? "500" : "300",
      }}
      onClick={handleClick}
    >
      {children}
    </Button>
  );
}
