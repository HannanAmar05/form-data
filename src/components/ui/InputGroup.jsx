import React from "react";

const InputGroup = ({ label, children, error }) => {
  return (
    <div className="mb-4">
      {label && <label className="font-medium text-md mb-3" htmlFor="">{label}</label>}
      {children}
      {error && (
        <p className="mt-1 text-sm text-red-500 font-medium">{error}</p>
      )}
    </div>
  );
};

export default InputGroup;
