import { configureStore } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";
import eventSlice from "./eventSlice/reducer";
import calendarSlice from "./calendarSlice/reducer";

const store = configureStore({
  reducer: {
    events: eventSlice.reducer,
    calendar: calendarSlice.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
export const useAppDispach: () => AppDispatch = useDispatch;

export default store;
