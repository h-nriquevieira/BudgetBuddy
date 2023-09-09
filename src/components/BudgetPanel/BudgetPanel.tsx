import { InfoCircledIcon } from "@radix-ui/react-icons";
import { Box, Callout } from "@radix-ui/themes";
import { useMediaQuery } from "react-responsive";
import {
  Cell,
  Legend,
  PieChart,
  Pie,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { CategoryResponse } from "../../types/CategoryTypes";
import { COLORS } from "../../utils/colors";
import BrandHeading from "../BrandHeading/BrandHeading";

type BudgetPanelProps = {
  categories: CategoryResponse[];
};

export default function BudgetPanel({ categories }: BudgetPanelProps) {
  const isSmallScreen = useMediaQuery({
    query: "(max-width: 800px)",
  });
  const data = categories.map((category) => ({
    name: category.name,
    value: category.budget,
  }));

  return (
    <>
      <BrandHeading>Orçamento mensal</BrandHeading>
      {categories.length ? (
        <Box
          style={{
            width: "100%",
            height: isSmallScreen ? "700px" : "400px",
            padding: isSmallScreen ? "0" : "2rem 5rem 2rem 0rem ",
          }}
        >
          <ResponsiveContainer maxHeight={1000} width="100%">
            <PieChart>
              <Pie
                dataKey="budget"
                data={categories}
                fill="var(--jade-9)"
                legendType="circle"
                innerRadius="50%"
              >
                {data.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
              <Legend
                layout="vertical"
                align={isSmallScreen ? "center" : "right"}
              />
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </Box>
      ) : (
        <Callout.Root style={{ marginTop: "2rem" }} color="amber">
          <Callout.Icon>
            <InfoCircledIcon />
          </Callout.Icon>
          <Callout.Text>
            Você ainda não cadastrou nenhuma categoria.
          </Callout.Text>
        </Callout.Root>
      )}
    </>
  );
}
