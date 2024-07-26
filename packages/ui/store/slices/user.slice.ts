import { createSlice } from "@reduxjs/toolkit";
import { set } from "react-hook-form";

export const userSlice: any = createSlice({
  name: "user",
  initialState: {
    user: null,
    sessionUser: null,
    sessionMethod: null,
    registerPopup: false,
    loginPopup: false,
    signupPopup: false,
  },
  reducers: {
    setUser: (state, payload) => {
      state.user = payload.payload;
    },
    setSessionUser: (state, payload) => {
      state.sessionUser = payload.payload;
    },
    setSessionMethod: (state, payload) => {
      state.sessionMethod = payload.payload;
    },
    setRegisterPopup: (state, payload) => {
      state.registerPopup = payload.payload;
    },
    setLoginPopup: (state, payload) => {
      state.loginPopup = payload.payload;
    },
    setSignupPopup: (state, payload) => {
      state.signupPopup = payload.payload;
    },
  },
});

export const {
  setUser,
  setSessionUser,
  setSessionMethod,
  setRegisterPopup,
  setLoginPopup,
  setSignupPopup,
} = userSlice.actions;
export default userSlice.reducer;
