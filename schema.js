export const typeDefs = `#graphql
  type Game {
    id: ID!
    title: String!
    platform: [String!]!
  }
  type Review {
    id: ID!
    rating: Int!
    content: String!
  }
  type Creator {
    id: ID!
    name: String!
    verified: Boolean
  }
  type Query {
    reviews: [Review]
    games: [Game]
    creators: [Creator]
  }
`;

// types available in graphQL
// int, float, string, boolean, ID

// the types Game, Review and Creator are type of DATA that are going to be stored
// the type Query is a special type, required by GraphQL
// it indicates the entry point to graphql queries
// whatever is mentioned in query, can be used to to entry point into the graph
