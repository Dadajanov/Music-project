import { Typography, useMediaQuery } from "@mui/material";
import { Fragment } from "react";
import Queue from "./Queue";

const QueueList = ({ queue }) => {
  const greaterThanMd = useMediaQuery('(min-width:900px)');

  return (
    <div style={{ margin: '10px 0' }}>
      {greaterThanMd &&
        <Fragment>
          <Typography color='textSecondary' variant="button">
            QUEUE ({queue.length})
          </Typography>
          {queue.map(song => {
            return <Queue key={song.id} song={song} />
          })}
        </Fragment>}
    </div>
  )
};

export default QueueList;
