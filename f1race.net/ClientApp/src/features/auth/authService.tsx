// authService.jsx

import axios from "axios";

const register = async (nickname, email, password) => {
  return await axios.post(import.meta.env.VITE_API_URL + "auth/register", {
    nickname,
    email,
    password,
  });
};

const login = async (email, password) => {
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
