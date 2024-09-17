import { useState } from "react";
import { Box, Button, Modal, Typography } from "@mui/material";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
  borderRadius: "10px",
};

const AboutModal = () => {
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div>
      <h5 color="primary" onClick={handleOpen}>
        About
      </h5>
      <Modal
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        aria-labelledby="about-modal-title"
        aria-describedby="about-modal-description"
      >
        <Box sx={style} onClick={handleClose}>
          <Typography id="about-modal-title" variant="h4" component="h2">
            About Flip To Know
          </Typography>
          <Typography id="about-modal-description" sx={{ mt: 2, mb: 2 }}>
            This is a simple application used for practicing Norwegian language
            using fast and easy method. <br />
            App uses the most common words in Norwegian languages and their
            meanings. It also includes some variations of the words.
            <br />
            It includes details about the app and its features.
          </Typography>
          <Button onClick={handleClose} variant="contained" sx={{ mt: 2 }}>
            Close
          </Button>
          <Button
            onClick={handleClose}
            href="https://github.com/nborcic/flip_card_norsk"
            target="_blank"
            variant="contained"
            sx={{ mt: 2 }}
          >
            Github
          </Button>
        </Box>
      </Modal>
    </div>
  );
};

export default AboutModal;
