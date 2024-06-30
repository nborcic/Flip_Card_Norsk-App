import React from "react";
import Box from "@mui/material/Box";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";

export default function CustomCheckbox() {
  return (
    <div>
      <Box>
        <FormControlLabel control={<Checkbox />} label="Basic" />

        <FormControlLabel control={<Checkbox />} label="Intermediate" />

        <FormControlLabel
          control={<Checkbox />}
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
