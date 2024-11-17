import React, { useState, useEffect } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";
import { useNavigate } from "react-router-dom";

const ChartLogs = () => {
  const [data, setData] = useState([]);

  const navigate = useNavigate();

  const handleLogoffActions = () => {
    localStorage.removeItem("token");
    navigate("/loginPage");
  };

  useEffect(() => {
    // Define mock data
    const mockData = [
      { date: "2023-01-01", newUsers: 10, newWords: 5 },
      { date: "2023-01-02", newUsers: 15, newWords: 8 },
      { date: "2023-01-03", newUsers: 12, newWords: 6 },
      { date: "2023-01-04", newUsers: 20, newWords: 10 },
      { date: "2023-01-05", newUsers: 18, newWords: 9 },
    ];

    // Set the mock data
    setData(mockData);
  }, []);

  return (
    <>
      <div
        className="flex flex-col items-center bg-[#f9f9f9] p-[20px] border-[10px] shadow-
     [0 4px 8px rgba(0, 0, 0, 0.1)];"
      >
        <h1 className="text-2xl font-bold mb-4 text-[#333]">Usage Logs</h1>
        <LineChart width={1000} height={300} data={data}>
          <Line
            className="mt-4"
            type="monotone"
            dataKey="newUsers"
            stroke="#8884d8"
          />
          <Line type="monotone" dataKey="newWords" stroke="#82ca9d" />
          <XAxis dataKey="date" />
          <YAxis />
          <CartesianGrid stroke="#ccc" />
          <Tooltip />
        </LineChart>
      </div>
      <div className="gap-2 flex justify-center">
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
      </div>
    </>
  );
};

export default ChartLogs;
