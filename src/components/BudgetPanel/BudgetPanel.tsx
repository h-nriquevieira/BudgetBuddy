import { InfoCircledIcon } from "@radix-ui/react-icons";
import { Box, Callout, Heading } from "@radix-ui/themes";
import { useMediaQuery } from "react-responsive";
import { PieChart, Pie, Tooltip, ResponsiveContainer } from "recharts";
import { CategoryResponse } from "../../types/CategoryTypes";

type BudgetPanelProps = {
  categories: CategoryResponse[];
};

export default function BudgetPanel({ categories }: BudgetPanelProps) {
  const isSmallScreen = useMediaQuery({
    query: "(max-width: 800px)",
  });

  const headingStyles = {
    fontWeight: "300",
  };

  const data01 = categories.map((category) => ({
    name: category.name,
    value: category.budget,
  }));

  return (
    <>
      <Heading as="h2" color="jade" style={headingStyles}>
        Orçamento mensal
      </Heading>
      <Box
        style={{
          width: "100%",
          height: "400px",
          padding: isSmallScreen ? "0" : "2rem 5rem 2rem 0rem ",
        }}
      >
        <ResponsiveContainer maxHeight={400} width="100%">
          <PieChart>
            <Pie dataKey="value" data={data01} fill="var(--jade-9)" />
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </Box>
      <Callout.Root>
        <Callout.Icon>
          <InfoCircledIcon />
        </Callout.Icon>
        <Callout.Text>
          Edite o orçamento de uma categoria para alterar o orçamento total.
        </Callout.Text>
      </Callout.Root>
    </>
  );
}
