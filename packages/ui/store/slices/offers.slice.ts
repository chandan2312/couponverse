import { createSlice } from "@reduxjs/toolkit";

export const offersSlice: any = createSlice({
  name: "offers",
  initialState: {
    loadedOffers: [],
    loadedOffersPage: 2,
    btn: true,
  },
  reducers: {
    setLoadedOffers: (state, payload) => {
      state.loadedOffers = payload.payload;
    },
    setLoadedOffersPage: (state, payload) => {
      state.loadedOffersPage = payload.payload;
    },
    setOfferButton: (state, payload) => {
      state.btn = payload.payload;
    },
  },
});

export const { setLoadedOffers, setLoadedOffersPage, setOfferButton } =
  offersSlice.actions;
export default offersSlice.reducer;
