"use client";

import { cn } from "@/cn";
import { useEffect, useState } from "react";

interface CustomInputProps extends React.ComponentProps<"input"> {
  labelText: string;
}

export const CustomInput = ({
  id,
  value,
  className,
  labelText,
  onChange,
  onBlur,
  type,
  ...props
}: CustomInputProps) => {
  const [focused, setFocused] = useState<boolean>(false);
  const [inputValue, setInputValue] = useState<
    string | number | readonly string[] | undefined
  >(value);

  useEffect(() => {
    if (value !== undefined) {
      setInputValue(value);
    }
  }, [value]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
    onChange?.(e);
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    setFocused(false);
    onBlur?.(e);
  };

  const hasValue = inputValue !== "" && inputValue !== undefined;

  return (
    <div className="relative w-full">
      <label
        htmlFor={id}
        className={cn(
          "font-fig-tree pointer-events-none absolute left-0 text-lg font-medium text-white transition-all duration-300 ease-in-out",
          focused || hasValue ? "text-secondary-500 top-1 text-base" : "top-6",
        )}
      >
        {labelText}
      </label>
      <input
        id={id}
        type={type}
        className={cn(
          "font-fig-tree input-autofill w-full border-b border-white bg-transparent pt-6 pb-2 text-white transition-all outline-none focus:border-gray-300",
          className,
        )}
        value={inputValue}
        onBlur={handleBlur}
        onChange={handleChange}
        onFocus={() => setFocused(true)}
        {...props}
      />
    </div>
  );
};
