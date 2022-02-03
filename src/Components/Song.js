import { PlayArrow, Save } from "@mui/icons-material";
import { Card, CardActions, CardContent, CardMedia, IconButton, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";

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
  const classes = useStyle()
  return <Card className={classes.container}>
    <div className={classes.songInfoContainer}>
      <CardMedia image={props.image} className={classes.thumbnail} />
      <div className={classes.songInfo}>
        <CardContent>
          <Typography gutterBottm variant="h5" component="h2">
            {props.title}
          </Typography>
          <Typography gutterBottm variant="body1" component="p">
            {props.artist}
          </Typography>
        </CardContent>
        <CardActions>
          <IconButton size="small" color="color1">
            <PlayArrow color="color1" />
          </IconButton>
          <IconButton size="small" color="color2">
            <Save color="color2" />
          </IconButton>
        </CardActions>
      </div>
    </div>
  </Card>
};

export default Song;
