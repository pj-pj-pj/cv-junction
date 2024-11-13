import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import AppSidebar from "@/pages/Sidebar/AppSidebar";
import CVBuilder from "./pages/CV/CVBuilder";
import { CVProvider } from "./context/CVContext";
import { AuthProvider } from "./context/AuthContext";
import LoginForm from "./pages/Login/LoginForm";
import SignupForm from "./pages/Signup/SignupForm";
import ProtectedRoute from "./pages/PrivateRoute";
import PageNotFound from "./pages/PageNotFound/PageNotFound";

function App() {
  return (
    <CVProvider>
      <AuthProvider>
        <Router>
          <Routes>
            <Route
              path="/login"
              element={<LoginForm />}
            />
            <Route
              path="/signup"
              element={<SignupForm />}
            />

            <Route
              path="/"
              element={
                <ProtectedRoute>
                  <AppSidebar />
                </ProtectedRoute>
              }
            >
              <Route
                path="cv"
                element={<CVBuilder />}
              />
            </Route>

            <Route
              path="*"
              element={<PageNotFound />}
            />
          </Routes>
        </Router>
      </AuthProvider>
    </CVProvider>
  );
}

export default App;
