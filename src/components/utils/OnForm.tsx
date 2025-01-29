import { Control } from "react-hook-form";
import OnInputField from "./OnInputField";

interface FormProps {
  title: string;
  fields: {
    label: string;
    type: string;
    name: string;
    placeholder?: string;
    validation?: object;
    error?: string;
  }[];
  buttonText: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  control: Control<any>;
  onSubmit: () => void;
}

const OnForm: React.FC<FormProps> = ({
  title,
  fields,
  buttonText,
  control,
  onSubmit,
}) => {
  return (
    <div className="w-full max-w-md bg-white p-6 shadow-md rounded-lg">
      <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
        {title}
      </h2>

      <form onSubmit={onSubmit} className="space-y-4 text-black">
        {fields.map((field, index) => (
          <OnInputField
            key={index}
            type={field.type}
            name={field.name}
            label={field.label}
            placeholder={field.placeholder}
            control={control}
            validation={field.validation}
            error={field.error}
          />
        ))}

        <button
          type="submit"
          className="w-full bg-black text-white py-3 rounded-md hover:bg-gray-800 transition"
        >
          {buttonText}
        </button>
      </form>
    </div>
  );
};

export default OnForm;
