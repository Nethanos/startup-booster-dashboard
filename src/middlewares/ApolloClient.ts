import { ApolloClient, gql, InMemoryCache } from '@apollo/client';


const client = new ApolloClient({
    uri: 'https://api.github.com/graphql',
    cache: new InMemoryCache(),
    headers: {
        Authorization: `bearer ${process.env.REACT_APP_GITHUB_API_TOKEN}`
    }
  });


export function requestQuery(query: string) {
   return client.query({query: gql`${query}`});
 }
  

export default client;