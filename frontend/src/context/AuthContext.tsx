import React, { createContext, useContext, useState } from "react";
import { User } from "@/types/types";
import { useCV } from "./CVContext"; // Importing CVContext to set CV data

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  setUser: (user: User) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  const { setCVList } = useCV();

  const login = (user: User) => {
    setUser(user);
    setIsAuthenticated(true);
    fetchCVs(user.user_id);
  };

  const fetchCVs = async (userId: number) => {
    const cvList = [
      {
        cv_id: 1,
        user_id: userId,
        title: "Sample CV",
        personal_info: {
          personal_info_id: 1,
          full_name: "Juan Ewan",
          email: "juan@gmail.com",
          phone_number: "09123456789",
          address: "Lugar, Sa Pilipinas",
        },
        summary: "Very long summary...",
        professional_experience: [],
        education: [],
        skills: [],
      },
    ];

    setCVList(cvList);
  };

  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated,
        setUser: login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
