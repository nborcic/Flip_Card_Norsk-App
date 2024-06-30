import React from "react";
import Topbar from "./components/Topbar";
import Aboveall from "./components/Aboveall";
import CardX from "./components/CardX";
import NewWords from "./components/NewWords";

const App = () => {
  return (
    <div className="">
      <Aboveall />
      <Topbar />
      <CardX />
      <NewWords />
    </div>
  );
};

export default App;
