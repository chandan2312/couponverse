import { createSlice } from "@reduxjs/toolkit";

export const commentsSlice: any = createSlice({
  name: "comments",
  initialState: {
    newParentComment: null,
    newNestedComment: null,
  },
  reducers: {
    setParentComment: (state, payload) => {
      state.newParentComment = payload.payload;
    },
    setNestedComment: (state, payload) => {
      state.newNestedComment = payload.payload;
    },
  },
});

export const { setParentComment, setNestedComment } = commentsSlice.actions;
export default commentsSlice.reducer;
