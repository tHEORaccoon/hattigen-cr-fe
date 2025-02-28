import { createBrowserRouter, Navigate, RouteObject } from "react-router-dom";
import LoginScreen from "../../presentation/pages/Login";
import Home from "../../presentation/pages/SetupPage";
import ProfilePage from "../../presentation/pages/ProfilePage";
import AdminPage from "../../presentation/pages/Admin";
import ProtectedRoute from "./ProtectedRoute";

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

const routes: RouteObject[] = [
  {
    path: "/",
    element: <ProtectedRoute />,
    children: [
      ...["setup-page", "profile-page", "admin"].map((path) => ({
        path,
        element: <PageComponent path={path} />,
      })),
    ],
  },
  {
    path: "/auth",
    children: [{ path: "login", element: <LoginScreen /> }],
  },
  {
    path: "*",
    element: <Navigate to="/auth/login" />,
  },
];

const router = createBrowserRouter(routes, {
  future: {
    future: {
      v7_relativeSplatPath: true, // Enables relative paths in nested routes
      v7_fetcherPersist: true, // Retains fetcher state during navigation
      v7_normalizeFormMethod: true, // Normalizes form methods (e.g., POST or GET)
      v7_partialHydration: true, // Supports partial hydration for server-side rendering
      v7_skipActionErrorRevalidation: true, // Prevents revalidation when action errors occur
    },
  },
});

// const AppRoutes = () => (
//   <Routes>
//     {/* Default Redirection */}
//     <Route path="/" element={<Navigate replace to="/setup-page" />} />

//     {/* Protected Routes */}
//     {["setup-page", "profile-page", "admin"].map((path) => (
//       <Route
//         key={path}
//         path={`/${path}`}
//         element={
//           <ProtectedRoute>
//             <PageComponent path={path} />
//           </ProtectedRoute>
//         }
//       />
//     ))}

//     {/* Authentication Routes */}
//     <Route path="/auth/login" element={<LoginScreen />} />
//     <Route path="/auth" element={<Navigate replace to="/auth/login" />} />

//     {/* 404 - Redirect unknown routes */}
//     <Route path="*" element={<Navigate to="/auth/login" />} />
//   </Routes>
// );

export default router;
