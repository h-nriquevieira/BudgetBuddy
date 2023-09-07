import { Heading } from "@radix-ui/themes";

export default function CategoryPanel() {
  const headingStyles = {
    fontWeight: "300",
  };

  return (
    <>
      <Heading as="h2" color="jade" style={headingStyles}>
        Categorias
      </Heading>
    </>
  );
}
