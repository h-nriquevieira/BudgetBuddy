import { ExclamationTriangleIcon } from "@radix-ui/react-icons";
import {
  Box,
  Button,
  PopoverClose,
  Heading,
  Text,
  TextField,
  TextFieldInput,
  Callout,
} from "@radix-ui/themes";
import { useState } from "react";

export default function NewCategoryPopover() {
  const [formValues, setFormValues] = useState({
    categoryName: "",
    categoryBudget: "",
  });
  const [error, setError] = useState("");

  function handleBudgetChange(e: React.ChangeEvent<HTMLInputElement>) {
    if (/^((\d)+(,\d{0,2})?)?$/.test(e.target.value)) {
      setFormValues((prev) => ({ ...prev, categoryBudget: e.target.value }));
    }
  }

  function handleNameChange(e: React.ChangeEvent<HTMLInputElement>) {
    setFormValues((prev) => ({ ...prev, categoryName: e.target.value }));
  }

  function checkForCurrency(value: string) {
    return /^(\d)+(,\d{1,2})?$/.test(value);
  }

  function handleSubmit() {
    setError("");
    if (!formValues.categoryBudget || !formValues.categoryName) {
      setError("Preencha todos os campos");
    } else if (!checkForCurrency(formValues.categoryBudget)) {
      setError("Preencha corretamente o campo orçamento. Ex.: 500 ou 500,00");
    }
  }

  return (
    <Box
      style={{
        display: "flex",
        flexDirection: "column",
        // alignItems: "center",
        width: "100%",
        padding: "0 2rem",
        gap: "1rem",
      }}
    >
      <Heading
        style={{ fontWeight: "300", textAlign: "center", alignSelf: "center" }}
      >
        Nova categoria
      </Heading>
      <TextFieldInput
        placeholder="Nome da categoria"
        value={formValues.categoryName}
        onChange={handleNameChange}
      />
      <TextField.Root>
        <TextField.Slot>
          <Text style={{ fontWeight: "300", color: "var(--gray-8)" }}>R$</Text>
        </TextField.Slot>
        <TextField.Input
          placeholder="Orçamento da categoria"
          onChange={handleBudgetChange}
          value={formValues.categoryBudget}
        />
      </TextField.Root>

      <Box
        style={{
          display: "flex",
          gap: ".5rem",
          justifyContent: "stretch",
          minWidth: "100%",
        }}
      >
        <PopoverClose>
          <Button style={{ cursor: "pointer", flex: "1" }} variant="outline">
            Cancelar
          </Button>
        </PopoverClose>
        <Button style={{ cursor: "pointer", flex: "1" }} onClick={handleSubmit}>
          Salvar
        </Button>
      </Box>
      {error && (
        <Callout.Root color="tomato" style={{ maxWidth: "min(400px, 70vw)" }}>
          <Callout.Icon>
            <ExclamationTriangleIcon />
          </Callout.Icon>
          <Callout.Text>{error}</Callout.Text>
        </Callout.Root>
      )}
    </Box>
  );
}
