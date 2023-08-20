import { Box, Container, styled } from "@mui/material";
import React, { useEffect, useState } from "react";
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
import DayCard from "../../components/DayCard";
import { singleDayObj } from "../../redux/calendarSlice/type";
import fillTheMonth from "../../utils/fillTheMonth";
import weekDays from "../../constant/weekDays";
import AddIcon from "@mui/icons-material/Add";
import CreateEvemtModal from "../../components/CreateEventModal";

const MonthLayout = () => {
  const { year, month, day } = useParams();
  const urlDate = dayjs(`${year}.${month}.${day}`);
  const date = useSelector((state: RootState) => state.calendar.focusedDate);
  const todayDate = useSelector((state: RootState) => state.calendar.today);
  const [showDays, setShowDays] = useState<singleDayObj[]>([]);
  const currentMonth = useSelector(
    (state: RootState) => state.calendar.currentMonth
  );
  const nextMonth = useSelector((state: RootState) => state.calendar.nextMonth);
  const previousMonth = useSelector(
    (state: RootState) => state.calendar.previousMonth
  );

  const navigate = useNavigate();
  const focusedDate = dateConverter(dayjs(date));
  const dispatch = useAppDispach();
  const [open, setOpen] = useState(false);

  const PREFIX = "mont-layout";

  const classes = {
    rowWripper: `${PREFIX}-rowWripper`,
    addEvent: `${PREFIX}-addEvent`,
  };

  const StyledPlusWrapper = styled(Box)(({ theme }) => ({
    display: "flex",
    marginLeft: "12px",
    marginTop: "12px",
    width: "60px",
    height: "60px",
    backgroundColor: "transparent",
    borderRadius: "50%",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    zIndex: "20",
    position: "absolute",
    boxShadow: "0px 0px 5px #00000059",
    "&:hover": {
      backgroundColor: theme.palette.background.paper,
      boxShadow: "-1px 7px 16px #00000059",
    },
  }));
  const StyledBox = styled(Container)(() => ({
    position: "absolute",
    top: "64px",
    bottom: 0,
    left: 0,
    right: 0,
    [`& .${classes.rowWripper}`]: {
      height: "100%",
      flex: "1 1 auto",
      display: "grid",
      gridTemplateRows: `repeat(${showDays.length > 35 ? "6" : "5"}, 1fr)`,
      gridTemplateColumns: "repeat(7, 1fr)",
    },
    [`& .${classes.addEvent}`]: {
      display: "flex",
      marginLeft: "12px",
      marginTop: "12px",
      width: "60px",
      height: "60px",
      backgroundColor: "transparent",
      borderRadius: "50%",
      flexDirection: "row",
      justifyContent: "center",
      alignItems: "center",
    },
  }));

  useEffect(() => {
    if (!urlDate.isValid()) {
      const url = urlConverter(dayjs(todayDate));
      navigate(url);
    }
    if (
      JSON.stringify(dateConverter(urlDate)) !== JSON.stringify(focusedDate)
    ) {
      const date = dayjs(`${year}.${month}.${day}`);
      dispatch(setFocusedDate(date.toISOString()));
    }
  }, [urlDate]);

  useEffect(() => {
    if (
      date &&
      currentMonth &&
      (dayjs(date)?.date() !== currentMonth?.[0]?.day ||
        dayjs(date)?.month() + 1 !== currentMonth?.[0]?.month ||
        dayjs(date)?.year() !== currentMonth?.[0]?.year)
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

  useEffect(() => {
    if (currentMonth && nextMonth && previousMonth) {
      const filledMonth = fillTheMonth({
        currentMonth,
        nextMonth,
        previousMonth,
      });
      setShowDays(filledMonth || []);
    }
  }, [currentMonth]);

  const handleCreate = () => {
    setOpen(true);
  };
  const onClose = () => {
    setOpen(false);
  };

  return (
    <>
      <CreateEvemtModal isOpen={open} onClose={onClose} />
      <StyledPlusWrapper onClick={handleCreate} className={classes.addEvent}>
        <AddIcon color="secondary" fontSize="large" />
      </StyledPlusWrapper>
      <StyledBox style={{ padding: 0, maxWidth: "100%" }}>
        <Box className={classes.rowWripper}>
          {showDays?.map((day, index) => {
            return (
              <DayCard
                key={index}
                day={day}
                weekDayTitle={index < 7 ? weekDays[index] : null}
              />
            );
          })}
        </Box>
      </StyledBox>
    </>
  );
};

export default MonthLayout;
