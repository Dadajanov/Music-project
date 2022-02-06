import ApolloClient from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory'
import { SubscriptionClient } from 'subscriptions-transport-ws';
import { gql } from 'apollo-boost';
import { GET_SAVEDMUSIC_SONGS } from './queries';


const wsClient = new SubscriptionClient('wss://alive-cockatoo-46.hasura.app/v1/graphql', {
  reconnect: true,
  connectionParams: {
    headers: {
      'X-Hasura-Admin-Secret': '5JqgiGdr4G5r0CDFMKQ1wiHiEhTUuB4G4GahtiqXuoXeLjTvsbw55TVae6T7rtCK',
    }
  }
})

const client = new ApolloClient({
  link: wsClient,
  cache: new InMemoryCache(),
  typeDefs: gql`
    type Song{
      id: uuid!,
      title: String!,
      artist: String!,
      thumbnail: String!,
      url: String!,
      duration: Float!,
    }

    input SongInput{
      id: uuid!,
      title: String!,
      artist: String!,
      thumbnail: String!,
      url: String!,
      duration: Float!,
    }

    type Query{
      savedMusic:[Song]!
    }

    type Mutation{
      addOrRemoveFromSavedMusic(input: SongInput!):[Song]!
    }
  `,
  resolvers: {
    Mutation: {
      addOrRemoveFromSavedMusic: (_, { input }, { cache }) => {
        const queryResult = cache.readQuery({
          query: GET_SAVEDMUSIC_SONGS
        })
        if (queryResult) {
          const { savedMusic } = queryResult;
          const isInSavedMusic = savedMusic.some(song => song.id === input.id);
          const newSavedMusic = isInSavedMusic ?
            savedMusic.filter(song => song.id !== input.id)
            : [...savedMusic, input];
          cache.writeQuery({
            query: GET_SAVEDMUSIC_SONGS,
            data: {
              savedMusic: newSavedMusic
            }
          })
          return newSavedMusic;
        }
        return [];
      }
    }
  },
  headers: {
    'X-Hasura-Admin-Secret': '5JqgiGdr4G5r0CDFMKQ1wiHiEhTUuB4G4GahtiqXuoXeLjTvsbw55TVae6T7rtCK',
  }
});

const hasSavedMusic = Boolean(localStorage.getItem('savedMusic'))

const data = {
  savedMusic: hasSavedMusic ? JSON.parse(localStorage.getItem('savedMusic')) : []
}

client.writeData({ data })

export default client
