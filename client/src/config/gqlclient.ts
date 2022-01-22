import { GraphQLClient } from "graphql-request";

export const graphQLClient = new GraphQLClient("/", {
  headers: {
    authorization: process.env.REACT_APP_ACCESSKEY!,
  }
})