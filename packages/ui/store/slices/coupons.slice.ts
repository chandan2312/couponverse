import { createSlice } from "@reduxjs/toolkit";

export const couponsSlice: any = createSlice({
  name: "coupons",
  initialState: {
    loadedCoupons: [],
    loadedCouponsPage: 2,
    btn: true,
  },
  reducers: {
    setLoadedCoupons: (state, payload) => {
      state.loadedCoupons = payload.payload;
    },
    setLoadedCouponsPage: (state, payload) => {
      state.loadedCouponsPage = payload.payload;
    },
    setCouponButton: (state, payload) => {
      state.btn = payload.payload;
    },
  },
});

export const { setLoadedCoupons, setLoadedCouponsPage, setCouponButton } =
  couponsSlice.actions;
export default couponsSlice.reducer;
