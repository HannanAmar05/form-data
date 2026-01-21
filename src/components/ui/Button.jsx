import { Plus } from "lucide-react";
import React from "react";

const Button = ({ children, variant, onClick, className, type="button" }) => {
  const baseStyle = "flex justify-center gap-4 items-center px-2 py-1 rounded-md font-medium";

  const variants = {
    primary: "bg-sky-800 text-white",
    outline: "bg-white text-sky-800 border border-sky-800",
    delete: "text-red-500 transition-colors bg-red-100 hover:bg-red-500 hover:text-white  ",
    edit: "bg-orange-400 text-white hover:bg-orange-500 transition-colors "
  };

  return (
    <button
      onClick={onClick}
      type={type}
      className={`${baseStyle} ${variants[variant]} ${className}`}
    >
      {children}
    </button>
  );
};

export default Button;
