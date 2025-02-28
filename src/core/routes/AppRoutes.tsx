import { Routes, Route, Navigate } from "react-router-dom";
import LoginScreen from "../../presentation/pages/Login";
import Home from "../../presentation/pages/SetupPage";
import ProfilePage from "../../presentation/pages/ProfilePage";
import AdminPage from "../../presentation/pages/Admin";
import ProtectedRoute from "./ProtectedRoute";

const AppRoutes = () => (
  <Routes>
    {/* Default Redirection */}
    <Route path="/" element={<Navigate replace to="/setup-page" />} />

    {/* Protected Routes */}
    {["setup-page", "profile-page", "admin"].map((path) => (
      <Route
        key={path}
        path={`/${path}`}
        element={
          <ProtectedRoute
            element={<PageComponent path={path} />}
          ></ProtectedRoute>
        }
      />
    ))}

    {/* Authentication Routes */}
    <Route path="/auth/login" element={<LoginScreen />} />
    <Route path="/auth" element={<Navigate replace to="/auth/login" />} />

    {/* 404 - Redirect unknown routes */}
    <Route path="*" element={<Navigate to="/auth/login" />} />
  </Routes>
);


const PageComponent = ({ path }: { path: string }) => {
  switch (path) {
    case "setup-page":
      return <Home />;
    case "profile-page":
      return <ProfilePage />;
    case "admin":
      return <AdminPage />;
    default:
      return null;
  }
};

export default AppRoutes;