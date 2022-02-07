import { useContext, useReducer } from 'react';
import './App.css';
import Header from './Components/Header';
import { Grid, useMediaQuery } from '@mui/material';
import AddSongs from './Components/AddSongs';
import SongList from './Components/SongList';
import SongPlayer from './Components/SongPlayer';
import { SongContext } from './Context/Context';
import SongReducer from './Reducer/reducer';

function App() {
  const initialSongState = useContext(SongContext)
  const [state, dispatch] = useReducer(SongReducer, initialSongState)
  const greaterThanMd = useMediaQuery('(min-width:900px)')


  return (
    <SongContext.Provider value={{ state, dispatch }}>
      {greaterThanMd && <Header />}
      <Grid container style={{ paddingTop: greaterThanMd ? '80px' : '280px' }}>
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
                top: 0,
                margin: '0 auto',
              }
          }
        >
          <SongPlayer />
        </Grid>
      </Grid>
    </SongContext.Provider>
  )
}

export default App;
