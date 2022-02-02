import { AddBoxOutlined, Link } from "@mui/icons-material";
import { Button, InputAdornment, TextField } from "@mui/material";
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles({
  text: {
    color: '#FFFFFF'
  }
});

const AddSongs = () => {
  const classes = useStyles()
  return (
    <div>
      <TextField
        color="color1"
        className={classes.text}
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
        variant="contained"
        color="color1"
        endIcon={<AddBoxOutlined />}
      >
        Add
      </Button>
    </div>
  )
};

export default AddSongs;
