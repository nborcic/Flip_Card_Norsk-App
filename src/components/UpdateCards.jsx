import React, { useState } from "react";
import axios from "axios";

const UpdateCards = () => {
  const [front, setFront] = useState("");
  const [back, setBack] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("/api/cards", { front, back });
      console.log(response.data);
      setFront("");
      setBack("");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="p-4 flex flex-col justify-center items-center h-64 w-48 margin-0 bg-blue-400">
      <h1 className="text-2xl font-bold">Update Cards</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>
            Front:
            <input
              type="text"
              className="w-full"
              value={front}
              onChange={(e) => setFront(e.target.value)}
            />
          </label>
        </div>
        <div>
          <label>
            Back:
            <input
              type="text"
              value={back}
              onChange={(e) => setBack(e.target.value)}
            />
          </label>
        </div>
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          type="submit"
        >
          Add Card
        </button>
      </form>
    </div>
  );
};

export default UpdateCards;
