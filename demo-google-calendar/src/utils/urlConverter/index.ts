import dayjs from "dayjs";
import toObject from "dayjs/plugin/toObject";

const urlConverter = (date: dayjs.Dayjs) => {
  dayjs.extend(toObject);
  const dateObj = dayjs(date).toObject();

  const url = `/month/${dateObj.years}/${dateObj.months + 1}/${dateObj.date}`;
  return url;
};

export default urlConverter;
