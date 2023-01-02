// Path: frontend/src/features/auth/UserContext.js

import React, { createContext, useContext, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { parseJson } from "../../utils/jsonUtils";
import { getUserInfo, logout } from "./authSlice";

const UserContext = createContext({
  user: null,
  userToken: null,
  error: null,
});

export const UserContextProvider = ({ children }) => {
  const { user, userToken, error } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    const err = parseJson(error, error);
    if (err?.getUserInfo) {
      // Logout user if getUserInfo fails
      console.log(`Logging out because: ${err.getUserInfo}`);
      dispatch(logout());
    }
  }, [error]);

  useEffect(() => {
    if (userToken) {
      // Getting user info from backend
      console.log(`Getting user info from backend: ${userToken}`);
      dispatch(getUserInfo());
    }
  }, [userToken, dispatch]);

  return (
    <UserContext.Provider value={{ user, userToken, error }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUserContext = () => useContext(UserContext);
