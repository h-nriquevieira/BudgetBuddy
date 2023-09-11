import { CalendarIcon } from "@radix-ui/react-icons";
import {
  Box,
  Button,
  Heading,
  Popover,
  Select,
  Text,
  TextField,
  TextFieldInput,
} from "@radix-ui/themes";
import { useState } from "react";
import CustomDatePicker from "../CustomDatePicker/CustomDatePicker";
import { format } from "date-fns";

type NewExpensePopoverProps = {
  categories: { [key: string]: string };
};

export default function NewExpensePopover({
  categories,
}: NewExpensePopoverProps) {
  const [formValues, setFormValues] = useState({
    amount: "",
    category_id: "",
    date: format(new Date(), "yyyy-MM-dd") + "T00:00",
    description: "",
  });

  const [isDatePickerOpen, setIsDatePickerOpen] = useState(false);

  function handleBudgetChange(e: React.ChangeEvent<HTMLInputElement>) {
    if (/^((\d)+(,\d{0,2})?)?$/.test(e.target.value)) {
      setFormValues((prev) => ({ ...prev, amount: e.target.value }));
    }
  }

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setFormValues((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  function handleSelectChange(e: string) {
    setFormValues((prev) => ({ ...prev, category_id: e }));
  }

  function handleDateChange(date: string) {
    setFormValues((prev) => ({
      ...prev,
      date: date,
    }));
    setIsDatePickerOpen(false);
  }

  function toggleDatePicker() {
    setIsDatePickerOpen((prev) => !prev);
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
        Registrar despesa
      </Heading>
      <TextFieldInput
        placeholder="Descrição"
        value={formValues.description}
        onChange={handleChange}
        name="description"
      />
      <TextField.Root>
        <TextField.Slot>
          <Text style={{ fontWeight: "300", color: "var(--gray-8)" }}>R$</Text>
        </TextField.Slot>
        <TextField.Input
          placeholder="Valor"
          onChange={handleBudgetChange}
          value={formValues.amount}
        />
      </TextField.Root>
      <Select.Root name="category_id" onValueChange={handleSelectChange}>
        <Select.Trigger placeholder="Categoria" style={{ cursor: "pointer" }} />
        <Select.Content>
          {Object.keys(categories).map((category) => (
            <Select.Item
              value={category}
              key={category}
              onClick={() => console.log(category)}
              style={{ cursor: "pointer" }}
            >
              {categories[category]}
            </Select.Item>
          ))}
        </Select.Content>
      </Select.Root>
      <Popover.Root open={isDatePickerOpen}>
        <Popover.Trigger onClick={toggleDatePicker}>
          <Box
            style={{
              display: "flex",
              alignItems: "center",
              gap: ".5rem",
              cursor: "pointer",
            }}
          >
            <Button>
              <CalendarIcon />
            </Button>
            <Text>
              {formValues.date
                ? new Date(formValues.date).toLocaleDateString("pt-br")
                : "Selecione uma data"}
            </Text>
          </Box>
        </Popover.Trigger>
        <Popover.Content>
          <CustomDatePicker
            value={formValues.date}
            setValue={handleDateChange}
            toggleDatePicker={toggleDatePicker}
          />
        </Popover.Content>
      </Popover.Root>
      <Box style={{ display: "flex", gap: ".5rem", justifyContent: "end" }}>
        <Button style={{ cursor: "pointer" }} variant="outline">
          Limpar
        </Button>
        <Button style={{ cursor: "pointer" }}>Salvar</Button>
      </Box>
    </Box>
  );
}
