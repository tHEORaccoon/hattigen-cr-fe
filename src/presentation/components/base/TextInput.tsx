import { forwardRef, useState } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { Text } from "./Text";
import { Button } from "./Button";
import AlertImage from "../../../assets/alert.png"
import SuccessImage from "../../../assets/success.png"


const cn = (...inputs: ClassValue[]) => {
    return twMerge(clsx(inputs));
}

const inputContainerVariants = cva(
  "flex items-center rounded-lg bg-gray-100 border border-[#E2E2E2] relative overflow-hidden",
  {
    variants: {
      hasError: {
        true: "",
        false: "",
      }
    },
    defaultVariants: {
      hasError: false,
    },
  }
);


const inputVariants = cva("h-[40px] px-4 flex-1 outline-none placeholder-[#CDCDCD] font-normal", {
  variants: {
    hasError: {
      true: "",
      false: "",
    },
    isPassword: {
      true: "border-r-0 rounded-r-none",
      false: "",
    },
  },
  defaultVariants: {
    hasError: false,
    isPassword: false,
  },
});

const errorTextVariants = cva("opacity-0", {
  variants: {
    hasError: {
      true: "opacity-100 text-error",
      false: "",
    },
  },
  defaultVariants: {
    hasError: false,
  },
});

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement>,
    VariantProps<typeof inputVariants> {
        label?: string;
        labelClasses?: string;
        inputContainerClasses?: string;
        errorClasses?: string;
        errorMessage?: string;
        iconRightUrl?: string;
        iconLeftUrl?: string;
        onToggleSecureContentVisibility?: () => void;
        onFocus?: (e: React.FocusEvent<HTMLInputElement>) => void;
        onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      className,
      label,
      labelClasses,
      inputContainerClasses,
      errorMessage,
      errorClasses,
      type,
      iconLeftUrl,
      iconRightUrl,
      disabled,
      value,
      onToggleSecureContentVisibility,
      onFocus,
      onBlur,
      ...props
    },
    ref
  ) => {
    const isPassword = type === "password";
    const hasError = !!errorMessage;
    // const isRight = !!value && !errorMessage;
    const [isFocused, setIsFocused] = useState(false);

    const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
      setIsFocused(true);
      onFocus?.(e);
    };

    const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
      setIsFocused(false);
      onBlur?.(e);
    };

    return (
      <div className={cn("flex flex-col gap-1.5", className)}>
        {label && (
          <Text
            variant="label-text"
            className={cn(labelClasses, isFocused && "text-blue", hasError && "text-black")}
          >
            {label}
          </Text>
        )}
        <div
          className={cn(
            inputContainerVariants({ 
              hasError: hasError ? true : false, 
            }),
            inputContainerClasses
          )}
        >
          {iconLeftUrl && <div className="pl-4"><img
                    src={iconLeftUrl}
                    alt="Button Icon"
                    className="w-5 md:w-7 h-5 md:h-7"
                /></div>}
          <input
            ref={ref}
            type={isPassword ? "password" : type}
            onFocus={handleFocus}
            onBlur={handleBlur}
            disabled={disabled}
            className={cn(
              inputVariants({
                hasError: hasError ? true : false,
                isPassword: isPassword ? true : false,
              })
            )}
            {...props}
          />
          {isPassword && (
            <Button
              variant="ghost"
              size="sm"
              className="rounded-l-none h-full px-4 w-auto bg-transparent"
              iconUrl={iconLeftUrl}
              onClick={onToggleSecureContentVisibility}
            />
          )}
          {iconRightUrl && <div className="pl-4"><img
                    src={iconRightUrl}
                    alt="Button Icon"
                    className="w-5 md:w-7 h-5 md:h-7"
                /></div>}
            <div className={`absolute bottom-0 w-full h-1 ${isFocused && "bg-blue"} ${hasError && "bg-error"}`}></div>
          {!iconRightUrl && hasError ? <div className="pr-2"><img
                    src={AlertImage}
                    alt="Button Icon"
                    className="w-[15px]"
                /></div> : null}
          {value && !hasError && !isFocused ? <div className="pr-2"><img
          src={SuccessImage}
          alt="Button Icon"
          className="w-[15px]"
      /></div> : null}
        </div>
        <Text
          color="red"
          variant="footnote"
          className={cn(
            errorTextVariants({ hasError: hasError ? true : false }),
            errorClasses,
            "-mt-1 mb-1"
          )}
        >
          {errorMessage}
        </Text>
      </div>
    );
  }
);

Input.displayName = "Input";

export { Input, inputContainerVariants, inputVariants, errorTextVariants };
