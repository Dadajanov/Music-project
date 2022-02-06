import { Pause, PlayArrow, SkipNext, SkipPrevious } from "@mui/icons-material";
import {
  Card,
  CardContent,
  CardMedia,
  IconButton,
  Slider,
  Typography
} from "@mui/material";
import { makeStyles } from '@mui/styles';
import { Fragment, useContext } from "react";
import { SongContext } from "../Context/Context";
import SavedPlayList from "./SavedPlayList";

const useStyle = makeStyles({
  container: {
    display: 'flex',
    justifyContent: 'space-between'
  },
  details: {
    display: 'flex',
    flexDirection: 'column',
    padding: '0px 15px'
  },
  contant: {
    flex: '1 0 auto'
  },
  thumbnail: {
    width: 150,
  },
  controls: {
    display: 'flex',
    alignItems: 'center',
    padding: '0 8px',
  },
  playIcon: {
    height: '38px',
    width: '38px',
  }

})

const SongPlayer = (props) => {
  const { state, dispatch } = useContext(SongContext)
  const classes = useStyle()

  const handleTogglePlay = () => {
    dispatch(state.isPlaying ? { type: 'PAUSE_SONG' } : { type: 'PLAY_SONG' })
  }
  return (
    <Fragment>
      <Card variant="outlined" className={classes.container}>
        <div className={classes.details}>
          <CardContent className={classes.contant}>
            <Typography variant="h5" component="h3">
              {state.song.title}
            </Typography>
            <Typography variant="subtitle1" component="p" color="textSecondary">
              {state.song.artist}
            </Typography>
          </CardContent>
          <div className={classes.controls}>
            <IconButton>
              <SkipPrevious />
            </IconButton>
            <IconButton onClick={handleTogglePlay}>
              {state.isPlaying ? <Pause className={classes.playIcon} /> : <PlayArrow className={classes.playIcon} />}
            </IconButton>
            <IconButton>
              <SkipNext />
            </IconButton>
            <Typography variant="subtitle1" component="p"
              color="textSecondary">
              00:01:30
            </Typography>
          </div>
          <Slider
            type="range"
            min={0}
            max={1}
            step={0.01}
          />
        </div>
        <CardMedia
          className={classes.thumbnail}
          image={state.song.thumbnail}
        />
      </Card>
      <SavedPlayList />
    </Fragment>
  )
};

export default SongPlayer;
