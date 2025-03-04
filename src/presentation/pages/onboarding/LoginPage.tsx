import { Text } from "../../components/base/Text";
import { Button } from "../../components/base/Button";
import React from "react";
import AuthSidebar from "./components/AuthSidebar";
import { useAuth } from "@/core/hooks/userAuth";
import { GoogleImage } from "@/assets";

const LoginPage: React.FC = () => {
  const { loginWithGoogle } = useAuth();

  return (
    <div className="font-poppins flex flex-col md:flex-row h-screen w-full bg-gray-100">
      <AuthSidebar />

      <div className="w-full md:w-3/4 bg-white flex flex-col justify-center p-8 md:p-16 md:pl-28 drop-shadow-xl">
        <Text variant="sub-heading">Login to Raccoon Hub</Text>
        <Button
          variant="secondary"
          iconUrl={GoogleImage}
          className="w-80 px-0 py-3 mt-4 md:mt-6"
          onClick={loginWithGoogle}
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

export default LoginPage;
