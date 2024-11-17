import React, { createContext, useContext, useState, useEffect } from "react";
import { CV, User } from "@/types/types";
import { CONFIG } from "@/config";

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (
    email: string,
    password: string,
    setError: (msg: string | null) => void,
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
  const [loading, setLoading] = useState<boolean>(true); // New loading state

  useEffect(() => {
    // Call checkSession on app load to set authentication status
    checkSession();
  }, []);

  const login = async (
    email: string,
    password: string,
    setError: (msg: string | null) => void,
    setCVList: (cvList: CV[]) => void
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
        // Save user to sessionStorage and update state
        const user = data.user;
        setUser(user);
        setIsAuthenticated(true);
        sessionStorage.setItem("user", JSON.stringify(user));
        if (user.cvList) setCVList(user.cvList);
        setError(null);
        await checkSession(); // Verify session after login
      } else {
        setError(data.message || "Login failed");
      }
    } catch (err) {
      console.error("Login failed:", err);
      setError("An error occurred. Please try again later.");
    }
  };

  const logout = () => {
    // fetch(`${CONFIG.BACKEND_API}/logout.php`, {
    //   method: "GET",
    //   credentials: "include",
    // })
    //   .then((response) => response.json())
    //   .then((data) => {
    //     if (data.status === "success") {
    setUser(null);
    setIsAuthenticated(false);
    sessionStorage.removeItem("user");
    //   }
    // })
    // .catch((err) => console.log("Logout error", err));
  };

  const checkSession = async () => {
    const savedUser = sessionStorage.getItem("user");
    if (savedUser) {
      // If a user session is found, set the user and authentication status
      const user = JSON.parse(savedUser);
      setUser(user);
      setIsAuthenticated(true);
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
