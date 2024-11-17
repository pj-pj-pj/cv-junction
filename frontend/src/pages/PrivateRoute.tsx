import { useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { useEffect } from "react";

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { isAuthenticated, loading } = useAuth();
  const nav = useNavigate();

  useEffect(() => {
    if (!loading && !isAuthenticated) {
      nav("/login");
    }
  }, [isAuthenticated, loading, nav]);

  if (loading) {
    return null;
  }

  return isAuthenticated ? children : null;
}

export default ProtectedRoute;
