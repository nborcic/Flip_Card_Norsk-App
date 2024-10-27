import React from "react";
import IconButtonMenu from "./IconButtonMenu";
import { useContext } from "react";
import { themeContext } from "../App";
import Switch from "@mui/material/Switch";
import { IoLogInOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";

// //button signup navigates to sign up page

const Aboveall = () => {
  const { theme, toggleTheme } = useContext(themeContext);
  const [checked, setChecked] = React.useState(true);
  const navigate = useNavigate();

  const handleChange = (event) => {
    setChecked(event.target.checked);
  };
  const handleSignIn = () => {
    navigate("/loginPage");
  };

  return (
    <div className=" h-[70px]  border border-black rounded flex justify-between items-center p-2 bg-orange-300">
      <div className="flex items-center">
        <img
          src="src/images/icon_navBar_noBack.webp"
          className="rounded-xl h-[50px] w-[50px] "
          alt="userIcon"
        />
        <IoLogInOutline
          className="text-3xl cursor-pointer z-10"
          onClick={handleSignIn}
        />
      </div>

      <p className="font-mono font-bold text-xl s:text-s">Flip To Know</p>
      <div className="flex items-center">
        <Switch
          checked={checked}
          sx={{ color: theme === "light" ? "dark" : "light" }}
          onChange={handleChange}
          onClick={toggleTheme}
          inputProps={{ "aria-label": "controlled" }}
        />

        <IconButtonMenu />
      </div>
    </div>
  );
};

export default Aboveall;
