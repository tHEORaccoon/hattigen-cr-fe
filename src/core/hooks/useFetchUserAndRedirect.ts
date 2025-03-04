import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setUser } from "../../core/redux/slice/authSlice";
import { getUserProfile } from "../../core/service";

const useFetchUserAndRedirect = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await getUserProfile();
        console.log("response", response);
        
        const userData = response?.data;

        if (!userData) {
          console.warn("No user data found, redirecting to login.");
          return navigate("/auth/login", { replace: true });
        }

        dispatch(setUser(userData));

        // Redirect based on user role
        const userRole = userData.role_id?.name?.toLowerCase();
        navigate(getRedirectPath(userRole), { replace: true });

      } catch (error) {
        console.error("Failed to fetch user profile:", error);
        navigate("/auth/login", { replace: true });
      }
    };

    fetchUserProfile();
  }, [dispatch, navigate]);
};

// Helper function for role-based redirection
const getRedirectPath = (role?: string) => {
  switch (role) {
    case "developer":
      return "/profile-page";
    case "admin":
      return "/admin";
    default:
      return "/auth/login"; // Default route for unknown roles
  }
};

export default useFetchUserAndRedirect;
