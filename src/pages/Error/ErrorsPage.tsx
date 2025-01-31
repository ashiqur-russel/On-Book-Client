import { Link, useRouteError, isRouteErrorResponse } from "react-router-dom";

const ErrorPage = () => {
  const error = useRouteError();

  let errorMessage = "An unexpected error occurred.";

  if (isRouteErrorResponse(error)) {
    errorMessage =
      error.status === 404
        ? "The page you're looking for doesn't exist."
        : error.data || "An unexpected error occurred.";
    errorMessage = error.statusText;
  }

  return (
    <>
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 text-center p-6">
        <h1 className="text-6xl font-bold text-gray-800">Oops!</h1>
        <p className="text-xl text-gray-600 mt-4">We can't find that page.</p>
        <p className="text-gray-500 mt-2">{errorMessage}</p>

        {/* Back to Home */}
        <Link
          to="/"
          className="mt-6 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
        >
          Go Back Home
        </Link>
      </div>
    </>
  );
};

export default ErrorPage;
