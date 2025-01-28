import React, { useState } from "react";

interface InputProps {
  label: string;
  type: string;
  name: string;
  required?: boolean;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const OnInputField: React.FC<InputProps> = ({
  label,
  type,
  name,
  required,
  onChange,
}) => {
  const [value, setValue] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
    if (onChange) onChange(e);
  };

  return (
    <div className="relative mb-6">
      <input
        id={name}
        name={name}
        type={type}
        required={required}
        value={value}
        onChange={handleChange}
        className="peer w-full border border-gray-300 px-4 py-3 text-black bg-white rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500 placeholder-transparent"
        placeholder=" " // Hides placeholder to prevent overlap
      />
      <label
        className={`absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500 text-sm transition-all 
          peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2 
          peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 
          peer-focus:top-2 peer-focus:text-xs peer-focus:text-gray-700 
          ${value ? "top-2 text-xs text-gray-700" : ""}`}
      >
        {label}
      </label>
    </div>
  );
};

export default OnInputField;
