import { Button, useTheme, styled, Box } from "@mui/material";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import React, { useEffect, useRef, useState } from "react";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import { useSelector } from "react-redux";
import { RootState } from "../../../redux/store";
import dayjs from "dayjs";

const PREFIX = "calendar";

const classes = {
  calendarWrapper: `${PREFIX}-calendarWrapper`,
};
const StyledBox = styled(Box)(({ theme }) => ({
  [`& .${classes.calendarWrapper}`]: {},
}));

const TopBarCalendar = () => {
  const theme = useTheme();
  const filteredDate = useSelector(
    (state: RootState) => state?.calendar?.focusedDate
  );
  const [selectedDate, setSelectedDate] = useState<dayjs.Dayjs | null>(null);

  useEffect(() => {
    if (filteredDate) {
      setSelectedDate(filteredDate);
    }
  }, [filteredDate]);

  return (
    <StyledBox>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <Box>
          <DatePicker
            value={selectedDate}
            onChange={(date) => setSelectedDate(date)}
            className={classes.calendarWrapper}
            showDaysOutsideCurrentMonth
            slots={{
              openPickerIcon: ArrowDropDownIcon,
            }}
            slotProps={{
              textField: {
                variant: "standard",
              },
            }}
          />
        </Box>
      </LocalizationProvider>
    </StyledBox>
  );
};

export default TopBarCalendar;
