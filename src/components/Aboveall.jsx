import React, { useContext, useState } from "react";
import IconButtonMenu from "./IconButtonMenu";
import { ThemeContext } from "../App"; // Correct import with the correct name
import Switch from "@mui/material/Switch";
import { IoLogInOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import { clamp, motion, useTime, useTransform } from "framer-motion";
import { MdDashboard } from "react-icons/md";
import { useAuth } from "../Assets/data/AuthContext";

const Aboveall = () => {
  const { theme, toggleTheme } = useContext(ThemeContext);
  const [checked, setChecked] = useState(true);
  const [isIdle, setIsIdle] = useState(false);
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const handleChange = (event) => {
    setChecked(event.target.checked);
  };
  const handleSignIn = () => {
    navigate("/loginPage");
  };
  const time = useTime();
  const rotate = useTransform(
    time,
    [0, 6000], // For every 4 seconds...
    [0, 360], // ...rotate 360deg
    clamp(false) // Allow the value to exceed the defined range
  );

  return (
    <div className=" h-[70px] border border-black rounded flex justify-between items-center p-2 bg-orange-300">
      <div className="flex items-center">
        <img
          src="src/images/icon_navBar_noBack.webp"
          className="rounded-xl h-[50px] w-[50px]"
          alt="userIcon"
        />
        {!isAuthenticated ? (
          <IoLogInOutline
            className="text-3xl cursor-pointer z-10"
            onClick={handleSignIn}
          />
        ) : null}
        {isAuthenticated ? (
          <MdDashboard
            className="text-3xl cursor-pointer ml-4"
            onClick={() => navigate("/admin")}
          />
        ) : null}
      </div>

      <div className="font-mono font-bold text-xl s:text-s flex flex-row">
        <motion.div animate={{ x: -10 }} style={{ rotate }}>
          Flip
        </motion.div>
        To Know
      </div>

      <div className="flex items-center">
        <Switch
          checked={checked}
          sx={{ color: theme === "light" ? "dark" : "light" }}
          onChange={handleChange}
          onClick={toggleTheme}
        />
        <IconButtonMenu />
      </div>
    </div>
  );
};

export default Aboveall;
