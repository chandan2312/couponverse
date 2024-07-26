import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./slices/user.slice";
import offersReducer from "./slices/offers.slice";
import couponsReducer from "./slices/coupons.slice";
import formReducer from "./slices/form.slice";

export const store: any = configureStore({
  reducer: {
    user: userReducer,
    offers: offersReducer,
    coupons: couponsReducer,
    form: formReducer,
  },
});
