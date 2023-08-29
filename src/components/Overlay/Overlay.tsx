import { Box } from "@radix-ui/themes";

type OverlayProps = {
  open: boolean;
  toggleOpen: () => void;
};

export default function Overlay({ open, toggleOpen }: OverlayProps) {
  return (
    <Box
      style={{
        display: open ? "initial" : "none",
        position: "absolute",
        zIndex: "1",
        minWidth: "100vw",
        minHeight: "100vh",
        overflow: "hidden",
        backgroundColor: "black",
        opacity: ".2",
      }}
      onClick={toggleOpen}
    ></Box>
  );
}
