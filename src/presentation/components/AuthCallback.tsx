import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getUserProfile } from "../../core/service";
import { setUser } from "../../core/redux/slice/authSlice";

const AuthCallback = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserAndRedirect = async () => {
      try {
        const response = await getUserProfile();
        if (response?.data) {
          dispatch(setUser(response.data));

          // Extract role and redirect
          const userRole = response.data.role_id?.name.toLowerCase();
          if (userRole === "developer") {
            navigate("/profile-page");
          } else if (userRole === "admin") {
            navigate("/admin");
          } else {
            navigate("/auth/login"); // Default route
          }
        } else {
          navigate("/auth/login"); // Redirect if user data is missing
        }
      } catch (error) {
        console.error("Error fetching user profile:", error);
        navigate("/auth/login");
      }
    };

    fetchUserAndRedirect();
  }, [dispatch, navigate]);

  return <p>Redirecting...</p>; // Show a loader while redirecting
};

export default AuthCallback;
