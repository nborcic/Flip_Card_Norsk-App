import React from "react";
import Box from "@mui/material/Box";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import { useState } from "react";

export default function CustomCheckbox({ setLevel }) {
  const [selectedLevel, setSelectedLevel] = useState("basic");

  const handleChange = (event) => {
    const { value } = event.target;
    setSelectedLevel(value);
    setLevel(value);
    
  };
  return (
    <div>
      <Box>
        <FormControlLabel
          control={
            <Checkbox
              checked={selectedLevel === "basic"}
              onChange={handleChange}
              value="basic"
            />
          }
          label="Basic"
        />

        <FormControlLabel
          control={
            <Checkbox
              checked={selectedLevel === "intermediate"}
              onChange={handleChange}
              value="intermediate"
            />
          }
          label="Intermediate"
        />

        <FormControlLabel
          control={
            <Checkbox
              checked={selectedLevel === "advanced"}
              onChange={handleChange}
              value="advanced"
            />
          }
          label="Advanced"
          sx={{
            "&.Mui-focused": {
              outline: "2px solid blue",
            },
          }}
        />
      </Box>
    </div>
  );
}
