import { useState } from "react";
import { FaGoogle } from "react-icons/fa";
import { useForm, SubmitHandler } from "react-hook-form";
import OnForm from "../../components/utils/OnForm";
import { useRegisterUserMutation } from "../../redux/features/user/registerApi";
import { toast } from "sonner";
import { useNavigate } from "react-router";

interface SignUpFormValues {
  name: string;
  email: string;
  password: string;
}

const SignUp = () => {
  const [emailSignUp, setEmailSignUp] = useState(false);
  const [registerUser] = useRegisterUserMutation();
  const navigate = useNavigate();

  const {
    handleSubmit,
    reset,
    formState: { errors },
    control,
    setError,
    register,
  } = useForm<SignUpFormValues>({
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  const onSubmit: SubmitHandler<SignUpFormValues> = async (data) => {
    try {
      const formattedData = {
        user: {
          name: data.name,
          email: data.email,
          password: data.password,
        },
      };

      const result = await registerUser(formattedData).unwrap();

      if (result?.success) {
        toast.success("Account created successfully! Redirecting to login...", {
          duration: 2000,
        });

        reset();
        setTimeout(() => {
          navigate("/signin");
        }, 2000);
      }
    } catch {
      setError("email", { type: "manual", message: "Email already exists" });
    }
  };

  // Form Fields with Validation
  const signUpFields = [
    {
      label: "Name",
      type: "text",
      name: "name" as keyof SignUpFormValues,
      placeholder: "Enter your full name",
      validation: {
        required: "Name is required",
      },
      error: errors.name?.message,
    },
    {
      label: "Email",
      type: "email",
      name: "email" as keyof SignUpFormValues,
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
      name: "password" as keyof SignUpFormValues,
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
  ];

  return (
    <div className="min-h-screen flex">
      <div className="flex flex-1 justify-center items-center p-6">
        <div className="w-full max-w-md text-center">
          {emailSignUp ? (
            <>
              {/* Email Sign-Up Form */}
              <OnForm<SignUpFormValues>
                title="Sign up with Email"
                fields={signUpFields}
                buttonText="Create Account"
                control={control}
                register={register}
                handleSubmit={handleSubmit}
                onSubmit={onSubmit}
              />

              {/* Back to Google Sign-Up */}
              <button
                onClick={() => setEmailSignUp(false)}
                className="mt-4 text-sm text-gray-600 underline hover:text-black"
              >
                Back to Google Sign Up
              </button>
            </>
          ) : (
            <>
              {/* Default Sign-Up Page */}
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                Sign up to On.Book
              </h2>

              {/* Google Sign-Up Button */}
              <button className="w-full flex items-center justify-center bg-black text-white py-3 rounded-full hover:bg-gray-800 transition">
                <FaGoogle className="mr-2 text-lg" />
                Sign up with Google
              </button>

              {/* Divider */}
              <div className="relative my-6 text-center">
                <span className="text-gray-500 text-sm">or</span>
                <div className="absolute left-0 top-1/2 transform -translate-y-1/2 w-1/3 border-t border-gray-300"></div>
                <div className="absolute right-0 top-1/2 transform -translate-y-1/2 w-1/3 border-t border-gray-300"></div>
              </div>

              {/* Continue with Email */}
              <button
                onClick={() => setEmailSignUp(true)}
                className="w-full flex items-center justify-center border border-gray-300 text-gray-700 py-3 rounded-full hover:bg-gray-100 transition"
              >
                Continue with email
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default SignUp;
