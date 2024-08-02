import { createSlice } from "@reduxjs/toolkit";

export const commentsSlice: any = createSlice({
  name: "comments",
  initialState: {
    newParentComment: null,
    newNestedComment: null,
    refresh: false,
  },
  reducers: {
    setParentComment: (state, payload) => {
      state.newParentComment = payload.payload;
    },
    setNestedComment: (state, payload) => {
      state.newNestedComment = payload.payload;
    },
    setRefresh: (state, payload) => {
      state.refresh = payload.payload;
    },
  },
});

export const { setParentComment, setNestedComment, setRefresh } =
  commentsSlice.actions;
export default commentsSlice.reducer;
