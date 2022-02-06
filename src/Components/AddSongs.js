import { AddBoxOutlined, Link } from "@mui/icons-material";
import { Button, InputAdornment, TextField } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { useEffect, useState } from "react";
import Modal from "./Modal";
import ReactPlayer from 'react-player'
import SoundCloudPlayer from 'react-player/lib/players/Facebook'
import YouTubePlayer from 'react-player/lib/players/YouTube'

const useStyles = makeStyles({
  container: {
    display: 'flex',
    alignItems: 'center',
    margin: '16px 0 8px',
    padding: '0 15px'
  },
  urlInputWrapper: {
    margin: '10px 10px 10px 0 !important ',
  },
  urlInput: {
    backgroundColor: 'transparent !important',
  },
  addSongButton: {
    paddingRight: ' 0 10px'
  },

});


const AddSongs = () => {
  const classes = useStyles()
  const [showModal, setShowModal] = useState(false)
  const [url, setUrl] = useState('')
  const [playable, setPlayable] = useState(false)
  const [song, setSong] = useState({
    duration: 0,
    title: '',
    artist: '',
    thumbnail: '',
  })

  useEffect(() => {
    const isPlayable = SoundCloudPlayer.canPlay(url) || YouTubePlayer.canPlay(url)
    setPlayable(isPlayable)
  }, [url]);

  const handleClick = () => {
    setShowModal(true)
  };

  const handleOnClose = () => {
    setShowModal(false)
  };

  const handleOnChangeInput = (event) => {
    setUrl(event.target.value)
  };

  const handleEditSong = async ({ player }) => {
    const nestedPlayer = player.player.player
    let songData;
    if (nestedPlayer.getVideoData) {
      songData = await getYoutubeInfo(nestedPlayer)
    } else if (nestedPlayer.getCurrentSound) {
      songData = await getSoudCloudInfo(nestedPlayer)
    }
    setSong({
      ...songData,
      url
    })
  };

  const getYoutubeInfo = (player) => {
    const duration = player.getDuration();
    const { title, video_id, author } = player.getVideoData()
    const thumbnail = `http://img.youtube.com/vi/${video_id}/0.jpg`

    return {
      duration,
      title,
      artist: author,
      thumbnail,
    }
  }

  const getSoudCloudInfo = (player) => {
    return new Promise(resolve => {
      player.getCurrentSound(songData => {
        if (songData) {
          resolve({
            duratin: Number(songData.duration / 1000),
            title: songData.title,
            artist: songData.user.username,
            thumbnail: songData.artwork_url.replace('-large', '-t500x500'),
          })
        }
      });
    })
  }

  return (
    <div className={classes.container}>
      <TextField
        className={classes.urlInputWrapper}
        onChange={handleOnChangeInput}
        value={url}
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
        disabled={!playable}
        className={classes.addSongButton}
        onClick={handleClick}
        variant="contained"
        color="color1"
        endIcon={< AddBoxOutlined />}
      >
        Add
      </ Button>
      <Modal
        setSong={setSong}
        setUrl={setUrl}
        song={song}
        onOpen={showModal}
        onClose={handleOnClose}
      />
      <ReactPlayer
        url={url}
        width='0'
        height='0'
        onReady={handleEditSong}
      />
    </div >
  )
};

export default AddSongs;
