import React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import clsx from "clsx";

const buttonVariants = cva(
  "flex items-center justify-center rounded-full transition-colors focus:outline-none", 
  {
    variants: {
      variant: {
        primary: "bg-blue text-white hover:bg-[#0046B0]",
        secondary: "bg-black text-white hover:bg-[#222222]",
        danger: "bg-[#FF1A1A] text-white hover:bg-[#E60000]",
        outline: "border border-black text-black hover:bg-black hover:text-white",
        ghost: "bg-transparent"
      },
      size: {
        sm: "text-[11px] px-3 py-2 font-medium",
        md: "text-[13px] px-11 py-3 font-medium",
        lg: "text-lg px-6 py-3 font-semibold",
      },
      fullWidth: {
        true: "w-full",
      },
      disabled: {
        true: "opacity-50 cursor-not-allowed",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
      fullWidth: false,
      disabled: false,
    },
  }
);

interface ButtonProps
  extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'disabled'>,
    VariantProps<typeof buttonVariants> {
  children?: React.ReactNode;
  iconUrl?: string;
}

const Button: React.FC<ButtonProps> = ({
  children,
  className,
  variant,
  size,
  fullWidth,
  disabled,
  iconUrl,
  ...props
}) => {
  return (
    <button
      className={clsx(buttonVariants({ variant, size, fullWidth, disabled }), className)}
      disabled={disabled as boolean | undefined}
      {...props}
    >
      {iconUrl && <img
                    src={iconUrl}
                    alt="Google Icon"
                    className={`w-5 md:w-7 h-5 md:h-7 ${children && "mr-3"}`}
                />}
      {children && children}
    </button>
  );
};

export { Button, buttonVariants };