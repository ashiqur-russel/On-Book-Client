import { Controller, Control } from "react-hook-form";

interface OnInputFieldProps {
  type: string;
  name: string;
  label: string;
  placeholder?: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  control: Control<any>;
  validation?: object;
  error?: string;
}

const OnInputField: React.FC<OnInputFieldProps> = ({
  type,
  name,
  label,
  placeholder,
  control,
  validation,
  error,
}) => {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700">{label}</label>
      <Controller
        name={name}
        control={control}
        defaultValue=""
        rules={validation}
        render={({ field }) => (
          <>
            <input
              {...field}
              type={type}
              placeholder={placeholder}
              className="w-full border border-gray-300 px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
          </>
        )}
      />
    </div>
  );
};

export default OnInputField;
