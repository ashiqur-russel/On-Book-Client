import { createBrowserRouter } from "react-router";
import App from "../App";
import SignIn from "../pages/Signin/Signin";
import SignUp from "../pages/Signup/Signup";
import Payment from "../components/Dashboard/Payment/Payment";

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
  {
    path: "/payment",
    element: <Payment />,
  },
]);

export default router;
