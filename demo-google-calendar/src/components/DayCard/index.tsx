import React, { useRef, useState } from "react";
import { singleDayObj } from "../../redux/calendarSlice/type";
import { Box, Typography, styled } from "@mui/material";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import dayjs from "dayjs";
import { useTheme } from "@emotion/react";
import EventModal from "../EventModal";

const PREFIX = "day-card";

const classes = {
  dayNumber: `${PREFIX}-dayNumber`,
  title: `${PREFIX}-title`,
  eventWrapper: `${PREFIX}-eventWrapper`,
  eventText: `${PREFIX}-eventText`,
};
const StyledBox = styled(Box)(({ theme }) => ({
  display: "flex",
  justifyContent: "flex-start",
  border: "0.3px solid #e0e0e0",
  flexDirection: "column",
  alignItems: "center",

  [`& .${classes.dayNumber}`]: {
    paddingTop: "5px",
  },
  [`& .${classes.eventWrapper}`]: {
    width: "100%",
    borderRadius: "4px",
    backgroundColor: "#177545",
    marginBottom: "2px",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    "&:hover": {
      backgroundColor: "#1a673f",
    },
  },
  [`& .${classes.eventText}`]: {
    paddingLeft: theme.spacing(1),
    color: theme.palette.background.paper,
  },
}));

interface dayCardProps {
  day: singleDayObj;
  weekDayTitle?: string | null;
}

const DayCard = ({ day, weekDayTitle }: dayCardProps) => {
  const events = useSelector((state: RootState) => state.events);
  const date = dayjs(`${day.year}.${day.month}.${day.day}`).format(
    "DD/MM/YYYY"
  );
  const dailyEvents = Object.values(events).filter((event) => {
    if (event.date == date) {
      return event;
    }
  });
  const [open, setOpen] = useState(false);
  const [focusedEvent, setFocusedEvent] = useState<any>(null);

  const onClose = () => {
    setOpen(false);
  };

  const handleClick = (event: any) => {
    setOpen(true);
    setFocusedEvent(event);
  };

  return (
    <StyledBox>
      {weekDayTitle && (
        <Typography
          className={classes.dayNumber}
          textTransform="uppercase"
          fontSize={11}
        >
          {weekDayTitle}
        </Typography>
      )}
      <Typography className={classes.dayNumber} fontSize={11} fontWeight="900">
        {day?.day}
      </Typography>
      <Box style={{ width: "100%" }}>
        {dailyEvents &&
          dailyEvents.map((event, index) => (
            <>
              <EventModal open={open} onClose={onClose} event={focusedEvent} />
              <Box
                key={index}
                onClick={() => handleClick(event)}
                className={classes.eventWrapper}
              >
                <Typography className={classes.eventText} fontSize={13}>
                  {event.title}
                </Typography>
              </Box>
            </>
          ))}
      </Box>
    </StyledBox>
  );
};

export default DayCard;
