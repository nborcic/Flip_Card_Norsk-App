import React from "react";
import { Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import DashboardUsers from "./DashboardUsers";


const AdminDashboard = () => {
  const navigate = useNavigate();

  const handleLogoffActions = () => {
    localStorage.removeItem("token");
    navigate("/loginPage");
  };
  const handleMoreWords = () => {
    navigate("/addMoreWords");
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <div className="bg-white shadow-md rounded-lg p-6 max-w-md w-full">
        <Typography
          variant="h4"
          gutterBottom
          className="text-center text-blue-600"
        >
          Admin Dashboard
        </Typography>
        <Typography
          variant="body1"
          gutterBottom
          className="text-center text-gray-700"
        >
          Welcome to the admin dashboard. You can manage users, update settings,
          and view stats here.
        </Typography>

        <div className="mt-4">
          <Typography variant="h6" gutterBottom className="text-blue-600">
            User Management
          </Typography>
          <Typography variant="body2" gutterBottom className="text-gray-700">
            <DashboardUsers />
          </Typography>

          <div className="gap-2 flex">
            <button
              className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              onClick={() => navigate("/")}
            >
              {" "}
              Home
            </button>
            <button
              className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              onClick={() => handleLogoffActions()}
            >
              {" "}
              Logoff
            </button>
            <button
              className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              onClick={() => handleMoreWords()}
            >
              {" "}
              Add more words
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
