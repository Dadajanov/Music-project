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
import { Fragment, useContext, useEffect, useRef, useState } from "react";
import { SongContext } from "../Context/Context";
import { GET_Queue_SONGS } from "../graphql/queries";
import QueueList from "./QueueList";
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
  const { data } = useQuery(GET_Queue_SONGS);
  const ReactPlayerRef = useRef()
  const [played, setPlayed] = useState(0);
  const [playedSeconds, setPlayedSeconds] = useState(0);
  const [positionInQueue, setPositionInQueue] = useState(0);
  const [seeking, setSeeking] = useState(false)

  useEffect(() => {
    const songIndex = data.Queue.findIndex(song => song.id === state.song.id);
    setPositionInQueue(songIndex)
  }, [data.Queue, state.song.id])

  useEffect(() => {
    const nextSong = data.Queue[positionInQueue + 1]
    if (played === 1 && nextSong) {
      setPlayed(0);
      dispatch({
        type: "SET_SONG", payload: nextSong
      })
    }
  }, [data.Queue, played, dispatch, positionInQueue])

  const handleTogglePlay = () => {
    dispatch(state.isPlaying ? { type: 'PAUSE_SONG' } : { type: 'PLAY_SONG' })
  };

  const handleReactPlayerOnProgress = ({ played, playedSeconds }) => {
    if (!seeking) {
      setPlayed(played)
      setPlayedSeconds(playedSeconds)
    }
  }
  const handleProgressChange = (event, newValue) => {
    setPlayed(newValue)
  };

  const handleSeekMouseDown = () => {
    setSeeking(true)
  };

  const handleSeekMouseUp = () => {
    setSeeking(false)
    ReactPlayerRef.current.seekTo(played)
  };

  const formatDuration = (seconds) => {
    return new Date(seconds * 1000).toISOString().substring(11, 19)
  }

  const handlePlayPrevSong = () => {
    const prevSong = data.Queue[positionInQueue - 1]
    if (prevSong) {
      dispatch({
        type: "SET_SONG", payload: prevSong
      })
    }
  };

  const handlePlayNextSong = () => {
    const nextSong = data.Queue[positionInQueue + 1]
    if (nextSong) {
      dispatch({
        type: "SET_SONG", payload: nextSong
      })
    }
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
            <IconButton onClick={handlePlayPrevSong}>
              <SkipPrevious />
            </IconButton>
            <IconButton onClick={handleTogglePlay}>
              {state.isPlaying ? <Pause className={classes.playIcon} /> : <PlayArrow className={classes.playIcon} />}
            </IconButton>
            <IconButton onClick={handlePlayNextSong}>
              <SkipNext />
            </IconButton>
            <Typography variant="subtitle1" component="p"
              color="textSecondary">
              {formatDuration(playedSeconds)}
            </Typography>
          </div>
          <Slider
            onMouseDown={handleSeekMouseDown}
            onMouseUp={handleSeekMouseUp}
            onChange={handleProgressChange}
            value={played}
            type="range"
            min={0}
            max={1}
            step={0.01}
          />
        </div>
        <ReactPlayer
          onProgress={handleReactPlayerOnProgress}
          ref={ReactPlayerRef}
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
      <QueueList queue={data.Queue} />
    </Fragment>
  )
};

export default SongPlayer;
