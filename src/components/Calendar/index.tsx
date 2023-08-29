import { CaretLeft, CaretRight } from "phosphor-react";
import { CalendarActions, CalendarBody, CalendarContainer, CalendarHeader, CalendarTitle } from "./styles";
import { getWeekDays } from "@/utils/get-week-days";

interface Props {

}

export function Calendar({}: Props) {

  const shortWeekDays = getWeekDays({ isShort: true });

  return (
    <CalendarContainer>
      <CalendarHeader>
        <CalendarTitle>
          mes ano
        </CalendarTitle>

        <CalendarActions>
          <button>
            <CaretLeft />
          </button>
          <button>
            <CaretRight />
          </button>
        </CalendarActions>
      </CalendarHeader>

      <CalendarBody>
        <thead>
          <tr>
            {shortWeekDays.map(day => <th key={day}>{day}</th>)}
          </tr>
        </thead>
      </CalendarBody>
    </CalendarContainer>
  );
}