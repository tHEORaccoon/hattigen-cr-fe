import { useEffect, useState } from "react";
import { RootState } from "@/core/redux/store/store";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { StepInfo } from "@/types";
import Sidebar from "@/presentation/components/SideBar";
import MultiStepForm from "@/presentation/components/MultiStepForm";
import { Text } from "../../components/base/Text";

const useRedirectOnboarding = (user: RootState["auth"]["user"]) => {
  const navigate = useNavigate();

  useEffect(() => {
    if (user?.onboarding_completed) {
      navigate("/profile-page", { replace: true });
    }
  }, [user, navigate]);
};

const Home = () => {
  const user = useSelector((state: RootState) => state.auth.user);
  useRedirectOnboarding(user); 

  const [stepInfo, setStepInfo] = useState<StepInfo>({
    step: "",
    totalSteps: 5,
    currentStep: user?.current_step || 0,
    completedSteps: [],
  });

  const goTo = (i: number) => {
    if (i <= stepInfo.completedSteps.length) {
      setStepInfo((prev) => ({ ...prev, currentStep: i }));
    }
  };

  return (
    <div className="flex flex-col md:flex-row w-full h-screen">
      {/* Sidebar - Hidden on small screens */}
      <div className="hidden md:flex">
        <Sidebar
          totalSteps={stepInfo.totalSteps}
          currentStep={stepInfo.currentStep}
          completedSteps={stepInfo.completedSteps}
          goTo={goTo}
        />
      </div>

      {/* Mobile Step Indicator */}
      <div className="flex md:hidden w-full justify-center py-4 bg-gray-100 shadow-sm">
        {Array.from({ length: stepInfo.totalSteps }, (_, index) => (
          <button
            key={index}
            className={`w-8 h-8 mx-1 text-sm font-bold rounded-full border-2 ${
              stepInfo.completedSteps[index]
                ? "bg-green-500 text-white border-green-500"
                : "border-gray-400 text-gray-600"
            } ${index === stepInfo.currentStep ? "bg-green-700 text-white border-green-700" : ""}`}
            onClick={() => goTo(index)}
          >
            {index + 1}
          </button>
        ))}
      </div>

      {/* Main Content */}
      <div className="flex flex-col items-center justify-center w-full container mx-auto px-4">
        <div className="flex flex-col w-full mt-10 md:mt-40">
          {user && <MultiStepForm setStepInfo={setStepInfo} stepInfo={stepInfo} user={user} />}
        </div>
        <div className="w-full flex flex-col items-start justify-start mt-8">
          <Text variant="footnote" className="text-cv-gray mt-1">
            © 2025, Raccoon Hub. All rights reserved.
          </Text>
        </div>
      </div>
    </div>
  );
};

export default Home;
