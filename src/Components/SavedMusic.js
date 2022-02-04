import { Delete } from "@mui/icons-material";
import { Avatar, IconButton, Typography } from "@mui/material";
import mile8 from '../assets/8-mile.jpg'
import { makeStyles } from "@mui/styles";

const useStyle = makeStyles({
  avatar: {
    width: '44px',
    height: '44px',
  },
  text: {
    textOverflow: 'ellipsis',
    overflow: 'hidden',
  },
  container: {
    display: 'grid',
    gridAutoFlow: 'column',
    gridTemplateColumns: '50px auto 50px',
    gridGap: '12px',
    alignItems: 'center',
    marginTop: 10,
  },
  songInfoContainer: {
    overflow: 'hidden',
    whiteSpace: 'nowrap'
  }
})

const SavedMusic = (props) => {
  const classes = useStyle()

  return (
    <div className={classes.container}>
      <Avatar src={mile8} alt='Song thumbnail' className={classes.avatar} />
      <div className={classes.songInfoContainer}>
        <Typography variant='subtitle2' className={classes.text}>
          {props.title}
        </Typography>
        <Typography color="textSecondary" variant='body2'>
          {props.artist}
        </Typography>
      </div>
      <IconButton>
        <Delete color='color2' />
      </IconButton>
    </div>
  )
};

export default SavedMusic
