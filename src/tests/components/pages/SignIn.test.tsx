import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { MemoryRouter } from "react-router-dom";
import SignIn from "../../../pages/SignIn/SignIn";
import store from "../../../redux/store";
describe("SignIn Page", () => {
  it("renders the Sign in page and main elements", () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <SignIn />
        </MemoryRouter>
      </Provider>
    );

    expect(screen.getByText("Don't have an account?")).toBeInTheDocument();
    expect(screen.getByText("Sign up")).toBeInTheDocument();

    const button = screen.getByRole("button", { name: "Sign in with Google" });
    expect(button).toBeInTheDocument();

    expect(screen.getByText("or sign in with email")).toBeInTheDocument();

    const link = screen.getByRole("link", { name: "Sign up" });
    expect(link).toHaveAttribute("href", "/signup");
  });
});
