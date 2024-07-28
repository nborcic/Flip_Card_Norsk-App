import React from "react";
import Topbar from "./components/Topbar";
import Aboveall from "./components/Aboveall";
import CardX from "./components/CardX";
import NewWords from "./components/NewWords";
import { useState } from "react";

const App = () => {
  const [level, setLevel] = useState("basic");

  return (
    <div>
      <div className="shadow m-2">
        <Aboveall />
        <Topbar setLevel={setLevel} />
        <CardX level={level} />
        <NewWords />
      </div>
    </div>
  );
};

export default App;
