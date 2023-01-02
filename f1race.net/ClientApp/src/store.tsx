// ClientApp/src/store.tsx

import { configureStore } from "@reduxjs/toolkit";
import errorReducer from "./reducers/errorReducer.jsx";
import authReducer from "./features/auth/authSlice.jsx";
import messageReducer from "./features/messageSlice";
import scrapeReducer from "./features/scrape/scrapeSlice.jsx";

const inititalState = {};

const store = configureStore({
  reducer: {
    auth: authReducer,
    message: messageReducer,
    error: errorReducer,
    // socket: socketReducer,
    scrape: scrapeReducer,
  },
  devTools: true,
  /*middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(socketMiddleware),*/
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
