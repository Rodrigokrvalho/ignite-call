import { Calendar } from "@/components/Calendar";
import { Container, TimePicker, TimePickerHeader, TimePickerItem, TimePickerList } from "./styles";

export function CalendarStep() {
  const isDateSelected = false;

  return (
    <Container isTimePickerOpen={isDateSelected}>
      <Calendar />

      {isDateSelected && (
        <TimePicker >
          <TimePickerHeader>

          </TimePickerHeader>

          <TimePickerList>
            <TimePickerItem>

            </TimePickerItem>
          </TimePickerList>
        </TimePicker>
      )}
    </Container>
  );
}