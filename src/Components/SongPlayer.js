import { useQuery } from "@apollo/react-hooks";
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
import { Fragment, useContext, useState } from "react";
import { SongContext } from "../Context/Context";
import { GET_SAVEDMUSIC_SONGS } from "../graphql/queries";
import SavedPlayList from "./SavedPlayList";
import ReactPlayer from "react-player";

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
  const classes = useStyle();
  const { state, dispatch } = useContext(SongContext);
  const [played, setPlayed] = useState(0);
  const { data } = useQuery(GET_SAVEDMUSIC_SONGS);
  const [seeking, setSeeking] = useState(false)
  const handleTogglePlay = () => {
    dispatch(state.isPlaying ? { type: 'PAUSE_SONG' } : { type: 'PLAY_SONG' })
  };

  const handleProgressChange = (event, newValue) => {
    setPlayed(newValue)
  };

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
            onChange={handleProgressChange}
            value={played}
            type="range"
            min={0}
            max={1}
            step={0.01}
          />
        </div>
        <ReactPlayer
          onProgress={({ played, playedSeconds }) => {
            setPlayed(played)
          }}
          url={state.song.url}
          playing={state.isPlaying}
          width='0'
          height='0'
        />
        <CardMedia
          className={classes.thumbnail}
          image={state.song.thumbnail}
        />
      </Card>
      <SavedPlayList savedMusic={data.savedMusic} />
    </Fragment>
  )
};

export default SongPlayer;
