import React from "react";
import wordList from "/public/NewWords.json";

const NewWords = () => {
  const firstRandom = Math.floor(Math.random() * wordList.length);
  const secondRandom = Math.floor(Math.random() * wordList.length);
  const thirdRandom = Math.floor(Math.random() * wordList.length);

  const word = wordList[firstRandom].word;
  const wordd = wordList[secondRandom].word;
  const worddd = wordList[thirdRandom].word;

  const def = wordList[firstRandom].definition;
  const deff = wordList[secondRandom].definition;
  const defff = wordList[thirdRandom].definition;
  return (
    <div>
      <div className="flex justify-center items-center rounded bg-blue-300 p-2  border flex-col border-black">
        <section className="mb-2">
          <p className="font-bold flex justify-center items-center">{word}</p>
          <p className="flex justify-center items-center w-[80vw]">
            {def}
          </p>
        </section>
        <section>
          <li>Variation One</li>
          <li>Variation Two</li>
          <li>Variation Three</li>
        </section>
        <br />
        <section className="mb-2">
          <p className="font-bold flex justify-center items-center">{wordd}</p>
          <p className="flex justify-center items-center w-[80vw]">{deff}</p>
        </section>
        <section>
          <li>Variation One</li>
          <li>Variation Two</li>
          <li>Variation Three</li>
        </section>
        <br />
        <section className="mb-2">
          <p className="font-bold flex justify-center items-center">{worddd}</p>
          <p className="flex justify-center items-center w-[80vw]">{defff}</p>
        </section>
        <section>
          <li>Variation One</li>
          <li>Variation Two</li>
          <li>Variation Three</li>
        </section>
      </div>
    </div>
  );
};

export default NewWords;
