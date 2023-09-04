import { Box, Flex, Heading } from "@radix-ui/themes";
import { useState } from "react";
import { useMediaQuery } from "react-responsive";
import { Outlet, useLocation } from "react-router-dom";
import Overlay from "../Overlay/Overlay";
import MobileAppBar from "../MobileAppBar/MobileAppBar";
import { animated, useSpring } from "@react-spring/web";
import logo from "../../assets/login-hero.svg";
import NavButton from "../NavButton/NavButton";
import UserProfileCard from "../UserProfileCard/UserProfileCard";

export default function Navbar() {
  const isSmallScreen = useMediaQuery({
    query: "(max-width: 900px)",
  });

  const [open, setOpen] = useState(false);

  const isSidebarShown = !isSmallScreen || open;

  const AnimatedBox = animated(Box);

  const location = useLocation();

  const [springs, api] = useSpring(() => ({
    from: { x: 0 },
  }));

  function toggleOpen() {
    if (open) {
      setTimeout(() => {
        setOpen((prev) => !prev);
      }, 100);
    } else {
      setOpen((prev) => !prev);
    }
    api.start({
      from: {
        x: open ? 0 : -100,
      },
      to: {
        x: open ? -300 : 0,
      },
    });
  }

  return (
    <Flex direction={isSmallScreen ? "column" : "row"}>
      {isSmallScreen && <MobileAppBar toggleOpen={toggleOpen} />}
      <AnimatedBox
        style={{
          display: isSidebarShown ? "block" : "none",
          flexDirection: "column",
          position: isSmallScreen ? "fixed" : "static",
          top: "0",
          left: "0",
          animation: "contentShow 150ms cubic-bezier(0.16, 1, 0.3, 1)",
          minWidth: "min(60%, 350px)",
          minHeight: "100vh",
          backgroundColor: "white",
          // backgroundColor: isSmallScreen ? "var(--jade-11)" : "white",
          zIndex: "2",
          boxShadow: "0px 0px 20px 0px var(--jade-a11)",
          ...springs,
        }}
      >
        <Flex
          align="center"
          style={{
            padding: "1.5rem",
            gap: ".25rem",
            borderBottom: isSmallScreen ? ".5px solid var(--jade-9)" : "none",
            backgroundColor: "white",
            width: "100%",
          }}
        >
          <img src={logo} style={{ maxWidth: "75px" }} />

          <Heading color="jade" size="7" align="center">
            BudgetBuddy
          </Heading>
        </Flex>

        <Flex direction="column" style={{ padding: "2rem 0 0" }}>
          <NavButton
            isActive={location.pathname == "/app/dashboard" ? true : false}
            navPath="/app/dashboard"
            closeSidebar={() => setOpen(false)}
          >
            Dashboard
          </NavButton>
          <NavButton
            isActive={location.pathname == "/app/budget" ? true : false}
            navPath="/app/budget"
            closeSidebar={() => setOpen(false)}
          >
            Orçamento
          </NavButton>
          <NavButton
            isActive={location.pathname == "/app/expenses" ? true : false}
            navPath="/app/expenses"
            closeSidebar={() => setOpen(false)}
          >
            Despesas
          </NavButton>
        </Flex>
        <UserProfileCard />
      </AnimatedBox>
      <Overlay open={open} toggleOpen={toggleOpen} />
      <Outlet />
    </Flex>
  );
}
