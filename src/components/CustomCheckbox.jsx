import Box from "@mui/material/Box";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import { useState } from "react";
import useMediaQuery from "@mui/material/useMediaQuery";

const CustomCheckbox = ({ setLevel }) => {
  const [selectedLevel, setSelectedLevel] = useState("basic");

  const isSmallScreen = useMediaQuery("(max-width:375px)");

  const handleChange = (event) => {
    const { value } = event.target;
    setSelectedLevel(value);
    setLevel(value);
  };

  return (
    <div className="s:pt-2 s:flex-col bg-orange-100 flex justify-between items-center relative">
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
                "intermediate"
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
                <div className="flex flex-row ">
                  <img src="src/mdi--arm-flex.svg" alt="Basic" />
                  <img src="src/mdi--arm-flex.svg" alt="Basic" />
                  <img src="src/mdi--arm-flex.svg" alt="Basic" />
                </div>
              ) : (
                "advanced"
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
      <div className="h-2 w-12  bg-black absolute right-20"></div>
    </div>
  );
};

export default CustomCheckbox;
