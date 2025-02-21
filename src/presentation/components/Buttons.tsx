import { Button } from "./base/Button";

interface ButtonsProps {
    next: () => void;
    previous: () => void;
    isFirstStep: boolean;
    isLastStep: boolean;
    currentStep: number;
}

const Buttons = ({next, previous, isFirstStep, isLastStep}: ButtonsProps) => {
  return (
    <div className="flex gap-5 md:justify-between w-full mt-20">
      {/* Back Button - Takes Space But Invisible When isFirstStep */}
      {isFirstStep ? <div></div> : <Button variant="outline" onClick={previous}>Back</Button>}

      {/* Continue Button - Always in the Same Position */}
      <Button onClick={next}>{isLastStep ? "Finish" : "Continue"}</Button>
    </div>
  )
}

export default Buttons;
