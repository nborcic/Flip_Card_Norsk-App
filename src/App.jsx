import React from "react";
import Topbar from "./components/Topbar";
import Aboveall from "./components/Aboveall";
import CardX from "./components/CardX";
import NewWords from "./components/NewWords";

const App = () => {
  return (
    <div>
      <div>
        <Aboveall />
        <Topbar />
        <CardX />
        <NewWords />
      </div>
    </div>
  );
};

export default App;
