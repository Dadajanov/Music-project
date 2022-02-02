import { AddBoxOutlined, Link } from "@mui/icons-material";
import { Button, InputAdornment, TextField } from "@mui/material";
import { useState } from "react";


const AddSongs = () => {
  const [showModal, setShowModal] = useState(false)

  const handleClick = () => {
    setShowModal(true)
  }

  const handleOnClose = () => {
    setShowModal(false)
  }
  return (
    <div>
      <TextField
        color="color1"
        placeholder="Add YouTube url"
        fullWidth
        margin="normal"
        variant="filled"
        type="url"
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <Link color="white" />
            </InputAdornment>
          ),
        }}
      />
      <Button
        onClick={handleClick}
        variant="contained"
        color="color1"
        endIcon={<AddBoxOutlined />}
      >
        Add
      </Button>
      {/* <Modal
        isOpen={showModal}
        onClose={handleOnClose}
      /> */}
    </div>
  )
};

export default AddSongs;
