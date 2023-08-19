import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { calendarProps, singleDayObj } from "./type";
import dayjs from "dayjs";

const initialState: calendarProps = {
  focusedDate: null,
  today: null,
  currentMonth: null,
  nextMonth: null,
  previousMonth: null,
};

const calendarSlice = createSlice({
  name: "calendar",
  initialState,
  reducers: {
    setCurrentDate: (state) => {
      const date = dayjs().toISOString();
      state.today = date;
    },
    setFocusedDate: (state, action: PayloadAction<string>) => {
      state.focusedDate = action.payload;
    },
    setMonthDays: (state, action: PayloadAction<any>) => {
      state.currentMonth = action.payload.currentMonthDays;
      state.nextMonth = action.payload.nextMonthDays;
      state.previousMonth = action.payload.previousMonthDays;
    },
  },
});

export const { setCurrentDate, setFocusedDate, setMonthDays } =
  calendarSlice.actions;
export default calendarSlice;
