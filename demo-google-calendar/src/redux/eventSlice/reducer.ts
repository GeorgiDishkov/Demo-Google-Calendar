import { createSlice } from "@reduxjs/toolkit";
import eventData from "../../data/events.json";

const initialState = eventData;

const eventSlice = createSlice({
  name: "events",
  initialState,
  reducers: {},
});

export default eventSlice;
