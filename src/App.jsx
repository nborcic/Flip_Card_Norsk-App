import React from "react";
import Topbar from "./components/Topbar";
import Aboveall from "./components/Aboveall";
import CardX from "./components/CardX";
import NewWords from "./components/NewWords";
import { useState } from "react";

const App = () => {
  const [level, setLevel] = useState("basic");

  return (
    <div className="flex justify-center items-center bg-blue-50">
      <div className="shadow m-2 max-w-[760px] bg-blue-100">
        <Aboveall />
        <Topbar setLevel={setLevel} />
        <CardX level={level} />
        <NewWords />
      </div>
    </div>
  );
};

export default App;
