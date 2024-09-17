import Topbar from "./components/Topbar";
import Aboveall from "./components/Aboveall";
import CardX from "./components/CardX";
import NewWords from "./components/NewWords";
import { useState } from "react";
import { ThemeProvider } from "./components/useContext";

const App = () => {
  const [level, setLevel] = useState("basic");

  return (
    <ThemeProvider>
      <div className="flex justify-center items-center bg-white max-w-[720px] ">
        <div className="shadow m-2 max-w-[720px] ">
          <Aboveall />
          <Topbar setLevel={setLevel} />
          <CardX level={level} />
          <NewWords />
        </div>
      </div>
    </ThemeProvider>
  );
};

export default App;
