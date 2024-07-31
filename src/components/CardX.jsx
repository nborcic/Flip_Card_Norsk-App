import React, { useState, useEffect } from "react";
import ReactCardFlip from "react-card-flip";
import "./CardX.css";
import flags from "/public/flags.json";
import wordData from "/public/words.json";

const CardX = ({ level }) => {
  const [isFlipped, setIsFlipped] = useState(false);
  const [words, setWords] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [currentWord, setCurrentWord] = useState({});

  useEffect(() => {
    const levelWords = wordData.levels[level];
    setWords(levelWords);
    setCurrentWord(levelWords[0]);
    setCurrentIndex(0);
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
          className="PREVIOUS WORD border [writing-mode:vertical-rl] rotate-180 flex justify-center font-bold rounded p-2 cursor-pointer h-[100%] l:w-[50px] s:w-[50px] md:w-[100px] md:justify-center md:items-center"
          onClick={handlePrevious}
        >
          <span className="font-bold previus_div ">˄</span>
          Previous word
        </div>

        <ReactCardFlip flipDirection="horizontal" isFlipped={isFlipped}>
          <div
            className="card text-black p-4 rounded flex flex-col items-center justify-center w-[300px] h-[200px] m:w-[200px] l:w-[275px] l:h-[250px] s:w-[100%] s:h-[30vh]
            {level === 'advanced'? 'w-[300px]' : w-[250px]}
            "
            onClick={handleFlip}
          >
            <h1 className="text-lg font-anton m:text-xl">English</h1>
            <p className="text-white text-2xl h-24 m:text-xs ">
              Here comes the word
            </p>
            <p
              className={`${
                level === "advanced" ? "text-xl" : "text-4xl"
              } font-bold p-4 l:text-4xl justify-center items-center`}
            >
              {currentWord.word}
            </p>
            <img
              src={flags.EN.path}
              className="h-16 w-16"
              alt="Language Flag"
            />
          </div>
          <div
            className="card text-black p-4 rounded flex flex-col items-center justify-center w-[300px] h-[200px] m:w-[200px] l:w-[275px] l:h-[250px] s:w-[100%] s:h-[30vh]"
            onClick={handleFlip}
          >
            <h1 className="text-lg">Norwegian</h1>
            <p className="text-white text-2xl h-24">Here comes the word</p>
            <p
              className={`${
                level === "advanced" ? "text-xl" : "text-4xl"
              } font-bold p-4 l:text-4xl justify-center items-center`}
            >
              {currentWord.translation}
            </p>
            <img
              src={flags.NO.path}
              className="h-16 w-16"
              alt="Norwegian Flag"
            />
          </div>
        </ReactCardFlip>

        <div
          className="NEXT WORD [writing-mode:vertical-lr] border font-bold rounded h-[100%] p-2 flex justify-center cursor-pointer md:w-[100px] md:justify-center md:items-center"
          onClick={handleNext}
        >
          Next word <span className="font-bold">˄</span>
        </div>
      </div>
    </div>
  );
};

export default CardX;
