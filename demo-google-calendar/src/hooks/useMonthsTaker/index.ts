import dayjs from "dayjs";
import localeData from "dayjs/plugin/localeData";

const useMonthTaker = () => {
  dayjs.extend(localeData);

  const monthAsString = dayjs.months();
};

export default useMonthTaker;
