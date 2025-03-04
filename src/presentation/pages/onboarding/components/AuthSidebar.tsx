
import { LogoImage, RaccoonImage } from "@/assets";
import { Text } from "../../../components/base/Text";

const AuthSidebar: React.FC = () => {
  return (
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
  );
};

export default AuthSidebar;
