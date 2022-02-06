import { Typography, useMediaQuery } from "@mui/material";
import { Fragment } from "react";
import SavedMusic from "./SavedMusic";

const SavedPlayList = ({ savedMusic }) => {
  const greaterThanMd = useMediaQuery('(min-width:900px)');

  return (
    <div style={{ margin: '10px 0' }}>
      {greaterThanMd &&
        <Fragment>
          <Typography color='textSecondary' variant="button">
            SAVED MUSICS ({savedMusic.length})
          </Typography>
          {savedMusic.map(song => {
            return <SavedMusic key={song.id} song={song} />
          })}
        </Fragment>}
    </div>
  )
};

export default SavedPlayList;
