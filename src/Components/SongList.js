import { SpinnerRoundFilled } from "spinners-react";
import mile8 from '../assets/8-mile.jpg'
import Song from "./Song";

const SongList = () => {
  const loading = true

  if (!loading) {
    return <div style={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    }}>
      <SpinnerRoundFilled style={{ overflow: 'hidden' }} size={250} thickness={90} speed={100} color="#08777a" />
    </div>
  } else {
    return (
      <div>
        <Song image={mile8} title='Lose Your Self' artist='Eminem' />
        <Song image={mile8} title='Lose Your Self' artist='Eminem' />
        <Song image={mile8} title='Lose Your Self' artist='Eminem' />
        <Song image={mile8} title='Lose Your Self' artist='Eminem' />
        <Song image={mile8} title='Lose Your Self' artist='Eminem' />
        <Song image={mile8} title='Lose Your Self' artist='Eminem' />
        <Song image={mile8} title='Lose Your Self' artist='Eminem' />
        <Song image={mile8} title='Lose Your Self' artist='Eminem' />
        <Song image={mile8} title='Lose Your Self' artist='Eminem' />
        <Song image={mile8} title='Lose Your Self' artist='Eminem' />
        <Song image={mile8} title='Lose Your Self' artist='Eminem' />
        <Song image={mile8} title='Lose Your Self' artist='Eminem' />
      </div>
    )
  }
};

export default SongList;
