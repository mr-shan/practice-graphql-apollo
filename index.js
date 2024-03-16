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
    },
    review(parent, args, context) {
      return db.reviews.find(review => review.id === args.id)
    },
    game(parent, args, context) {
      return db.games.find(game => game.id === args.id)
    },
    creator(parent, args, context) {
      return db.creators.find(creator => creator.id === args.id)
    }
  },
  Game: {
    reviews(parent, args, context) {
      return db.reviews.filter(review => review.game_id === parent.id)
    }
  },
  Creator: {
    reviews(parent, args, context) {
      return db.reviews.filter(review => review.creator_id === parent.id)
    },
    games(parent, args, context) {
      const games = db.reviews.filter(review => review.creator_id === parent.id).map(game => game.game_id)
      return db.games.filter(game => games.includes(game.id))
    }
  },
  Review: {
    game(parent, args, context){
      return db.games.find(game => game.id === parent.id)
    },
    creator(parent, args, context){
      return db.creators.find(creator => creator.id === parent.id)
    }
  }
}

// server setup
const server = new ApolloServer({ typeDefs, resolvers });

const { url } = await startStandaloneServer(server, {
  listen: { port: 4000 },
});

console.log('Server started at port: 4000');
