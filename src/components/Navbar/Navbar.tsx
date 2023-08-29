import { Box, Flex } from "@radix-ui/themes";
import { useState } from "react";
import { useMediaQuery } from "react-responsive";
import { Outlet } from "react-router-dom";
import "./animation.css";
import Overlay from "../Overlay/Overlay";
import MobileAppBar from "../MobileAppBar/MobileAppBar";

export default function Navbar() {
  const isSmallScreen = useMediaQuery({
    query: "(max-width: 900px)",
  });

  const [open, setOpen] = useState(false);

  const isSidebarShown = !isSmallScreen || open;

  function toggleOpen() {
    setOpen((prev) => !prev);
  }

  return (
    <Flex direction={isSmallScreen ? "column" : "row"}>
      {isSmallScreen && <MobileAppBar toggleOpen={toggleOpen} />}
      <Box
        style={{
          display: isSidebarShown ? "block" : "none",
          position: isSmallScreen ? "fixed" : "static",
          top: "0",
          left: "0",
          animation: "contentShow 150ms cubic-bezier(0.16, 1, 0.3, 1)",
          minWidth: "min(30%, 350px)",
          minHeight: "100vh",
          backgroundColor: isSmallScreen ? "var(--jade-a11)" : "var(--jade-11)",
          zIndex: "2",
        }}
      >
        Testing
      </Box>
      <Overlay open={open} toggleOpen={toggleOpen} />
      <Outlet />
    </Flex>
  );
}
