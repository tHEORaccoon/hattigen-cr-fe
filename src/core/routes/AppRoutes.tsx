import { Routes, Route, Navigate } from 'react-router-dom';
import ProtectedRoute from './ProtectedRoute';
import LoginScreen from '../../presentation/pages/Login';
import Home from '../../presentation/pages/SetupPage';
import ProfilePage from '../../presentation/pages/ProfilePage';

const AppRoutes = () => {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/login" element={<LoginScreen />} />
      {/* <Route path="/logout" element={<Logout />} /> */}

      {/* Protected Routes */}
      <Route path="/setup-page" element={<ProtectedRoute><Home /></ProtectedRoute>} />
      <Route path="/profile-page" element={<ProtectedRoute><ProfilePage /></ProtectedRoute>} />

  

      {/* Redirect unknown routes */}
      <Route path="*" element={<Navigate to="/login" />} />
    </Routes>
  );
};

export default AppRoutes;
