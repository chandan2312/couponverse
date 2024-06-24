import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./slices/user.slice.js";

export const store:any = configureStore({
	reducer: {
		user: userReducer,
		
	},
});
