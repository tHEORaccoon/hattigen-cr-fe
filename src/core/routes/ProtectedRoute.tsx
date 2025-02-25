import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
// import axiosInstance from "../../core/service/axiosInstance";
import { getUserProfile } from "../../core/service";

const ProtectedRoute = ({ children }: { children: React.ReactElement }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

  useEffect(() => {
    checkUserLoggedIn();
  }, []);

  const checkUserLoggedIn = async () => {
    const response = await getUserProfile();
    console.log("Response: ", response);
    
    if (response.data) {
      return setIsAuthenticated(true);
    }

    return setIsAuthenticated(false);
  };

  if (isAuthenticated === null) return <p>Loading...</p>; // Show a loader while checking

  return isAuthenticated ? children : <Navigate to="/login" />;
};

export default ProtectedRoute;
