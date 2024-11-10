import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from "./components/Login.jsx";
import ErrorPage from "./components/ErrorPage.jsx";
import Register from "./components/Register.jsx";
import UpdateCards from "./components/UpdateCards.jsx";
import AdminDashboard from "./components/AdminDashboard.jsx";
import RegisterButBetter from "./components/RegisterButBetter.jsx";

// Define your routes
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
    path: "/registerButBetter",
    element: <RegisterButBetter />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/updateCards",
    element: <UpdateCards />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/admin/",
    element: <AdminDashboard />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/RegisterButBetter",
    element: <RegisterButBetter />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/register",
    element: <Register />,
    errorElement: <ErrorPage />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
