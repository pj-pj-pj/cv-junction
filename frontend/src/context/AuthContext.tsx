import React, { createContext, useContext, useState, useEffect } from "react";
import { CV, User } from "@/types/types";
import { CONFIG } from "@/config";
import { useCV } from "./CVContext";

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (
    email: string,
    password: string,
    setCVList: (cvList: CV[]) => void
  ) => Promise<void>;
  logout: () => void;
  checkSession: () => Promise<void>;
  loading: boolean; // Add loading state
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);
  const { setCVList, setSelectedCV } = useCV();

  useEffect(() => {
    // Call checkSession on app load to set authentication status
    checkSession();
  }, []);

  const login = async (
    email: string,
    password: string,
    setCVList: (cvList: CV[]) => void // Only pass setCVList to handle CV fetching
  ) => {
    try {
      const response = await fetch(`${CONFIG.BACKEND_API}/login.php`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
        credentials: "include",
      });

      const data = await response.json();

      if (data.status === "success") {
        const user = data.user;
        setUser(user);
        setIsAuthenticated(true);
        sessionStorage.setItem("user", JSON.stringify(user));

        if (user && user.user_id) {
          const cvResponse = await fetch(
            `${CONFIG.BACKEND_API}/fetch_cvs.php?user_id=${user.user_id}`
          );
          const cvData = await cvResponse.json();

          if (cvData.status === "success") {
            setCVList(cvData.cvs); // Set CVs in the CV context
          }
        }

        await checkSession(); // Recheck the session after login
      } else {
        throw new Error(data.message || "Login failed");
      }
    } catch (err) {
      console.error("Login failed:", err);
      throw err; // Throw the error to be caught in LoginForm
    }
  };

  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
    sessionStorage.removeItem("user");
    setCVList([]);
    setSelectedCV(null);
  };

  const checkSession = async () => {
    const savedUser = sessionStorage.getItem("user");
    if (savedUser) {
      // If a user session is found, set the user and authentication status
      const user = JSON.parse(savedUser);
      setUser(user);
      setIsAuthenticated(true);

      const cvResponse = await fetch(
        `${CONFIG.BACKEND_API}/fetch_cvs.php?user_id=${user.user_id}`
      );
      const cvData = await cvResponse.json();

      if (cvData.status === "success") {
        setCVList(cvData.cvs); // Set all CVs from the response
      }
    } else {
      setIsAuthenticated(false);
      setUser(null);
    }
    setLoading(false); // Set loading to false after session check
  };

  return (
    <AuthContext.Provider
      value={{ user, isAuthenticated, login, logout, checkSession, loading }}
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
