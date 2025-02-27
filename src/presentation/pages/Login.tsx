// import React, { useEffect } from "react";
import LogoImage from "../../assets/logo.png";
import RaccoonImage from "../../assets/raccoon-image.png";
import GoogleImage from "../../assets/google-icon.png";
import { Text } from "../components/base/Text";
import { Button } from "../components/base/Button";
// import { AppDispatch, RootState } from "@/core/redux/store/store";
// import { useDispatch, useSelector } from "react-redux";
// import { useNavigate } from "react-router-dom";
// import { setUser } from "@/core/redux/slice/authSlice";
// import { getUserProfile } from "@/core/service";

const LoginScreen: React.FC = () => {
  // const navigate = useNavigate();
  // const dispatch = useDispatch<AppDispatch>();
  // const user = useSelector((state: RootState) => state.auth.user);
  
  // const handleFetchUser = async() => {
  //   try {
  //     const response = await getUserProfile();
  //     console.log("Response:", response);

  //     if (response.data) {
  //       dispatch(setUser(response.data)); // ✅ Correctly dispatch user data
  //       // setIsAuthenticated(true);
  //       // setIsOnboardingComplete(response.data.completed_onboarding || false);
  //     } else {
  //       // setIsAuthenticated(false);
  //     }
  //   } catch (error) {
  //     console.error("Error fetching user profile:", error);
  //     // setIsAuthenticated(false);
  //   }
  // }

  // useEffect(() => {
  //   console.log("Üser: ", user);  
  //   if (user) navigate("/setup-page");
  //   // handleFetchUser();

   
  // }, []);

 
  const handleGoogleLogin = async () => {
    window.location.href = `${import.meta.env.VITE_API_URL}/auth/google`;
  };

  return (
    <div className="font-poppins flex flex-col md:flex-row h-screen w-full bg-gray-100">
      <div className="w-full md:w-1/4 bg-[#F5F5F0] flex flex-col justify-between p-6 md:p-8 relative">
        <div className="h-1/2 relative">
          <img
            src={LogoImage}
            alt="Code Raccoon Logo"
            className="w-16 md:w-28 mx-auto mt-8 mb-4 md:mb-8"
          />
          <Text className="font-medium text-[23px] absolute bottom-28">
            A comprehensive collection of resumes from our talent pool
          </Text>
        </div>
        <div className="relative md:absolute bottom-0 left-0 w-full h-1/2 mt-4 md:mt-0">
          <img
            src={RaccoonImage}
            alt="Raccoon holding resume"
            className="w-full h-full object-contain md:object-cover"
          />
        </div>
      </div>

      <div className="w-full md:w-3/4 bg-white flex flex-col justify-center p-8 md:p-16 md:pl-28 drop-shadow-xl">
        <Text variant="sub-heading">Login to Raccoon Hub</Text>
        <Button
          variant="secondary"
          iconUrl={GoogleImage}
          className="w-80 px-0 py-3 mt-4 md:mt-6"
          onClick={handleGoogleLogin}
        >
          Sign in with Google
        </Button>
        <Text
          variant="footnote"
          className="mt-3 md:mt-11 md:w-80 max-w-xs md:max-w-md text-cv-gray"
        >
          This patform was made and is mantained with ❤️ by the Code Racccoon
          dev team 👨‍💻🦝. Don't share sensitive info from this platform.
        </Text>
      </div>
    </div>
  );
};

export default LoginScreen;
