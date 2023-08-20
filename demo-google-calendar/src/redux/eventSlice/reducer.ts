import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import eventData from "../../data/events.json";
import { v4 as uuidv4 } from "uuid";
import { eventProps, eventState } from "./type";
import dayjs from "dayjs";

const localStorageData: { [key: string]: string } = {};

for (let i = 0; i < localStorage.length; i++) {
  const key = localStorage.key(i);
  if (key && key.startsWith("g_calendar")) {
    const data = localStorage.getItem(key);
    if (data) {
      localStorageData[key] = data;
    }
  }
}

const combineData = (
  jsonData: { [key: string]: any },
  localStorageData: { [key: string]: any }
) => {
  const combinedData: eventState = { ...jsonData };

  for (const key in localStorageData) {
    if (!jsonData[key] && localStorageData.hasOwnProperty(key)) {
      const parsedData = JSON.parse(localStorageData[key]);
      combinedData[key] = parsedData;
    }
  }

  return combinedData;
};

const initialState: eventState = combineData(eventData, localStorageData);

const eventSlice = createSlice({
  name: "events",
  initialState,
  reducers: {
    addEvent: (state, action: PayloadAction<eventProps>) => {
      const id = uuidv4();
      const data = {
        date: dayjs(action.payload.date).format("DD/MM/YYYY"),
        title: action.payload.title,
        description: action.payload.description,
        typeEvent: action.payload.typeEvent,
        repeatedly: action.payload.repeatedly,
      };
      localStorage.setItem(`g_calendar${id}`, JSON.stringify(data));

      state[id] = data;
    },
  },
});

export const { addEvent } = eventSlice.actions;
export default eventSlice;
