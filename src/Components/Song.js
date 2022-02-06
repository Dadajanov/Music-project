import { useMutation } from "@apollo/react-hooks";
import { Pause, PlayArrow, Save } from "@mui/icons-material";
import { Card, CardActions, CardContent, CardMedia, IconButton, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { useContext, useEffect, useState } from "react";
import { SongContext } from "../Context/Context";
import { ADD_OR_REMOVE_FROM_QUEUE } from "../graphql/mutations";

const useStyle = makeStyles({
  container: {
    margin: '15px',
  },
  songInfoContainer: {
    display: 'flex',
    alignItems: 'center',
  },
  songInfo: {
    width: '100%',
    display: 'flex',
    justifyContent: 'space-between',
  },
  thumbnail: {
    objectFit: 'cover',
    width: 140,
    height: 140
  }
})
const Song = (props) => {
  const classes = useStyle();
  const { thumbnail, artist, title, id } = props.song;
  const [addOrRemoveFromQueue] = useMutation(ADD_OR_REMOVE_FROM_QUEUE, {
    onCompleted: data => {
      localStorage.setItem('Queue', JSON.stringify(data.addOrRemoveFromQueue))
    }
  });
  const [currentSongPlaying, setCurrentSongPlaying] = useState(false);
  const { state, dispatch } = useContext(SongContext);

  useEffect(() => {
    const isSongPlaying = state.isPlaying && id === state.song.id
    setCurrentSongPlaying(isSongPlaying)
  }, [id, state.song.id, state.isPlaying]);

  const handleTogglePlay = () => {
    dispatch({
      type: 'SET_SONG',
      payload: props.song
    });
    dispatch(state.isPlaying ? { type: 'PAUSE_SONG' } : { type: 'PLAY_SONG' });
  };

  const handleAddToQueue = () => {
    addOrRemoveFromQueue({
      variables: {
        input: {
          ...props.song,
          __typename: 'Song'
        }
      }
    });
  };

  return <Card className={classes.container}>
    <div className={classes.songInfoContainer}>
      <CardMedia image={thumbnail} className={classes.thumbnail} />
      <div className={classes.songInfo}>
        <CardContent>
          <Typography gutterbottom='true' variant="h5" component="h2">
            {title}
          </Typography>
          <Typography gutterbottom='true' variant="body1" component="p">
            {artist}
          </Typography>
        </CardContent>
        <CardActions>
          <IconButton size="small" color="color1" onClick={handleTogglePlay}>
            {currentSongPlaying ? <Pause color="color1" /> : <PlayArrow color="color1" />}
          </IconButton>
          <IconButton onClick={handleAddToQueue} size="small" color="color2">
            <Save color="color2" />
          </IconButton>
        </CardActions>
      </div>
    </div>
  </Card>
};

export default Song;
