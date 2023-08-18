import { createSlice } from "@reduxjs/toolkit";
import { calendarProps } from "./type";
import dayjs from "dayjs";

const initialState: calendarProps = {
  focusedDate: null,
  today: null,
};

const calendarSlice = createSlice({
  name: "calendar",
  initialState,
  reducers: {
    setCurrentDate: (state) => {
      const date = dayjs();

      if (!state?.focusedDate) {
        state.focusedDate = date;
      }
      state.today = date;
    },
  },
});

export const { setCurrentDate } = calendarSlice.actions;
export default calendarSlice;
