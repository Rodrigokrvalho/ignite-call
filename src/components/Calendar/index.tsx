import { CaretLeft, CaretRight } from "phosphor-react";
import { CalendarActions, CalendarBody, CalendarContainer, CalendarHeader, CalendarTitle } from "./styles";
import { getWeekDays } from "@/utils/get-week-days";
import dayjs from "dayjs";
import { useMemo, useState } from "react";

interface Props {

}

export function Calendar({}: Props) {
  const [currentDate, setCurrentDate] = useState(() => {
    return dayjs().set('date', 1);
  });

  const shortWeekDays = getWeekDays({ isShort: true });

  const currentMounth = currentDate.format('MMMM');
  const currentYear = currentDate.format('YYYY');

  const calendarWeeks = useMemo(() => {
    const daysInMounth = Array.from({
      length: currentDate.daysInMonth(),
    }).map((_, i) => {
      return currentDate.set('date', i + 1);
    });

    const firstWeekDay = currentDate.get('day');

    const previusMounthFillArray = Array.from({
      length: firstWeekDay
    }).map((_, i) => {
      return currentDate.subtract(i + 1, 'day');
    })
      .reverse();

    return [
      ...previusMounthFillArray,
      ...daysInMounth
    ];

  }, [currentDate]);

  function handleNextMonth() {
    const nextMonth = currentDate.add(1, 'month');
    setCurrentDate(nextMonth);
  }

  function handlePreviousMonth() {
    const previousMonth = currentDate.subtract(1, 'month');
    setCurrentDate(previousMonth);
  }

  return (
    <CalendarContainer>
      <CalendarHeader>
        <CalendarTitle>
          {currentMounth} <span>{currentYear}</span>
        </CalendarTitle>

        <CalendarActions>
          <button onClick={handlePreviousMonth} title="Previous mounth">
            <CaretLeft />
          </button>
          <button onClick={handleNextMonth} title="Next mounth">
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