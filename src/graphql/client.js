import ApolloClient from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory'
import { SubscriptionClient } from 'subscriptions-transport-ws';


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
  headers: {
    'X-Hasura-Admin-Secret': '5JqgiGdr4G5r0CDFMKQ1wiHiEhTUuB4G4GahtiqXuoXeLjTvsbw55TVae6T7rtCK',
  }
});

export default client
