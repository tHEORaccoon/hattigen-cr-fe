import { createBrowserRouter, Navigate, RouteObject } from "react-router-dom";
import {
  SetupPage,
  ProfilePage,
  AdminPage,
  LoginPage,
} from "../../presentation/pages";
import ProtectedRoute from "./ProtectedRoute";

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

const routes: RouteObject[] = [
  {
    path: "/",
    element: <ProtectedRoute />,
    children: [
      { index: true, element: <Navigate to="/profile-page" /> },
      ...["setup-page", "profile-page", "admin"].map((path) => ({
        path,
        Component: () => <PageComponent path={path} />,
      })),
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
    v7_fetcherPersist: true, // Retains fetcher state during navigation
    v7_partialHydration: true, // Supports partial hydration for server-side rendering
    v7_normalizeFormMethod: true, // Normalizes form methods (e.g., POST or GET)
    v7_skipActionErrorRevalidation: true, // Prevents revalidation when action errors occur
    v7_relativeSplatPath: true, // Enables relative paths in nested routes
  },
});

export default router;
