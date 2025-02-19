import { ReactElement, useState } from "react";

export function useMultiStepForm(steps: ReactElement[]) {
    const [currentStep, setCurrentStep] = useState(0);
    const [completedSteps, setCompletedSteps] = useState<boolean[]>(new Array(steps.length).fill(false));
    const [formData, setFormData] = useState({});





    const next = () => {
        setCompletedSteps(prev => {
            const updated = [...prev];
            updated[currentStep] = true; 
            return updated;
        });

        setCurrentStep(i => (i >= steps.length - 1 ? i : i + 1));
    };

    const previous = () => {
        setCurrentStep(i => (i <= 0 ? i : i - 1));
    };

    const goTo = (index: number) => {
        setCurrentStep(index);
    };

    return {
        currentStep,
        step: steps[currentStep],
        steps,
        next,
        previous,
        goTo,
        formData,
        setFormData,
        totalSteps: steps.length,
        isLastStep: currentStep === steps.length - 1,
        isFirstStep: currentStep === 0,
        completedSteps, 
    };
}
