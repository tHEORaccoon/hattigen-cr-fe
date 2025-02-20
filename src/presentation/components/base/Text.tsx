// src/components/Text.tsx
import React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import clsx from "clsx";

const textVariants = cva("", {
  variants: {
    color: {
      black: "text-[#0A0E0F]",
      white: "text-white",
      green: "text-[#18AD36]",
      blue: "text-[#005AE0]",
      red: "text-[#FF1A1A]",
    },
    variant: {
      "heading": "text-[32px] font-semibold",
      "sub-heading": "text-[24px] font-semibold",
      "body": "text-[15px] font-normal",
      "footnote": "font-light text-[11px]",
      "label-text": "font-medium text-[13px]"
    },
  },
  defaultVariants: {
    variant: "body",
    color: "black",
  },
});

interface TextProps
  extends Omit<React.HTMLAttributes<HTMLSpanElement>, 'color'>,
    VariantProps<typeof textVariants> {
  children: React.ReactNode;
}

const Text: React.FC<TextProps> = ({ children, className, variant, color, ...props }) => {
  const computedClassName = clsx(textVariants({ variant, color }), className);

  return (
    <p {...props} className={computedClassName} >
      {children}
    </p>
  );
};

export { Text, textVariants };
