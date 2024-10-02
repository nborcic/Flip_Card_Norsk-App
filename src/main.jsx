import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from "./components/Login.jsx";
import ErrorPage from "./components/ErrorPage.jsx";
import SignUpPage from "./components/SignUpPage.jsx";
import UpdateCards from "./components/UpdateCards.jsx";
import { Dashboard } from "@mui/icons-material";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/loginPage",
    element: <Login />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/signUpPage",
    element: <SignUpPage />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/updateCards",
    element: <UpdateCards />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/dashboard",
    element: <Dashboard />,
    errorElement: <ErrorPage />,
  },
]);
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
