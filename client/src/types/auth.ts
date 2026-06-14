import type { IUser } from "./user";

export interface AuthContextType {
  token: string | null;
  user: IUser | null;
  isAuthenticated: boolean;
  login: (token: string, user: IUser) => void;
  logout: () => void;
}