import { Fragment } from 'react';
import './App.css';
import Header from './Components/Header';
import { Grid } from '@mui/material';
import AddSongs from './Components/AddSongs';
import SongList from './Components/SongList';
import SongPlayer from './Components/SongPlayer';

function App() {
  return (
    <Fragment>
      <Header />
      <Grid container spacing={2}>
        <Grid item xs={12} md={7} style={{ paddingTop: '80px' }}>
          <AddSongs />
          <SongList />
        </Grid>
        <Grid item xs={12} md={5}>
          <SongPlayer />
        </Grid>
      </Grid>
    </Fragment>
  )
}

export default App;
