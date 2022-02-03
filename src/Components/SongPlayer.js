import { PlayArrow, SkipNext, SkipPrevious } from "@mui/icons-material";
import { Card, CardContent, CardMedia, IconButton, Slider, Typography } from "@mui/material";
import { Fragment } from "react";
import SavedPlayList from "./SavedPlayList";

const SongPlayer = (props) => {
  return (
    <Fragment>
      <Card variant="outlined">
        <div>
          <CardContent>
            <Typography variant="h5" component="h3">
              Title
            </Typography>
            <Typography variant="subtitle1" component="p" color="textSecondary">
              Title
            </Typography>
          </CardContent>
          <div>
            <IconButton>
              <SkipPrevious />
            </IconButton>
            <IconButton>
              <PlayArrow />
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
          image={'undifened'}
        />
      </Card>
      <SavedPlayList />
    </Fragment>
  )
};

export default SongPlayer;
