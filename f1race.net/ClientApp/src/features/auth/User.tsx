export type User = {
  id: number;
  nickname: string;
  email: string;
  password: string;
  roles: string[];
  token: string;
  isModerator: boolean;
  isAdmin: boolean;
};

export const instanceOfUser = (object: any): object is User => {
  return (
    "id" in object &&
    "nickname" in object &&
    "email" in object &&
    "password" in object &&
    "roles" in object &&
    "token" in object &&
    "isModerator" in object &&
    "isAdmin" in object
  );
};
