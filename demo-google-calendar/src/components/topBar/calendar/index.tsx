import { useTheme, Box } from "@mui/material";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import React, { useEffect, useState } from "react";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import { useSelector } from "react-redux";
import { RootState, useAppDispach } from "../../../redux/store";
import dayjs from "dayjs";
import { setFocusedDate } from "../../../redux/calendarSlice/reducer";
import { useNavigate } from "react-router-dom";
import urlConverter from "../../../utils/urlConverter";

const TopBarCalendar = () => {
  const theme = useTheme();
  const filteredDate = useSelector(
    (state: RootState) => state?.calendar?.focusedDate
  );
  const today = useSelector((state: RootState) => state?.calendar?.today);
  const [selectedDate, setSelectedDate] = useState<dayjs.Dayjs | null>(null);
  const dispatch = useAppDispach();
  const navigate = useNavigate();

  useEffect(() => {
    if (!dayjs(filteredDate).isSame(selectedDate) && selectedDate) {
      dispatch(setFocusedDate(selectedDate.toISOString()));
      const url = urlConverter(selectedDate);

      navigate(url, { replace: true, state: { preventRender: false } });
    }
  }, [selectedDate]);

  useEffect(() => {
    if (filteredDate || today) {
      setSelectedDate(dayjs(filteredDate ? filteredDate : today));
    }
  }, [filteredDate, today]);

  return (
    <Box>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <Box>
          <DatePicker
            views={["month", "year"]}
            value={selectedDate}
            onChange={(date) => setSelectedDate(date)}
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
    </Box>
  );
};

export default TopBarCalendar;
