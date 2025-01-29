import { useState } from "react";
import { FaGoogle } from "react-icons/fa";
import { NavLink } from "react-router-dom";
import OnForm from "../../components/utils/OnForm";

const SignUp = () => {
  const [emailSignUp, setEmailSignUp] = useState(false);

  // Define fields for Email Sign-Up Form
  const signUpFields = [
    { label: "Name", type: "text", name: "name", required: true },
    { label: "Username", type: "text", name: "username", required: true },
    { label: "Email", type: "email", name: "email", required: true },
    { label: "Password", type: "password", name: "password", required: true },
  ];

  // Handle form submission
  const handleSignUpSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    alert("Sign Up Successful!");
  };

  return (
    <>
      <div className="min-h-screen flex">
        <div className="flex flex-1 justify-center items-center p-6">
          <div className="w-full max-w-md text-center">
            {emailSignUp ? (
              <>
                {/* Email Sign-Up Form Using Generic FormComponent */}
                <OnForm
                  title="Sign up with Email"
                  fields={signUpFields}
                  buttonText="Create Account"
                  onSubmit={handleSignUpSubmit}
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

                {/* Terms of Service & Privacy Policy */}
                <p className="text-xs text-gray-500 mt-4">
                  By creating an account you agree with our{" "}
                  <a href="#" className="underline font-medium">
                    Terms of Service
                  </a>
                  ,{" "}
                  <a href="#" className="underline font-medium">
                    Privacy Policy
                  </a>
                  , and{" "}
                  <a href="#" className="underline font-medium">
                    Notification Settings
                  </a>
                  .
                </p>

                {/* Sign In Link */}
                <p className="mt-6 text-sm text-gray-600">
                  Already have an account?{" "}
                  <NavLink
                    to="/signin"
                    className="text-black font-semibold hover:underline"
                  >
                    Sign In
                  </NavLink>
                </p>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default SignUp;
