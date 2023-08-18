import React, { useEffect } from "react";
import TopBar from "./components/topBar";
import { RootState, useAppDispach } from "./redux/store";
import { setCurrentDate } from "./redux/calendarSlice/reducer";
import { useSelector } from "react-redux";

function App() {
  const dateNow = new Date();
  const today = useSelector((state: RootState) => state.calendar.today);
  const dispatch = useAppDispach();

  useEffect(() => {
    dispatch(setCurrentDate());
  }, []);

  return <TopBar title="Календар" />;
}

export default App;
