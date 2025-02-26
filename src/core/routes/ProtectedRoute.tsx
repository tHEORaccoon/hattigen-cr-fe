import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { getUserProfile } from "../../core/service";
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "../../core/redux/store/store";
import { setUser } from "../../core/redux/slice/authSlice"; // Import correct action

const ProtectedRoute = ({ children }: { children: React.ReactElement }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const dispatch = useDispatch<AppDispatch>();

  // Select user data from Redux store
  const user = useSelector((state: RootState) => state.auth.user);
  console.log("User in ProtectedRoute:", user);

  useEffect(() => {
    checkUserLoggedIn();
  }, []);

  const checkUserLoggedIn = async () => {
    try {
      const response = await getUserProfile();
      console.log("Response:", response);

      if (response.data) {
        dispatch(setUser(response.data)); // ✅ Correctly dispatch user data
        setIsAuthenticated(true);
      } else {
        setIsAuthenticated(false);
      }
    } catch (error) {
      console.error("Error fetching user profile:", error);
      setIsAuthenticated(false);
    }
  };

  if (isAuthenticated === null) return <p>Loading...</p>; // Show a loader while checking

  return isAuthenticated ? children : <Navigate to="/login" />;
};

export default ProtectedRoute;
