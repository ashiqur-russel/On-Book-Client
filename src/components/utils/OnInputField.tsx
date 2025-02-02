/* eslint-disable @typescript-eslint/no-explicit-any */
import { Controller, Control, UseFormRegister } from "react-hook-form";

interface OnInputFieldProps {
  type: string;
  name: string;
  label: string;
  placeholder?: string;
  control: Control<any>;
  register: UseFormRegister<any>;
  validation?: object;
  error?: string;
}

const OnInputField: React.FC<OnInputFieldProps> = ({
  type,
  name,
  label,
  placeholder,
  control,
  register,
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
              {...register(name, validation)}
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
