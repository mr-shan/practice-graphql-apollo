import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';

//types
import { typeDefs } from './schema.js';

//db
import db from './db.js';

//
const resolvers = {
  Query: {
    reviews() {
      return db.reviews
    },
    games() {
      return db.games
    },
    creators() {
      return db.creators
    }
  }
}

// server setup
const server = new ApolloServer({ typeDefs, resolvers });

const { url } = await startStandaloneServer(server, {
  listen: { port: 4000 },
});

console.log('Server started at port: 4000');
