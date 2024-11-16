import React, { createContext, useContext, useState, useEffect } from "react";
import { User } from "@/types/types";
import { useCV } from "./CVContext";

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (user: User) => void;
  logout: () => void;
  fetchCVs: (userId: number) => Promise<void>;
  BACKEND_API: string;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const { setCVList } = useCV();
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const BACKEND_API = "http://localhost/cv-junction/backend/";

  const login = (user: User) => {
    setUser(user);
    setIsAuthenticated(true);
  };

  const fetchCVs = async (userId: number) => {
    try {
      const response = await fetch(
        `${BACKEND_API}/fetch_cvs.php?user_id=${userId}`,
        {
          method: "GET",
          credentials: "include", // Ensure cookies are sent with the request
        }
      );

      const data = await response.json();

      if (data.status === "success") {
        setCVList(data.cvs || []); // Set CV list in context
      } else {
        console.error("Failed to fetch CV list");
      }
    } catch (err) {
      console.error("Error fetching CVs:", err);
    }
  };

  const logout = () => {
    fetch(`${BACKEND_API}/logout.php`, {
      method: "GET",
      credentials: "include",
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.status === "success") {
          setUser(null);
          setIsAuthenticated(false);
        }
      })
      .catch((err) => console.log("Logout error", err));
  };

  return (
    <AuthContext.Provider
      value={{ user, isAuthenticated, login, logout, fetchCVs, BACKEND_API }}
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
