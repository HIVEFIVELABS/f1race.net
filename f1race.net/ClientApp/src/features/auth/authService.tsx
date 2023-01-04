// authService.jsx

import axios from "axios";
import { UserLoginData, UserRegData } from "./UserInterfaces";

const register = async (userRegData: UserRegData) => {
  const { nickname, email, password } = userRegData;

  return await axios.post(import.meta.env.VITE_API_URL + "auth/register", {
    nickname,
    email,
    password,
  });
};

const login = async (userLoginData: UserLoginData) => {
  const { email, password } = userLoginData;

  const response = await axios.post(
    import.meta.env.VITE_API_URL + "auth/login",
    {
      email,
      password,
    }
  );

  if (response.data.email) {
    localStorage.setItem("userToken", response.data?.userToken ?? null);
  }

  return response;
};

const AuthService = { register, login };

export default AuthService;
