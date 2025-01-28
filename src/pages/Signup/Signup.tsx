import { useState } from "react";
import { FaGoogle } from "react-icons/fa";
import { NavLink } from "react-router";
import Navbar from "../../components/shared/Navbar";

const SignUp = () => {
  const [emailSignUp, setEmailSignUp] = useState(false);

  return (
    <>
      <Navbar />
      <div className="min-h-screen flex">
        <div className="flex flex-1 justify-center items-center p-6">
          <div className="w-full max-w-md text-center">
            {/* Check if Email Sign Up is enabled */}
            {emailSignUp ? (
              <>
                {/* Email Sign-Up Form */}
                <h2 className="text-2xl font-bold text-gray-900 mb-6">
                  Sign up with Email
                </h2>

                {/* Name & Username Fields */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Name
                    </label>
                    <input
                      type="text"
                      placeholder="Your name"
                      className="w-full border border-gray-300 px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Username
                    </label>
                    <input
                      type="text"
                      placeholder="Username"
                      className="w-full border border-gray-300 px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500"
                    />
                  </div>
                </div>

                {/* Email Field */}
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700">
                    Email
                  </label>
                  <input
                    type="email"
                    placeholder="Enter your email"
                    className="w-full border border-gray-300 px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500"
                  />
                </div>

                {/* Password Field */}
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700">
                    Password
                  </label>
                  <input
                    type="password"
                    placeholder="6+ characters"
                    className="w-full border border-gray-300 px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500"
                  />
                </div>

                {/* Terms Checkbox */}
                <div className="flex items-start mb-4">
                  <input
                    type="checkbox"
                    id="terms"
                    className="w-4 h-4 mt-1 border border-gray-300 rounded-md focus:ring-gray-500"
                  />
                  <label htmlFor="terms" className="ml-2 text-sm text-gray-700">
                    I agree with On.Book's{" "}
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
                  </label>
                </div>

                {/* Create Account Button */}
                <button className="w-full bg-black text-white py-3 rounded-md hover:bg-gray-800 transition">
                  Create Account
                </button>

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
                  , and our default{" "}
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
