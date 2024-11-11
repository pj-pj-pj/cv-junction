import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import AppSidebar from "@/pages/Sidebar/AppSidebar";
import CVBuilder from "./pages/CV/CVBuilder";
import { CVProvider } from "./context/CVContext";
import { AuthProvider } from "./context/AuthContext";
import LoginForm from "./pages/Login/LoginForm";
import SignupForm from "./pages/Signup/SignupForm";
import ProtectedRoute from "./pages/PrivateRoute";

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
              element={
                <div id="cv">
                  <p className="gap-3 text-5xl flex justify-center mt-24 h-full font-black text-primary">
                    Page<span className="text-black">not found</span>
                  </p>
                  <p className="flex justify-center h-full font-black">
                    CVJunction
                  </p>
                </div>
              }
            />
          </Routes>
        </Router>
      </AuthProvider>
    </CVProvider>
  );
}

export default App;
