import { useQuery } from "@apollo/react-hooks";
import { SpinnerRoundFilled } from "spinners-react";
import mile8 from '../assets/8-mile.jpg'
import { GET_SONGS } from "../graphql/queries";
import Song from "./Song";

const SongList = () => {

  const { data, loading, error } = useQuery(GET_SONGS);

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

  console.log(data)
  return (
    <div>
      {data.songs.map(song => {
        return <Song key={song.id} title={song.title} artist={song.artist} image={song.thumbnail} />
      })}
    </div>
  )
};

export default SongList;
