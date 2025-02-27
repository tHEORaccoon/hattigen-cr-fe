import React, { useEffect, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { getUserProfile } from "../../core/service";

import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../core/redux/store/store";
import { setUser } from "../../core/redux/slice/authSlice";
import Home from "@/presentation/pages/SetupPage";




const useFetchUser = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [loading, setLoading] = useState(true);
  const user = useSelector((state: RootState) => state.auth.user);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserProfile = async () => {
      if (user) {
        setLoading(false);
        return;
      }

      try {
        const response = await getUserProfile();
        if (!response?.data) {
          navigate("/auth/login", { replace: true });
          return;
        }

        dispatch(setUser(response.data));
      } catch (error) {
        console.error("Error fetching user profile:", error);
        navigate("/auth/login", { replace: true });
      } finally {
        setLoading(false);
      }
    };

    fetchUserProfile();
  }, [dispatch, user, navigate]);

  return { user, loading };
};

const ProtectedRoute = ({ element }: { element: React.ReactElement }) => {
  const { user, loading } = useFetchUser();

  if (loading) return <p>Loading...</p>; // Show a loader while checking authentication

  if (!user) return <Navigate to="/auth/login" replace />;


  return user.onboarding_completed ? element : <Home />;

};

export default ProtectedRoute;
