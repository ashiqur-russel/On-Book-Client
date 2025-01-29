import { Control, useController } from "react-hook-form";

interface InputProps {
  name: string;
  label: string;
  type: string;
  placeholder?: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  control: Control<any>;
}

const OnInputField: React.FC<InputProps> = ({
  name,
  label,
  type,
  placeholder,
  control,
}) => {
  const {
    field,
    fieldState: { error },
  } = useController({ name, control });

  return (
    <div>
      <label className="block text-sm font-medium text-gray-700">{label}</label>
      <input
        {...field}
        type={type}
        placeholder={placeholder}
        className="w-full border border-gray-300 px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      {error && <p className="text-red-500 text-xs mt-1">{error.message}</p>}
    </div>
  );
};

export default OnInputField;
