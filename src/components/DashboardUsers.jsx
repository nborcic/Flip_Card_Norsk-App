import React, { useEffect, useState } from "react";

import ToDo from "./ToDo";

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
            Authorization: `Bearer ${token}`, // Include token in the request
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

  return (
    <div className="user-list">
      <h2 className="text-xl">User List:</h2>
      <ul>
        {users.map((user) => (
          <li key={user._id}>
            <strong>Name: {user.name}</strong> - Email: {user.email}
          </li>
        ))}
      </ul>
      <h3>Total Users: {users.length}</h3>
      <div className="p-2 pl-0">
        <p className="text-xl">List to improve the App:</p>
        <ToDo />
      </div>
    </div>
  );
};

export default UserList;
