import React, { useState } from "react";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import AboutModal from "./AboutModal";

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
      <IconButton
        overlay="none"
        sx={{
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
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem onClick={handleClose} disabled>
          Profile
        </MenuItem>

        <MenuItem>
          <AboutModal />
        </MenuItem>
      </Menu>
    </div>
  );
}
