import React, { useEffect } from "react";
import TopBar from "./components/topBar";
import { RootState, useAppDispach } from "./redux/store";
import { setCurrentDate, setMonthDays } from "./redux/calendarSlice/reducer";
import { useSelector } from "react-redux";
import { Navigate, Route, Routes } from "react-router-dom";
import MonthLayout from "./pages/MonthLayout";
import dateConverter from "./utils/dateConverter";
import { LinearProgress } from "@mui/material";
import dayjs from "dayjs";
import WrongDate from "./pages/WrongDate";
import useNextMonthDaysTaker from "./hooks/useNextMonthDaysTaker";
import useCurrentMonthDaysTaker from "./hooks/useCurrentMonthDaysTaker";
import usePreviousMonthDaysTaker from "./hooks/usePreviousMonthDaysTaker/inxex";

function App() {
  const today = dayjs(useSelector((state: RootState) => state.calendar.today));
  const focusedDate = dayjs(
    useSelector((state: RootState) => state.calendar.focusedDate)
  );
  const currentMonth = useSelector(
    (state: RootState) => state.calendar.currentMonth
  );
  const dispatch = useAppDispach();

  useEffect(() => {
    dispatch(setCurrentDate());
    if (today) {
      const nextMonthDays = useNextMonthDaysTaker(today);
      const currentMonthDays = useCurrentMonthDaysTaker(today);
      const previousMonthDays = usePreviousMonthDaysTaker(today);

      dispatch(
        setMonthDays({
          currentMonthDays,
          nextMonthDays,
          previousMonthDays,
        })
      );
    }
  }, []);

  const RedirectToToday = () => {
    if (today) {
      const formatedDate = dateConverter(today);
      const replaceUrl = `/month/${formatedDate.year}/${
        formatedDate.month + 1
      }/${formatedDate.day}`;
      return <Navigate to={replaceUrl} replace={true} />;
    }
    return null;
  };

  return (
    <>
      {!today ? (
        <LinearProgress color="secondary" />
      ) : (
        <>
          <TopBar title="Calendar" />
          <Routes>
            <Route path="/month/:year/:month/:day" element={<MonthLayout />} />
            <Route path="/" element={<RedirectToToday />} />
            <Route path="*" element={<WrongDate />} />
          </Routes>
        </>
      )}
    </>
  );
}

export default App;
