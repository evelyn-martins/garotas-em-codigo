import { createContext, useContext, useState } from "react";
import type { IUser } from "../types/user";
import type { AuthContextType } from "../types/auth";

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [token, setToken] = useState<string | null>(() => localStorage.getItem("token"));
    const [user, setUser] = useState<IUser | null>(() => {
        const storedUser = localStorage.getItem("user");
        return storedUser ? JSON.parse(storedUser) : null;
    });

    const login = (newToken: string, newUser: IUser) => {
        setToken(newToken);
        localStorage.setItem("token", newToken);
        setUser(newUser);
        localStorage.setItem("user", JSON.stringify(newUser));
    }

    const logout = () => {
        setToken(null);
        localStorage.removeItem("token");
        setUser(null);
        localStorage.removeItem("user");
    }

    return (
        <AuthContext.Provider value={{ token, user, login, logout, isLogado: !!token }}>
            {children}
        </AuthContext.Provider>
    );

}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth deve ser usado dentro de um AuthProvider');
  }
  return context;
};