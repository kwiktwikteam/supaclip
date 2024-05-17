import React from "react";

interface ButtonProps {
  children: React.ReactNode;
  variant?: "light" | "dark" | "white";
  onClick?: () => void;
  className?: string;
  disabled?: boolean;
}


const Button = ({ children, variant = "light", onClick, className, disabled }: ButtonProps) => {
  return (
    <button
      disabled={disabled}
      onClick={onClick}
      className={`flex items-center justify-center font-semibold ${
        variant == "dark"
          ? "bg-black text-white"
          : variant == "light"
            ? "text-purple border-purple"
            : "bg-white"
      }  cursor-pointer text-nowrap rounded-full px-6 py-3 duration-200 hover:scale-105 ${className}`}
    >
      {children}
    </button>
  );
};

export default Button;
