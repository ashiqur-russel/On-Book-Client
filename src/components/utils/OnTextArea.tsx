import { Controller, Control } from "react-hook-form";

interface OnTextAreaProps {
  name: string;
  label: string;
  placeholder?: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  control: Control<any>;
  validation?: object;
  error?: string;
}

const OnTextArea: React.FC<OnTextAreaProps> = ({
  name,
  label,
  placeholder,
  control,
  validation,
  error,
}) => {
  return (
    <div className="mt-4">
      <label className="block text-sm font-medium text-gray-700">{label}</label>
      <Controller
        name={name}
        control={control}
        rules={validation}
        render={({ field }) => (
          <>
            <textarea
              {...field}
              placeholder={placeholder}
              rows={4}
              className="w-full border border-gray-300 px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
          </>
        )}
      />
    </div>
  );
};

export default OnTextArea;
