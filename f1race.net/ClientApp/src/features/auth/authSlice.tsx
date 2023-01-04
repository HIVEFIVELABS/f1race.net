// authSlice.jsx

import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import AuthService from "./authService.jsx";
import axios from "axios";
import { UserLoginData, UserRegData } from "./UserInterfaces";
import { instanceOfUser, User } from "./User";
import { ValidationError } from "yup";
import { RootState } from "../../store";

export const registerUser = createAsyncThunk(
  "auth/register",
  async (userRegData: UserRegData, { rejectWithValue }) => {
    try {
      let response = await AuthService.register(userRegData);
      return response.data?.message ?? "";
    } catch (error: Error | any) {
      const message =
        error.response?.data?.message || error.message || error.toString();
      return rejectWithValue(message);
    }
  }
);

export const loginUser = createAsyncThunk(
  "auth/login",
  async (userLoginData: UserLoginData, { rejectWithValue }) => {
    try {
      let { data } = await AuthService.login(userLoginData);
      return { user: data ?? null };
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const message =
          error.response?.data?.message || error.message || error.toString();
        return rejectWithValue(message);
      } else console.log("unexpected error: ", error);
      return "An unexpected error occurred";
    }
  }
);

export const getUserInfo = createAsyncThunk<
  User | ValidationError | any,
  void,
  {
    state: RootState;
    rejectValue: ValidationError | string;
  }
>("user/getUserInfo", async (_, { getState, rejectWithValue }) => {
  try {
    // get user data from store
    const { auth } = getState();

    // configure authorization header with user's token
    const config = {
      headers: {
        Authorization: `Bearer ${auth.userToken}`,
      },
    };
    return await axios.get<User>(
      import.meta.env.VITE_API_URL + "user/info",
      config
    );
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const message =
        error.response?.data?.message || error.message || error.toString();
      return rejectWithValue(message);
    } else {
      console.log("unexpected error: ", error);
      return rejectWithValue("An unexpected error occurred");
    }
  }
});

const userToken = localStorage.getItem("userToken") ?? null;
console.log("userToken", userToken);

export type UserState = {
  loading: boolean;
  user: User | null;
  error: ValidationError | string | null;
  success: boolean;
  userToken: string | null;
};

const initialState: UserState = {
  loading: false,
  user: null,
  userToken,
  error: null,
  success: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      localStorage.removeItem("userToken");
      state.user = null;
      state.userToken = null;
      state.error = null;
      state.success = false;
    },
    clearAuthResponse: (state) => {
      state.loading = false;
      state.error = null;
      state.success = false;
    },
  },
  extraReducers: (builder) => {
    builder
      // Register auth
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state) => {
        state.loading = false;
        state.success = true; // Registration successful
      })
      .addCase(registerUser.rejected, (state, { payload }) => {
        state.loading = false;
        state.success = false; // Registration failed
        if (payload instanceof ValidationError) {
          state.error = payload;
        }
      })
      // Login auth
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
        console.log("loginUser.pending");
      })
      .addCase(loginUser.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.success = true; // Logged in

        if (instanceOfUser(payload)) {
          state.user = payload;
          state.user.isModerator = payload.roles.includes("ROLE_MODERATOR");
          state.user.isAdmin = payload.roles.includes("ROLE_ADMIN");
          state.userToken = payload.token;
        }
        console.log("loginUser.fulfilled", payload);
      })
      .addCase(loginUser.rejected, (state, { payload }) => {
        state.loading = false;
        if (payload instanceof ValidationError) {
          state.error = payload;
        }
        console.log("loginUser.rejected", payload);
      })
      // Get user info
      .addCase(getUserInfo.pending, (state) => {
        state.loading = true;
        state.error = null;
        console.log("getUserInfo pending");
      })
      .addCase(getUserInfo.fulfilled, (state, { payload }) => {
        state.loading = false;
        if (instanceOfUser(payload)) {
          state.user = payload;
          state.user.isModerator = payload.roles.includes("ROLE_MODERATOR");
          state.user.isAdmin = payload.roles.includes("ROLE_ADMIN");
        }
        console.log("getUserInfo fulfilled");
      })
      .addCase(getUserInfo.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = JSON.stringify({ getUserInfo: payload });
        console.log("getUserInfo rejected");
      });
  },
});

const { reducer, actions } = authSlice;

export const { logout, clearAuthResponse } = actions;

export default reducer;
