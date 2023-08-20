import dayjs from "dayjs";
import toObject from "dayjs/plugin/toObject";
import { singleDayObj } from "../../redux/calendarSlice/type";

function useCurrentMonthDaysTaker(focusedMonth: dayjs.Dayjs) {
  const daysInMonth = focusedMonth?.daysInMonth();
  const days: singleDayObj[] = [];
  dayjs.extend(toObject);

  if (focusedMonth && daysInMonth) {
    for (let i = 1; i <= daysInMonth; i++) {
      const currentDay = i < 10 ? `0${i}` : `${i}`;
      const currentMonth =
        focusedMonth.month() + 1 < 10
          ? `0${focusedMonth.month() + 1}`
          : `${focusedMonth.month() + 1}`;

      const day = dayjs(
        `${focusedMonth.year()}-${currentMonth}-${currentDay}`
      ).toObject();
      days.push({ year: day.years, month: day.months + 1, day: day.date });
    }
  }

  return days;
}

export default useCurrentMonthDaysTaker;
