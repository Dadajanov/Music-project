import { AddBoxOutlined, Link } from "@mui/icons-material";
import { Button, InputAdornment, TextField } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { useState } from "react";
import Modal from "./Modal";

const useStyles = makeStyles({
  container: {
    display: 'flex',
    alignItems: 'center',
    margin: '16px 0 8px',
    paddingTop: 0
  },
  urlInputWrapper: {
    margin: '10px !important',
  },
  urlInput: {
    backgroundColor: 'transparent !important',
  },
  addSongButton: {
    margin: '10px'
  },

});

const AddSongs = () => {
  const [showModal, setShowModal] = useState(false)
  const classes = useStyles()
  const handleClick = () => {
    setShowModal(true)
  }

  const handleOnClose = () => {
    setShowModal(false)
  }

  return (
    <div className={classes.container}>
      <TextField
        className={classes.urlInputWrapper}
        color="color1"
        placeholder="Add YouTube url"
        autoComplete="false"
        fullWidth
        margin="normal"
        variant="filled"
        type="url"
        inputProps={{
          sx: {
            backgroundColor: 'transparent !important',
            paddingTop: '8px !important'
          },
        }}
        InputProps={{
          className: `${classes.urlInput}`,
          startAdornment: (
            <InputAdornment position="start" sx={{ marginTop: '0 !important' }}  >
              <Link color="white" />
            </InputAdornment>
          ),
        }}
      />
      < Button
        className={classes.addSongButton}
        onClick={handleClick}
        variant="contained"
        color="color1"
        endIcon={< AddBoxOutlined />}
      >
        Add
      </ Button>
      <Modal onOpen={showModal} onClose={handleOnClose} />
    </div >
  )
};

export default AddSongs;
