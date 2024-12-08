import React, { useEffect, useState } from "react";
import { Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import DashboardUsers from "./DashboardUsers";
import { tableStyles } from "../Assets/data/utilsData";

const { tableHeaderStyle, tableRowStyle, tableDataStyle } = tableStyles;
//fix insert new email for whitlisting
//card style background
//newWords card style background
//add new whitelist user
//fetch and delete users
//get todo list from https://youtu.be/l134cBAJCuc?feature=shared&t=1149
//style dashboard
//replace fetch with functions from util
const AdminDashboard = () => {
  const loggedAdmin = localStorage.getItem("loggedAdmin");
  const [makeNewUser, setMakeNewUser] = useState("");

  const [whiteListedUsers, setWhiteListedUsers] = useState([]);
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
      setWhiteListedUsers((prevUsers) =>
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
      const response = await fetch(`http://localhost:5050/api/whitelist/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ username: makeNewUser }),
      });

      if (!response.ok) {
        throw new Error("Failed to add user to whitelist!");
      }

      const data = await response.json();

      setWhiteListedUsers((prevUsers) => [...prevUsers, data]);
      setMakeNewUser("");
      setLoading(false);
    } catch (error) {
      setError(error.message);
    }
  };
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      setError("No token found. Please log in.");
      setLoading(false);
      return;
    }

    fetch("http://localhost:5050/api/whitelist", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch users");
        }
        return response.json();
      })
      .then((data) => {
        setWhiteListedUsers(data);
      })
      .catch((err) => {
        setError(err.message);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);
  return (
    <div className="flex items-center justify-center min-h-screen p-4 bg-gray-100">
      <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-md">
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
            className="text-center text-blue-600"
          >
            Whitelisted Users
          </Typography>
          <form
            onSubmit={handleNewWhitelistSubmit}
            className="flex flex-row rounded-md "
          >
            <input
              type="email"
              value={makeNewUser}
              onChange={(e) => setMakeNewUser(e.target.value)}
              placeholder="Enter email to whitelist"
              className="border-2 border-gray-200 focus:outline-none focus:border-indigo-400 w-[100%] px-4 rounded-lg m-2 p-2 flex justify-between items-center hover:bg-indigo-100 focus:ring-2 focus:ring-indigo-700 focus:ring-opacity-50 transition duration-500 ease-in-out h-[60px]"
              required
            />
            <button
              type="submit"
              className="flex items-center justify-between p-2 px-4 m-2 text-white transition duration-500 ease-in-out bg-blue-500 border-2 border-gray-200 rounded-lg  focus:outline-none hover:bg-indigo-100 focus:ring-2 focus:ring-indigo-700 h-15 hover:text-indigo-700 focus:ring-opacity-50 "
            >
              Whitelist
            </button>
          </form>

          <div className="user-list">
            <table
              style={{
                width: "100%",
                borderCollapse: "collapse",
                marginTop: "20px",
              }}
            >
              <thead>
                <tr>
                  <th style={tableHeaderStyle}>Icon</th>

                  <th style={tableHeaderStyle}>Email</th>
                  <th style={tableHeaderStyle}>Admin</th>
                  <th style={tableHeaderStyle}>Delete</th>
                </tr>
              </thead>
              <tbody>
                {whiteListedUsers.map((user) => (
                  <tr key={user._id} style={tableRowStyle}>
                    <td style={tableDataStyle}>
                      {user.userAvatar ? (
                        <img src="user.userAvatar" alt="Avatar" />
                      ) : (
                        <img
                          href="https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp&f=y"
                          alt="Avatar"
                        />
                      )}
                    </td>

                    <td style={tableDataStyle}>{user.email}</td>
                    <td style={tableDataStyle}>
                      {user.isAdmin ? "Yes" : "No"}
                    </td>
                    <td
                      style={tableDataStyle}
                      className="cursor-pointer text-red-500"
                      onClick={() => deleteUser(user._id)}
                    >
                      X
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <h3 className="text-sm text-blue-600">
              Total Users: {whiteListedUsers.length}
            </h3>
          </div>

          <Typography
            variant="h5"
            className="p-4 pb-0 text-center text-blue-600"
          >
            Registered Users
          </Typography>
          <Typography variant="body2" gutterBottom className="text-gray-700">
            <DashboardUsers />
          </Typography>

          <div className="flex gap-2">
            <button
              className="px-4 py-2 mt-4 font-bold text-white bg-blue-500 rounded hover:bg-blue-700"
              onClick={() => navigate("/")}
            >
              {" "}
              Home
            </button>
            <button
              className="px-4 py-2 mt-4 font-bold text-white bg-blue-500 rounded hover:bg-blue-700"
              onClick={() => handleLogoffActions()}
            >
              {" "}
              Logoff
            </button>
            <button
              className="px-4 py-2 mt-4 font-bold text-white bg-blue-500 rounded hover:bg-blue-700"
              onClick={() => navigate("/admin/chartLogs")}
            >
              {" "}
              Logs
            </button>
            <button
              className="px-4 py-2 mt-4 font-bold text-white bg-blue-500 rounded hover:bg-blue-700"
              onClick={() => navigate("/admin/editWords")}
            >
              {" "}
              Edit words
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
