import { Heading } from "@radix-ui/themes";
import { PropsWithChildren } from "react";

type BrandHeadingProps = {
  variant?: string;
};

export default function BrandHeading({
  children,
  variant,
}: PropsWithChildren<BrandHeadingProps>) {
  const smallStyles = {
    fontSize: "1rem",
  };

  const styles = {
    fontWeight: "300",
  };

  return (
    <Heading
      as="h2"
      color="jade"
      style={variant == "small" ? { ...styles, ...smallStyles } : styles}
    >
      {children}
    </Heading>
  );
}
