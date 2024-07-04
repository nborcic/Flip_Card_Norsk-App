import React, { useState } from "react";
import ReactCardFlip from "react-card-flip";
import "./CardX.css";

const CardX = () => {
  const handlePrevius = () => {};
  const handleNext = () => {};
  const [isFlipped, setIsFlipped] = useState(false);

  function handleFlip() {
    setIsFlipped(!isFlipped);
  }
  return (
    <div className="h-[60vh] border border-black rounded flex justify-center items-center m-2">
      <div className="flex flex-row items-center border border-gray-900 h-[30vh]">
        <div
          className="[writing-mode:vertical-lr] justify-center font-bold items-center border border-gray-900 rounded p-2 cursor-pointers h-[100%]"
          onClick={handlePrevius}
        >
          Previus word <span className="font-bold">˅</span>
        </div>
        <ReactCardFlip flipDirection="horizontal" isFlipped={isFlipped}>
          <div
            className="card text-black p-4 rounded flex flex-col items-center justify-center"
            onClick={handleFlip}
          >
            <h1 className="text-lg">Language Used Atm</h1>
            <p className="text-3xl font-bold">Here comes the word</p>
            <img
              src="/GB_flag.webp"
              className="h-16 w-16"
              alt="Language Flag"
            />
          </div>
          <div
            className="card text-black p-4 rounded flex flex-col items-center justify-center"
            onClick={handleFlip}
          >
            <h1 className="text-lg">Language Used Atm</h1>
            <p className="text-3xl font-bold">Here comes the word</p>
            <img
              src="/norge_flag.webp"
              className="h-16 w-16"
              alt="Language Flag"
            />
          </div>
        </ReactCardFlip>
        <div
          className="[writing-mode:vertical-lr] border border-gray-900 font-bold rounded h-[100%] p-2 cursor-pointer"
          onClick={handleNext}
        >
          Next word <span className="font-bold">˄</span>
        </div>
      </div>
    </div>
  );
};

export default CardX;
