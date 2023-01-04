export interface UserRegData {
  nickname: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export interface UserLoginData {
  email: string;
  password: string;
}
