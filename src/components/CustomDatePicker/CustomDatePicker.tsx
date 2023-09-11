import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { DayPicker } from "react-day-picker";
import "./styles.css";

type CustomDatePickerProps = {
  value: string;
  setValue: (date: string) => void;
};

export default function CustomDatePicker({
  value,
  setValue,
}: CustomDatePickerProps) {
  function handleSelect(e: Date) {
    const date = format(e, "yyyy-MM-dd") + "T00:00";
    setValue(date);
  }

  return (
    <DayPicker
      mode="single"
      selected={new Date(value)}
      locale={ptBR}
      onSelect={(e) => e && handleSelect(e)}
    />
  );
}
