import { useForm, SubmitHandler } from "react-hook-form";
import { FaGoogle } from "react-icons/fa";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../redux/hooks";
import { useLoginMutation } from "../../redux/features/auth/authApi";
import { verifyToken } from "../../utils/verifyToken";
import { setUser, TUser } from "../../redux/features/auth/authSlice";
import { toast } from "sonner";
import OnForm from "../../components/utils/OnForm";

interface LoginForm {
  email: string;
  password: string;
}

const SignIn = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [login, { isLoading }] = useLoginMutation();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const errorParam = searchParams.get("error");

  const {
    handleSubmit,
    formState: { errors },
    control,
    setError,
    register,
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

      await new Promise((resolve) => setTimeout(resolve, 200));

      const redirectPath =
        new URLSearchParams(location.search).get("redirect") || "/";

      if (user.role === "user") {
        navigate(redirectPath);
      } else {
        navigate(`/dashboard/${user.role}`);
      }
    } catch {
      setError("email", {
        type: "manual",
        message: "Invalid email or password",
      });
      toast.error("Invalid credentials. Please try again.");
    }
  };

  return (
    <div className="min-h-screen flex">
      <div className="flex flex-1 justify-center items-center p-6">
        <div className="w-full max-w-md">
          {/* Google Sign In Button */}
          <button className="w-full flex items-center justify-center border border-gray-300 py-2 rounded-md text-gray-700 hover:bg-gray-100 transition">
            <FaGoogle className="mr-2 text-lg" />
            Sign in with Google
          </button>

          <div className="relative z-1  my-6 text-center">
            <span className="text-gray-500 text-sm">or sign in with email</span>
            <div className="absolute left-0 top-1/2 transform -translate-y-1/2 w-1/3 border-t border-gray-300"></div>
            <div className="absolute right-0 top-1/2 transform -translate-y-1/2 w-1/3 border-t border-gray-300"></div>
          </div>
          {errorParam && <p className="text-red-500">{errorParam}</p>}

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

          {/* Sign Up Link */}
          <p className="mt-6 text-sm text-center text-gray-600">
            Don't have an account?{" "}
            <NavLink
              to={"/signup"}
              className="text-black font-semibold hover:underline"
            >
              Sign up
            </NavLink>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
