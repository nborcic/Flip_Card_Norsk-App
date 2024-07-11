import { React, useState, useEffect } from "react";

import ReactCardFlip from "react-card-flip";

import "./CardX.css";
import words from "/public/words.json";
console.log(words.levels.basic);

const CardX = () => {
  const [isFlipped, setIsFlipped] = useState(false);
  const [words, setWords] = useState([]);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [currentWord, setCurrentWord] = useState([]);
  const [currentTranslation, setCurrentTranslation] = useState([]);
  const [level, setLevel] = useState("basic");

  const handlePrevius = () => {
    if (currentIndex > 0) {
      const newIndex = currentIndex - 1;
      setCurrentIndex(newIndex);
      setCurrentWord(words[newIndex]);
      setCurrentTranslation(words[newIndex].translation);
    }
  };
  const handleNext = () => {
    if (currentIndex < words.length - 1) {
      const newIndex = currentIndex + 1;
      setCurrentIndex(newIndex);
      setCurrentWord(words[newIndex]);
      setCurrentTranslation(words[newIndex].translation);
    }
  };

  function handleFlip() {
    setIsFlipped(!isFlipped);
  }

  return (
    <div className=" rounded flex justify-center items-center h-[400px] border border-black">
      <div className="flex flex-row items-center h-[40vh]">
        <div
          className="PREVIUS WORD border [writing-mode:vertical-rl] rotate-180 flex justify-center font-bold rounded p-2 cursor-pointer h-[100%]"
          onClick={handlePrevius}
        >
          <span className="font-bold ">˄</span>
          Previus word
        </div>

        <ReactCardFlip flipDirection="horizontal" isFlipped={isFlipped}>
          <div
            className="card text-black p-4 rounded flex flex-col items-center justify-center"
            onClick={handleFlip}
          >
            <h1 className="text-lg font-anton">English</h1>
            <p className="text-white text-3xl h-24">Here comes the word</p>
            <p className="text-3xl font-bold">{words.levels}</p>
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
            <h1 className="text-lg ">Norwegian</h1>
            <p className="text-white text-3xl h-24">Here comes the word</p>
            <p className="text-3xl font-bold">{currentWord.translation}</p>
            <img
              src="/norge_flag.webp"
              className="h-16 w-16"
              alt="Language Flag"
            />
          </div>
        </ReactCardFlip>

        <div
          className="NEXT WORD [writing-mode:vertical-lr] border font-bold rounded h-[100%] p-2 flex justify-center cursor-pointer "
          onClick={handleNext}
        >
          {" "}
          Next word <span className="font-bold ">˄</span>
        </div>
      </div>
    </div>
  );
};

export default CardX;
