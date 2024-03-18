const typeDefs = `#graphql
  type Game {
    id: ID!
    title: String!
    platform: [String!]!
    reviews: [Review!]
  }
  type Review {
    id: ID!
    rating: Int!
    content: String!
    game: Game!
    creator: Creator!
  }
  type Creator {
    id: ID!
    name: String!
    verified: Boolean
    reviews: [Review!]
    games: [Game!]
  }
  type Platform {
    name: String!
    games: [Game!]
  }
  type Query {
    #list queries
    reviews: [Review]
    games: [Game]
    creators: [Creator]

    #retrieve queries
    review(id: ID): Review
    game(id: ID): Game
    creator(id: ID): Creator

    #special queries
    platforms(name: String): [Platform]
  }
  type Mutation {
    addGame(game: AddGameInput!): Game
    deleteGame(id: ID): Game
    updateGame(id: ID!, payload: UpdateGameInput): Game
  }
  input AddGameInput {
    title: String!
    platform: [String!]!
  }
  input UpdateGameInput {
    title: String,
    platform: [String]
  }
`;

export default typeDefs;

// types available in graphQL
// int, float, string, boolean, ID

// the types Game, Review and Creator are type of DATA that are going to be stored
// the type Query is a special type, required by GraphQL
// it indicates the entry point to graphql queries
// whatever is mentioned in query, can be used to to entry point into the graph
