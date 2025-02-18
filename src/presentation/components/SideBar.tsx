// import { Check } from "lucide-react";
import CheckButton from "../../assets/check.svg"

interface SidebarProps {
  totalSteps: number;
  currentStep: number;
  completedSteps: boolean[];
  goTo: (index: number) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ totalSteps, currentStep, completedSteps, goTo }) => {
  return (
    <div className="w-1/8 h-full bg-black p-8 flex flex-col items-center">
      <ul className="space-y-6">
        {Array.from({ length: totalSteps }, (_, index) => (
          <li key={index} className="flex flex-col items-center">
            {/* Step Number or Check Icon */}
            <div
              className={`w-10 h-10 flex items-center justify-center text-lg font-bold rounded-full border-2 transition-all 
                ${completedSteps[index] ? "border-gray-500 text-green-500 bg-slate-100" : "border-gray-400 text-gray-600"} 
                ${index === currentStep ? "bg-green-500 text-black border-white" : ""}`}
              onClick={() => goTo(index)}
            >
              {completedSteps[index] ? <img src={CheckButton} alt="" className="w-4 h-4"/> : index + 1}
            </div>

            {/* Vertical Line (if not last step) */}
            {index !== totalSteps - 1 && <div className="w-[2px] h-12 bg-gray-800"></div>}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;
