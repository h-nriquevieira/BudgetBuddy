import { Box } from "@radix-ui/themes";
import { animated, useSpring } from "@react-spring/web";
import { useEffect } from "react";

type OverlayProps = {
  open: boolean;
  toggleOpen: () => void;
};

export default function Overlay({ open, toggleOpen }: OverlayProps) {
  const AnimatedBox = animated(Box);

  const [springs, api] = useSpring(() => {});

  useEffect(() => {
    api.start({
      from: { opacity: 0 },
      to: { opacity: 0.2 },
    });
  });

  function handleClose() {
    setTimeout(toggleOpen, 100);
    api.start({
      from: { opacity: 0.2 },
      to: { opacity: 0 },
    });
  }

  return (
    <AnimatedBox
      style={{
        display: open ? "initial" : "none",
        position: "fixed",
        zIndex: "1",
        minWidth: "100vw",
        minHeight: "100vh",
        overflow: "hidden",
        backgroundColor: "black",
        opacity: ".2",
        ...springs,
      }}
      onClick={handleClose}
    ></AnimatedBox>
  );
}
