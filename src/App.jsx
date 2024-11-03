import Topbar from "./components/Topbar";
import Aboveall from "./components/Aboveall";
import CardX from "./components/CardX";
import NewWords from "./components/NewWords";
import { useState, useContext, useEffect } from "react";
import { createContext } from "react";
import { Routes, Route } from "react-router-dom";
import AdminDashboard from "./components/AdminDashboard";
import Users from "./components/Users";
import Settings from "./components/Settings";
import Sidebar from "./components/Sidebar";
import { Box } from "@mui/material";
import { motion } from "framer-motion";

export const themeContext = createContext();

export function useTheme() {
  return useContext(themeContext);
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
      theme === "light" ? "rgb(201, 222, 247)" : "rgb(255,255,255)",
    color: theme === "light" ? "rgb(0, 0, 0)" : "rgb(0, 0, 0)",
  };

  const value = {
    theme,
    styles,
    toggleTheme,
  };
  useEffect(() => {
    let idleTimer;

    // Reset timer on any user activity
    const resetIdleTimer = () => {
      setIsIdle(false);
      clearTimeout(idleTimer);
      idleTimer = setTimeout(() => setIsIdle(true), 10000); // 10 seconds
    };

    // Attach event listeners for user activity
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
      transition: { duration: 0.5, repeat: 3, ease: "easeInOut" },
    },
  };
  return (
    <motion.div variants={shakeVariants} animate={isIdle ? "shake" : ""}>
      <themeContext.Provider value={value}>
        <Routes>
          {/*  main content */}
          <Route
            path="/"
            element={
              <div
                style={styles}
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
                <Sidebar />
                <Box sx={{ flexGrow: 1, p: 3 }}>
                  <Routes>
                    <Route path="/*" element={<AdminDashboard />} />
                    <Route path="users" element={<Users />} />
                    <Route path="settings" element={<Settings />} />
                  </Routes>
                </Box>
              </Box>
            }
          />
        </Routes>
      </themeContext.Provider>
    </motion.div>
  );
};

export default App;
