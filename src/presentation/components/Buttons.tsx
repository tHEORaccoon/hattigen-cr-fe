import { useNavigate } from "react-router-dom";

interface ButtonsProps {
    next: () => void;
    previous: () => void;
    isFirstStep: boolean;
    isLastStep: boolean;
    currentStep: number;
}

const Buttons = ({ next, previous, isFirstStep, isLastStep, currentStep }: ButtonsProps) => {
    const navigate = useNavigate();

    const handleNext = () => {
        localStorage.setItem("currentStep", currentStep.toString());
        next();
    };

    const handleFinish = () => {
        localStorage.setItem("hasCompletedSetup", "true");
        localStorage.removeItem("currentStep"); // Clear progress after finishing
        navigate("/profile-page");
    };

    return (
        <div className="flex gap-5 md:justify-between w-full mt-20">
            <button
                className={`flex justify-center items-center border border-black font-semibold w-40 h-10 rounded-full ${
                    isFirstStep ? "invisible" : ""
                }`}
                type="button"
                onClick={previous}
            >
                Back
            </button>

            <button
                type="button"
                className="flex justify-center items-center text-white font-semibold bg-blue-500 w-40 h-10 rounded-full"
                onClick={isLastStep ? handleFinish : handleNext}
            >
                {isLastStep ? "Finish" : "Continue"}
            </button>
        </div>
    );
};

export default Buttons;
