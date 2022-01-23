import { GraphQLClient } from "graphql-request";

const endpoint = "https://memz-gql.herokuapp.com/";

export const graphQLClient = new GraphQLClient(endpoint, {
  headers: {
    authorization: process.env.REACT_APP_ACCESSKEY!,
  },
});
