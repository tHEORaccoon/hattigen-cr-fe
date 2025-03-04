// import { Check } from "lucide-react";
import CheckButton from "../../assets/check.svg"
import { Text } from "./base/Text";

interface SidebarProps {
  totalSteps: number;
  currentStep: number;
  completedSteps: boolean[];
  goTo: (index: number) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ totalSteps, currentStep, completedSteps, goTo }) => {
  console.log(completedSteps)
  return (
    <div className="w-1/8 h-full bg-black p-8 flex flex-col items-center">
      <div className="m-auto">
        {Array.from({ length: totalSteps }, (_, index) => (
          <div key={index} className="flex flex-col items-center">
            {/* Step Number or Check Icon */}
            <div key={index}
              className={`w-7 h-7 flex items-center justify-center text-lg font-medium rounded-full border transition-all cursor-pointer ${index === currentStep ? "bg-green-500 text-black border-white" : completedSteps[index] ? "border-white bg-white" :  "bg-[#313030] border-[#313030]"}`}
              onClick={() => goTo(index)}
            >
              {completedSteps[index] ? <img src={CheckButton} alt="" className="w-3 h-3"/> : index === currentStep ? <Text variant="body">{index + 1}</Text> : null}
            </div>

            {/* Vertical Line (if not last step) */}
            {index !== totalSteps - 1 && <div className={`w-[1px] h-8 transition-all ${completedSteps[index] ? "bg-white" : "bg-[#5C5C5C50]"}`}></div>}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Sidebar;
