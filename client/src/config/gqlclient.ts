import { GraphQLClient } from "graphql-request";

export const graphQLClient = new GraphQLClient(
  "https://memz-gql.herokuapp.com/",
  {
    headers: {
      authorization: process.env.REACT_APP_ACCESSKEY!,
    },
  }
);
