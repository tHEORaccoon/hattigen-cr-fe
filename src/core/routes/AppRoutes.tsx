import { Routes, Route, Navigate } from "react-router-dom";
import LoginScreen from "../../presentation/pages/Login";
import Home from "../../presentation/pages/SetupPage";
import ProfilePage from "../../presentation/pages/ProfilePage";
import AdminPage from "../../presentation/pages/Admin";
import ProtectedRoute from "./ProtectedRoute";

const AppRoutes = () => {
  return (
    <Routes>
      {/* Prevent logged-in users from accessing login */}
      <Route path="/login" element={<LoginScreen />} />

      {/* Protected Routes */}
      <Route
        path="/setup-page"
        element={
          <ProtectedRoute>
            <Home />
          </ProtectedRoute>
        }
      />
      <Route
        path="/profile-page"
        element={
          <ProtectedRoute>
            <ProfilePage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin"
        element={
          <ProtectedRoute>
            <AdminPage />
          </ProtectedRoute>
        }
      />

      {/* Redirect unknown routes */}
      <Route path="*" element={<Navigate to="/login" />} />
    </Routes>
  );
};

export default AppRoutes;
