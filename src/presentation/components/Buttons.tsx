

interface ButtonsProps {
    next: () => void;
    previous: () => void;
    isFirstStep: boolean;
    isLastStep: boolean;
}

const Buttons = ({next, previous, isFirstStep, isLastStep}: ButtonsProps) => {
  return (
    <div className="flex justify-between w-full mt-20">
    {/* Back Button - Takes Space But Invisible When isFirstStep */}
    <button
      className={`flex justify-center items-center border border-black font-semibold w-40 h-10 rounded-full ${
        isFirstStep ? "invisible" : ""
      }`}
      type="button"
      onClick={previous}
    >
      Back
    </button>

    {/* Continue Button - Always in the Same Position */}
    <button
      type="button"
      className="flex justify-center items-center text-white font-semibold bg-blue-600 w-40 h-10 rounded-full"
      onClick={next}
    >
      {isLastStep ? "Finish" : "Continue"}
    </button>
  </div>
  )
}

export default Buttons
