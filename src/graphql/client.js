import ApolloClient from 'apollo-boost';

const client = new ApolloClient({
  uri: 'https://alive-cockatoo-46.hasura.app/v1/graphql',

});
console.log(client);
export default client
