import React from "react";
import { Typography, Button } from "@mui/material";

const Settings = () => {
  return (
    <div>
      <Typography variant="h4" gutterBottom>
        Settings
      </Typography>
      <Typography variant="body1" gutterBottom>
        Configure your account settings and application preferences here.
      </Typography>
      <Button variant="contained" color="primary">
        Save Changes
      </Button>
    </div>
  );
};

export default Settings;
