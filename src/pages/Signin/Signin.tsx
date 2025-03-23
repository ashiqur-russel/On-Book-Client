import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../redux/hooks";
import { useLoginMutation } from "../../redux/features/auth/authApi";
import { verifyToken } from "../../utils/verifyToken";
import { setUser, TUser } from "../../redux/features/auth/authSlice";
import { toast } from "sonner";
import SignIn, { LoginFormProps } from "@/components/SignIn/SignIn";

export interface LoginForm {
  email: string;
  password: string;
}

const SignInPage: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [login, { isLoading }] = useLoginMutation();

  const {
    handleSubmit,
    formState: { errors },
    control,
    setError,
    register,
    setValue,
  } = useForm<LoginForm>({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit: SubmitHandler<LoginForm> = async (data) => {
    try {
      const result = await login(data).unwrap();
      const token = result.data.accessToken;
      const user = verifyToken(token) as TUser;

      toast.success("Logged in Successfully", { duration: 200 });
      dispatch(setUser({ user, token }));

      const redirectPath =
        new URLSearchParams(window.location.search).get("redirect") || "/";

      if (!isLoading) {
        if (user.role === "user") {
          navigate(redirectPath);
        } else {
          navigate(`/dashboard/${user.role}`);
        }
      }
    } catch {
      setError("email", {
        type: "manual",
        message: "Invalid email or password",
      });
      toast.error("Invalid credentials. Please try again.");
    }
  };

  const signInProps: LoginFormProps = {
    handleSubmit,
    errors,
    control,
    register,
    onSubmit,
    isLoading,
    setValue,
  };

  return <SignIn {...signInProps} />;
};

export default SignInPage;
