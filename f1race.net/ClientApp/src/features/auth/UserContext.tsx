// Path: frontend/src/features/auth/UserContext.js

import React, { createContext, useContext, useEffect } from "react";
import { parseJson } from "../../utils/jsonUtils";
import { getUserInfo, logout, UserState } from "./authSlice";
import { useAppDispatch, useAppSelector } from "../../hooks/hooks";

const UserContext = createContext<UserState>({
  loading: false,
  user: null,
  error: null,
  success: false,
  userToken: null,
});

type Props = {
  children?: React.ReactNode;
};

export const UserContextProvider = ({ children }: Props) => {
  const userState: UserState = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();

  useEffect(() => {
    const err = parseJson(userState.error, {});
    if (err?.getUserInfo) {
      // Logout user if getUserInfo fails
      console.log(`Logging out because: ${err.getUserInfo}`);
      dispatch(logout());
    }
  }, [userState.error]);

  useEffect(() => {
    if (userState.userToken) {
      // Getting user info from backend
      console.log(`Getting user info from backend: ${userState.userToken}`);
      dispatch(getUserInfo());
    }
  }, [userState.userToken, dispatch]);

  return (
    <UserContext.Provider value={userState}>{children}</UserContext.Provider>
  );
};

export const useUserContext = () => useContext(UserContext);
