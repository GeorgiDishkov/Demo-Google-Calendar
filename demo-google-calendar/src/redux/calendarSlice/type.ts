import dayjs from "dayjs";

export interface calendarProps {
  focusedDate: dayjs.Dayjs | null;
  today: dayjs.Dayjs | null;
}
