import { Box, Callout, Card, Heading } from "@radix-ui/themes";
import { CategoryResponse } from "../../types/CategoryTypes";
import { useEffect, useState } from "react";
import { getUserCategories } from "../../service/CategoryService";
import CategoryCard from "../CategoryCard/CategoryCard";
import { ExclamationTriangleIcon } from "@radix-ui/react-icons";

export default function CategoryOverview() {
  const [categories, setCategories] = useState<CategoryResponse[]>();

  useEffect(() => {
    getUserCategories().then((res) => setCategories(res.data ?? []));
  }, []);

  return (
    <Card style={{ width: "100%", padding: "1rem" }}>
      <Heading
        style={{ fontSize: "1.5rem", marginBottom: "1rem" }}
        color="jade"
      >
        Resumo por Categoria
      </Heading>
      <Box
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "1rem",
        }}
      >
        {categories &&
          categories.map((category) => <CategoryCard category={category} />)}
        {!categories && (
          <Callout.Root style={{ width: "100%" }}>
            <Callout.Icon>
              <ExclamationTriangleIcon />
            </Callout.Icon>
            <Callout.Text>
              Você ainda não tem categorias cadastradas.
            </Callout.Text>
          </Callout.Root>
        )}
      </Box>
    </Card>
  );
}
