import React, { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { toast } from "sonner";
import { useNavigate } from "react-router";
import { useRegisterUserMutation } from "../../redux/features/user/registerApi";
import SignUp, {
  SignUpFormValues,
  SignUpProps,
} from "@/components/SignUp/SignUp";

const SignUpPage: React.FC = () => {
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

  const signUpProps: SignUpProps = {
    emailSignUp,
    setEmailSignUp,
    handleSubmit,
    errors,
    control,
    register,
    onSubmit,
  };

  return <SignUp {...signUpProps} />;
};

export default SignUpPage;
