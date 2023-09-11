import { CalendarIcon, ExclamationTriangleIcon } from "@radix-ui/react-icons";
import {
  Box,
  Button,
  Callout,
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
import { ExpenseCreateRequest } from "../../types/ExpensesTypes";
import { useAuthContext } from "../../context/AuthContext/useAuthContext";
import { postExpense } from "../../service/ExpensesService";
import { useSubmit } from "react-router-dom";

type NewExpensePopoverProps = {
  categories: { [key: string]: string };
  triggerNotification: () => void;
};

export default function NewExpensePopover({
  categories,
  triggerNotification,
}: NewExpensePopoverProps) {
  const { user } = useAuthContext();
  const submit = useSubmit();

  const initialFormValue = {
    amount: "",
    category_id: "",
    date: format(new Date(), "yyyy-MM-dd") + "T00:00",
    description: "",
  };

  const [formValues, setFormValues] = useState(initialFormValue);

  const [isDatePickerOpen, setIsDatePickerOpen] = useState(false);

  const [error, setError] = useState("");

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

  async function sendCreateRequest() {
    if (!user) return;
    if (
      !formValues.amount ||
      !formValues.category_id ||
      !formValues.date ||
      !formValues.description
    ) {
      setError("Preencha todos os campos.");
      return;
    }
    const expense: ExpenseCreateRequest = {
      amount: parseFloat(formValues.amount.replace(",", ".")),
      category_id: parseInt(formValues.category_id),
      date: formValues.date,
      description: formValues.description,
      user_id: user?.id,
    };
    const res = await postExpense(expense);
    if (res.statusText == "Created") {
      submit(expense);
      triggerNotification();
    } else {
      setError("Ops, parece que algo deu errado.");
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
          />
        </Popover.Content>
      </Popover.Root>
      <Box style={{ display: "flex", gap: ".5rem", justifyContent: "end" }}>
        <Button
          style={{ cursor: "pointer" }}
          variant="outline"
          onClick={() => {
            setFormValues(initialFormValue);
            setError("");
          }}
        >
          Limpar
        </Button>
        <Button style={{ cursor: "pointer" }} onClick={sendCreateRequest}>
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
