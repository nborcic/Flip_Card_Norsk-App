import { React } from "react";
import wordList from "../Assets/data/NewWords.json";

const NewWords = () => {
  const firstRandom = Math.floor(Math.random() * wordList.length);
  const secondRandom = Math.floor(Math.random() * wordList.length);
  const thirdRandom = Math.floor(Math.random() * wordList.length);

  const word = wordList[firstRandom].word;
  const def = wordList[firstRandom].definition;
  const varr0 = wordList[firstRandom].variations[0];
  const varr1 = wordList[firstRandom].variations[1];
  const varr2 = wordList[firstRandom].variations[2];

  const wordd = wordList[secondRandom].word;
  const deff = wordList[secondRandom].definition;
  const varrr0 = wordList[secondRandom].variations[0];
  const varrr1 = wordList[secondRandom].variations[1];
  const varrr2 = wordList[secondRandom].variations[2];

  const worddd = wordList[thirdRandom].word;
  const defff = wordList[thirdRandom].definition;
  const varrrr0 = wordList[thirdRandom].variations[0];
  const varrrr1 = wordList[thirdRandom].variations[1];
  const varrrr2 = wordList[thirdRandom].variations[2];

  return (
    <div>
      <div className="flex justify-center items-center rounded  p-2  border flex-col border-black bg-emerald-100">
        <br />
        <section className="mb-2">
          <p className="font-bold text-xl flex justify-center items-center">
            {word}
          </p>
          <p className="flex justify-center items-center w-[80vw] xl:w-[510px]">
            {def}
          </p>
        </section>
        <section>
          <li>{varr0}</li>
          <li>{varr1}</li>
          <li>{varr2}</li>
        </section>
        <br />
        <section className="mb-2">
          <p className="font-bold text-xl flex justify-center items-center">
            {wordd}
          </p>
          <p className="flex justify-center items-center w-[60vw] xl:w-[510px]">
            {deff}
          </p>
        </section>
        <section>
          <li>{varrr0}</li>
          <li>{varrr1}</li>
          <li>{varrr2}</li>
        </section>
        <br />
        <section className="mb-2">
          <p className="font-bold text-xl flex justify-center items-center">
            {worddd}
          </p>
          <p className="flex justify-center items-center w-[80vw] xl:w-[510px]">
            {defff}
          </p>
        </section>
        <section>
          <li>{varrrr0}</li>
          <li>{varrrr1}</li>
          <li>{varrrr2}</li>
        </section>
        <br />
      </div>
    </div>
  );
};

export default NewWords;
