import { Typography, useMediaQuery } from "@mui/material";
import { Fragment } from "react";
import mile8 from '../assets/8-mile.jpg'
import SavedMusic from "./SavedMusic";

const SavedPlayList = () => {
  const greaterThanMd = useMediaQuery('(min-width:900px)')
  return (
    <div style={{ margin: '10px 0' }}>
      {greaterThanMd &&
        <Fragment>
          <Typography color='textSecondary' variant="button">
            SAVED MUSICS(5)
          </Typography>
          <SavedMusic image={mile8} title='Lose Your Self' artist='Eminem' />
          <SavedMusic image={mile8} title='Lose Your Self' artist='Eminem' />
          <SavedMusic image={mile8} title='Lose Your Self' artist='Eminem' />
          <SavedMusic image={mile8} title='Lose Your Self' artist='Eminem' />
          <SavedMusic image={mile8} title='Lose Your Self' artist='Eminem' />
          <SavedMusic image={mile8} title='Lose Your Self' artist='Eminem' />
          <SavedMusic image={mile8} title='Lose Your Self' artist='Eminem' />
          <SavedMusic image={mile8} title='Lose Your Self' artist='Eminem' />
        </Fragment>}
    </div>
  )
};

export default SavedPlayList;
