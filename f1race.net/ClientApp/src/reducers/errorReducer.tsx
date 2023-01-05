// Path: ClientApp/src/reducers/errorReducer.tsx

import { GET_ERRORS } from "../actions/types";
import { PayloadAction } from "@reduxjs/toolkit";

export type ErrorTypes = Error | string | null;

const initialState: ErrorTypes = null;

export default function (
  state = initialState,
  action: PayloadAction<ErrorTypes>
) {
  switch (action.type) {
    case GET_ERRORS:
      return action.payload;
    default:
      return state;
  }
}
