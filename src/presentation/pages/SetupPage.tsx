import { Link } from "react-router-dom";
import { useMultiStepForm } from "../../core/hooks/useMultiStepForm";
import Buttons from "../components/Buttons";
import Sidebar from "../components/SideBar";
import LanguagesScreen from "../components/LanguagesScreen";
import FrameworkScreen from "../components/FrameworkScreen";
import DatabaseScreen from "../components/DatabaseScreen";
import ProfileInfo from "../components/ProfileInfo";
import CloudPlatformScreen from "../components/CloudPlatformScreen";
import AIScreen from "../components/AIExperienceScreen";

function Home() {
  const { step, next, previous, isFirstStep, isLastStep, currentStep, goTo, completedSteps, totalSteps } = useMultiStepForm([
    <ProfileInfo />,
    <LanguagesScreen />,
    <FrameworkScreen />,
    <DatabaseScreen />,
    <CloudPlatformScreen />,
    <AIScreen />,
  ]);

  return (
    <div className="flex flex-col md:flex-row w-full h-screen">
      {/* Sidebar - Hidden on small screens */}
      <div className="hidden md:flex">
        <Sidebar totalSteps={totalSteps} currentStep={currentStep} completedSteps={completedSteps} goTo={goTo} />
      </div>

      {/* Mobile Step Indicator */}
      <div className="flex md:hidden w-full justify-center py-4 bg-gray-100 shadow-sm">
        {Array.from({ length: totalSteps }, (_, index) => (
          <button
            key={index}
            className={`w-8 h-8 mx-1 text-sm font-bold rounded-full border-2 ${
              completedSteps[index] ? "bg-green-500 text-white border-green-500" : "border-gray-400 text-gray-600"
            } ${index === currentStep ? "bg-green-700 text-white border-green-700" : ""}`}
            onClick={() => goTo(index)}
          >
            {index + 1}
          </button>
        ))}
      </div>

      {/* Main Content */}
      <div className="flex flex-col items-center justify-center w-full container mx-auto px-4">
        <form className="flex flex-col w-full mt-10 md:mt-40">
          <div>{step}</div>
          <Buttons next={next} previous={previous} isFirstStep={isFirstStep} isLastStep={isLastStep} />
        </form>
        <div className="w-full flex flex-col items-start justify-start mt-8">
          <div>
            <Link to="#" className="text-[#7D7D89] text-sm">Terms</Link> |{" "}
            <Link to="#" className="text-[#7D7D89] text-sm">Privacy Policy</Link>
          </div>
          <p className="text-[#7D7D89] text-sm mt-4">© 2021 Raccoon Hub. All rights reserved.</p>
        </div>
      </div>
    </div>
  );
}

export default Home;

