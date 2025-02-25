import Sidebar from "../components/SideBar";
import { Text } from "../components/base/Text";
import MultiStepForm from "../components/MultiStepForm";
import { useEffect, useState } from "react";
import { getUserProfile } from "@/core/service";

export type StepInfo = {
  step: string,
  totalSteps: number,
  currentStep: number, 
  completedSteps: boolean[]
}

function Home() {
  const [stepInfo, setStepInfo] = useState<StepInfo>({
    step: "", 
    totalSteps: 5,
    currentStep: 0,
    completedSteps: []
  })
  // const [data, setData] = useState<any>({});

  const goTo = (i: number) => {
    if (i > stepInfo.completedSteps.length) return
    setStepInfo({...stepInfo, currentStep: i})
  }


  useEffect(() => {
    const FetchProfile = async () => {
      try {
        const response = await getUserProfile();
        console.log(response.data);
        // setData(response.data);
      } catch (error) {
        console.error("Failed to fetch profile:", error);
      }
    };

    FetchProfile();
  }, [])

  return (
    <div className="flex flex-col md:flex-row w-full h-screen">
      {/* Sidebar - Hidden on small screens */}
      <div className="hidden md:flex">
        <Sidebar totalSteps={stepInfo.totalSteps} currentStep={stepInfo.currentStep} completedSteps={stepInfo.completedSteps} goTo={goTo} />
      </div>

      {/* Mobile Step Indicator */}
      <div className="flex md:hidden w-full justify-center py-4 bg-gray-100 shadow-sm">
        {Array.from({ length: stepInfo.totalSteps }, (_, index) => (
          <button
            key={index}
            className={`w-8 h-8 mx-1 text-sm font-bold rounded-full border-2 ${
              stepInfo.completedSteps[index] ? "bg-green-500 text-white border-green-500" : "border-gray-400 text-gray-600"
            } ${index === stepInfo.currentStep ? "bg-green-700 text-white border-green-700" : ""}`}
            onClick={() => goTo(index)}
          >
            {index + 1}
          </button>
        ))}
      </div>

      {/* Main Content */}
      <div className="flex flex-col items-center justify-center w-full container mx-auto px-4">
        {/* <form className="flex flex-col w-full mt-10 md:mt-40"> */}
          <div className="flex flex-col w-full mt-10 md:mt-40">
            <MultiStepForm setStepInfo={setStepInfo} stepInfo={stepInfo}  />
          </div>
          {/* <Buttons next={next} previous={previous} isFirstStep={isFirstStep} isLastStep={isLastStep} /> */}
        {/* </form> */}
        <div className="w-full flex flex-col items-start justify-start mt-8">
          <Text variant="footnote" className="text-cv-gray mt-1">© 2025, Raccoon Hub. All rights reserved.</Text>
        </div>
      </div>
    </div>
  );
}

export default Home;

