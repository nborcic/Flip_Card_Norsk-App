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
import PrivateRoute from "./Assets/data/PrivateRoutes.jsx";
import { AuthProvider } from "./Assets/data/AuthContext.jsx";
//apon login save tokan in localstorage, if token dashboard, if not login
// page
// Define your routes
const router = createBrowserRouter(
  [
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
      element: (
        <PrivateRoute>
          <AdminDashboard />
        </PrivateRoute>
      ),
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
  ],
  {
    future: {
      v7_startTransition: true, //v7 optimization for faster rendering, not needed for v6, added 13.11.2024
    },
  }
);

ReactDOM.createRoot(document.getElementById("root")).render(
  <AuthProvider>
    <React.StrictMode>
      <RouterProvider router={router} />
    </React.StrictMode>
  </AuthProvider>
);
