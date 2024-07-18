import React, { useState, useEffect } from "react";
import ReactCardFlip from "react-card-flip";
import "./CardX.css";
import wordData from "/public/words.json";

const CardX = () => {
  const [isFlipped, setIsFlipped] = useState(false);
  const [words, setWords] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [currentWord, setCurrentWord] = useState({});
  const [level, setLevel] = useState("basic");

  useEffect(() => {
    const levelWords = wordData.levels[level];
    setWords(levelWords);
    setCurrentWord(levelWords[0]);
  }, [level]);

  const handleFlip = () => {
    setIsFlipped(!isFlipped);
  };

  const handlePrevious = () => {
    if (currentIndex > 0) {
      const newIndex = currentIndex - 1;
      setCurrentIndex(newIndex);
      setCurrentWord(words[newIndex]);
    }
  };

  const handleNext = () => {
    if (currentIndex < words.length - 1) {
      const newIndex = currentIndex + 1;
      setCurrentIndex(newIndex);
      setCurrentWord(words[newIndex]);
    }
  };

  return (
    <div className="rounded flex justify-center items-center h-[400px] border border-black">
      <div className="flex flex-row items-center h-[40vh]">
        <div
          className="PREVIOUS WORD border [writing-mode:vertical-rl] rotate-180 flex justify-center font-bold rounded p-2 cursor-pointer h-[100%]"
          onClick={handlePrevious}
        >
          <span className="font-bold">˄</span>
          Previous word
        </div>

        <ReactCardFlip flipDirection="horizontal" isFlipped={isFlipped}>
          <div
            className="card text-black p-4 rounded flex flex-col items-center justify-center"
            onClick={handleFlip}
            style={{ width: "300px", height: "200px" }}
          >
            <h1 className="text-lg font-anton">English</h1>
            <p className="text-white text-2xl h-24">Here comes the word</p>
            <p className="text-4xl font-bold p-4">{currentWord.word}</p>
            <img
              src={"GB_flag.webp"}
              className="h-16 w-16"
              alt="Language Flag"
            />
          </div>
          <div
            className="card text-black p-4 rounded flex flex-col items-center justify-center"
            onClick={handleFlip}
            style={{ width: "300px", height: "200px" }}
          >
            <h1 className="text-lg">Norwegian</h1>
            <p className="text-white text-2xl h-24">Here comes the word</p>
            <p className="text-4xl font-bold p-4">{currentWord.translation}</p>
            <img
              src={`/public/${currentWord.flag}`}
              className="h-16 w-16"
              alt="Norwegian Flag"
            />
          </div>
        </ReactCardFlip>

        <div
          className="NEXT WORD [writing-mode:vertical-lr] border font-bold rounded h-[100%] p-2 flex justify-center cursor-pointer"
          onClick={handleNext}
        >
          Next word <span className="font-bold">˄</span>
        </div>
      </div>
    </div>
  );
};

export default CardX;
