import React, { useEffect, useState } from "react";

import ToDo from "./ToDo";
import { tableStyles } from "../Assets/data/utilsData";
const { tableHeaderStyle, tableRowStyle, tableDataStyle } = tableStyles;

//table of usernames and emails from db
const UserList = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchUsers = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        setError("No token found. Please log in.");
        setLoading(false);
        return;
      }

      try {
        const response = await fetch("http://localhost:5050/api/users", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch users");
        }

        const data = await response.json();
        setUsers(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  const deleteUser = async (userId) => {
    const token = localStorage.getItem("token");
    if (!token) {
      setError("Please login to manage users.(No token found.)");
      return;
    }
    try {
      const response = await fetch(
        `http://localhost:5050/api/users/${userId}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (!response.ok) {
        throw new Error("Failed to delete userR");
      }
      setUsers((prevUsers) => prevUsers.filter((user) => user._id !== userId));
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="user-list">
      <table
        style={{ width: "100%", borderCollapse: "collapse", marginTop: "20px" }}
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
                  <img src="user.userAvatar" alt="Avatar" />
                ) : (
                  <img
                    href="https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp&f=y"
                    alt="Avatar"
                  />
                )}
              </td>
              <td style={tableStyles.tableDataStyle}>{user.name}</td>
              <td style={tableDataStyle}>{user.email}</td>
              <td style={tableDataStyle}>{user.isAdmin ? "Yes" : "No"}</td>
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
      <h3 className="text-sm text-blue-600">Total Users: {users.length}</h3>
      <div className="p-2 pl-0">
        <p className="text-xl text-center text-blue-600">
          List to improve the App:
        </p>
        <ToDo />
      </div>
    </div>
  );
};

export default UserList;
