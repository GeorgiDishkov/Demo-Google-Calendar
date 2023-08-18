import { createSlice } from "@reduxjs/toolkit";
import eventData from "../../data/events.json";
import dayjs from "dayjs";

const initialState = eventData;

const eventSlice = createSlice({
  name: "events",
  initialState,
  reducers: {
    setTodayDay: (state) => {
      const date = dayjs();
      const today = date.date();
    },
  },
});

export default eventSlice;
