import React, { useState } from "react";
import ReactCardFlip from "react-card-flip";
import "./CardX.css";

const CardX = () => {
  const [isFlipped, setIsFlipped] = useState(false);

  function handleFlip() {
    setIsFlipped(!isFlipped);
  }
  return (
    <div className="h-[60vh] border border-black rounded flex justify-center items-center m-2">
      <ReactCardFlip flipDirection="horizontal" isFlipped={isFlipped}>
        <div
          className="card flex flex-col justify-between items-center bg-blue-500 text-white p-4 rounded h-[100%]"
          onClick={handleFlip}
        >
          <h1 className="text-lg">Language Used Atm</h1>
          <p className="text-3xl font-bold">Here comes the word</p>
          <p className="text-lg">Flag of Language</p>
        </div>
        <div
          className="card card-back bg-gray-200 p-4 rounded"
          onClick={handleFlip}
        >
          <h1 className="text-3xl font-bold">Takk Back</h1>
        </div>
      </ReactCardFlip>
    </div>
  );
};

export default CardX;
