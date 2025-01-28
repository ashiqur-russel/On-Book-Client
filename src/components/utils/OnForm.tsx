import React from "react";
import OnInputField from "./OnInputField";

interface FormProps {
  title: string;
  fields: {
    label: string;
    type: string;
    name: string;
    required?: boolean;
  }[];
  buttonText: string;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
}

const OnForm: React.FC<FormProps> = ({
  title,
  fields,
  buttonText,
  onSubmit,
}) => {
  return (
    <div className="w-full max-w-md bg-white p-6 shadow-md rounded-lg">
      <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
        {title}
      </h2>

      <form onSubmit={onSubmit} className="space-y-4">
        {fields.map((field, index) => (
          <OnInputField
            key={index}
            type={field.type}
            name={field.name}
            required={field.required}
            label={field.label}
          />
        ))}

        <button className="w-full bg-black text-white py-3 rounded-md hover:bg-gray-800 transition">
          {buttonText}
        </button>
      </form>
    </div>
  );
};

export default OnForm;
