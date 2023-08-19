import { Typography } from "@mui/material";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { RootState, useAppDispach } from "../../redux/store";
import { useNavigate, useParams } from "react-router-dom";
import dayjs from "dayjs";
import dateConverter from "../../utils/dateConverter";
import {
  setFocusedDate,
  setMonthDays,
} from "../../redux/calendarSlice/reducer";
import urlConverter from "../../utils/urlConverter";
import useNextMonthDaysTaker from "../../hooks/useNextMonthDaysTaker";
import useCurrentMonthDaysTaker from "../../hooks/useCurrentMonthDaysTaker";
import usePreviousMonthDaysTaker from "../../hooks/usePreviousMonthDaysTaker/inxex";

const MonthLayout = () => {
  const { year, month, day } = useParams();
  const urlDate = dayjs(`${year}.${month}.${day}`);
  const date = useSelector((state: RootState) => state.calendar.focusedDate);
  const todayDate = useSelector((state: RootState) => state.calendar.today);
  const currentMonth = useSelector(
    (state: RootState) => state.calendar.currentMonth
  );

  console.log(date);

  const navigate = useNavigate();
  const focusedDate = dateConverter(dayjs(date));
  const dispatch = useAppDispach();

  useEffect(() => {
    if (!urlDate.isValid()) {
      const url = urlConverter(dayjs(todayDate));
      navigate(url);
    }
    if (
      JSON.stringify(dateConverter(urlDate)) !== JSON.stringify(focusedDate)
    ) {
      const date = dayjs(`${year}.${month}.${day}`);
      (async () => {
        await dispatch(setFocusedDate(date.toISOString()));
      })();
    }
  }, [urlDate]);

  useEffect(() => {
    if (
      date &&
      currentMonth &&
      dayjs(date)?.month() + 1 !== currentMonth?.[0]?.month
    ) {
      const nextMonthDays = useNextMonthDaysTaker(dayjs(date));
      const currentMonthDays = useCurrentMonthDaysTaker(dayjs(date));
      const previousMonthDays = usePreviousMonthDaysTaker(dayjs(date));
      dispatch(
        setMonthDays({
          currentMonthDays,
          nextMonthDays,
          previousMonthDays,
        })
      );
    }
    if (date && currentMonth?.length === 0) {
      const nextMonthDays = useNextMonthDaysTaker(dayjs(date));
      const currentMonthDays = useCurrentMonthDaysTaker(dayjs(date));
      const previousMonthDays = usePreviousMonthDaysTaker(dayjs(date));

      dispatch(
        setMonthDays({
          currentMonthDays,
          nextMonthDays,
          previousMonthDays,
        })
      );
    }
  }, [date]);
  return <Typography>Watafa here</Typography>;
};

export default MonthLayout;
