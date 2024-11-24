import Box from "@mui/material/Box";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import { useState } from "react";
import useMediaQuery from "@mui/material/useMediaQuery";
import { Fa500Px, FaMobileAlt } from "react-icons/fa";

const CustomCheckbox = ({ setLevel }) => {
  const [selectedLevel, setSelectedLevel] = useState("basic");

  const isSmallScreen = useMediaQuery("(max-width:375px)");

  const handleChange = (event) => {
    const { value } = event.target;
    setSelectedLevel(value);
    setLevel(value);
  };
  const windowWidth = window.innerWidth;

  return (
    <div className="flex flex-row items-center justify-center">
      <div className="bg-orange-100 s:pt-2 s:flex-col">
        <div>
          <Box>
            <FormControlLabel
              control={
                <Checkbox
                  sx={{
                    "&.Mui-checked": {
                      color: "blue",
                    },
                  }}
                  checked={selectedLevel === "basic"}
                  onChange={handleChange}
                  value="basic"
                />
              }
              label={
                isSmallScreen ? (
                  <div className="flex flex-row">
                    <img src="src/mdi--arm-flex.svg" alt="Basic" />
                  </div>
                ) : (
                  "Basic"
                )
              }
            />

            <FormControlLabel
              control={
                <Checkbox
                  sx={{
                    "&.Mui-checked": {
                      color: "green",
                    },
                  }}
                  checked={selectedLevel === "intermediate"}
                  onChange={handleChange}
                  value="intermediate"
                />
              }
              label={
                isSmallScreen ? (
                  <div className="flex flex-row">
                    <img src="src/mdi--arm-flex.svg" alt="Basic" />
                    <img src="src/mdi--arm-flex.svg" alt="Basic" />
                  </div>
                ) : (
                  "Intermediate"
                )
              }
            />

            <FormControlLabel
              control={
                <Checkbox
                  sx={{
                    "&.Mui-checked": {
                      color: "red",
                      flexDirection: "column",
                    },
                  }}
                  checked={selectedLevel === "advanced"}
                  onChange={handleChange}
                  value="advanced"
                />
              }
              label={
                isSmallScreen ? (
                  <div className="flex flex-row">
                    <img src="src/mdi--arm-flex.svg" alt="Basic" />
                    <img src="src/mdi--arm-flex.svg" alt="Basic" />
                    <img src="src/mdi--arm-flex.svg" alt="Basic" />
                  </div>
                ) : (
                  "Advanced"
                )
              }
              sx={{
                "&.Mui-focused": {
                  outline: "2px solid blue",
                },
              }}
            />
          </Box>
        </div>
      </div>
      <div className="relative text-3xl">
        {/*replace by icons for coresponding size  */}
        {windowWidth > 375 ? <FaMobileAlt /> : null}
        {windowWidth > 768 ? <faLaptop /> : null}
        
      </div>
    </div>
  );
};

export default CustomCheckbox;
