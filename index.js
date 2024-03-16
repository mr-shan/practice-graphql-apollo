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
      return db.reviews;
    },
    games() {
      return db.games;
    },
    creators() {
      return db.creators;
    },
    review(parent, args, context) {
      return db.reviews.find((review) => review.id === args.id);
    },
    game(parent, args, context) {
      return db.games.find((game) => game.id === args.id);
    },
    creator(parent, args, context) {
      return db.creators.find((creator) => creator.id === args.id);
    },
  },
  Game: {
    reviews(parent, args, context) {
      return db.reviews.filter((review) => review.game_id === parent.id);
    },
  },
  Creator: {
    reviews(parent, args, context) {
      return db.reviews.filter((review) => review.creator_id === parent.id);
    },
    games(parent, args, context) {
      const games = db.reviews
        .filter((review) => review.creator_id === parent.id)
        .map((game) => game.game_id);
      return db.games.filter((game) => games.includes(game.id));
    },
  },
  Review: {
    game(parent, args, context) {
      return db.games.find((game) => game.id === parent.id);
    },
    creator(parent, args, context) {
      return db.creators.find((creator) => creator.id === parent.creator_id);
    },
  },
  Mutation: {
    deleteGame(parent, args, context) {
      const game = db.games.find((e) => e.id === args.id);
      db.games = db.games.filter((game) => game.id !== args.id);
      return game;
    },
    addGame(parent, args, context) {
      const newGame = { ...args.game, id: Date.now().toString(), reviews: [] };
      db.games.push(newGame);
      return newGame;
    },
    updateGame(parent, args, context) {
      const id = args.id;
      const payload = args.payload;
      const gameToUpdate = db.games.findIndex((game) => game.id === id);
      if (gameToUpdate === -1) return null;

      db.games[gameToUpdate] = { ...db.games[gameToUpdate], ...payload };
      return db.games[gameToUpdate]
    },
  },
};

// server setup
const server = new ApolloServer({ typeDefs, resolvers });

const { url } = await startStandaloneServer(server, {
  listen: { port: 4000 },
});

console.log('Server started at port: 4000');
