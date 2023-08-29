import { Box, Flex } from "@radix-ui/themes";
import { useState } from "react";
import { useMediaQuery } from "react-responsive";
import { Outlet } from "react-router-dom";
import Overlay from "../Overlay/Overlay";
import MobileAppBar from "../MobileAppBar/MobileAppBar";
import { animated, useSpring } from "@react-spring/web";

export default function Navbar() {
  const isSmallScreen = useMediaQuery({
    query: "(max-width: 900px)",
  });

  const [open, setOpen] = useState(false);

  const isSidebarShown = !isSmallScreen || open;

  const AnimatedBox = animated(Box);

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
          position: isSmallScreen ? "fixed" : "static",
          top: "0",
          left: "0",
          animation: "contentShow 150ms cubic-bezier(0.16, 1, 0.3, 1)",
          minWidth: "min(30%, 350px)",
          minHeight: "100vh",
          backgroundColor: isSmallScreen ? "var(--jade-a11)" : "var(--jade-11)",
          zIndex: "2",
          ...springs,
        }}
      >
        Testing
      </AnimatedBox>
      <Overlay open={open} toggleOpen={toggleOpen} />
      <Outlet />
    </Flex>
  );
}
