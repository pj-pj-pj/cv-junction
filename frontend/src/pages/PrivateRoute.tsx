import { useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { useEffect } from "react";

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { isAuthenticated } = useAuth();
  const nav = useNavigate();

  useEffect(
    function () {
      if (!isAuthenticated) nav("/login");
    },
    [isAuthenticated, nav]
  );

  return isAuthenticated ? children : null;
}

export default ProtectedRoute;
