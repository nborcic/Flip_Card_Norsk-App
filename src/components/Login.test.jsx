import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import Login from "./Login";

// Set up the test environment to use jsdom
import "@testing-library/jest-dom/extend-expect";

test("renders the login form", () => {
  render(<Login />); // Render the component
});
