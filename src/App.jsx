import Topbar from "./components/Topbar";
import Aboveall from "./components/Aboveall";
import CardX from "./components/CardX";
import NewWords from "./components/NewWords";
import { createContext, useContext, useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AdminDashboard from "./components/AdminDashboard";
import { Box } from "@mui/material";
import { motion } from "framer-motion";

export const ThemeContext = createContext();
export function useTheme() {
  return useContext(ThemeContext);
}

const App = () => {
  const [level, setLevel] = useState("basic");
  const [theme, setTheme] = useState("light");
  const [isIdle, setIsIdle] = useState(false);

  const toggleTheme = () => {
    setTheme((currTheme) => (currTheme === "light" ? "dark" : "light"));
  };

  const styles = {
    backgroundColor:
      theme === "light" ? "rgb(201, 222, 250)" : "rgb(255,255,255)",
    color: theme === "light" ? "rgb(0, 0, 0)" : "rgb(0, 0, 0)",
  };

  const value = {
    theme,
    styles,
    toggleTheme,
  };

  useEffect(() => {
    let idleTimer;

    // Reset timer on activity
    const resetIdleTimer = () => {
      setIsIdle(false);
      clearTimeout(idleTimer);
      idleTimer = setTimeout(() => setIsIdle(true), 10000); // 10 seconds
    };

    // Attach event listeners for activity
    window.addEventListener("mousemove", resetIdleTimer);
    window.addEventListener("keydown", resetIdleTimer);

    // Initialize the timer
    idleTimer = setTimeout(() => setIsIdle(true), 10000);

    // Cleanup on component unmount
    return () => {
      clearTimeout(idleTimer);
      window.removeEventListener("mousemove", resetIdleTimer);
      window.removeEventListener("keydown", resetIdleTimer);
    };
  }, []);

  const shakeVariants = {
    shake: {
      x: [0, -10, 10, -10, 10, 0], // Movement pattern for shake
      transition: { duration: 0.5, repeat: 2, ease: "easeInOut" },
    },
  };

  return (
    <motion.div style={styles} variants={shakeVariants} animate={isIdle ? "shake" : ""}>
      <ThemeContext.Provider value={value}>
        <Routes>
          {/* main content */}
          <Route
            path="/"
            element={
              <div
               
                className="flex justify-center items-center m-auto max-w-[720px]"
              >
                <div className="shadow m-2 max-w-[720px]">
                  <Aboveall />
                  <Topbar setLevel={setLevel} />
                  <CardX level={level} />
                  <NewWords />
                </div>
              </div>
            }
          />

          {/* admin dashboard */}
          <Route
            path="/admin/*"
            element={
              <Box sx={{ display: "flex" }}>
                <Box sx={{ flexGrow: 1, p: 3 }}>
                  <AdminDashboard />
                </Box>
              </Box>
            }
          />
        </Routes>
      </ThemeContext.Provider>
    </motion.div>
  );
};

export default App;
