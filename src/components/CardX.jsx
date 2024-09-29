import { React, useState, useEffect, useMemo } from "react";
import ReactCardFlip from "react-card-flip";
import flags from "../Assets/data/flags.json";
import wordData from "../Assets/data/words.json";
import "./CardX.css";

// eslint-disable-next-line react/prop-types
const CardX = ({ level }) => {
  const [isFlipped, setIsFlipped] = useState(false);
  const [words, setWords] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [currentWord, setCurrentWord] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const levelWords = wordData.levels[level];
    setWords(levelWords);
    setCurrentWord(levelWords[0]);
    setCurrentIndex(0);
    setLoading(false);
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

  // //position theme button
  // //min size of cardx
  // //after 3 secs of inactivity, flip card animation icon starts
  //button for explanation trip over page using toast , and timing so function is triggered and toast ae timed to be shown at exsact time
  //images of phone, tablet, desktop depending ona a display size
  //sign in button
  //login page, routing, sign up,
  //form for adding more words in the app, within new page
  //img for different width of screen

  return loading ? (
    <div className="flex justify-center items-center bg-sky-100  h-[30vh] min-h-80 border border-black">
      <button
        type="button"
        className="bg-indigo-100 text-black font-bold py-2 px-4 rounded-full bg-transparent"
        disabled
      >
        <svg className="animate-spin h-15 w-15 mr-13 " viewBox="00 0 24 24">
          <circle
            className="opacity-15"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          ></circle>
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          ></path>
        </svg>
        Loading...
      </button>
    </div>
  ) : (
    <div className="rounded flex justify-center items-center bg-sky-100  h-[30vh] min-h-80 border border-black">
      <div className="flex flex-row items-center h-[40vh]">
        <div
          className="PREVIOUS WORD [writing-mode:vertical-rl] rotate-180 border font-bold rounded h-[100%] p-2 flex justify-center cursor-pointer md:w-[100px] md:justify-center md:items-center xl:h-[20vw] border-black l:h-[20vh] m:h-[20vh] s:h-[30vh] bg-amber-100"
          onClick={handlePrevious}
        >
          <span className="font-bold previous_div ">˄</span>
          Previous word
        </div>

        <ReactCardFlip flipDirection="horizontal" isFlipped={isFlipped}>
          <div
            className="card text-orange p-4 rounded flex flex-col items-center justify-center w-[300px] h-[200px] m:w-[200px] l:w-[275px] l:h-[250px] s:w-[100%] s:h-[30vh] text-orange-300
             
            "
            onClick={handleFlip}
          >
            <h1 className="text-lg text-black font-anton m:text-xl m:w-[30vw] xl:text-2xl xl:w-[20vw]">
              English
            </h1>
            <p className="text-transparent text-2xl h-24 m:text-xs">
              Here comes the word
            </p>
            <p
              className={`${
                level === "advanced" ? "text-xl" : "text-4xl"
              } font-bold p-4 l:text-4xl justify-center items-center `}
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
            className="card text-orange p-4 rounded flex flex-col items-center justify-center w-[300px] h-[200px] m:w-[200px] l:w-[275px] l:h-[250px] s:w-[100%] s:h-[30vh]  border-black "
            onClick={handleFlip}
          >
            <h1 className="text-lg">Norwegian</h1>
            <p className="text-transparent text-2xl h-24">
              Here comes the word
            </p>
            <p
              className={`${
                level === "advanced" ? "text-xl" : "text-4xl"
              } font-bold p-4 l:text-4xl justify-center items-center text-orange-300`}
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
          className="NEXT WORD [writing-mode:vertical-lr] border font-bold rounded h-[100%] p-2 flex justify-center cursor-pointer md:w-[100px] md:justify-center md:items-center xl:h-[20vw] border-black l:h-[20vh] m:h-[20vh] s:h-[30vh] bg-amber-100"
          onClick={handleNext}
        >
          Next word <span className="font-bold">˄</span>
        </div>
      </div>
    </div>
  );
};

export default CardX;
