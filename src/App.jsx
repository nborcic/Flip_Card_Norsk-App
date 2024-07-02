import React from "react";
import Topbar from "./components/Topbar";
import Aboveall from "./components/Aboveall";
import CardX from "./components/CardX";
import NewWords from "./components/NewWords";

const App = () => {
  return (
    <div>
      <div className=" ">
        <Aboveall />
        <Topbar />
        <CardX className="" />
        <NewWords />
      </div>
    </div>
  );
};

export default App;
