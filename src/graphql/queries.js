import { gql } from "apollo-boost";

export const GET_Queue_SONGS = gql`
  query getSavedSongs {
      Queue @client{
        id
        title
        artist
        thumbnail
        url
        duration
      }
  }
`

