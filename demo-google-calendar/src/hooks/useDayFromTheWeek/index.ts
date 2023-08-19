import dayjs from "dayjs";
import isoWeek from "dayjs/plugin/isoWeek";
import weekDays from "../../constant/weekDays";

const useDayTaker = (date: dayjs.Dayjs) => {
  dayjs.extend(isoWeek);
  dayjs().isoWeek();
  const dayOfWeek = dayjs(date).isoWeekday();
};

export default useDayTaker;
