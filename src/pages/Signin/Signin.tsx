import { FaGoogle } from "react-icons/fa";
import { NavLink } from "react-router-dom";
import OnForm from "../../components/utils/OnForm";

const SignIn = () => {
  // Define the fields dynamically
  const signInFields = [
    {
      label: "Username or Email",
      type: "text",
      name: "email",
      placeholder: "Enter your email",
      required: true,
    },
    {
      label: "Password",
      type: "password",
      name: "password",
      placeholder: "Enter your password",
      required: true,
    },
  ];

  // Handle form submission
  const handleSignInSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    alert("Sign In Successful!");
  };

  return (
    <>
      <div className="min-h-screen flex">
        <div className="flex flex-1 justify-center items-center p-6">
          <div className="w-full max-w-md">
            {/* Google Sign In Button */}
            <button className="w-full flex items-center justify-center border border-gray-300 py-2 rounded-md text-gray-700 hover:bg-gray-100 transition">
              <FaGoogle className="mr-2 text-lg" />
              Sign in with Google
            </button>

            <div className="relative my-6 text-center">
              <span className="text-gray-500 text-sm">
                or sign in with email
              </span>
              <div className="absolute left-0 top-1/2 transform -translate-y-1/2 w-1/3 border-t border-gray-300"></div>
              <div className="absolute right-0 top-1/2 transform -translate-y-1/2 w-1/3 border-t border-gray-300"></div>
            </div>

            {/* Sign In Form Using Generic Component */}
            <OnForm
              title="Sign in to On.Book"
              fields={signInFields}
              buttonText="Sign In"
              onSubmit={handleSignInSubmit}
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
    </>
  );
};

export default SignIn;
