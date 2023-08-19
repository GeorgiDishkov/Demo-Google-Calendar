import dayjs from "dayjs";
import { singleDayObj } from "../../redux/calendarSlice/type";

function useNextMonthDaysTaker(focusedMonth: dayjs.Dayjs) {
  const nextMonth = focusedMonth.add(1, "months");
  const daysInMonth = nextMonth?.daysInMonth();
  const days: singleDayObj[] = [];

  if (nextMonth && daysInMonth) {
    for (let i = 1; i <= daysInMonth; i++) {
      const currentDay = i < 10 ? `0${i}` : `${i}`;
      const currentMonth =
        nextMonth.month() + 1 < 10
          ? `0${nextMonth.month() + 1}`
          : `${nextMonth.month() + 1}`;
      const day = dayjs(
        `${nextMonth.year()}-${currentMonth}-${currentDay}`
      ).toObject();
      days.push({ year: day.years, month: day.months + 1, day: day.date });
    }
  }

  return days;
}

export default useNextMonthDaysTaker;
