import { React, useState, useEffect, useMemo } from "react";
import ReactCardFlip from "react-card-flip";
import flags from "../Assets/data/flags.json";
import "./CardX.css";
import { Scale } from "chart.js";

// eslint-disable-next-line react/prop-types
const CardX = ({ level }) => {
  const [isFlipped, setIsFlipped] = useState(false);
  const [words, setWords] = useState([]);
  const [currentWord, setCurrentWord] = useState({});
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:5050/api/words", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        data.map((d) => {
          const levelWords = d.levels[level];
          setWords(levelWords);
          setCurrentWord(levelWords[0]);
          setCurrentIndex(0);
          setLoading(false);
        });
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }, [level]);

  const handleFlip = () => {
    setIsFlipped(!isFlipped);
  };

  const handlePrevious = () => {
    if (currentIndex > 0) {
      const newIndex = currentIndex - 1;
      setCurrentIndex(newIndex);
      setCurrentWord(words[newIndex]);
    } else {
      const newIndex = words.length - 1;
      setCurrentIndex(newIndex);
      setCurrentWord(words[newIndex]);
    }
  };

  const handleNext = () => {
    if (currentIndex < words.length - 1) {
      const newIndex = currentIndex + 1;
      setCurrentIndex(newIndex);
      setCurrentWord(words[newIndex]);
    } else {
      const newIndex = 0;
      setCurrentIndex(newIndex);
      setCurrentWord(words[newIndex]);
    }
  };
  useEffect(() => {});

  //button for explanation trip over page using toast , and timing so function is triggered and toast ae timed to be shown at exsact time
  //images of phone, tablet, desktop depending ona a display size

  return loading ? (
    <div className="flex justify-center items-center bg-sky-100  h-[30vh] min-h-80 border border-black">
      <button
        type="button"
        className="font-bold text-black bg-transparent bg-indigo-100 rounded-full"
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
    <div className=" rounded flex justify-center items-center bg-sky-100   h-[30vh] min-h-[375px] min-w-[320px] border border-black">
      <div className="flex flex-row items-center w-[100%] h-[100%] border border-black p-2">
        <div
          className="PREVIOUS WORD [writing-mode:vertical-rl] rotate-180 border font-bold rounded h-[100%] flex justify-center cursor-pointer  xl:h-[80%] xl:p-8 xl:text-2xl border-black l:h-[80%] m:h-[100%] m:w-[20%] l:p-4 l:text-xl m:p-4 m:text-xl bg-amber-100 w-[20%] s:w-[20%] s:h-[90%]
          hover:scale-105
          "
          onClick={handlePrevious}
        >
          <span className="font-bold previous_div ">˄</span>
          Previous word
        </div>
        <div className="w-[100%] s:m-w-[320px] ">
          <ReactCardFlip flipDirection="horizontal" isFlipped={isFlipped}>
            <div
              className="card bg-sky-100  p-6 rounded flex flex-col items-center justify-center l:w-[100%] l:h-[80%]  m:w-[50vw] m:h-[80%] text-orange-300   w-[100%]"
              onClick={handleFlip}
            >
              <h1 className="text-lg text-black font-anton m:text-xl m:w-[30vw] xl:text-2xl xl:h-[100%] xl:w-[100%]">
                English
              </h1>

              <p
                className={`${
                  level === "advanced" || level === "intermediate"
                    ? "text-2xl"
                    : "text-4xl"
                }   font-mono font-extrabold pt-4 pb-4 text-2xl justify-center items-center  `}
              >
                {currentWord.word}
              </p>

              <img
                src={flags.EN.path}
                className="w-16 h-16"
                alt="Language Flag"
              />
            </div>
            <div
              className="card bg-sky-100 text-orange p-6 rounded flex flex-col items-center justify-center l:w-[100%] l:h-[80%]  m:w-[50vw] m:h-[80%] text-orange-300 w-[100%]"
              onClick={handleFlip}
            >
              <h1 className="text-lg text-black font-anton m:text-xl m:w-[30vw] xl:text-2xl xl:h-[100%] xl:w-[100%]">
                Norsk
              </h1>

              <p
                className={` ${
                  level === "advanced" || level === "intermediate"
                    ? "text-2xl"
                    : "text-4xl"
                }   font-mono font-extrabold pt-4 pb-4 p-0 m-0  text-2xl justify-center items-center  `}
              >
                {currentWord.translation}
              </p>

              <img
                src={flags.NO.path}
                className="w-16 h-16"
                alt="Language Flag"
              />
            </div>
          </ReactCardFlip>
        </div>

        <div
          className="NEXT WORD [writing-mode:vertical-lr] border font-bold rounded h-[100%] flex justify-center cursor-pointer xl:h-[80%] border-black l:h-[80%] m:h-[100%] m:w-[20%] m:p-4 m:text-xl bg-amber-100 w-[20%] s:w-[20%] s:h-[90%] xl:p-8 xl:text-2xl l:p-4 l:text-xl hover:scale-105 "
          onClick={handleNext}
        >
          Next word <span className="font-bold">˄</span>
        </div>
      </div>
    </div>
  );
};

export default CardX;
