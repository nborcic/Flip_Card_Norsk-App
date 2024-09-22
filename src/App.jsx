import Topbar from "./components/Topbar";
import Aboveall from "./components/Aboveall";
import CardX from "./components/CardX";
import NewWords from "./components/NewWords";
import { useState, useContext, useMemo } from "react";
import { createContext } from "react";
import { IdleTimerProvider } from "react-idle-timer";
import { motion } from "framer-motion";
import Tippy from "@tippyjs/react";
import "tippy.js/dist/tippy.css";

export const themeContext = createContext();

export function useTheme() {
  return useContext(themeContext);
}

const App = () => {
  const [level, setLevel] = useState("basic");
  const [theme, setTheme] = useState("light");

  const toggleTheme = () => {
    setTheme((currTheme) => (currTheme === "light" ? "dark" : "light"));
  };

  const styles = {
    backgroundColor:
      theme === "light" ? "rgb(255, 255, 255)" : "rgb(241,255,219)",
    color: theme === "light" ? "rgb(0, 0, 0)" : "rgb(0, 0, 0)",
  };

  const value = {
    theme,
    styles,
    toggleTheme,
  };

  const handleOnIdle = () => {
    const motion = (
      <motion.div
        animate={{ x: [0, 100, -100, 0], y: [0, 50, -50, 0] }}
        transition={{ duration: 10, repeat: Infinity }}
      >
        <div className="cloud">☁️</div>
      </motion.div>
    );
  };

  return (
    //set up message on idle useing package lib and react-idle-timer
    <IdleTimerProvider onIdle={handleOnIdle} timeout={1000 * 1 * 1}>
      <motion initial={{ opacity: 0 }} animate={{ opacity: 1 }} />
      <Tippy content="Come back and explore more!">
        <div className="cloud-bubble">💬</div>
      </Tippy>
      <themeContext.Provider value={value}>
        <div
          style={styles}
          className="flex justify-center items-center bg-white max-w-[720px] "
        >
          <div className="shadow m-2 max-w-[720px] ">
            <Aboveall />
            <Topbar setLevel={setLevel} />
            <CardX level={level} />
            <NewWords />
          </div>
        </div>
      </themeContext.Provider>
    </IdleTimerProvider>
  );
};

export default App;
