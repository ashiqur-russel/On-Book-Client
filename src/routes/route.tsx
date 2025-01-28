import { createBrowserRouter } from "react-router";
import App from "../App";
import SignIn from "../pages/Signin/Signin";
import SignUp from "../pages/Signup/Signup";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },

  {
    path: "/signin",
    element: <SignIn />,
  },
  {
    path: "/signup",
    element: <SignUp />,
  },
]);

export default router;
