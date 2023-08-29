import { CalendarStep } from "./CalendarStep";
import { ConfirmStep } from "./ConfirmStep";

interface Props {

}

export function ScheduleForm({}: Props) {

  return (
    <CalendarStep />
    // <ConfirmStep />
  );
}