import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from "@mui/material";
import Mile8 from '../assets/8-mile.jpg'

const Modal = (props) => {
  const handleOnCloseDialog = () => {
    props.onClose()
  };
  const handleOnAddSongialog = () => {
    props.onClose()
  };
  return <Dialog
    open={props.onOpen}
    onClose={props.onClose}
  >
    <DialogTitle sx={{ margin: '0 auto' }}>Edit Song</DialogTitle>
    <DialogContent >
      <img src={Mile8} alt="8mile" style={{ width: '75%', transform: 'translate(15%)' }} />
      <TextField
        margin="dense"
        name="title"
        label="Title"
        placeholder="Enter Title"
        color="color1"
        variant="filled"
        sx={{ backgroundColor: 'inherit' }}
        fullWidth
      />
      <TextField
        margin="dense"
        name="artist"
        label="Artist"
        placeholder="Enter Artist"
        color="color1"
        variant="filled"
        fullWidth
      />
      <TextField
        margin="dense"
        name="Thumbnail"
        label="Thumbnail"
        placeholder="Enter Thumbnail"
        color="color1"
        variant="filled"
        fullWidth
      />
    </DialogContent>
    <DialogActions>
      <Button onClick={handleOnCloseDialog} color="color2" variant="contained" enableColorOnDark>
        Cancel
      </Button >
      <Button
        onClick={handleOnAddSongialog}
        color="color1"
        variant="contained"
      >
        Add Song
      </Button>
    </DialogActions>
  </Dialog>
};

export default Modal
