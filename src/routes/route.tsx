import { createBrowserRouter } from "react-router";
import App from "../App";
import SignIn from "../pages/Signin/Signin";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },

  {
    path: "/signin",
    element: <SignIn />,
  },
]);

export default router;
