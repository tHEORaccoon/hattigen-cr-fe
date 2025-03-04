import { Routes, Route, Navigate } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";
import AuthCallback from "@/presentation/components/AuthCallback";
import PublicCV from "@/presentation/pages/main/PublicCV";
import { ProfilePage, AdminPage, LoginPage, SetupPage } from "@/presentation/pages";

const AppRoutes = () => (
  <Routes>
    {/* Default Redirection */}
    {/* <Route path="/" element={<Navigate replace to="/setup-page" />} /> */}

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

    {/* Public Shareable CV Route */}
    <Route path="/cv/:encodedData" element={<PublicCV />} />
    <Route
      path="/auth/callback"
      element={<ProtectedRoute element={<AuthCallback />}></ProtectedRoute>}
    />

    {/* Authentication Routes */}
    <Route path="/auth/login" element={<LoginPage />} />
    <Route path="/auth" element={<Navigate replace to="/auth/login" />} />

    {/* 404 - Redirect unknown routes */}
    <Route path="*" element={<Navigate to="/auth/login" />} />
  </Routes>
);

const PageComponent = ({ path }: { path: string }) => {
  switch (path) {
    case "setup-page":
      return <SetupPage />;
    case "profile-page":
      return <ProfilePage />;
    case "admin":
      return <AdminPage />;
    default:
      return null;
  }
};

export default AppRoutes;
