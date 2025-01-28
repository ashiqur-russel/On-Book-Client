import { FaGoogle } from "react-icons/fa";

const SignIn = () => {
  return (
    <div className="min-h-screen flex">
      {/* Left Side (Banner) */}
      <div className="hidden lg:flex w-1/3 bg-gray-900 text-white p-8 flex-col justify-center">
        <h2 className="text-2xl font-semibold">On.Book</h2>
        <p className="mt-3 text-lg">
          Explore the world of books and get inspired.
        </p>
        <a
          href="#"
          className="mt-4 inline-block text-sm underline text-gray-300 hover:text-white transition"
        >
          Get inspired →
        </a>
      </div>

      {/* Right Side (Sign In Form) */}
      <div className="flex flex-1 justify-center items-center p-6">
        <div className="w-full max-w-md">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            Sign in to On.Book
          </h2>

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

          {/* Sign In Form */}
          <form>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">
                Username or Email
              </label>
              <input
                type="text"
                placeholder="Enter your email"
                className="w-full border border-gray-300 px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500"
              />
            </div>

            <div className="mb-4">
              <label className="flex justify-between text-sm font-medium text-gray-700">
                Password
                <a
                  href="#"
                  className="text-sm text-gray-600 hover:text-gray-900"
                >
                  Forgot?
                </a>
              </label>
              <input
                type="password"
                placeholder="Enter your password"
                className="w-full border border-gray-300 px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500"
              />
            </div>

            <button className="w-full bg-black text-white py-3 rounded-md hover:bg-gray-800 transition">
              Sign In
            </button>
          </form>

          {/* Sign Up Link */}
          <p className="mt-6 text-sm text-center text-gray-600">
            Don't have an account?{" "}
            <a href="#" className="text-black font-semibold hover:underline">
              Sign up
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
