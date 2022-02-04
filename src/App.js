import { Fragment } from 'react';
import './App.css';
import Header from './Components/Header';
import { Grid, useMediaQuery } from '@mui/material';
import AddSongs from './Components/AddSongs';
import SongList from './Components/SongList';
import SongPlayer from './Components/SongPlayer';

function App() {
  const greaterThanMd = useMediaQuery('(min-width:900px)')
  const greaterThanSm = useMediaQuery('(min-width:600px)')

  return (
    <Fragment>
      {greaterThanSm && <Header />}
      <Grid container style={{ paddingTop: greaterThanSm ? '80px' : '10px' }}>
        <Grid item xs={12} md={7} >
          <AddSongs />
          <SongList />
        </Grid>
        <Grid item
          sx={{ padding: '0 15px' }}
          xs={12}
          md={5}
          style={
            greaterThanMd ?
              {
                position: 'fixed',
                width: '100%',
                right: 0,
                margin: '0 auto',
              } : {
                position: 'fixed',
                width: '100%',
                left: 0,
                bottom: 0,
                margin: '0 auto',
              }
          }
        >
          <SongPlayer />
        </Grid>
      </Grid>
    </Fragment>
  )
}

export default App;
