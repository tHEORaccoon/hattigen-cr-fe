import { useDispatch } from "react-redux";
import { loginWithGoogle } from "../redux/slice/authSlice";

export const useAuth = () => {
    const dispatch = useDispatch();
    return { loginWithGoogle: () => dispatch(loginWithGoogle()) };
  };