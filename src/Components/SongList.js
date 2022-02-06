import { useSubscription } from "@apollo/react-hooks";
import { SpinnerRoundFilled } from "spinners-react";
import { GET_SONGS } from "../graphql/subscriptions";
import Song from "./Song";

const SongList = () => {

  const { data, loading, error } = useSubscription(GET_SONGS);

  if (loading) {
    return <div style={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    }}>
      <SpinnerRoundFilled style={{ overflow: 'hidden' }} size={250} thickness={90} speed={100} color="#08777a" />
    </div>
  }

  if (error) return <div> Error fetching songs </div>

  return (
    <div>
      {data.Songs.map(song => {
        return <Song key={song.id} song={song} />
      })}
    </div>
  )
};

export default SongList;
