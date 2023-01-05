// Path: ClientApp/src/features/errorSlice.jsx

import { createSlice } from "@reduxjs/toolkit";

type ErrorState = {
  error: any;
};

const initialState: ErrorState = {
  error: null,
};

const errorSlice = createSlice({
  name: "error",
  initialState,
  reducers: {
    getErrors: (state, action) => {
      return { error: action.payload };
    },
  },
});

const { reducer, actions } = errorSlice;

export const { getErrors } = actions;
export default reducer;
