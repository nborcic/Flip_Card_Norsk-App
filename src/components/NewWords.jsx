import React from "react";
import wordList from "/public/NewWords.json";
//make a list of new words in a 3word object and display them in a list of new words
//after 5min of wait time, the list will be updated with new words
const NewWords = () => {
  return (
    <div>
      <div className="flex justify-center items-center rounded bg-blue-300 p-2  border flex-col border-black">
        <section className="mb-2">
          <p className="font-bold">New word One</p>
          <p>Definition</p>
        </section>
        <section>
          <li>Variation One</li>
          <li>Variation Two</li>
          <li>Variation Three</li>
        </section>
        <br />
        <section className="mb-2">
          <p className="font-bold">New word One</p>
          <p>Definition</p>
        </section>
        <section>
          <li>Variation One</li>
          <li>Variation Two</li>
          <li>Variation Three</li>
        </section>
        <br />
        <section className="mb-2">
          <p className="font-bold">New word One</p>
          <p>Definition</p>
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
