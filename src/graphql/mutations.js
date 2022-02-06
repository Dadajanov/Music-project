import { gql } from 'apollo-boost';

export const ADD_OR_REMOVE_FROM_SAVEDMUSIC = gql`
  mutation addOrRemoveFromSavedMusic($input: SongInput!){
    addOrRemoveFromSavedMusic(input: $input) @client
  }
`

export const ADD_SONG = gql`
mutation addSong(
  $title: String!, 
  $artist: String!, 
  $thumbnail: String!, 
  $duration:Float,
  $url: String!
  ) {
      insert_Songs(
      objects: {
      title: $title, 
      artist: $artist, 
      thumbnail: $thumbnail, 
      duration: $duration, 
      url: $url
    }
  ) {
      affected_rows
    }
  }
`
