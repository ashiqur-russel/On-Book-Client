import React, { useState } from "react";
import {
  FieldErrorsImpl,
  Control,
  UseFormHandleSubmit,
  UseFormRegister,
  SubmitHandler,
  UseFormSetValue,
} from "react-hook-form";
import { FaGoogle } from "react-icons/fa";
import { NavLink } from "react-router-dom";
import OnForm from "../utils/OnForm";
import { LoginForm } from "@/pages/Signin/Signin";

export interface LoginFormProps {
  handleSubmit: UseFormHandleSubmit<LoginForm>;
  errors: FieldErrorsImpl<LoginForm>;
  control: Control<LoginForm>;
  register: UseFormRegister<LoginForm>;
  onSubmit: SubmitHandler<LoginForm>;
  isLoading: boolean;
  setValue: UseFormSetValue<LoginForm>;
}

const SignIn: React.FC<LoginFormProps> = ({
  handleSubmit,
  errors,
  control,
  register,
  onSubmit,
  isLoading,
  setValue,
}) => {
  // Track the currently selected dummy role
  const [selectedRole, setSelectedRole] = useState<"user" | "admin" | "none">(
    "none"
  );

  const handleRoleSelect = (role: "user" | "admin") => {
    setSelectedRole(role);

    // Set preset credentials based on role
    if (role === "user") {
      setValue("email", "guest@gmail.com");
      setValue("password", "123456");
    } else {
      setValue("email", "admin@gmail.com");
      setValue("password", "admin123");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6">
      <div className="w-full max-w-md">
        {/* OAuth Button */}
        <button
          type="button"
          className="w-full flex items-center justify-center 
                     border border-gray-300 py-2 rounded-md 
                     text-gray-700 hover:bg-gray-100 transition"
        >
          <FaGoogle className="mr-2 text-lg" />
          Sign in with Google
        </button>

        {/* Divider line and text */}
        <div className="relative z-1 my-6 text-center">
          <span className="text-gray-500 text-sm">or sign in with email</span>
          <div className="absolute left-0 top-1/2 transform -translate-y-1/2 w-1/3 border-t border-gray-300"></div>
          <div className="absolute right-0 top-1/2 transform -translate-y-1/2 w-1/3 border-t border-gray-300"></div>
        </div>

        {/* Dummy account selection */}
        <div className="flex justify-center gap-3 mb-6">
          <button
            type="button"
            onClick={() => handleRoleSelect("user")}
            className={`
              px-4 py-2 rounded 
              font-medium shadow-sm 
              transition-colors duration-200 
              ${
                selectedRole === "user"
                  ? "bg-teal-300 text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-teal-100"
              }
            `}
          >
            Guest User
          </button>
          <button
            type="button"
            onClick={() => handleRoleSelect("admin")}
            className={`
              px-4 py-2 rounded 
              font-medium shadow-sm 
              transition-colors duration-200 
              ${
                selectedRole === "admin"
                  ? "bg-teal-400 text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-teal-100"
              }
            `}
          >
            Admin
          </button>
        </div>

        {/* Form */}
        <OnForm<LoginForm>
          title="Sign in to On.Book"
          fields={[
            {
              label: "Email",
              type: "email",
              name: "email",
              placeholder: "Enter your email",
              validation: {
                required: "Email is required",
                pattern: {
                  value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                  message: "Invalid email format",
                },
              },
              error: errors.email?.message,
            },
            {
              label: "Password",
              type: "password",
              name: "password",
              placeholder: "Enter your password",
              validation: {
                required: "Password is required",
                minLength: {
                  value: 5,
                  message: "Password must be at least 5 characters",
                },
              },
              error: errors.password?.message,
            },
          ]}
          buttonText={isLoading ? "Signing In..." : "Sign In"}
          control={control}
          register={register}
          handleSubmit={handleSubmit}
          onSubmit={onSubmit}
        />

        {/* Signup link */}
        <p className="mt-6 text-sm text-center text-gray-600">
          Don&apos;t have an account?{" "}
          <NavLink
            to="/signup"
            className="text-black font-semibold hover:underline"
          >
            Sign up
          </NavLink>
        </p>
      </div>
    </div>
  );
};

export default SignIn;
