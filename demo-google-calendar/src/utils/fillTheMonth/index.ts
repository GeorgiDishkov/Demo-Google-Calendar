import { singleDayObj } from "../../redux/calendarSlice/type";
import dayjs from "dayjs";

interface fillMonthProps {
  currentMonth?: singleDayObj[];
  nextMonth?: singleDayObj[];
  previousMonth?: singleDayObj[];
}

const fillTheMonth = ({
  currentMonth,
  nextMonth,
  previousMonth,
}: fillMonthProps) => {
  const firstDayOfMonth = currentMonth?.[0];
  const lastDayOfMonth = currentMonth?.[currentMonth.length - 1];

  const firstDayInWeek = dayjs(
    `${firstDayOfMonth?.year}/${firstDayOfMonth?.month}/${firstDayOfMonth?.day}`
  ).day();
  const lastDayInWeek =
    dayjs(
      `${lastDayOfMonth?.year}/${lastDayOfMonth?.month}/${lastDayOfMonth?.day}`
    ).day() + 1;

  const fillFistWeek =
    firstDayInWeek > 0 && firstDayInWeek < 7
      ? previousMonth?.slice(-firstDayInWeek, previousMonth.length)
      : [];
  const fillLastWeek =
    lastDayInWeek > 0 && lastDayInWeek < 7
      ? nextMonth?.slice(0, 7 - lastDayInWeek)
      : [];

  const fileedCurrentMonth = [
    ...(fillFistWeek || []),
    ...(currentMonth || []),
    ...(fillLastWeek || []),
  ];
  return fileedCurrentMonth;
};

export default fillTheMonth;
