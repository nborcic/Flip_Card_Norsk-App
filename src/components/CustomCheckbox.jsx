import Box from "@mui/material/Box";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import { useState } from "react";
import useMediaQuery from "@mui/material/useMediaQuery";
import { FaMobileAlt } from "react-icons/fa";

const CustomCheckbox = ({ setLevel }) => {
  const [selectedLevel, setSelectedLevel] = useState("basic");

  const isSmallScreen = useMediaQuery("(max-width:375px)");

  const handleChange = (event) => {
    const { value } = event.target;
    setSelectedLevel(value);
    setLevel(value);
  };

  return (
    <div className="flex flex-row justify-center items-center">
      <div className="s:pt-2 s:flex-col bg-orange-100">
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
      <div className="text-3xl relative" style={{ right: "calc(-15%)" }}>
        <FaMobileAlt />
      </div>
    </div>
  );
};

export default CustomCheckbox;
