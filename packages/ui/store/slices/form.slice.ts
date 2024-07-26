import { createSlice } from "@reduxjs/toolkit";
import { set } from "react-hook-form";

export const formSlice: any = createSlice({
  name: "form",
  initialState: {
    popup: false,
  },
  reducers: {
    setPopup: (state, payload) => {
      state.popup = payload.payload;
    },
  },
});

export const { setPopup } = formSlice.actions;
export default formSlice.reducer;
