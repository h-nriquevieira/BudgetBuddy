import { Box, Flex, Heading } from "@radix-ui/themes";
import { useState } from "react";
import { useMediaQuery } from "react-responsive";
import { Outlet } from "react-router-dom";
import "./animation.css";
import logo from "../../assets/login-hero.svg";
import menuIcon from "../../assets/menu-icon.svg";

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
      {isSmallScreen && (
        <Flex
          align="center"
          style={{
            padding: "1.5rem",
            margin: "0 .5rem",
            gap: ".25rem",
            borderBottom: ".5px solid var(--jade-9)",
          }}
        >
          <img
            src={menuIcon}
            style={{
              maxWidth: "25px",
              cursor: "pointer",
              marginRight: ".5rem",
            }}
            onClick={toggleOpen}
          />

          <img src={logo} style={{ maxWidth: "75px" }} />
          <Heading color="jade" size="7" align="center">
            BudgetBuddy
          </Heading>
        </Flex>
      )}
      <Box
        style={{
          display: isSidebarShown ? "block" : "none",
          position: isSmallScreen ? "fixed" : "static",
          top: "0",
          left: "0",
          animation: "contentShow 150ms cubic-bezier(0.16, 1, 0.3, 1)",
          minWidth: "min(30%, 350px)",
          minHeight: "100vh",
          backgroundColor: "var(--jade-a11q)",
          zIndex: "2",
        }}
      >
        Testing
      </Box>
      <Box
        style={{
          display: open ? "initial" : "none",
          position: "absolute",
          minWidth: "100vw",
          minHeight: "100vh",
          overflow: "hidden",
          backgroundColor: "black",
          opacity: ".2",
        }}
        onClick={toggleOpen}
      ></Box>
      <Outlet />
    </Flex>
  );
}
