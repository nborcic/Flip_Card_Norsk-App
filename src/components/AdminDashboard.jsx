import React, { useEffect } from "react";
import { Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import DashboardUsers from "./DashboardUsers";
import { tableStyles } from "../Assets/data/utilsData";
const { tableHeaderStyle, tableRowStyle, tableDataStyle } = tableStyles;


const AdminDashboard = () => {
  const [makeNewUser, setmakeNewUser] = React.useState("");
  const [users, setUsers] = React.useState([]);

  const navigate = useNavigate();

  const handleLogoffActions = () => {
    localStorage.removeItem("token");
    navigate("/loginPage");
  };

  const handleMoreWords = () => {
    navigate("/addMoreWords");
  };
  const handleAddNewUser = () => {
    //POSt request to add new user to whitelist
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 p-4">
      <div className="bg-white  shadow-md rounded-lg p-6 max-w-md w-full">
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
          <Typography
            variant="h5"
            gutterBottom
            className="text-blue-600  text-center"
          >
            Whitelisted Users
          </Typography>
          <div className="flex ">
            <input
              className="border border-gray-300 rounded-md p-2 w-full  left-10"
              type="text"
              placeholder="Add users to whitelist"
              value={makeNewUser}
              onChange={(e) => setmakeNewUser(e.target.value)}
            />
            <input
              className="bg-blue-500 hover:bg-blue-700   text-white font-bold py-2 px-4 rounded z-10"
              type="button"
              value="Add User"
              onClick={handleAddNewUser}
            />
          </div>
          <div>
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
                  <th style={tableHeaderStyle}>Name</th>
                  <th style={tableHeaderStyle}>Email</th>
                  <th style={tableHeaderStyle}>Admin</th>
                  <th style={tableHeaderStyle}>Delete</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => (
                  <tr key={user._id} style={tableRowStyle}>
                    <td style={tableDataStyle}>
                      {user.userAvatar ? (
                        <img src="user.userAvatar" alt="User Avatar" />
                      ) : (
                        <img
                          href="https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp&f=y"
                          alt="User Avatar"
                        />
                      )}
                    </td>
                    <td style={tableDataStyle}>{user.name}</td>
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
