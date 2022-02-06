import ApolloClient from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory'
import { SubscriptionClient } from 'subscriptions-transport-ws';
import { gql } from 'apollo-boost';
import { GET_Queue_SONGS } from './queries';


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
      Queue:[Song]!
    }

    type Mutation{
      addOrRemoveFromQueue(input: SongInput!):[Song]!
    }
  `,
  resolvers: {
    Mutation: {
      addOrRemoveFromQueue: (_, { input }, { cache }) => {
        const queryResult = cache.readQuery({
          query: GET_Queue_SONGS
        })
        if (queryResult) {
          const { Queue } = queryResult;
          const isInQueue = Queue.some(song => song.id === input.id);
          const newQueue = isInQueue ?
            Queue.filter(song => song.id !== input.id)
            : [...Queue, input];
          cache.writeQuery({
            query: GET_Queue_SONGS,
            data: {
              Queue: newQueue
            }
          })
          return newQueue;
        }
        return [];
      }
    }
  },
  headers: {
    'X-Hasura-Admin-Secret': '5JqgiGdr4G5r0CDFMKQ1wiHiEhTUuB4G4GahtiqXuoXeLjTvsbw55TVae6T7rtCK',
  }
});

const hasQueue = Boolean(localStorage.getItem('Queue'))

const data = {
  Queue: hasQueue ? JSON.parse(localStorage.getItem('Queue')) : []
}

client.writeData({ data })

export default client
