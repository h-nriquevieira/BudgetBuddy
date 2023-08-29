import { Flex, Heading } from "@radix-ui/themes";
import menuIcon from "../../assets/menu-icon.svg";
import logo from "../../assets/login-hero.svg";

type MobileAppBarProps = {
  toggleOpen: () => void;
};

export default function MobileAppBar({ toggleOpen }: MobileAppBarProps) {
  return (
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
  );
}
