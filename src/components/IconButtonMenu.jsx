import React, { useState } from "react";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import MoreVertIcon from "@mui/icons-material/MoreVert";

export default function IconButtonMenu() {
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    console.log("IconButton clicked");
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    console.log("Menu closed");
    setAnchorEl(null);
  };

  return (
    <div>
      <IconButton overlay="none"
        sx={{
          backgroundColor: "white",
          "&:hover": {
            backgroundColor: "lightgray",
          },
          padding: "0.5rem",
        }}
        aria-label="more"
        aria-controls="long-menu"
        aria-haspopup="true"
        onClick={handleClick}
      >
        <MoreVertIcon />
      </IconButton>
      <Menu
        id="long-menu"
        sx={{ backgroundColor: "white" }}
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem onClick={handleClose}>Profile</MenuItem>
        <MenuItem onClick={handleClose}>My account</MenuItem>
        <MenuItem onClick={handleClose}>Logout</MenuItem>
      </Menu>
    </div>
  );
}
