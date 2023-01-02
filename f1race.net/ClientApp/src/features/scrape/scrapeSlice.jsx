// Path: frontend/src/features/scrape/scrapeSlice.jsx
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import ScrapeService from "./ScrapeService.jsx";
export const scrapeDrivers = createAsyncThunk("scrape/scrape", ({ source }, { rejectWithValue }) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    try {
        let response = yield ScrapeService.scrapeDrivers(source);
        return response.data;
    }
    catch (error) {
        const message = ((_b = (_a = error.response) === null || _a === void 0 ? void 0 : _a.data) === null || _b === void 0 ? void 0 : _b.message) || error.message || error.toString();
        return rejectWithValue(message);
    }
}));
const initialState = {
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
//# sourceMappingURL=scrapeSlice.jsx.map