import { Link } from "react-router-dom";
import { useMultiStepForm } from "../../core/hooks/useMultiSteoForm";
import Buttons from "../components/Buttons";
import Sidebar from "../components/SideBar";
import LanguagesScreen from "../components/LanguagesScreen";
import FrameworkScreen from "../components/FrameworkScreen";
import DatabaseScreen from "../components/DatabaseScreen";
import ProfileInfo from "../components/ProfileInfo";

function Home() {
  const { step, next, previous, isFirstStep, isLastStep, currentStep, goTo, completedSteps, totalSteps } = useMultiStepForm([
    <ProfileInfo/>,
    <LanguagesScreen/>,
    <FrameworkScreen/>,
    <DatabaseScreen/>,
    <div>Step 2</div>,
    <div>Step 3</div>,
    <div>Step 3</div>,
    <div>Step 3</div>,
  ]);

  return (
    <div className="flex flex-row w-full h-screen">
      {/* Sidebar */}
      <Sidebar totalSteps={totalSteps} currentStep={currentStep} completedSteps={completedSteps} goTo={goTo} />

      {/* Main Content */}
      <div className="flex flex-col items-center justify-center w-full mx-[46px]">
        <form className="flex flex-col w-full mt-40">
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
