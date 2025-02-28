import { createBrowserRouter, Navigate } from "react-router-dom";
import {
  SetupPage,
  ProfilePage,
  AdminPage,
  LoginPage,
} from "../../presentation/pages";
import ProtectedRoute from "./ProtectedRoute";

const routes = [
  {
    path: "/",
    element: <ProtectedRoute />,
    children: [
      { index: true, element: <Navigate to="/profile-page" /> },
      { path: "setup-page", element: <SetupPage /> },
      { path: "profile-page", element: <ProfilePage /> },
      { path: "admin", element: <AdminPage /> },
    ],
  },
  {
    path: "/auth",
    children: [{ path: "login", element: <LoginPage /> }],
  },
  {
    path: "*",
    element: <Navigate to="/auth/login" />,
  },
];

const router = createBrowserRouter(routes, {
  future: {
    v7_fetcherPersist: true,
    v7_partialHydration: true,
    v7_normalizeFormMethod: true,
    v7_skipActionErrorRevalidation: true,
    v7_relativeSplatPath: true,
  },
});

export default router;
