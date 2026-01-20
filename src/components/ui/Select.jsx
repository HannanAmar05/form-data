import React from "react";
import { ChevronDown } from "lucide-react";

const Select = ({ value, onChange, options }) => {
  return (
    <div className="relative">
      <select
        value={value}
        onChange={onChange}
        className="appearance-none border border-gray-300 rounded-md w-full p-2 pr-8 focus:outline-none  text-sm bg-white"
      >
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
      <ChevronDown
        className="absolute right-2 top-2.5 text-sky-800 pointer-events-none"
        size={20}
      />
    </div>
  );
};

export default Select;
