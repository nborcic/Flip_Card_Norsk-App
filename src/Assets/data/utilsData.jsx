export const sendData = async (url, dataToSend, method = "POST") => {
  try {
    const response = await fetch(url, {
      method: method, //  POST, PUT, DELETE...
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(dataToSend),
    });
    if (!response.ok) {
      throw new Error("Failed to send data");
    }
    const result = await response.json();
    return result;
  } catch (err) {
    throw new Error(err.message);
  }
};

export const getData = async (url, dataToGet, method = "GET") => {
  try {
    const response = await fetch(url, {
      method: method,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(dataToGet),
    });
    if (!response.ok) {
      throw new Error("Failed to send data");
    }
    const result = await response.json();
    return result;
  } catch (err) {
    throw new Error(err.message);
  }
};

// const { data, loading, error } = useFetch('https://api.example.com/data');
//   return (
//     <div>
//       {loading ? 'Loading...' : error ? `Error: ${error}` : JSON.stringify(data)}
//     </div>
export const tableStyles = {
  tableHeaderStyle: {
    backgroundColor: "#4CAF50",
    color: "white",
    padding: "8px",
    textAlign: "left",
    borderBottom: "2px solid #ddd",
    width: "100%",
  },

  tableRowStyle: {
    borderBottom: "1px solid #ddd",
  },

  tableDataStyle: {
    padding: "8px",
    textAlign: "left",
    width: "20px",
    border: "1px solid #ddd",
  },
};
