export interface calendarProps {
  focusedDate: string | null;
  today: string | null;
  currentMonth: singleDayObj[] | null;
  nextMonth: singleDayObj[] | null;
  previousMonth: singleDayObj[] | null;
}

export interface singleDayObj {
  year: number;
  month: number;
  day: number;
}
