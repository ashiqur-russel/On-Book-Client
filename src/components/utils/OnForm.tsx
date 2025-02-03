import {
  Control,
  FieldValues,
  UseFormHandleSubmit,
  UseFormRegister,
} from "react-hook-form";
import OnInputField from "./OnInputField";
import { ReactNode } from "react";

interface FormProps<T extends FieldValues> {
  title?: string;
  fields?: {
    label: string;
    type: string;
    name: keyof T;
    placeholder?: string;
    validation?: object;
    error?: string;
  }[];
  buttonText?: string;
  control: Control<T>;
  register: UseFormRegister<T>;
  handleSubmit: UseFormHandleSubmit<T>;
  onSubmit: (data: T) => void;
  children?: ReactNode;
}

const OnForm = <T extends FieldValues>({
  title,
  fields,
  buttonText,
  control,
  register,
  handleSubmit,
  onSubmit,
  children,
}: FormProps<T>) => {
  return (
    <div className="w-full max-w-md bg-white p-6 shadow-md rounded-lg">
      {title && (
        <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
          {title}
        </h2>
      )}

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 text-black">
        {fields?.map((field, index) => (
          <OnInputField
            key={index}
            type={field.type}
            name={field.name as string}
            label={field.label}
            placeholder={field.placeholder}
            control={control}
            register={register}
            validation={field.validation}
            error={field.error}
          />
        ))}
        {children}

        {buttonText && (
          <button
            type="submit"
            className="w-full bg-black text-white py-3 rounded-md hover:bg-gray-800 transition"
          >
            {buttonText}
          </button>
        )}
      </form>
    </div>
  );
};

export default OnForm;
