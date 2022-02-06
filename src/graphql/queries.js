import { gql } from "apollo-boost";

export const GET_SAVEDMUSIC_SONGS = gql`
  query getSavedSongs {
      savedMusic @client{
        id
        title
        artist
        thumbnail
        url
        duration
      }
  }
`

