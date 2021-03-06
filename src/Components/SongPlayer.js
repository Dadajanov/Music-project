import { useQuery } from "@apollo/react-hooks";
import { Pause, PlayArrow, SkipNext, SkipPrevious, VolumeDown, VolumeOff, VolumeUp } from "@mui/icons-material";
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
  details: {
    display: 'flex',
    flexDirection: 'column',
    padding: '0px 15px'
  },
  contant: {
    flex: '1 0 auto'
  },
  thumbnail: {
    width: '90px',
    height: '90px',
  },
  controls: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '0 8px',
  },
  playIcon: {
    height: '38px',
    width: '38px',
  },
  volume: {
    display: 'flex',
    flexDirection: "row",
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%'
  }

})

const SongPlayer = (props) => {
  const classes = useStyle();
  const { state, dispatch } = useContext(SongContext);
  const { data } = useQuery(GET_Queue_SONGS);
  const ReactPlayerRef = useRef()
  const [played, setPlayed] = useState(0);
  const [playedSeconds, setPlayedSeconds] = useState(0);
  const [duration, setDuration] = useState(0);
  const [positionInQueue, setPositionInQueue] = useState(0);
  const [seeking, setSeeking] = useState(false)
  const [volume, setVolume] = useState({
    muted: false,
    volumeOff: 0,
    volume: JSON.parse(localStorage.getItem('volume'))?.volume || 0.5
  })

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
    return new Date(seconds * 1000).toISOString().substring(14, 19)
  }

  const DurationOfSong = (seconds) => {
    setDuration(new Date(seconds * 1000).toISOString().substring(14, 19));
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

  const handleToggleVolumeOff = () => {
    setVolume(prevState => ({
      muted: true,
      volume: volume.volume,
      volumeOff: 0,
    }
    ))
    localStorage.setItem('volume', JSON.stringify(volume))
    setVolume(prevState => ({
      ...prevState,
    }));
    if (volume.muted) {
      setVolume(prevState => ({
        ...prevState,
        muted: false
      }));
      localStorage.setItem('volume', JSON.stringify(volume))
    }
  };


  const handleOnChangeVolume = (event, newValue) => {
    setVolume(prevState => ({
      ...prevState,
      volume: newValue
    }))
    localStorage.setItem('volume', JSON.stringify(volume))
    if (newValue > 0) {
      setVolume(prevState => ({
        ...prevState,
        muted: false
      }))
    }
  }

  return (
    <Fragment>
      <Card variant="outlined" className={classes.container}>
        <div className={classes.details}>
          <div style={{ display: 'flex', padding: "15px 0 0" }}>
            <CardMedia
              className={classes.thumbnail}
              image={state.song.thumbnail}
            />
            <CardContent className={classes.contant}>
              <Typography variant="h5" component="h3">
                {state.song.title}
              </Typography>
              <Typography variant="subtitle1" component="p" color="textSecondary">
                {state.song.artist}
              </Typography>
            </CardContent>
          </div>
          <div className={classes.controls}>
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
            <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
              <Typography variant="subtitle1" component="p"
                color="textSecondary">
                {formatDuration(playedSeconds)}
              </Typography>
              <Typography variant="subtitle1" component="p"
                color="textSecondary">
                {duration}
              </Typography>
            </div>
            <div>
              <IconButton onClick={handlePlayPrevSong}>
                <SkipPrevious />
              </IconButton>
              <IconButton onClick={handleTogglePlay}>
                {state.isPlaying ? <Pause className={classes.playIcon} /> : <PlayArrow className={classes.playIcon} />}
              </IconButton>
              <IconButton onClick={handlePlayNextSong}>
                <SkipNext />
              </IconButton>
            </div>
            <div className={classes.volume}>
              <IconButton onClick={handleToggleVolumeOff}>
                {volume.muted || volume.volume === 0 ?
                  <VolumeOff />
                  : volume.volume > 0.5 ?
                    <VolumeUp />
                    : <VolumeDown />
                }
              </IconButton>
              <Slider
                aria-label="Volume"
                size='small'
                value={volume.muted ? volume.volumeOff : volume.volume}
                style={{ height: '20%' }}
                min={0}
                max={1}
                step={0.01}
                onChange={handleOnChangeVolume} />
            </div>
          </div>
        </div>
        <div style={{ width: 0, height: 0.1 }}>
          <ReactPlayer
            onProgress={handleReactPlayerOnProgress}
            ref={ReactPlayerRef}
            url={state.song.url}
            playing={state.isPlaying}
            volume={volume.muted ? volume.volumeOff : volume.volume}
            onDuration={DurationOfSong}
          />
        </div>
      </Card>
      <QueueList queue={data.Queue} />
    </Fragment>
  )
};

export default SongPlayer;
