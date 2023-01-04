// Path: frontend/src/features/scrape/scrapeSlice.jsx

import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import ScrapeService from "./scrapeService";
import axios from "axios";

type ScrapeArgs = {
  source: string;
};

export const scrapeDrivers = createAsyncThunk<
  { data: any },
  ScrapeArgs,
  {
    rejectValue: { error: string };
  }
>("scrape/scrape", async ({ source }, { rejectWithValue }) => {
  try {
    let response = await ScrapeService.scrapeDrivers(source);
    return response.data;
  } catch (error) {
    const message = axios.isAxiosError(error)
      ? error.response?.data?.message
      : (error as Error)?.message ?? (error as string) ?? "Unknown error";
    return rejectWithValue(message);
  }
});

type ScrapeSliceState = {
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
  data: any;
};

const initialState: ScrapeSliceState = {
  status: "idle",
  error: null,
  data: null,
};

export const scrapeSlice = createSlice({
  name: "scrape",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(scrapeDrivers.pending, (state) => {
        state.status = "loading";
      })
      .addCase(scrapeDrivers.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.data = action.payload;
      })
      .addCase(scrapeDrivers.rejected, (state, action) => {
        state.status = "failed";
        state.data = action.payload;
      });
  },
});

const { reducer } = scrapeSlice;

export default reducer;
