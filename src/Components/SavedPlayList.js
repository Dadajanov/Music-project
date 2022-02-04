import { Typography } from "@mui/material";
import mile8 from '../assets/8-mile.jpg'
import SavedMusic from "./SavedMusic";

const SavedPlayList = () => {
  return (
    <div style={{ margin: '10px 0' }}>
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
    </div>
  )
};

export default SavedPlayList;
