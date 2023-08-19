import dayjs from "dayjs";
import toObject from "dayjs/plugin/toObject";

const dateConverter = (date: dayjs.Dayjs) => {
  dayjs.extend(toObject);
  const dateObj = dayjs(date).toObject();

  const convertedData = {
    year: dateObj.years,
    month: dateObj.months,
    day: dateObj.date,
  };
  return convertedData;
};

export default dateConverter;
