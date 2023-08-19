import dayjs from "dayjs";
import { singleDayObj } from "../../redux/calendarSlice/type";

function usePreviousMonthDaysTaker(focusedMonth?: dayjs.Dayjs) {
  const lastMonth = dayjs(focusedMonth).subtract(1, "months");
  const daysInMonth = dayjs(lastMonth)?.daysInMonth();
  const days: singleDayObj[] = [];

  if (lastMonth && daysInMonth) {
    for (let i = 1; i <= daysInMonth; i++) {
      const currentDay = i < 10 ? `0${i}` : `${i}`;
      const currentMonth =
        lastMonth.month() + 1 < 10
          ? `0${lastMonth.month() + 1}`
          : `${lastMonth.month() + 1}`;
      const day = dayjs(
        `${lastMonth.year()}-${currentMonth}-${currentDay}`
      ).toObject();
      days.push({ year: day.years, month: day.months + 1, day: day.date });
    }
  }

  return days;
}

export default usePreviousMonthDaysTaker;
