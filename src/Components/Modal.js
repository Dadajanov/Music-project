import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from "@mui/material";
import { useMutation } from "@apollo/react-hooks";
import { ADD_SONG } from "../graphql/mutations";

const Modal = (props) => {
  const [addSong, { error }] = useMutation(ADD_SONG)

  const handleOnCloseDialog = () => {
    props.onClose()
  };
  const handleOnAddSongialog = async () => {
    const { url, thumbnail, duration, title, artist } = props.song

    await addSong({
      variables: {
        url: url.length > 0 ? url : null,
        thumbnail: thumbnail.length > 0 ? thumbnail : null,
        duration: duration > 0 ? duration : null,
        title: title.length > 0 ? title : null,
        artist: artist.length > 0 ? artist : null,
      }
    })
    props.onClose()
    props.setSong({
      duration: 0,
      title: '',
      artist: '',
      thumbnail: '',
    })
    props.setUrl('')
  };

  const handleChangeSong = (event) => {
    const { name, value } = event.target
    props.setSong(prevSong => ({
      ...prevSong,
      [name]: value
    }))
  }

  const handleError = (field) => {
    return error?.networkError?.extensions?.path.includes(field);
  }

  const { thumbnail, artist, title } = props.song;

  return <Dialog
    open={props.onOpen}
    onClose={props.onClose}
  >
    <DialogTitle sx={{ margin: '0 auto' }}>Edit Song</DialogTitle>
    <DialogContent >
      <img src={thumbnail} alt="song thumbnail" style={{ width: '75%', transform: 'translate(15%)' }} />
      <TextField
        margin="dense"
        name="title"
        onChange={handleChangeSong}
        value={title}
        label="Title"
        placeholder="Enter Title"
        color="color1"
        variant="filled"
        fullWidth
        InputProps={{
          sx: {
            backgroundColor: 'inherit',
          }
        }}
        error={handleError('title')}
        helperText={handleError('title') && 'Fill out field'}
      />
      <TextField
        margin="dense"
        name="artist"
        onChange={handleChangeSong}
        value={artist}
        label="Artist"
        placeholder="Enter Artist"
        color="color1"
        variant="filled"
        fullWidth
        InputProps={{
          sx: { backgroundColor: 'inherit' }
        }}
        error={handleError('artist')}
        helperText={handleError('artist') && 'Fill out field'}
      />
      <TextField
        margin="dense"
        name="thumbnail"
        onChange={handleChangeSong}
        value={thumbnail}
        label="Thumbnail"
        placeholder="Enter Thumbnail"
        color="color1"
        variant="filled"
        fullWidth
        InputProps={{
          sx: { backgroundColor: 'inherit' }
        }}
        error={handleError('thumbnail')}
        helperText={handleError('thumbnail') && 'Fill out field'}
      />
    </DialogContent>
    <DialogActions>
      <Button onClick={handleOnCloseDialog} color="color2" variant="contained">
        Cancel
      </Button >
      <Button onClick={handleOnAddSongialog} color="color1" variant="contained">
        Add Song
      </Button>
    </DialogActions>
  </Dialog>
};

export default Modal
