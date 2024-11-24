import React, { useEffect, useState } from "react";
import { Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import DashboardUsers from "./DashboardUsers";
import { tableStyles } from "../Assets/data/utilsData";

const { tableHeaderStyle, tableRowStyle, tableDataStyle } = tableStyles;

const AdminDashboard = () => {
  const loggedAdmin = localStorage.getItem("loggedAdmin");
  const [makeNewUser, setmakeNewUser] = React.useState("");

  const [whiteListedUsers, setwhiteListedUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleLogoffActions = () => {
    localStorage.removeItem("token");
    navigate("/loginPage");
  };

  const deleteUser = async (id) => {
    const token = localStorage.getItem("token");
    if (!token) {
      setError("Please login to manage whitelist users. (No token found.)");
      return;
    }
    try {
      const response = await fetch(
        `http://localhost:5050/api/whitelist/${id}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (!response.ok) {
        throw new Error("Failed to delete user");
      }
      setwhiteListedUsers((prevUsers) =>
        prevUsers.filter((user) => user._id !== id)
      );
    } catch (error) {
      setError(error.message);
    }
  };
  const handleNewWhitelistSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    if (!token) {
      setError("Please login to add users to the whitelist. (No token found.)");
      return;
    }

    try {
      const response = await fetch("http://localhost:5050/api/whitelist/add/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ email: makeNewUser }),
      });

      if (!response.ok) {
        throw new Error("Failed to add user to whitelist!");
      }

      const data = await response.json();
      setwhiteListedUsers((prevUsers) => [...prevUsers, data]);
      setmakeNewUser("");
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    fetch("http://localhost:5050/api/whitelist", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch whitelist");
        }
        return response.json();
      })
      .then((data) => {
        console.log(data);
        
        setwhiteListedUsers(data);
      })
      .catch((error) => {
        setError(error.message);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [whiteListedUsers]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 p-4">
      <div className="bg-white  shadow-md rounded-lg p-6 max-w-md w-full">
        <Typography
          variant="h4"
          gutterBottom
          className="text-center text-blue-600"
        >
          Welcome to the Admin Dashboard 🚀
          <br />
          <span className="text-red-500 underline">{loggedAdmin}</span>
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
          <Typography
            variant="h5"
            gutterBottom
            className="text-blue-600  text-center"
          >
            Whitelisted Users
          </Typography>
          <form
            onSubmit={handleNewWhitelistSubmit}
            className="flex flex-row rounded-md mt-1 mb-1  "
          >
            <input
              type="email"
              value={makeNewUser}
              onChange={(e) => setmakeNewUser(e.target.value)}
              placeholder="Enter email to whitelist"
              className="border border-gray-400 p-2 w-full rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
              required
            />
            <button
              type="submit"
              className=" bg-blue-500 hover:bg-blue-700 text-white  py-2 px-4 rounded ml-2"
            >
              Add to Whitelist
            </button>
          </form>
          {!loading && (
            <p className="text-blue-600 text-2xl mt-4 flex justify-center ">
              Loading...
            </p>
          )}
          <div>
            <table>
              <thead>
                <tr>
                  <th style={tableHeaderStyle}>Email</th>
                  <th style={tableHeaderStyle}>Delete</th>
                </tr>
              </thead>
              <tbody>
                {whiteListedUsers.map((white) => (
                  <tr key={white._id} style={tableRowStyle}>
                    <td style={tableDataStyle}>{white.email}</td>
                    <td
                      style={tableDataStyle}
                      className="cursor-pointer text-red-500"
                      onClick={() => deleteUser(white._id)}
                    >
                      X
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <Typography
            variant="h5"
            className="text-blue-600 p-4 pb-0 text-center"
          >
            Registered Users
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
              onClick={() => navigate("/admin/chartLogs")}
            >
              {" "}
              Logs
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
