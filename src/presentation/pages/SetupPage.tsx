import { useMultiStepForm } from "../../core/hooks/useMultiSteoForm";
import Buttons from "../components/Buttons";
import ProfileInfo from "../components/ProfileInfo";



function Home() {
  const { step, next, previous, isFirstStep, isLastStep } = useMultiStepForm([
    // Call your components here
    <ProfileInfo/>,
    <div>hw</div>
    
    
  ]); // Pass your components here

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-[#FFFFFF] overflow-x-hidden mx-[46px]">
        <form action="" className="flex flex-col w-full mt-40">
          <div>
            {step}
          </div>
            <Buttons next={next} previous={previous} isFirstStep={isFirstStep} isLastStep={isLastStep} />
        </form>
    </div>
  );
}

export default Home;


