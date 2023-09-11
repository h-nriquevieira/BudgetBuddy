import { Heading } from "@radix-ui/themes";
import { PropsWithChildren } from "react";

export default function BrandHeading({ children }: PropsWithChildren) {
  return (
    <Heading as="h2" color="jade" style={{ fontWeight: "300" }}>
      {children}
    </Heading>
  );
}
