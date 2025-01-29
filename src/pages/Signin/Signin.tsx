import { useForm, SubmitHandler } from "react-hook-form";
import { FaGoogle } from "react-icons/fa";
import { NavLink, useNavigate } from "react-router-dom";
import OnForm from "../../components/utils/OnForm";
import { useAppDispatch } from "../../redux/hooks";
import { useLoginMutation } from "../../redux/features/auth/authApi";
import { verifyToken } from "../../utils/verifyToken";
import { setUser, TUser } from "../../redux/features/auth/authSlice";
import { toast } from "sonner";

interface LoginForm {
  email: string;
  password: string;
}

const SignIn = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [login, { isLoading }] = useLoginMutation();

  const { handleSubmit, control } = useForm<LoginForm>({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit: SubmitHandler<LoginForm> = async (data) => {
    try {
      console.log("Sending refresh token");
      console.log(data);
      const result = await login(data).unwrap();
      const token = result.data.accessToken;
      const user = verifyToken(token) as TUser;

      toast.success("Logged in Successfully", { duration: 200 });
      dispatch(setUser({ user, token }));

      // Redirect user based on role
      navigate(`/${user.role}/dashboard`);
    } catch {
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

          <div className="relative my-6 text-center">
            <span className="text-gray-500 text-sm">or sign in with email</span>
            <div className="absolute left-0 top-1/2 transform -translate-y-1/2 w-1/3 border-t border-gray-300"></div>
            <div className="absolute right-0 top-1/2 transform -translate-y-1/2 w-1/3 border-t border-gray-300"></div>
          </div>

          {/* Sign In Form Using Generic Component */}
          <OnForm
            title="Sign in to On.Book"
            fields={[
              {
                label: "Email",
                type: "text",
                name: "email",
                placeholder: "Enter your email",
              },
              {
                label: "Password",
                type: "password",
                name: "password",
                placeholder: "Enter your password",
              },
            ]}
            buttonText={isLoading ? "Signing In..." : "Sign In"}
            control={control}
            onSubmit={handleSubmit(onSubmit)}
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
